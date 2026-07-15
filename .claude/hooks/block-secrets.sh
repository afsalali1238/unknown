#!/usr/bin/env bash
# PreToolUse hook (Edit|Write|Read) — blocks access to env files and secrets.
# Exit 2 blocks the tool call and feeds stderr back to Claude as the reason.

input="$(cat)"
file_path="$(echo "$input" | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed -E 's/.*:[[:space:]]*"(.*)"/\1/')"

if [ -z "$file_path" ]; then
  exit 0
fi

case "$file_path" in
  *.env|*.env.*|*/secrets/*|*secrets/*)
    echo "Blocked: '$file_path' looks like an env/secrets file. Not readable or writable by this session." >&2
    exit 2
    ;;
esac

exit 0
