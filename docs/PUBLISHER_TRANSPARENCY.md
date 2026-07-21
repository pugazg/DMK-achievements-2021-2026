# Publisher Transparency

**Status: COMPLETE.** Every field below is stated. Nothing has been inferred or
invented; where something is genuinely unknown or not yet done, it says so.

**Last updated:** 21 July 2026 · **Methodology version:** 1.0

This matters more here than it would for most software. This is a politically
charged artefact about an elected government's record, published during that
government's term. A reader cannot weigh the material without knowing who made
it, why, and who paid for it.

---

## 1. Project identity

| Field | Value |
|---|---|
| Project name | **The Dravidian Model · Tamil Nadu 2021–2026** |
| Maintainer | **Pugazhendhi R** |
| Contact | GitHub issues on the repository below — the correction route is [`CORRECTIONS.md`](CORRECTIONS.md) |
| Repository | https://github.com/pugazg/DMK-achievements-2021-2026 |
| Editorial responsibility | Pugazhendhi R. One maintainer decides what is included, how it is graded, and what is corrected. There is no editorial board and no second reviewer. |
| Country of publication | India |

**On single-maintainer editorial control:** this is a real limitation, not a
formality. Every inclusion and grading decision passes through one person. The
mitigation is that the rules are written down in advance
([`METHODOLOGY.md`](METHODOLOGY.md), [`EVIDENCE_MODEL.md`](EVIDENCE_MODEL.md)),
enforced by automated checks where possible, and every correction is logged with
a record ID. It is not a substitute for independent review.

## 2. Purpose

**What this project does.** It is an **evidence explorer of publicly available
records**. It collects what the Tamil Nadu government published about its own
2021–2026 record — achievement summaries, Government Orders, gazetted
legislation, Assembly sitting indexes, and the 2021 manifesto — makes it
searchable, links each item to its source document, and attaches an explicit
evidence grade describing how well supported it is.

**What this project does not do:**

- It is **not an official government publication** and has no government
  endorsement.
- It does **not independently certify** the claims it holds. No record is graded
  above **D** (sanctioned); 376 of 438 are grade **E** (government-reported
  only). See [`EVIDENCE_MODEL.md`](EVIDENCE_MODEL.md).
- It is **not a fact-checking platform**. The claim lookup retrieves records that
  may relate to a claim and explains the match. It never returns a verdict —
  structurally, not as a policy choice. See
  [`CLAIM_SEARCH_LIMITATIONS.md`](CLAIM_SEARCH_LIMITATIONS.md).
- It does **not assess the manifesto**. All 505 promise statuses, including the
  "400 fulfilled" headline, are reproduced from an external tracker. See
  [`MANIFESTO_ASSESSMENT_METHODOLOGY.md`](MANIFESTO_ASSESSMENT_METHODOLOGY.md).
- It does **not claim ownership** of any government document.

The honest one-line description: *a searchable, source-linked index of what the
Tamil Nadu government says it did between 2021 and 2026 — not an assessment of
whether it did it.*

## 3. Affiliation disclosure

**This project is independently maintained. It has no political affiliation.**

Stated specifically, so there is nothing to read between the lines:

| | |
|---|---|
| Affiliation with DMK | **None.** No membership, office, employment, volunteering or commissioned work. |
| Affiliation with any other political party | **None.** |
| Affiliation with any government body | **None.** The project has no official standing and was not requested, reviewed or approved by any department. |
| Affiliation with any campaign organisation | **None.** |
| Commissioned by anyone | **No.** |
| Independently maintained | **Yes** — by one individual, on their own initiative. |

**Motivation and perspective.** The project began as a personal interest in
making the Tamil Nadu government's published record searchable in one place,
rather than scattered across portals and PDFs. That is a civic-reference
motivation, not a campaign one.

A reader should still know two things about the perspective:

