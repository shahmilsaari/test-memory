#!/usr/bin/env bash
set -euo pipefail

FILE_DELAY_SECONDS="${MEMORY_FILE_DELAY_SECONDS:-1}"
MEMORY_ULIMIT_NOFILE="${MEMORY_ULIMIT_NOFILE:-65536}"

if ! command -v memory-core >/dev/null 2>&1; then
  echo "memory-core not found in PATH"
  exit 1
fi

ulimit -n "${MEMORY_ULIMIT_NOFILE}" 2>/dev/null || true

tmp_log="$(mktemp -t memory-core-watch)"
start_epoch="$(date +%s)"

# Trigger checks one file at a time to avoid overwhelming local AI provider.
files=()
while IFS= read -r file; do
  files+=("${file}")
done < <(git ls-files 'src/**/*.ts')
WATCH_SECONDS="${MEMORY_WATCH_SECONDS:-$(( ${#files[@]} + 10 ))}"

echo "Starting memory-core watch on src/ for ${WATCH_SECONDS}s..."
memory-core watch --path src --verbose >"${tmp_log}" 2>&1 &
watch_pid=$!

cleanup() {
  if kill -0 "${watch_pid}" >/dev/null 2>&1; then
    kill "${watch_pid}" >/dev/null 2>&1 || true
    wait "${watch_pid}" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

sleep 2

for file in "${files[@]}"; do
  if [ -f "${file}" ]; then
    touch "${file}"
    sleep "${FILE_DELAY_SECONDS}"
  fi
done

sleep "${WATCH_SECONDS}"
cleanup
trap - EXIT INT TERM

echo "Watch log: ${tmp_log}"
echo "Latest memory-core stats:"
memory-core stats || true

if [ -f "./scripts/memory-violations-report.mjs" ]; then
  elapsed_seconds="$(( $(date +%s) - start_epoch ))"
  elapsed_minutes="$(( (elapsed_seconds + 59) / 60 ))"
  echo "Recent active violations (scan window):"
  node ./scripts/memory-violations-report.mjs --since-minutes="${elapsed_minutes}" || true
fi
