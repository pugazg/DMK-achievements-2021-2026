# Source Coverage Matrix

**Generated:** 2026-07-21 by `scripts/source_coverage_matrix.mjs`.
**Do not hand-edit** — regenerate from `src/data/sourceRegistry.json` after each verification or ingest pass.

This matrix records **what has been checked**, not what has been read. A source listed
as *reachable* means an HTTP request to its index URL returned 200 on the date shown.
It does **not** mean the source has been fetched, parsed, or used as evidence for any
claim in this project. Those states are tracked separately in the `fetched` / `parsed`
/ `indexed` / `linked` flags, and are currently **false for every registry entry**.

## Totals

| Measure | Count |
|---|---|
| Sources in registry | 108 |
| Reachable (HTTP 200) | 92 |
| Not reachable | 16 |
| Automation permitted by robots.txt | 75 |
| Automation forbidden by robots.txt | 3 |
| Robots policy unknown | 30 |
| Eligible for automated acquisition | 68 |
| Manual-acquisition queue | 40 |
| Documents actually fetched (pilot ingest) | 10 |

### By accessibility

| Accessibility | Sources |
|---|---|
| reachable | 92 |
| no response | 7 |
| server error (5xx) | 6 |
| blocked (403) | 3 |

### By tier

| Tier | Sources |
|---|---|
| Tier 3 | 45 |
| Tier 2 | 33 |
| Tier 1 | 30 |

### By family

| Family | Sources |
|---|---|
| independent | 17 |
| psu | 17 |
| outcome | 10 |
| tender | 8 |
| statistics | 7 |
| assembly | 6 |
| policy_note | 5 |
| gazette | 5 |
| rti | 5 |
| audit | 4 |
| judicial | 4 |
| budget | 3 |
| other | 3 |
| regulator | 3 |
| legislation | 2 |
| manifesto | 2 |
| local_body | 2 |
| electoral | 2 |
| portal | 1 |
| go | 1 |
| press | 1 |

## Method

Each index URL was requested with `curl -L` and a desktop user-agent, with a 25-second
timeout; every failure was re-checked with a 60-second timeout and a trailing-slash
variant (`scripts/recheck_sources.sh`). Only the status code and content type were
recorded — no page content was scraped in the verification pass.

`robots.txt` was fetched once per origin (`scripts/fetch_robots.sh`) and evaluated
against the `User-agent: *` group, longest matching path wins. Sites that answer
`/robots.txt` with an HTML page and a 200 status are recorded as **unknown**, not as
permission. A genuine 404 is recorded as *no restrictions published*.

A source is marked `acquisition_mode: automated` only when it is both reachable and
permitted by robots.txt. Everything else goes to the manual queue in
`docs/SOURCE_MANUAL_QUEUE.json`; see `docs/SOURCE_ACQUISITION_PLAN.md`.

## Full matrix