1. **The source material is one-sided by construction.** It is drawn almost
   entirely from the government's own publications, because that is what is
   published in bulk. No opposition material, press criticism or audit finding
   has been ingested. An explorer built only from a government's own account of
   itself will reflect that account, however carefully each item is labelled.
   This is the project's most significant editorial limitation and it is
   tracked in [`SOURCE_ACQUISITION_PLAN.md`](SOURCE_ACQUISITION_PLAN.md).
2. **Some framing is editorial and sympathetic in tone.** The "The Method"
   section and the rising-sun visual identity are presentational choices, not
   data. They are not neutral. The data sections and the evidence grades are
   held to the rules in [`METHODOLOGY.md`](METHODOLOGY.md); the narrative
   framing is not, and should be read as the maintainer's presentation.

## 4. Funding

| Field | Value |
|---|---|
| Funding model | **Self-funded.** Built and maintained by the maintainer at their own cost. |
| Government funding | **None.** |
| Party, campaign or political funding | **None.** |
| Grants or institutional funding | **None.** |
| Advertisements | **None**, and none are planned. |
| Sponsorships | **None.** |
| Donations | **Not accepted.** There is no donation channel. |
| Paid contributors | **None.** All work is unpaid. |
| Hosting costs | Borne by the maintainer. |

If any of this changes — particularly if money from any political source is ever
accepted — this section must be updated **before** that funding is used, not
after.

## 5. Editorial methodology

Full detail is in [`METHODOLOGY.md`](METHODOLOGY.md). In summary:

**Source selection.** Primary sources are the Tamil Nadu government's own
published record: the 2021–26 achievements souvenir and minister-by-minister
volumes, the Economic Survey, the Government Gazette, Government Orders, and the
Assembly's published sitting index. The manifesto tracker is an external source,
reproduced and labelled as such.

**Inclusion criteria.** A record is included if it appears in one of those
published sources and can be stated without inventing a figure, date, amount or
beneficiary count. Nothing is included on the strength of a news report or a
social media claim alone.

**Status classification.** Achievement records carry the government's own status
framing. Where a record's own detail text mixes delivered with planned
components, it is flagged `mixedStatus: true` rather than being silently
presented as complete. Manifesto statuses are the external tracker's, not this
project's.

**Evidence grading.** An A–F ladder, described in
[`EVIDENCE_MODEL.md`](EVIDENCE_MODEL.md) and [`METHODOLOGY.md`](METHODOLOGY.md).
Automatic grading is capped at **D** and this is enforced by `npm run validate`,
not by convention.

**Correction process.** [`CORRECTIONS.md`](CORRECTIONS.md). Every applied change
is logged with its record ID in [`CHANGELOG.md`](../CHANGELOG.md) and the
`docs/migration_*.json` files. Record IDs are stable and never reused. Text
quoted from a gazette or Government Order is preserved verbatim — including OCR
defects — so a reader can match it against the original PDF.

**Version history.** Three versions are tracked separately: the application
build, the data cut-off, and the methodology version. Current values are shown
in the interface and in §8 below.

## 6. Limitations

Stated in full because a transparency statement that omits them is not
transparent.

**Evidence coverage is incomplete.**

- **0 of 438 records are independently verified.** No record is graded above D.
- **376 of 438 (85.8%) are grade E** — government-reported only.
- **192 records are marked complete with no completion evidence** — the "done"
  framing rests on the government's own summary.
- The structured evidence store **does not exist yet**: 0% of records carry a
  source authority, source URL, document title or evidence stage.
  See [`EVIDENCE_REMEDIATION_QUEUE.md`](EVIDENCE_REMEDIATION_QUEUE.md).

**Reliance on government records where independent verification is unavailable.**
For most claims here there is no published independent counter. The state's own
statistical publications (DES) — the natural independent source — are currently
unreachable. Until that changes, grades A and B are unreachable in principle,
not merely unassigned.

**Provenance gaps.**

- **247 of 438 records carry no page reference** to their source volume and
  cannot be spot-checked by a reader.
  Queue: [`remediation_queue.json`](remediation_queue.json).
