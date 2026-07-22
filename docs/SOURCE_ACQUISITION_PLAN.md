# Source Acquisition Plan

**Status:** architecture and registry complete; bulk ingestion **not started**.
**Registry:** `src/data/sourceRegistry.json` (108 sources) ·
**Matrix:** `docs/SOURCE_COVERAGE_MATRIX.md` ·
**Manual queue:** `docs/SOURCE_MANUAL_QUEUE.json` (40 sources)

---

## Where this actually stands

Be precise about this, because it is the easiest thing in the project to
overstate:

| | Count |
|---|---|
| Sources catalogued in the registry | 108 |
| Sources whose index URL has been **checked** (HTTP status only) | 108 |
| Sources **fetched** (any document retrieved) | 0 |
| Pilot documents retrieved and hashed | 10 |

The pilot proved the ingest path works end to end — fetch, size, sha256,
content-type, manifest row (`sources/pilot/manifest.tsv`). It is not coverage.
**No claim in the app is currently backed by a document from this pipeline.**

## Ground rules

1. **Nothing counts as reviewed unless it was actually fetched** and recorded in a
   manifest with its hash. A source appearing in the registry means it exists,
   not that anyone has read it.
2. **Respect robots.txt, CAPTCHA and terms of service.** Blocked sources go to the
   manual queue. Do not build a bypass; a transparency project that scrapes
   around a site's stated policy has undermined its own argument.
3. **Record provenance at fetch time** — URL, timestamp, HTTP status, sha256,
   content-type. Retrospective provenance is not provenance.
4. **A fetched document is not evidence** until it has been read and linked to a
   record with a stage and authority class (`docs/EVIDENCE_MODEL.md`).

## Compliance findings from the verification pass

`robots.txt` was read for all 60 distinct origins. Three sources are explicitly
disallowed:

| Source | Host | Rule |
|---|---|---|
| `tnla-legacy` | assembly.tn.gov.in | `User-agent: * / Disallow: /` |
| `tnla-debates` | assembly.tn.gov.in | `User-agent: * / Disallow: /` |
| `tn-opendata` | tn.data.gov.in | `User-agent: * / Disallow: /` |

**This has a direct consequence for the Debates section.** The Assembly site
publishes a blanket disallow, so the outstanding work to measure the remaining
100 of 138 sittings **must not be done by crawling**. The 38 measured sittings
already in `src/data/debates.js` predate this check. The 138 links themselves are
ordinary outbound links to official pages and are unaffected — linking is not
crawling. Any extension of the measured set needs either a manual process or
permission from the Assembly.

The pilot ingest fetched one page from that host (`tnla_debates_menu.html`)
before robots.txt had been checked. It is a single index page, not a crawl, but
it should not be repeated, and no further automated retrieval from that host
should happen.

A further 30 sources have **unknown** automation status: their `/robots.txt`
returns HTTP 200 with an HTML page (a soft 404). Unknown is recorded as unknown —
it is not treated as permission.

## Manual queue (40 sources)

| Reason | Count | Sources |
|---|---|---|
| Robots policy unreadable (soft-404) | 21 | spc-* (7), tn-sdg (3), rbi-states, mospi, hmis, jjm, pmay-mis, tidel (2), tnhb (2), tnpdcl, tnerc |
| HTTP 500 — host up but erroring | 6 | des-pubs, des-index, des-handbook, des-glance, des-crops, des-income |
| No response (60s, both URL forms) | 7 | aishe-dash, paimana-dash, paimana, elcot, tnrdc, tnrdc-rti, egazette |
| HTTP 403 — blocked | 3 | eci-manifesto, adb-tnhousing, eci-results |
| Disallowed by robots.txt | 3 | tnla-legacy, tnla-debates, tn-opendata |

Notes:

- The six **DES** (Directorate of Economics & Statistics) pages moved from
  timeout to HTTP 500 on the 60-second re-check. The host resolves and answers;
  the application errors. Worth re-checking periodically — this is the single
  most valuable blocked cluster, since DES is the state's own statistical
  authority and the natural independent counter for grade-A/B evidence.
- The **403** sources are reachable in a normal browser. Retrieve them by hand.
- **egazette / elcot / tnrdc / paimana / aishe-dash** did not respond at all.
  Several are known JS-only or dashboard-style portals with no static endpoint.

## Priority order for actual ingestion

Priorities 1–14 from the remediation brief, in the order that would most improve
the evidence grades:

1. **Finance** — budget speeches, revised estimates, actuals. Converts "announced"
   into "allocated", and allocation into *spent*. Highest value per document.
2. **Policy notes** — department-wise, annual. The bridge between a scheme name
   and its administrative reality.
3. **CAG audit reports** — the only `independent_official` / `audit` authority in
   the registry, and therefore the only route to grade A.
4. **Assembly** — questions and committee reports. Note the robots constraint above.
5. **Gazette** — already partially embedded (788 GOs); extend coverage.
6. **Press releases** — useful for dating announcements, weak as evidence (E).
7. **Tenders** — the execution-stage evidence that grade C requires.
8. **Statistics** (DES, MoSPI, NITI) — outcome data. Currently mostly blocked.
9. **Union cross-checks** — central dashboards reporting the same schemes, which
   makes them independent counters.
10. **Local bodies** · 11. **PSUs** · 12. **Regulators** · 13. **Courts** ·
    14. **RTI** — see `docs/RTI_GAP_REGISTER.md`.

## The 247 page-less records

247 of 438 records carry `page: null` — no page reference back to the source
volume, so a reader cannot spot-check them. This is the largest provenance gap in
the project and is independent of the source pipeline: it needs the souvenir and
minister-by-minister volumes re-checked page by page.

The queue is emitted as `docs/remediation_queue.json` (`npm run remediation-queue`),
ordered by leverage: **27** of the 247 already have a Government Order or Act
behind them and can be resolved from that document; **5** are mixed-status records
needing their components split first; the remaining **215** need the printed
souvenir or minister-by-minister volume re-checked page by page.
