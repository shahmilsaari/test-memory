#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const statsPath = path.resolve('.memory-core-stats.json');

if (!fs.existsSync(statsPath)) {
  console.error('Missing .memory-core-stats.json');
  process.exit(1);
}

const args = process.argv.slice(2);
const includeDist = args.includes('--include-dist');
const includeDeleted = args.includes('--include-deleted');
const jsonOutput = args.includes('--json');

const sinceMinutesArg = args.find((arg) => arg.startsWith('--since-minutes='));
const sinceMinutes = sinceMinutesArg
  ? Number(sinceMinutesArg.split('=')[1])
  : undefined;
const sinceTime =
  Number.isFinite(sinceMinutes) && sinceMinutes >= 0
    ? Date.now() - sinceMinutes * 60_000
    : undefined;

const raw = fs.readFileSync(statsPath, 'utf8');
const stats = JSON.parse(raw);
const violations = Array.isArray(stats.recentViolations) ? stats.recentViolations : [];

const filtered = violations.filter((item) => {
  const file = typeof item.file === 'string' ? item.file : '';
  if (!file) return false;

  if (!includeDist && !file.startsWith('src/')) return false;

  if (!includeDeleted) {
    const absoluteFile = path.resolve(file);
    if (!fs.existsSync(absoluteFile)) return false;
  }

  if (sinceTime !== undefined) {
    const ts = Date.parse(item.timestamp ?? '');
    if (!Number.isFinite(ts) || ts < sinceTime) return false;
  }

  return true;
});

const deduped = [];
const seen = new Set();

for (const item of filtered) {
  const key = [item.file, item.rule, item.line, item.issue].join('::');
  if (seen.has(key)) continue;
  seen.add(key);
  deduped.push(item);
}

const byFile = new Map();
for (const item of deduped) {
  const file = item.file;
  if (!byFile.has(file)) {
    byFile.set(file, {
      file,
      count: 0,
      latest: item.timestamp ?? '',
      rules: new Set(),
    });
  }

  const row = byFile.get(file);
  row.count += 1;
  row.rules.add(item.rule ?? 'unknown rule');
  if ((item.timestamp ?? '') > row.latest) row.latest = item.timestamp ?? '';
}

const files = Array.from(byFile.values())
  .map((row) => ({
    ...row,
    rules: Array.from(row.rules).sort(),
  }))
  .sort((a, b) => b.count - a.count || b.latest.localeCompare(a.latest));

const result = {
  files,
  totalFiles: files.length,
  totalViolations: deduped.length,
};

if (jsonOutput) {
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  process.exit(0);
}

console.log(`Files with violations: ${result.totalFiles}`);
console.log(`Distinct violations: ${result.totalViolations}`);
if (sinceTime !== undefined) {
  console.log(`Window: last ${sinceMinutes} minute(s)`);
}

for (const row of result.files) {
  const ruleList = row.rules.slice(0, 3).join(' | ');
  const extra = row.rules.length > 3 ? ` (+${row.rules.length - 3} more)` : '';
  console.log(`- ${row.file} (${row.count})`);
  console.log(`  latest: ${row.latest || 'n/a'}`);
  console.log(`  rules: ${ruleList}${extra}`);
}