- **0 of 108 catalogued sources have been ingested.** Ten pilot documents have
  been fetched. No claim in the app is currently backed by that pipeline.

**Missing Tamil metadata.** The corpus is written in English. Only **20 of 438**
records carry a Tamil scheme name, and no record has a Tamil description. Tamil
claim search works for those 20 and reports a coverage limit otherwise — it
never reports a Tamil term as absent from the record when the limitation is the
index. Tamil-language coverage is a genuine gap, not a solved problem.

**Manifesto headline is not independently reproducible.** Against this project's
own evidence, of the 400 promises the external tracker marks fulfilled: 0 are
outcome-verified, 79 have a linked Government Order or Act, 163 have only a
government-reported record, and **158 have nothing linked at all**.

**Records awaiting evidence enrichment.** 192 highest-priority + 26 unspottable +
6 mixed-status records are queued in
[`EVIDENCE_REMEDIATION_QUEUE.md`](EVIDENCE_REMEDIATION_QUEUE.md).

**Other known gaps.** 100 of 138 Assembly sittings are unmeasured and the
Assembly site's `robots.txt` forbids the crawl that would close it; no chart has
a textual data-table equivalent; there has been no testing with real assistive
technology; no contrary or adverse evidence (e.g. CAG findings) has been
ingested.

## 7. Licence

| Scope | Licence |
|---|---|
| Software (`src/`, `scripts/`, `test/`) | **MIT** — see [`LICENSE`](../LICENSE) |
| Data compilation (`src/data/`, generated `docs/`) | **CC BY 4.0** — see [`LICENSE-DATA`](../LICENSE-DATA) |
| Underlying government documents | **Not licensed by this project.** See below. |

**Source-handling policy — no ownership is claimed over government documents.**

Tamil Nadu Government Orders, Gazette notifications, Acts, Bills, Assembly
proceedings, budget papers and the government's published achievement volumes
are the property of their issuing authorities and are governed by their own
terms. This project:

- claims **no ownership** of them and grants **no rights** over them;
- **links to the authority's own copy** of a PDF rather than rehosting it;
- **quotes** subject lines and titles for reference and identification, and
  preserves that text verbatim so it can be matched against the original;
- reproduces the **DMK Election Manifesto 2021** as a party publication, not as
  project content;
- reproduces **manifesto statuses from an external tracker**, which remain that
  tracker's assessment.

Attribution for the compilation, and a request to carry the evidence caveats
with any reuse, are set out in [`LICENSE-DATA`](../LICENSE-DATA).

## 8. Version information

| Version | Value | Meaning |
|---|---|---|
| Release | **2.0.0** | The application build. |
| Data | **2026-07-18** | Cut-off of the underlying record. Nothing published after this date is reflected. |
| Data last updated | **2026-07-21** | Last edit to any dataset or generated document. |
| Methodology | **1.0** | Evidence model, grading rules and claim-lookup behaviour. |
| Release status | **Internal beta** | See [`RELEASE_CHECKLIST.md`](RELEASE_CHECKLIST.md). |

The methodology version is tracked separately because changing it can change
what an existing record *means* without any data changing. Any bump is described
in [`METHODOLOGY.md`](METHODOLOGY.md).

Defined once in `src/lib/version.js` and displayed in the interface.

## 9. Outstanding before public release

Transparency items are now complete. What remains is not a disclosure problem:

- [x] Publisher identity, contact, repository
- [x] Purpose, including what is **not** claimed
- [x] Affiliation disclosure — independent, no affiliation
- [x] Funding — self-funded, no ads, sponsors or donations
- [x] Editorial methodology documented
- [x] Limitations documented
- [x] Licence chosen and applied; government-document policy stated
- [x] Correction process documented
- [x] Version information displayed
- [ ] **No contrary or adverse evidence ingested** (§3, point 1) — the largest
      remaining editorial weakness
- [ ] No independent review of grading decisions
