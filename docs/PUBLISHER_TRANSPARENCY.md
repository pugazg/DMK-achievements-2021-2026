# Publisher Transparency

**Status: INCOMPLETE — this document is a launch blocker.**

Every field marked `[NOT YET DECIDED]` must be filled in by the project owner
before this artefact is published. **Nothing in this file has been invented or
inferred**; where the answer is not known it says so.

This matters more here than it would for most software. This is a politically
charged artefact about an elected government's record, published during that
government's term. A reader cannot weigh the material without knowing who made
it, why, and who paid for it. An anonymous evidence explorer about a political
party's performance invites the assumption that it is campaign material —
whether or not it is.

---

## 1. Publisher / maintainer

| Field | Value |
|---|---|
| Publishing individual or organisation | `[NOT YET DECIDED]` |
| Legal entity, if any | `[NOT YET DECIDED]` |
| Country of publication | `[NOT YET DECIDED]` |
| Contact for corrections | `[NOT YET DECIDED]` |
| Editorial responsibility | `[NOT YET DECIDED]` — who decides what goes in and what comes out |

## 2. Purpose

| Field | Value |
|---|---|
| Stated purpose | `[NOT YET DECIDED]` |
| Intended audience | `[NOT YET DECIDED]` |
| Is this advocacy, journalism, research, or civic reference? | `[NOT YET DECIDED]` |

**What can be stated factually today**, independent of the answer above: the
artefact is a searchable, source-linked index of what the Tamil Nadu government
published about its own 2021–2026 record. It reproduces government claims with an
evidence grade attached. It does not verify them.

## 3. Political affiliation

| Field | Value |
|---|---|
| Affiliation with DMK or any party | `[NOT YET DECIDED]` |
| Affiliation with any government body | `[NOT YET DECIDED]` |
| Affiliation with any campaign or PAC-equivalent | `[NOT YET DECIDED]` |
| Any contributor's political role | `[NOT YET DECIDED]` |

**This field cannot be left blank at publication.** "No affiliation" is a valid
answer and must be stated explicitly if true. Silence will be read as
concealment.

**Observable from the artefact itself:** the source material is predominantly the
government's own publications; the framing sections ("The Method", the Dravidian
arc narrative, the rising-sun visual identity) are editorial and sympathetic in
tone. A reader is entitled to know whether that reflects an affiliation.

## 4. Funding

| Field | Value |
|---|---|
| Funding source(s) | `[NOT YET DECIDED]` |
| Any government funding | `[NOT YET DECIDED]` |
| Any party or campaign funding | `[NOT YET DECIDED]` |
| Paid contributors | `[NOT YET DECIDED]` |
| Hosting costs and who bears them | `[NOT YET DECIDED]` |

If the project is entirely unfunded and volunteer-built, say exactly that.

## 5. Methodology

Unlike the sections above, this is **already documented** and needs no decision —
only linking from the published page:

| Topic | Document |
|---|---|
| How evidence is graded (A–F, capped at D) | [`EVIDENCE_MODEL.md`](EVIDENCE_MODEL.md) |
| Why the claim tool never returns a verdict | [`CLAIM_SEARCH_LIMITATIONS.md`](CLAIM_SEARCH_LIMITATIONS.md) |
| Where manifesto statuses come from | [`MANIFESTO_ASSESSMENT_METHODOLOGY.md`](MANIFESTO_ASSESSMENT_METHODOLOGY.md) |
| Data corrections and what was deliberately not corrected | [`DATA_QUALITY_REPORT.md`](DATA_QUALITY_REPORT.md) |
| Which sources exist and which were actually retrieved | [`SOURCE_COVERAGE_MATRIX.md`](SOURCE_COVERAGE_MATRIX.md) |
| What the evidence cannot currently support | [`EVIDENCE_REMEDIATION_QUEUE.md`](EVIDENCE_REMEDIATION_QUEUE.md) |
| Known gaps requiring RTI or manual work | [`RTI_GAP_REGISTER.md`](RTI_GAP_REGISTER.md) |

