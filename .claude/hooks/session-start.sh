#!/bin/bash
set -euo pipefail

# Only needed in ephemeral remote/web sessions - a local checkout keeps its
# user-level plugin cache between runs already.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# The project's .claude/settings.json declares the mattpocock-skills plugin
# as enabled, but the actual plugin content lives in a user-level cache
# (~/.claude/plugins) that does not survive a fresh container. Re-install it
# here so it's available every session. Both commands are idempotent.
claude plugin marketplace add mattpocock/skills --scope project
claude plugin install mattpocock-skills@mattpocock --scope project
