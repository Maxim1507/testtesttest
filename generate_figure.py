"""
Recreates Figure 10.1 as an A4 PDF.
Font: Liberation Sans (metric equivalent of Arial/Bahnschrift).
To use Bahnschrift: replace FONT_* paths with the Bahnschrift TTF files.
"""
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib import colors
import math

# ── Fonts ──────────────────────────────────────────────────────────────────────
BASE = '/usr/share/fonts/truetype/liberation/LiberationSans'
pdfmetrics.registerFont(TTFont('R',  BASE + '-Regular.ttf'))
pdfmetrics.registerFont(TTFont('B',  BASE + '-Bold.ttf'))
pdfmetrics.registerFont(TTFont('I',  BASE + '-Italic.ttf'))
pdfmetrics.registerFont(TTFont('BI', BASE + '-BoldItalic.ttf'))

FS = 11   # requested font size

# ── Page / figure geometry ─────────────────────────────────────────────────────
PW, PH = A4          # 595.27 × 841.89 pt
M  = 20              # page margin
FW = PW - 2*M        # figure width  ≈ 555 pt
# Use full available height so the table fits
FH = PH - 2*M        # 801 pt
FX = M               # figure left edge
FY_BOT = M           # figure bottom (ReportLab y)
FY_TOP = FY_BOT + FH # figure top

# Original VML canvas extents (figure is 6.30 × 8.62 inch)
W0, H0 = 57607.0, 78847.0

def px(v):  return FX + (v / W0) * FW
def py(v):  return FY_TOP - (v / H0) * FH
def pw(v):  return (v / W0) * FW
def ph(v):  return (v / H0) * FH

# ── Drawing utilities ──────────────────────────────────────────────────────────

def arrowhead(c, x_tip, y_tip, angle_deg, aw=5, ah=7):
    """Filled triangle arrowhead pointing in angle_deg direction."""
    a = math.radians(angle_deg)
    p = c.beginPath()
    p.moveTo(x_tip, y_tip)
    p.lineTo(x_tip - ah*math.cos(a) + (aw/2)*math.sin(a),
             y_tip - ah*math.sin(a) - (aw/2)*math.cos(a))
    p.lineTo(x_tip - ah*math.cos(a) - (aw/2)*math.sin(a),
             y_tip - ah*math.sin(a) + (aw/2)*math.cos(a))
    p.close()
    c.drawPath(p, fill=1, stroke=0)

def vert_arrow(c, x, y_top, y_bot, aw=5, ah=7):
    """Vertical arrow pointing DOWN (y_top > y_bot in ReportLab)."""
    c.setFillColor(colors.black)
    c.line(x, y_top, x, y_bot + ah)
    arrowhead(c, x, y_bot, 270, aw, ah)

def bidir_horiz_arrow(c, x1, y, x2, aw=5, ah=7):
    """Horizontal two-headed arrow."""
    c.setFillColor(colors.black)
    c.line(x1 + ah, y, x2 - ah, y)
    arrowhead(c, x1, y, 180, aw, ah)
    arrowhead(c, x2, y, 0,   aw, ah)

def wrap_lines(c, text, font, size, max_w):
    """Word-wrap text into a list of lines fitting max_w."""
    words = text.split()
    lines, cur = [], ''
    for w in words:
        test = (cur + ' ' + w).strip()
        if c.stringWidth(test, font, size) <= max_w:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines or ['']

def draw_multiline(c, lines, font, size, cx, y_top, align='center', leading=None):
    """Draw pre-wrapped lines centred/left of cx, starting at y_top."""
    if leading is None:
        leading = size * 1.25
    y = y_top - size * 0.85
    for ln in lines:
        c.setFont(font, size)
        tw = c.stringWidth(ln, font, size)
        if align == 'center':
            c.drawString(cx - tw/2, y, ln)
        else:
            c.drawString(cx, y, ln)
        y -= leading
    return y   # y after last line