## 6. Source selection policy

**Currently in force** (from the remediation brief, already enforced in code):

- Primary sources are the Tamil Nadu government's own published record: the
  2021–26 achievements souvenir, minister-by-minister volumes, the Economic
  Survey, the Government Gazette, Government Orders, and the Assembly's
  published sitting index.
- The manifesto tracker is an **external** source, reproduced and labelled as
  such — not this project's own assessment.
- No source is recorded as reviewed unless a document was actually fetched and
  hashed. 0 of 108 catalogued sources have been ingested.
- `robots.txt`, CAPTCHA and terms of service are respected. Blocked sources go
  to a manual queue; no bypass is built.
- Quoted source text is preserved verbatim, OCR defects included, so it can be
  matched against the original PDF.

**Not yet decided:**

| Field | Value |
|---|---|
| Policy on including critical or contrary sources | `[NOT YET DECIDED]` |
| Policy on opposition-party or press claims | `[NOT YET DECIDED]` |
| Who adjudicates a disputed record | `[NOT YET DECIDED]` |
| Whether adverse findings (e.g. CAG criticism) will be given equal prominence | `[NOT YET DECIDED]` |

The last row is the most consequential. An explorer that ingests the
government's achievements but not the audit findings against them is not
neutral, however accurately it reproduces each individual claim.

## 7. Limitations

Stated in full in the [README](../README.md) and reproduced here because a
transparency statement that omits them is not transparent:

- **Nothing in this artefact is independently verified.** No record is graded
  above D (sanctioned); 376 of 438 are grade E (government-reported only).
- **247 of 438 records carry no page reference** back to their source volume and
  cannot be spot-checked by a reader.
- **The "400 fulfilled" manifesto headline is an external tracker's judgement.**
  By this project's own evidence, 0 promises are outcome-verified, 79 have a
  linked Government Order or Act, and 158 have nothing linked at all.
- **The claim tool is retrieval, not fact-checking.** It never returns a verdict.
- **The corpus is English.** Only 20 of 438 records carry a Tamil scheme name, so
  Tamil-language search coverage is partial and is reported as a coverage limit
  rather than an absence of evidence.
- **100 of 138 Assembly sittings are unmeasured**, and the Assembly site's
  `robots.txt` forbids the crawl that would close the gap.
- **No independent or contrary evidence has been ingested.**

## 8. Licence

| Field | Value |
|---|---|
| Code licence | `[NOT YET DECIDED]` |
| Data/content licence | `[NOT YET DECIDED]` |
| Attribution required of reusers | `[NOT YET DECIDED]` |
| Rights position on quoted government material | `[NOT YET DECIDED]` — Indian government publications and gazettes carry their own terms; this needs checking before redistribution, not assuming |

## 9. Corrections and change log

**Already in force:** corrections are logged per record ID in
[`CHANGELOG.md`](../CHANGELOG.md) and in `docs/migration_*.json`. Record IDs are
stable and never reused.

| Field | Value |
|---|---|
| How a reader reports an error | `[NOT YET DECIDED]` — needs a real contact route |
| Target response time | `[NOT YET DECIDED]` |
| Whether corrections are announced or made silently | `[NOT YET DECIDED]` |

## 10. Pre-publication checklist

- [ ] Every `[NOT YET DECIDED]` above resolved
- [ ] Political affiliation stated explicitly, including if it is "none"
- [ ] Funding stated explicitly, including if it is "none"
- [ ] Licence chosen and applied
- [ ] A working contact route for corrections
- [ ] This document linked from the site footer, not just the repository
- [ ] Policy decided on contrary and adverse evidence (§6)

Until these are done the correct classification remains **internal beta**; see
[`RELEASE_CHECKLIST.md`](RELEASE_CHECKLIST.md).
