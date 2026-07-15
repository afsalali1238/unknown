#!/usr/bin/env bash
# PreToolUse hook (Bash) — gates `git push` on lint + build passing.
# Exit 2 blocks the command and feeds stderr back to Claude as the reason.

input="$(cat)"
command="$(echo "$input" | grep -o '"command"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed -E 's/.*:[[:space:]]*"(.*)"/\1/')"

case "$command" in
  *"git push"*)
    ;;
  *)
    exit 0
    ;;
esac

project_dir="${CLAUDE_PROJECT_DIR:-.}"
cd "$project_dir" || exit 0

if ! bun run lint > /tmp/pre-push-lint.log 2>&1; then
  echo "Blocked push: 'bun run lint' failed. Output:" >&2
  tail -n 40 /tmp/pre-push-lint.log >&2
  exit 2
fi

if ! bun run build > /tmp/pre-push-build.log 2>&1; then
  echo "Blocked push: 'bun run build' failed. Output:" >&2
  tail -n 40 /tmp/pre-push-build.log >&2
  exit 2
fi

exit 0