def text_block_height(lines, size, leading=None):
    if leading is None:
        leading = size * 1.25
    return max(0, len(lines) - 1) * leading + size

def fill_box(c, x, y_bot, w, h, font, size, paragraphs,
             leading=None, align='center', pad=5):
    """Draw list of (font_key, text) inside a rectangle, auto-wrapped, v-centred."""
    if leading is None:
        leading = size * 1.22
    max_w = w - 2*pad
    all_lines = []
    for (fk, txt) in paragraphs:
        if txt == '':
            all_lines.append(('', []))
        else:
            all_lines.append((fk, wrap_lines(c, txt, fk, size, max_w)))
    total_h = sum(text_block_height(lns, size, leading) for _, lns in all_lines)
    total_h += (len(all_lines)-1) * leading * 0.1   # small gap between paras
    y = y_bot + h/2 + total_h/2 - size*0.85
    for (fk, lns) in all_lines:
        if fk == '':
            y -= leading * 0.5
            continue
        c.setFont(fk, size)
        for ln in lns:
            tw = c.stringWidth(ln, fk, size)
            if align == 'center':
                c.drawString(x + (w - tw)/2, y, ln)
            else:
                c.drawString(x + pad, y, ln)
            y -= leading

def fill_oval(c, cx, cy, rx, ry, paragraphs, size_title, size_body, pad=6):
    """Text inside an ellipse.  Uses a wider wrap-width to avoid overflow."""
    # Usable inner width ≈ 85 % of ellipse diameter
    max_w   = rx * 1.70 - 2*pad
    lead_t  = size_title * 1.20
    lead_b  = size_body  * 1.18

    # Build line list: (font_key, text, leading)
    all_lines = []
    for (fk, txt) in paragraphs:
        if txt == '':
            all_lines.append(('', '', 0))
        else:
            sz  = size_title if fk == 'B' else size_body
            ld  = lead_t     if fk == 'B' else lead_b
            for ln in wrap_lines(c, txt, fk, sz, max_w):
                all_lines.append((fk, ln, ld))

    total_h = sum(ld for _, _, ld in all_lines if ld > 0)
    y = cy + total_h/2 - size_title*0.85
    for (fk, ln, ld) in all_lines:
        if ld == 0:
            y -= lead_b * 0.4
            continue
        sz = size_title if fk == 'B' else size_body
        c.setFont(fk, sz)
        tw = c.stringWidth(ln, fk, sz)
        c.drawString(cx - tw/2, y, ln)
        y -= ld

# ── Build PDF ──────────────────────────────────────────────────────────────────

