#!/usr/bin/env bash
# PreToolUse hook (Bash) — gates `git push` on lint + build passing.
# Exit 2 blocks the command and feeds stderr back to Claude as the reason.
# Ported to work with both bun and npm (the repo now supports `npm run build`
# via `npx tsx` fallback for Vercel/bun-less environments).

input="$(cat)"
command="$(echo "$input" | grep -o '\"command\"[[:space:]]*:[[:space:]]*\"[^\"]*\"' | head -1 | sed -E 's/.*:[[:space:]]*\"(.*)\"/\\1/')"

case "$command" in
  *"git push"*)
    ;;
  *)
    exit 0
    ;;
esac

project_dir="${CLAUDE_PROJECT_DIR:-.}"
cd "$project_dir" || exit 0

# Prefer bun if available, fall back to npm/npx
run_lint() {
  if command -v bun >/dev/null 2>&1; then
    bun run lint
  else
    npx eslint . --max-warnings 10
  fi
}
run_build() {
  if command -v bun >/dev/null 2>&1; then
    bun run build
  else
    npm run build
  fi
}

if ! run_lint > /tmp/pre-push-lint.log 2>&1; then
  echo "Blocked push: lint failed. Output:" >&2
  tail -n 60 /tmp/pre-push-lint.log >&2
  exit 2
fi

if ! run_build > /tmp/pre-push-build.log 2>&1; then
  echo "Blocked push: build failed. Output:" >&2
  tail -n 60 /tmp/pre-push-build.log >&2
  exit 2
fi

# Also gate on node validation when repo is present
if [ -f "scripts/validate-nodes.ts" ]; then
  if ! npx tsx scripts/validate-nodes.ts > /tmp/pre-push-validate.log 2>&1; then
    echo "Blocked push: validate-nodes failed:" >&2
    cat /tmp/pre-push-validate.log >&2
    exit 2
  fi
fi

exit 0
