# RTI Gap Register

**Purpose:** record the questions this dataset **cannot** answer from published
sources, so that the gaps are visible rather than papered over — and so anyone
willing to file a Right to Information request knows exactly what to ask for.

**Status:** register defined; **no RTI request has been filed by this project.**

---

## Why this document exists

The audit's central finding was that the project presented government-reported
claims as verified facts. Much of the missing verification is not merely
un-fetched — it is **not published anywhere**. Expenditure against sanction,
beneficiary lists, completion certificates and physical-progress records are
routinely absent from state portals.

Where a gap can be closed by fetching a document, it belongs in
`docs/SOURCE_ACQUISITION_PLAN.md`. Where it cannot, it belongs here.

## Structural gaps

These are the classes of evidence the ladder in `docs/EVIDENCE_MODEL.md` needs
and the published record does not supply.

| # | Gap | Blocks grade | What to request |
|---|---|---|---|
| G1 | **Expenditure against sanction.** GOs give the sanctioned amount; actual spend is not published per scheme. | B | Scheme-wise released vs utilised amounts, FY2021-22 to FY2025-26, from the administrative department. |
| G2 | **Beneficiary counts, verifiable.** Headline counts appear in the souvenir with no underlying return. | B | District-wise beneficiary counts with the date and method of compilation. |
| G3 | **Physical progress / completion.** Infrastructure records assert completion without a certificate. | C | Work completion certificates or progress reports for named works. |
| G4 | **Tender-to-award trail.** Tender portals expose live tenders; historical award data is thin. | C | Award details for the works underlying a given scheme record. |
| G5 | **Baseline figures.** Many claims are stated as a level with no "before". | A | The corresponding figure for the year prior to the scheme's start. |
| G6 | **Outcome measurement.** Almost nothing in the corpus is measured by a body other than the implementing department. | A | Independent evaluations, third-party assessments, or the DES series behind a claim. |
| G7 | **Mixed-status programmes.** 6 records mix delivered and planned components (`mixedStatus: true`). | — | Component-wise status with dates for each. |
| G8 | **Page-level provenance.** 247 of 438 records have `page: null`. | — | Not an RTI matter — needs the source volumes re-checked by hand. |

## Dataset-specific gaps

| # | Gap | Detail |
|---|---|---|
| D1 | **Manifesto assessment is external.** All 505 statuses mirror the Pudhiyavan tracker; none is independently verified. | `docs/MANIFESTO_ASSESSMENT_METHODOLOGY.md` |
| D2 | **Promise→GO coverage is 8%.** 41 links across 38 of 505 promises. Absence of a link means nothing has been located. | `src/data/promiseGoLinks.js` |
| D3 | **100 of 138 Assembly sittings unmeasured.** Page and word counts exist for 38. The site's robots.txt forbids crawling, so this cannot be closed automatically. | `docs/SOURCE_ACQUISITION_PLAN.md` |
| D4 | **3,501 catalogued GOs vs 186 embedded.** The archive count is a catalogue total, not content held here. | Labelled as such in the UI. |
| D5 | **No record dates below year granularity** for many entries, so pace and sequencing claims are unsupported. | |

## Blocked statistical sources

Three of the gaps above (G5, G6) would be substantially closed by the state's own
statistical publications — which are currently unreachable. The six DES endpoints
return HTTP 500, and the AISHE and PAI dashboards do not respond. Until those are
retrieved (by hand if necessary), independent verification of outcome claims is
not possible from published sources, and grades A and B remain unreachable.

## Filing notes

If RTI requests are filed against this register:

- Address each to the **administrative department** named in the relevant GO, not
  to a general grievance cell.
- Quote the **G.O. number and date** from `src/data/govorders.js`; it is the
  strongest anchor for a specific, answerable request.
- Ask for **documents held**, not for opinions or explanations — the Act obliges
  disclosure of records, not the drafting of narratives.
- Log every request and response here with its date and reference number, and
  record the outcome in `CHANGELOG.md` when it changes a record or a grade.

**No requests have been filed.** This section is a template, not a log.