def build(out_path):
    c = canvas.Canvas(out_path, pagesize=A4)
    c.setTitle('Figure 10.1')
    c.setStrokeColor(colors.black)
    c.setFillColor(colors.black)
    c.setLineWidth(0.6)

    # ── 1. Progressive box (top-left) ─────────────────────────────────────────
    pb_l = px(9883);   pb_t = py(366)
    pb_w = pw(11430);  pb_h = ph(18282)
    pb_b = pb_t - pb_h
    c.setFillColor(colors.white)
    c.rect(pb_l, pb_b, pb_w, pb_h, stroke=1, fill=1)
    c.setFillColor(colors.black)

    fill_box(c, pb_l, pb_b, pb_w, pb_h, 'R', FS, [
        ('B', 'Progressive socialist-inspired land policy:'),
        ('R', '–Public entrepreneurialism'),
        ('R', '–Proactive strategies'),
        ('R', '–Redistributive objectives'),
        ('R', '–Public land ownership'),
        ('R', '–Land taxes'),
        ('R', '–Public capture of land rent'),
    ], align='left', pad=5)

    # ── 2. Neoliberal box (top-right) ─────────────────────────────────────────
    nb_l = px(37539);  nb_t = py(360)
    nb_w = pw(11423);  nb_h = ph(18288)
    nb_b = nb_t - nb_h
    c.setFillColor(colors.white)
    c.rect(nb_l, nb_b, nb_w, nb_h, stroke=1, fill=1)
    c.setFillColor(colors.black)

    fill_box(c, nb_l, nb_b, nb_w, nb_h, 'R', FS, [
        ('B', 'Neoliberal NPM-inspired land policy:'),
        ('R', '–New public entrepreneurialism'),
        ('R', '–Proactive strategies'),
        ('R', '–City marketing'),
        ('R', '–Selective deregulation'),
        ('R', '–Public-private partnerships'),
        ('R', '–Production of urban rent'),
    ], align='left', pad=5)

    # ── 3. Bidirectional arrow between boxes ───────────────────────────────────
    arr_y  = py(2429 + 242)        # centre of the VML arrow shape
    arr_x1 = pb_l + pb_w + 3      # just right of progressive box
    arr_x2 = nb_l - 3             # just left of neoliberal box
    arr_cx = (arr_x1 + arr_x2) / 2

    c.setLineWidth(0.8)
    bidir_horiz_arrow(c, arr_x1, arr_y, arr_x2, aw=5, ah=7)
    c.setLineWidth(0.6)

    # "Crossfertilization & hybridization" in italic, above the arrow
    cf = 'Crossfertilization & hybridization'
    cf_w = c.stringWidth(cf, 'I', FS)
    c.setFont('I', FS)
    c.setFillColor(colors.black)
    c.drawString(arr_cx - cf_w/2, arr_y + 4, cf)

    # ── 4. Vertical line: arrow centre → Performance oval ─────────────────────
    ov_l  = px(22705); ov_t = py(7986)
    ov_w  = pw(13716); ov_h = ph(16765)
    ov_b  = ov_t - ov_h
    ov_cx = ov_l + ov_w/2
    ov_cy = ov_t - ov_h/2

    vert_arrow(c, arr_cx, arr_y - 3, ov_t + 3, aw=5, ah=7)

    # ── 5. Performance oval ───────────────────────────────────────────────────
    # White fill (no stroke yet – stroke drawn AFTER text so it sits on top)
    c.setFillColor(colors.white)
    c.ellipse(ov_l, ov_b, ov_l + ov_w, ov_t, stroke=0, fill=1)
    c.setFillColor(colors.black)

    # Clip to bounding-box rectangle (not the tight ellipse shape) so wrapping
    # is determined by max_w inside fill_oval, not by the clip path.
    c.saveState()
    ov_clip = c.beginPath()
    ov_clip.rect(ov_l + 4, ov_b + 4, ov_w - 8, ov_h - 8)
    c.clipPath(ov_clip, stroke=0, fill=0)
    fill_oval(c, ov_cx, ov_cy, ov_w/2, ov_h/2, [
        ('B', 'Performance-'),          # split on hyphen so no overlong line
        ('B', 'orientation'),
        ('R', ''),
        ('R', 'characterized by:'),
        ('R', '–Focus on outputs'),
        ('R', '–Project-based, flexible'),
        ('R', '–Public ownership as an instrument'),
        ('R', '–Stronger involvement of target group (e.g. developers)'),
    ], size_title=FS, size_body=FS-1, pad=6)
    c.restoreState()

    # Redraw ellipse border on top so it visually masks any edge overflow
    c.setStrokeColor(colors.black)
    c.setLineWidth(0.6)
    c.ellipse(ov_l, ov_b, ov_l + ov_w, ov_t, stroke=1, fill=0)

    # ── 6. Arrow: oval bottom → Project-based planning box ───────────────────
    pb2_l = px(24728); pb2_t = py(23233)
    pb2_w = pw(10287); pb2_h = ph(4154)
    pb2_b = pb2_t - pb2_h
    pb2_cx = pb2_l + pb2_w/2

    # The VML arrow (Shape 2) runs from inside the oval bottom area downward
    # to just above the project box top.  Draw it on top of the (white) oval.
    arrow_top_y = py(20942)   # where the downward arrow starts (inside oval)
    arrow_bot_y = py(23230)   # where it ends (≈ project box top)
    vert_arrow(c, ov_cx, arrow_top_y, arrow_bot_y, aw=5, ah=7)

    # Project box is drawn on top of the oval's lower bounding area
    c.setFillColor(colors.white)
    c.rect(pb2_l, pb2_b, pb2_w, pb2_h, stroke=1, fill=1)
    c.setFillColor(colors.black)
    fill_box(c, pb2_l, pb2_b, pb2_w, pb2_h, 'R', FS, [
        ('R', 'Project-based planning'),
    ], align='center')

    # ── 7. Arrow: project box → dashed bracket ────────────────────────────────
    # Bracket top/bottom from the rotated VML shapes
    bk_top = py(27900)   # top dashed line
    bk_bot = py(43500)   # bottom dashed line
    bk_x1  = FX + 2
    bk_x2  = FX + FW - 2

    vert_arrow(c, pb2_cx, pb2_b - 2, bk_top + 2, aw=5, ah=7)

    # Dashed bracket
    c.setDash(4, 3)
    c.setLineWidth(0.55)
    c.line(bk_x1, bk_top, bk_x2, bk_top)
    c.line(bk_x1, bk_bot, bk_x2, bk_bot)
    c.line(bk_x1, bk_bot, bk_x1, bk_top)
    c.line(bk_x2, bk_bot, bk_x2, bk_top)
    c.setDash()
    c.setLineWidth(0.6)

    # ── 8. Case study ovals ───────────────────────────────────────────────────
    cases = [
        # top row (left→right)
        (544,  34420, 10287, 3535, 'Case 1 in Holligen\n(Bern, CH)'),
        (11974,34306, 10287, 4326, 'Case 3 in Nieuwe\nDefensie (Utrecht, NL)'),
        (23404,34306, 10287, 3429, 'Case 5 in Hoffmatte\n(Thun, CH)'),
        (34288,34306, 10286, 4613, 'Case 7 in\nDefensieterrein\n(Woerden, NL)'),
        # bottom row (left→right)
        (5116, 38878, 10287, 3429, 'Case 2 in\nZijdebalen\n(Utrecht, NL)'),
        (18225,38878, 10287, 4367, 'Case 4 in Jardin\ndu Paradis (Biel, CH)'),
        (28512,38919, 10286, 4531, 'Case 6 in ESP\nAusserholligen\n(Bern, CH)'),
        (39406,38809, 10287, 4641, 'Case 8 in Rijnhuizen\n(Nieuwegein, NL)'),
    ]

    for (vx0, vy0, vw, vh, lbl) in cases:
        ex = px(vx0); et = py(vy0); ew = pw(vw); eh = ph(vh); eb = et - eh
        ecx = ex + ew/2; ecy = et - eh/2
        c.setFillColor(colors.white)
        c.ellipse(ex, eb, ex+ew, et, stroke=1, fill=1)
        c.setFillColor(colors.black)
        lns = lbl.split('\n')
        fs2 = FS - 1
        leading2 = fs2 * 1.15
        total = len(lns) * leading2
        y_txt = ecy + total/2 - fs2*0.85
        for ln in lns:
            c.setFont('R', fs2)
            tw = c.stringWidth(ln, 'R', fs2)
            c.drawString(ecx - tw/2, y_txt, ln)
            y_txt -= leading2

    # ── 9. Arrow: bracket bottom → table ─────────────────────────────────────
    tbl_arrow_x = px(30060)
    tbl_ytop    = py(42814)
    vert_arrow(c, tbl_arrow_x, bk_bot - 2, tbl_ytop + 3, aw=5, ah=7)

    # ── 10. Comparison table ─────────────────────────────────────────────────
    tbl_x = FX
    tbl_w = FW
    tbl_h = tbl_ytop - FY_BOT   # available height to page bottom
    tbl_b = FY_BOT               # table bottom

    cw_l = tbl_w * 0.415   # left column  (wider to fit long text at 11pt)
    cw_m = tbl_w * 0.170   # centre column
    cw_r = tbl_w - cw_l - cw_m

    # Heights: header + 6 content rows (no explicit spacers; whitespace via cell padding)
    r_hdr  = tbl_h * 0.09
    r_cont = (tbl_h - r_hdr) / 6

    dims = [
        ('Municipalities working for the less well-off segment of their population to compensate for growing inequalities',
         '1.\nTarget group of\nland policy',
         'Municipalities supporting the affluent segment to stimulate the "growth machine"'),
        ('Municipalities developing long-term strategies to gain independence from short-term constraints',
         '2.\nTime horizon of\nland policy',
         'Municipalities developing their strategy within legislature periods targeting short-term benefits'),
        ('Public authorities using public real-estate assets to secure social gains (preventing dismantling of social benefits, supporting non-profit initiatives, e.g. through the cost-rent principle)',
         '3.\nStrategic objective of\npublic real-estate assets',
         'Municipalities shaping land policy according to best investment practices (generating profit to fill public coffers)'),
        ('Municipalities combine planning instruments based on public-law (e.g. zoning) with public landownership to support planning goals.',
         '4.\nStrategic use of\nland policy instruments',
         'Municipalities favor the use of contractual agreements based on private-law for increased flexibility in front of the strict regulations of public-law instruments.'),
        ('Municipalities open to new taxes or also debt to promote long-term public project implementation',
         '5.\nFinancing of\nland policy',
         'Municipalities counting on the private sector through PPP in case of funding shortage'),
        ('Municipalities developing long-term strategies to capture land rents',
         '6.\nHow land policy deals\nwith land rents',
         'Municipalities favoring the transfer of land rents to the private sector so as not to hinder private investment.'),
    ]

    def draw_tbl_row(y_top, height, lt, mt, rt, lf='R', mf='R', rf='R'):
        y_bot = y_top - height
        # bottom border & column dividers
        c.setLineWidth(0.5)
        c.line(tbl_x, y_bot, tbl_x + tbl_w, y_bot)
        c.line(tbl_x + cw_l, y_bot, tbl_x + cw_l, y_top)
        c.line(tbl_x + cw_l + cw_m, y_bot, tbl_x + cw_l + cw_m, y_top)

        def cell(cx, cw, txt, fn):
            if not txt:
                return
            pad  = 5
            lns  = wrap_lines(c, txt, fn, FS, cw - 2*pad)
            lead = FS * 1.22
            tot  = text_block_height(lns, FS, lead)
            # top-align when text overflows; centre otherwise
            if tot > height - 2*pad:
                y = y_top - pad - FS * 0.85
            else:
                y = y_top - (height - tot)/2 - FS * 0.85
            c.saveState()
            cp = c.beginPath()
            cp.rect(cx + 0.5, y_bot + 0.5, cw - 1, height - 1)
            c.clipPath(cp, stroke=0, fill=0)
            for ln in lns:
                tw = c.stringWidth(ln, fn, FS)
                c.setFont(fn, FS)
                c.setFillColor(colors.black)
                c.drawString(cx + (cw - tw)/2, y, ln)
                y -= lead
            c.restoreState()

        cell(tbl_x,           cw_l, lt, lf)
        cell(tbl_x + cw_l,    cw_m, mt, mf)
        cell(tbl_x + cw_l + cw_m, cw_r, rt, rf)
        return y_bot

    # Outer border
    c.setLineWidth(0.75)
    c.rect(tbl_x, tbl_b, tbl_w, tbl_h, stroke=1, fill=0)

    y_cur = tbl_ytop
    y_cur = draw_tbl_row(y_cur, r_hdr,
                         'Progressive land policy', '', 'Neoliberal land policy',
                         lf='B', rf='B')
    for (lt, mt, rt) in dims:
        y_cur = draw_tbl_row(y_cur, r_cont, lt, mt, rt)

    c.save()
    print(f'Saved → {out_path}')

build('/home/user/testtesttest/Figure_10.1_output.pdf')
