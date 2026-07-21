// Generate docs/SOURCE_COVERAGE_MATRIX.md from the source registry.
// Regenerate after every verification or ingest pass — never hand-edit the output.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const reg = JSON.parse(readFileSync("src/data/sourceRegistry.json", "utf8"));
const pilotPath = "sources/pilot/manifest.tsv";
const pilot = existsSync(pilotPath)
  ? readFileSync(pilotPath, "utf8").trim().split("\n").slice(1).filter(Boolean).length
  : 0;

const ACCESS_LABEL = {
  reachable: "reachable",
  blocked: "blocked (403)",
  server_error: "server error (5xx)",
  unreachable: "no response",
  not_found: "not found (4xx)",
  unverified: "unverified",
};

const count = (pred) => reg.sources.filter(pred).length;
const tally = (key) =>
  reg.sources.reduce((a, s) => ((a[s[key]] = (a[s[key]] || 0) + 1), a), {});

const rows = (obj, label) =>
  Object.entries(obj)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => `| ${label(k)} | ${v} |`)
    .join("\n");

const esc = (s) => String(s).replace(/\|/g, "\\|");

const table = reg.sources
  .slice()
  .sort((a, b) => a.tier - b.tier || a.source_family.localeCompare(b.source_family) || a.source_id.localeCompare(b.source_id))
  .map(
    (s) =>
      `| ${s.source_id} | ${s.tier} | ${esc(s.source_family)} | ${esc(s.authority)} | ${
        ACCESS_LABEL[s.accessibility] || s.accessibility
      } | ${s.automation_allowed === null ? "unknown" : s.automation_allowed ? "yes" : "no"} | ${
        s.acquisition_mode || "—"
      } | ${s.fetched ? "yes" : "no"} |`,
  )
  .join("\n");

const md = `# Source Coverage Matrix

**Generated:** ${reg.verification?.last_checked_at || reg.generated} by \`scripts/source_coverage_matrix.mjs\`.
**Do not hand-edit** — regenerate from \`src/data/sourceRegistry.json\` after each verification or ingest pass.

This matrix records **what has been checked**, not what has been read. A source listed
as *reachable* means an HTTP request to its index URL returned 200 on the date shown.
It does **not** mean the source has been fetched, parsed, or used as evidence for any
claim in this project. Those states are tracked separately in the \`fetched\` / \`parsed\`
/ \`indexed\` / \`linked\` flags, and are currently ${count((s) => s.fetched) === 0 ? "**false for every registry entry**" : `true for ${count((s) => s.fetched)} entries`}.

## Totals

| Measure | Count |
|---|---|
| Sources in registry | ${reg.sources.length} |
| Reachable (HTTP 200) | ${count((s) => s.accessibility === "reachable")} |
| Not reachable | ${count((s) => s.accessibility !== "reachable")} |
| Automation permitted by robots.txt | ${count((s) => s.automation_allowed === true)} |
| Automation forbidden by robots.txt | ${count((s) => s.automation_allowed === false)} |
| Robots policy unknown | ${count((s) => s.automation_allowed === null)} |
| Eligible for automated acquisition | ${count((s) => s.acquisition_mode === "automated")} |
| Manual-acquisition queue | ${count((s) => s.acquisition_mode === "manual")} |
| Documents actually fetched (pilot ingest) | ${pilot} |

### By accessibility

| Accessibility | Sources |
|---|---|
${rows(tally("accessibility"), (k) => ACCESS_LABEL[k] || k)}

### By tier

| Tier | Sources |
|---|---|
${rows(tally("tier"), (k) => `Tier ${k}`)}

### By family

| Family | Sources |
|---|---|
${rows(tally("source_family"), (k) => k)}

## Method

Each index URL was requested with \`curl -L\` and a desktop user-agent, with a 25-second
timeout; every failure was re-checked with a 60-second timeout and a trailing-slash
variant (\`scripts/recheck_sources.sh\`). Only the status code and content type were
recorded — no page content was scraped in the verification pass.

\`robots.txt\` was fetched once per origin (\`scripts/fetch_robots.sh\`) and evaluated
against the \`User-agent: *\` group, longest matching path wins. Sites that answer
\`/robots.txt\` with an HTML page and a 200 status are recorded as **unknown**, not as
permission. A genuine 404 is recorded as *no restrictions published*.

A source is marked \`acquisition_mode: automated\` only when it is both reachable and
permitted by robots.txt. Everything else goes to the manual queue in
\`docs/SOURCE_MANUAL_QUEUE.json\`; see \`docs/SOURCE_ACQUISITION_PLAN.md\`.

## Full matrix

| Source ID | Tier | Family | Authority | Accessibility | Robots allows | Mode | Fetched |
|---|---|---|---|---|---|---|---|
${table}
`;

writeFileSync("docs/SOURCE_COVERAGE_MATRIX.md", md);
console.log(`wrote docs/SOURCE_COVERAGE_MATRIX.md (${reg.sources.length} sources)`);
