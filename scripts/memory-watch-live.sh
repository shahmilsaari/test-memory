#!/usr/bin/env bash
set -euo pipefail

# Prevent chokidar EMFILE failures on macOS when many files are open.
ulimit -n "${MEMORY_ULIMIT_NOFILE:-65536}" 2>/dev/null || true

exec memory-core watch --path src --verbose
