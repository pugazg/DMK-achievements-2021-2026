# Corrections

**If you find an error, please report it.** This project holds 438 achievement
records, 505 promises, 222 legislative entries and 974 Government Order
references, transcribed and cross-linked by one person. Errors exist.

**Methodology version 1.0** · Last updated 21 July 2026

---

## How to submit a correction

Open an issue on the repository:

**https://github.com/pugazg/DMK-achievements-2021-2026/issues**

Title it `Correction: <record ID or section>` and include the five fields below.
A correction with a source reference is acted on quickly; one without takes much
longer, because it has to be researched from scratch.

### What to include

**1. Issue type** — pick the closest:

| Type | Use when |
|---|---|
| `factual-error` | A figure, date, amount, name or beneficiary count is wrong. |
| `wrong-source` | The record cites or links the wrong document. |
| `broken-link` | A PDF or source URL no longer resolves. |
| `misleading-framing` | The figure is right but the presentation overstates it. |
| `grade-dispute` | You believe the evidence grade is too high or too low. |
| `missing-context` | Something true but materially incomplete. |
| `contrary-evidence` | You have a document that contradicts a record — **especially wanted**, see below. |
| `duplicate` | Two records describe the same thing. |
| `transcription` | Text does not match the source document. |
| `accessibility` | Something is unusable with a keyboard or screen reader. |
| `other` | Anything else. |

**2. Record ID** — the stable identifier, e.g. `rur_b2_housing`, promise `#162`,
`Bill-6-2026`, or a G.O. number. IDs never change, so they are the reliable way
to point at something. If you cannot find one, quote the exact on-screen text.

**3. Source reference** — what should the record say, and what document says so?
A G.O. number and date, a gazette issue, an Act number, a page in a published
volume, or a URL. **This is the field that matters most.** This project does not
correct one unsourced claim with another.

**4. Explanation** — what is wrong and what it should be. If a number is wrong,
give both the current and the correct value.

**5. Your basis** *(optional)* — how you know. Useful, never required. Anonymous
reports with a good source reference are entirely welcome.

### Template

```
Issue type:       factual-error
Record ID:        rur_b2_housing
Current text:     "<what it says now>"
Should say:       "<what it should say>"
Source reference: G.O. (Ms) No. 123, Rural Development Dept, 14-03-2023
                  https://www.tn.gov.in/...
Explanation:      The record states X beneficiaries; the G.O. sanctions Y.
```

## Contrary evidence is especially wanted

The most useful correction is a **document that contradicts a record**.

This project's sources are almost entirely the government's own publications,
because that is what is published in bulk. No audit findings, opposition
material or press criticism have been ingested. That is the largest editorial
weakness here, and it is stated in
[`PUBLISHER_TRANSPARENCY.md`](PUBLISHER_TRANSPARENCY.md) rather than hidden.

If you hold a CAG finding, an RTI response, a court record or a departmental
document that contradicts something here, it is more valuable than a dozen small
fixes. Contrary evidence can move a record to grade **F** — the model has that
grade precisely so contradiction can be recorded.

## What happens next

| Status | Meaning |
|---|---|
| `received` | Logged as an issue. |
| `needs-source` | Plausible, but no source reference — cannot act yet. |
| `investigating` | Being checked against the cited document. |
| `confirmed` | Verified. Fix pending. |
| `applied` | Fixed, logged in `CHANGELOG.md` with the record ID. |
| `declined` | Not applied. **A reason is always given**, on the issue. |
| `wont-fix-by-design` | Correct as-is by a documented rule — see below. |
| `queued` | Real, but needs source acquisition; added to the evidence queue. |

**Target response: 14 days** to a first response. This is a single-maintainer,
unfunded project; that is a good-faith target, not a guarantee.

**Corrections are announced, never silent.** Every applied change is logged with
its record ID in [`CHANGELOG.md`](../CHANGELOG.md) and, for data migrations, in
`docs/migration_*.json`. If a correction changes a figure a reader may already
have cited, the log says what it was before.

## Things that are correct by design

Before reporting these, note they are deliberate:

- **OCR defects in quoted source text** (e.g. "Honble"). 55 are known and
  preserved so the text still matches the original PDF. Correcting them would
  break that match. Flagged in `docs/data_quality_report.json`.
- **Manifesto statuses that look wrong.** All 505 are reproduced from an external
  tracker, not assessed here. Report those to that tracker; this project can only
  fix a mis-transcription. See
  [`MANIFESTO_ASSESSMENT_METHODOLOGY.md`](MANIFESTO_ASSESSMENT_METHODOLOGY.md).
- **"Only grade D or E"** — no record is graded above D by design, because
  nothing in the corpus is counted by an independent body.
  See [`METHODOLOGY.md`](METHODOLOGY.md) §2.
- **A claim lookup that refuses to answer.** The tool abstains by design and
  never returns a verdict. That is the intended behaviour, not a bug.
- **Catalogue vs embedded totals** (3,501 catalogued GOs vs 186 embedded; 138
  sitting links vs 38 measured). Both halves are stated deliberately.

## Security and privacy

If a record exposes personal information that should not be public — a
beneficiary name, an address, a phone number — please report it as
`privacy` and it will be treated as urgent rather than queued.
