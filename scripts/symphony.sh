#!/usr/bin/env bash
set -euo pipefail

repo_root=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
runtime=${SYMPHONY_HOME:-"$HOME/github/symphony/elixir"}
key_file=${SYMPHONY_ENV_FILE:-"$runtime/.env.tanks"}
if [[ -z "${LINEAR_API_KEY:-}" && -f "$key_file" ]]; then
  while IFS='=' read -r name value; do
    if [[ "$name" == LINEAR_API_KEY ]]; then
      export LINEAR_API_KEY="$value"
    fi
  done < "$key_file"
fi
if [[ -z "${LINEAR_API_KEY:-}" ]]; then
  echo "Set LINEAR_API_KEY or save it in $key_file before starting Symphony." >&2
  exit 1
fi
if [[ ! -x "$runtime/bin/symphony" ]]; then
  echo "Build Symphony in $runtime or set SYMPHONY_HOME to its elixir directory." >&2
  exit 1
fi
for tool in mise codex gh python3 ruby bundle just; do
  command -v "$tool" >/dev/null || { echo "Missing command: $tool" >&2; exit 1; }
done
cd "$runtime"
exec mise exec -- ./bin/symphony "$repo_root/WORKFLOW.md" \
  --logs-root "$runtime/log/website" \
  --i-understand-that-this-will-be-running-without-the-usual-guardrails "$@"