| Source ID | Tier | Family | Authority | Accessibility | Robots allows | Mode | Fetched |
|---|---|---|---|---|---|---|---|
| tn-announcements | 1 | assembly | Government of Tamil Nadu | reachable | yes | automated | no |
| tnla-debates | 1 | assembly | TN Legislative Assembly | reachable | no | manual | no |
| tnla-legacy | 1 | assembly | TN Legislative Assembly | reachable | no | manual | no |
| tnla-neva | 1 | assembly | TN Legislative Assembly (NeVA) | reachable | yes | automated | no |
| cag-ae | 1 | audit | Pr. AG (A&E) Tamil Nadu | reachable | yes | automated | no |
| cag-ag1 | 1 | audit | CAG (AG1 Tamil Nadu) | reachable | yes | automated | no |
| cag-ag2 | 1 | audit | CAG (AG2 Tamil Nadu) | reachable | yes | automated | no |
| cag-pac | 1 | audit | CAG / PAC-COPU | reachable | yes | automated | no |
| fin-budget-pubs | 1 | budget | TN Finance Department | reachable | yes | automated | no |
| fin-highlights | 1 | budget | TN Finance Department | reachable | yes | automated | no |
| fin-home | 1 | budget | TN Finance Department | reachable | yes | automated | no |
| gz-archives | 1 | gazette | Dept. of Stationery & Printing | reachable | yes | automated | no |
| gz-current | 1 | gazette | Dept. of Stationery & Printing | reachable | yes | automated | no |
| gz-extra | 1 | gazette | Dept. of Stationery & Printing | reachable | yes | automated | no |
| gz-home | 1 | gazette | Dept. of Stationery & Printing | reachable | yes | automated | no |
| tn-go-dept | 1 | go | Government of Tamil Nadu | reachable | yes | automated | no |
| tn-acts | 1 | legislation | Government of Tamil Nadu | reachable | yes | automated | no |
| dmk-home | 1 | manifesto | DMK (party source) | reachable | yes | automated | no |
| dmk-manifesto | 1 | manifesto | DMK (party source) | reachable | yes | automated | no |
| ccfms-statutory | 1 | other | TN Finance (CCFMS) | reachable | yes | automated | no |
| eci-manifesto | 1 | other | Election Commission of India | blocked (403) | unknown | manual | no |
| prs-tnla | 1 | other | PRS Legislative Research | reachable | yes | automated | no |
| fin-policy-notes | 1 | policy_note | TN Finance Department | reachable | yes | automated | no |
| tn-dept-docs | 1 | policy_note | Government of Tamil Nadu | reachable | yes | automated | no |
| tn-portal | 1 | portal | Government of Tamil Nadu | reachable | yes | automated | no |
| tn-press | 1 | press | Government of Tamil Nadu | reachable | yes | automated | no |
| tnt-archive | 1 | tender | TN eProcurement | reachable | yes | automated | no |
| tnt-home | 1 | tender | TN eProcurement | reachable | yes | automated | no |
| tnt-org | 1 | tender | TN eProcurement | reachable | yes | automated | no |
| tnt-status | 1 | tender | TN eProcurement | reachable | yes | automated | no |
| aishe | 2 | independent | AISHE (MoE) | reachable | yes | automated | no |
| aishe-dash | 2 | independent | AISHE | no response | unknown | manual | no |
| aishe-reports | 2 | independent | AISHE | reachable | yes | automated | no |
| hmis | 2 | independent | Union Health Ministry | reachable | unknown | manual | no |
| jjm | 2 | independent | Jal Jeevan Mission | reachable | unknown | manual | no |
| jjm-report | 2 | independent | JJM reporting | reachable | yes | automated | no |
| mospi | 2 | independent | MoSPI | reachable | unknown | manual | no |
| niti-sdg | 2 | independent | NITI Aayog | reachable | yes | automated | no |
| paimana | 2 | independent | MoSPI PAIMANA | no response | unknown | manual | no |
| paimana-dash | 2 | independent | MoSPI PAIMANA | no response | unknown | manual | no |
| pmay-mis | 2 | independent | PMAY MIS | reachable | unknown | manual | no |
| pmay-u | 2 | independent | PMAY-Urban | reachable | yes | automated | no |
| rbi-states | 2 | independent | Reserve Bank of India | reachable | unknown | manual | no |
| startup-rank | 2 | independent | DPIIT | reachable | yes | automated | no |
| udise | 2 | independent | UDISE+ (MoE) | reachable | yes | automated | no |
| udise-archive | 2 | independent | UDISE+ (MoE) | reachable | yes | automated | no |
| spc-es2425 | 2 | outcome | TN State Planning Commission | reachable | unknown | manual | no |
| spc-es2526 | 2 | outcome | TN State Planning Commission | reachable | unknown | manual | no |
| spc-hdr | 2 | outcome | TN State Planning Commission | reachable | unknown | manual | no |
| spc-home | 2 | outcome | TN State Planning Commission | reachable | unknown | manual | no |
| spc-policies | 2 | outcome | TN State Planning Commission | reachable | unknown | manual | no |
| spc-sdg | 2 | outcome | TN State Planning Commission | reachable | unknown | manual | no |
| spc-sif | 2 | outcome | TN State Planning Commission | reachable | unknown | manual | no |
| tn-sdg | 2 | outcome | TN SDG portal | reachable | unknown | manual | no |
| tn-sdg-district | 2 | outcome | TN SDG portal | reachable | unknown | manual | no |
| tn-sdg-state | 2 | outcome | TN SDG portal | reachable | unknown | manual | no |
| des-crops | 2 | statistics | TN DES | server error (5xx) | yes | manual | no |
| des-glance | 2 | statistics | TN DES | server error (5xx) | yes | manual | no |
| des-handbook | 2 | statistics | TN DES | server error (5xx) | yes | manual | no |
| des-income | 2 | statistics | TN DES | server error (5xx) | yes | manual | no |
| des-index | 2 | statistics | TN DES | server error (5xx) | yes | manual | no |
| des-pubs | 2 | statistics | TN Dept. of Economics & Statistics | server error (5xx) | yes | manual | no |
| tn-opendata | 2 | statistics | TN Open Government Data | reachable | no | manual | no |
| ls-questions | 3 | assembly | Lok Sabha | reachable | yes | automated | no |
| rs-questions | 3 | assembly | Rajya Sabha | reachable | yes | automated | no |
| eci-results | 3 | electoral | Election Commission of India | blocked (403) | unknown | manual | no |
| tnsec | 3 | electoral | TN State Election Commission | reachable | yes | automated | no |
| egazette | 3 | gazette | Gazette of India | no response | unknown | manual | no |
| adb-tnhousing | 3 | independent | Asian Development Bank | blocked (403) | yes | manual | no |
| hc-madras | 3 | judicial | Madras High Court | reachable | yes | automated | no |
| ngt | 3 | judicial | National Green Tribunal | reachable | yes | automated | no |
| ngt-orders | 3 | judicial | NGT | reachable | yes | automated | no |
| sc-judgments | 3 | judicial | Supreme Court of India | reachable | yes | automated | no |
| indiacode | 3 | legislation | India Code | reachable | yes | automated | no |
| gcc | 3 | local_body | Greater Chennai Corporation | reachable | yes | automated | no |
| gcc-council | 3 | local_body | GCC | reachable | yes | automated | no |
| tnhb-policy | 3 | policy_note | TN Housing Board | reachable | unknown | manual | no |
| tnpcb-policy | 3 | policy_note | TN Pollution Control Board | reachable | yes | automated | no |
| twad-policy | 3 | policy_note | TWAD Board | reachable | yes | automated | no |
| cmwssb | 3 | psu | CMWSSB | reachable | yes | automated | no |
| cmwssb-balance | 3 | psu | CMWSSB | reachable | yes | automated | no |
| elcot | 3 | psu | ELCOT | no response | unknown | manual | no |
| sipcot-annual | 3 | psu | SIPCOT | reachable | yes | automated | no |
| sipcot-reports | 3 | psu | SIPCOT | reachable | yes | automated | no |
| tidco-policy | 3 | psu | TIDCO | reachable | yes | automated | no |
| tidco-reports | 3 | psu | TIDCO | reachable | yes | automated | no |
| tidel | 3 | psu | TIDEL Park | reachable | unknown | manual | no |
| tidel-about | 3 | psu | TIDEL Park | reachable | unknown | manual | no |
| tnhb | 3 | psu | TN Housing Board | reachable | unknown | manual | no |
| tnmsc | 3 | psu | TN Medical Services Corp | reachable | yes | automated | no |
| tnmsc-policy | 3 | psu | TNMSC | reachable | yes | automated | no |
| tnpdcl | 3 | psu | TN Power Distribution Corp | reachable | unknown | manual | no |
| tnrdc | 3 | psu | TN Road Development Co | no response | unknown | manual | no |
| tnstc | 3 | psu | TNSTC/SETC | reachable | yes | automated | no |
| tnuhdb | 3 | psu | TNUHDB | reachable | yes | automated | no |
| twad | 3 | psu | TWAD Board | reachable | yes | automated | no |
| tn-rera | 3 | regulator | TN RERA | reachable | yes | automated | no |
| tnerc | 3 | regulator | TNERC | reachable | unknown | manual | no |
| tnpcb | 3 | regulator | TNPCB | reachable | yes | automated | no |
| rti-central | 3 | rti | Central RTI Online | reachable | yes | automated | no |
| rti-tn | 3 | rti | TN RTI Online | reachable | yes | automated | no |
| tn-rti-info | 3 | rti | Government of Tamil Nadu | reachable | yes | automated | no |
| tnrdc-rti | 3 | rti | TNRDC | no response | unknown | manual | no |
| tnsic | 3 | rti | TN State Information Commission | reachable | yes | automated | no |
| cmwssb-tenders | 3 | tender | CMWSSB | reachable | yes | automated | no |
| gcc-tenders | 3 | tender | GCC | reachable | yes | automated | no |
| tidco-tenders | 3 | tender | TIDCO | reachable | yes | automated | no |
| tnmsc-tenders | 3 | tender | TNMSC | reachable | yes | automated | no |
