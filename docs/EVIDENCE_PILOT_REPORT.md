# Evidence Pilot Report — Phase C0

**Pilot version 1.0** · Compiled 21 July 2026 · Methodology v1.0
**Corpus:** `src/data/evidencePilot.js` · **Schema:** `src/lib/evidenceRecord.js`
**Tests:** `test/evidencePilot.test.mjs` (23 tests) · **UI:** `#evidence-pilot`
**Fetch manifest:** `sources/pilot_c0/manifest.tsv`

**No bulk ingestion was performed.** Nine documents were retrieved for this pilot;
each is hashed in the manifest.

---

## 1. Purpose and result

The pilot asked one question: **can the evidence model hold the complete picture —
supporting and adverse — before we scale it to 438 records?**

**Answer: yes, with two changes required first** (§7). The model represented every
subject tried, including claims that are not evidence-testable at all. It also
caught a design flaw in itself, which is the most useful thing a pilot can do.

| Measure | Result |
|---|---|
| Subjects | **25** (10 achievements, 10 promises, 5 contested claims) |
| Sources attached | **86** |
| Sources actually read | **15** (17%) |
| Sources identified but never opened | **46** (53%) |
| Sources sought and unavailable | **25** (29%) |
| Contrary sources | **14**, across **13 of 25** subjects |
| Missing-evidence items logged | **95** (3.8 per subject) |
| Schema validation errors | **0** |
| Grade mismatches (asserted vs supported) | **0** |

### Grades assigned

| Grade | Subjects | Why |
|---|---|---|
| A / B / C | **0** | No independent source *supports* any claim in the pilot. |
| **D** | **6** | A Government Order or gazetted Act is linked. |
| **E** | **19** | Rests on the government's own summary volume. |
| F | 0 | No claim was contradicted outright — only unevidenced. |

**0 of 25 subjects have an independent source that supports them.** Thirteen have
independent scrutiny attached, and in every case it is *contrary* or contextual.
That asymmetry is the pilot's central finding.

## 2. Records selected

### Achievements — one per requested domain

| Domain | Record | Grade | Evidence held |
|---|---|---|---|
| health | `hea4` Kalaignar Super-Speciality Hospital | D | 2 GOs (unread) + souvenir; no page |
| education | `edu3` Free laptops (10 lakh) | E | Souvenir only; no page |
| welfare | `soc_b7_hostels` Social-justice hostels | E | Souvenir p.287 + 1 unrelated Act |
| transport | `inf_b15_cumta` CUMTA | D | CUMTA Act 2024 + Bill 13/2024; p.452 |
| urban development | `rur_b2_housing` Kalaignar Kanavu Illam | E | Souvenir p.269 only |
| industry | `eco_b2_tidel` Mini Tidel Parks | E | Souvenir only; no page |
| women/social welfare | `wom_b2_gender` Vanavil Centres | E | Souvenir only; unquantified |
| agriculture | `coop_b16_societies` Co-op modernisation | D | 13 linked instruments (0 read); p.460 |
| infrastructure | `inf5` Bus terminuses (₹393.74 cr) | E | Souvenir only; no page |
| environment | `env_b4_thoonmai` Thoonmai Iyakkam | E | Souvenir only; treasury claim |

### Promises — across maturity levels

| Maturity | Promises | Grade |
|---|---|---|
| Apparently completed | #8 Tamil Chairs, #17 NRT Department | D, D |
| Partially completed | #18 Lok Ayukta, #19 Right to Services Act | E, E |
| Ongoing | #1 State's lost rights, #10 Book translation | E, E |
| Announcement-only | #7 Classical Tamil Institute, #9 Semmozhi Poonga | E, E |
| Difficult to assess | #2 Education to State List, #4 Hindi imposition | E, E |

### Contested / high-impact claims

| Claim | Type | Grade |
|---|---|---|
| ₹12 lakh cr investment · 35 lakh jobs | investment + employment | E |
| India's #1 growth state, 11.19% | ranking | E |
| 71.81 lakh women travel free daily | beneficiary count | E |
| 2.59 cr reached by doorstep care | beneficiary count | E |
| 1,000-bed hospital completed for ₹240 cr | infrastructure completion | D |

## 3. Evidence collected

Nine documents were retrieved on 21 July 2026 and hashed. The material one:

**CAG State Finances Audit Report 2023-24 (Report No. 2 of 2025)** — Executive
Summary, retrieved from cag.gov.in, sha256 `3cab4ca0…`, text-extracted and read.
Five passages are quoted verbatim in the corpus:

| Finding | Bearing on the corpus |
|---|---|
| **111 outstanding Utilisation Certificates worth ₹2,805.94 crore** pending as of 31 Mar 2024; "*Non-submission of UCs indicates the failure of the departmental officers to comply with the rules to ensure accountability*" | Direct independent evidence that **released funds do not reliably evidence delivery** — the exact inference a reader draws from a sanction document |
| **₹10,083.87 crore unspent** in Single Nodal Agency accounts; release delays of **1–106 days** across seven schemes | Allocation ≠ release ≠ expenditure; delays are systemic, not exceptional |
| **Off-budget borrowings ₹1,672.01 crore**; outstanding guarantees **₹1,22,269.91 crore** (50.16% of revenue receipts) | Headline investment and infrastructure figures may be financed outside the budget |
| **"Continuous mismatch between receipts and expenditure indicates rising fiscal stress"**; revenue deficit +24.59%, fiscal deficit +10.43% | Fiscal context for every large spending claim in the period |
| **GSDP ₹27,21,571 crore in 2023-24**, 13.71% growth over 2022-23 | The only independent figure against which this project's GSDP claims can be sanity-checked |

**Scope discipline:** no CAG paragraph in this pilot names any of these schemes.
Every audit source carries a `note` saying so, and a test enforces it. Presenting a
state-level fiscal finding as an audit finding against a named hospital would be a
serious misrepresentation, and the model is built to prevent it.

## 4. Missing information

**95 items across 25 subjects.** The recurring absences:

| Missing evidence class | Subjects affected |
|---|---|
| Completion / commissioning certificates | 9 |
| Tender, contract or work-order documents | 7 |
| Expenditure records against a stated cost | 8 |
| Beneficiary or delivery data | 8 |
| Independent outcome datasets | 7 |
| Definition of the claim's own key term ("modernised", "reached", "done") | 6 |
| Page reference to the source volume | 6 |

**12 of 25 subjects have no source that has been read at all.** Their entire
evidential basis is a document someone knows exists.

### Specific gaps worth naming

- **`edu3` (10 lakh laptops)** — one of the largest hardware procurements a state
  could make, and not one procurement document was located.
- **Promise #7 and #9** — counted inside the public "400 fulfilled" headline with
  **zero linked evidence of any kind**. Two of the 158 such promises.
- **Promise #19 (Right to Services Act)** — no matching statute was found among
  the 222 legislative instruments held, yet the tracker marks it "modified".
- **`hea1` (2.59 cr reached)** — the Union HMIS holds comparable data and is
  catalogued in the source registry, but has never been fetched.

## 5. Lessons learned

**1. The model works, and its most valuable field is `missing`.**
Ninety-five recorded absences say more about the state of the evidence than the
86 attached sources do. Rendering `missing` with the same visual weight as the
sources was the single most important UI decision.

**2. Link counts flatter the evidence badly.**
`coop_b16_societies` has 13 linked legislative instruments — the most in the
dataset — and **none has been read**. Before this pilot, a link count looked like
strength. The `extraction` field is what separates a bibliography from evidence:
53% of sources here are `identified` only.

**3. A linked document often does not evidence the claim it is attached to.**
The two GOs on `hea4` concern pay wards and staffing continuance. They prove the
hospital exists and operates — genuinely useful — but say nothing about the
1,000 beds, the opening date or the ₹240 cr cost. The old auto-grader would have
counted them as sanction evidence for the whole claim. The pilot's per-source
`note` field is what makes this visible.

**4. The model caught a serious flaw in itself.**
The first version of the A/B/C gate asked only whether *an independent read source
existed*. Because contrary CAG evidence is independent and read, **attaching an
audit finding made a higher grade easier to justify** — adverse evidence became a
route to "verified". Exactly backwards. Fixed: the gate now requires the
independent source to be `stance: "supporting"`; a contrary one can lower a grade
toward F but can never raise one. A regression test pins this.

**5. Some claims cannot be graded at all, and the model must say so rather than
force a grade.** Promise #1 ("fight to restore the state's lost rights") has no
fulfilment criterion; #2 requires a Union constitutional amendment outside the
state's power. Putting these on the same ladder as a bed count is a category
error. They are recorded at E with the reason stated.

**6. Contested claims are systematically the *worst* evidenced.**
Four of the five highest-impact claims are grade E. The most-quoted figures in the
project — ₹12 lakh cr investment, 35 lakh jobs, 71.81 lakh daily bus riders — have
the least behind them. This inverts what a reader would assume.

**7. PDF acquisition is fragile and needs engineering.**
The combined 6 MB CAG report downloaded as a corrupt file (`Invalid XRef entry`,
`Couldn't find trailer dictionary`) and no text could be extracted. The
chapter-level PDFs from the same page extracted perfectly. Bulk ingestion must
fetch chapter-level documents, verify PDF structure after download, and treat
extraction failure as a first-class outcome rather than an error to retry blindly.

**8. `pdftotext` is a hard dependency and is not installed by default.**
Text extraction succeeded only because Homebrew `poppler` happened to be present.
A naive fallback parser produced convincing-looking garbage rather than failing —
the most dangerous possible behaviour for an evidence pipeline.

## 6. Changes needed before bulk ingestion

**Blocking:**

1. **Per-source `note` is mandatory, not optional.** Finding 3 showed that
   *which* claim a document supports is as important as the link itself. Bulk
   ingestion without this field will re-create the problem at 438× scale.
2. **`extraction` must default to `identified` and never be upgraded
   automatically.** Nothing may be marked `parsed` or `quoted` without a stored
   text artefact.
3. **Extraction failure must be recorded, not retried into silence.** Add
   `extraction: "corrupt"` for documents that download but cannot be parsed, and
   verify PDF structure post-download.
4. **Pin the extraction toolchain.** Declare `pdftotext`/poppler as an explicit
   prerequisite and fail loudly if absent. Delete the fallback parser: it
   produced plausible garbage.

**Required before scale, non-blocking:**

5. **A `claim_component` field.** Most subjects here are compound ("2 lakh houses
   · ₹6,600 cr", "6 done · 10 planned"). One grade per compound claim is the same
   flattening the audit criticised in the manifesto statuses.
6. **A "not gradeable" outcome** for claims with no fulfilment criterion, so
   open-ended commitments are not forced onto the delivery ladder.
7. **Adverse-source discovery must be a required pipeline step**, not a manual
   effort. Only one independent source (CAG) was reachable here; the DES
   endpoints return HTTP 500 and remain the largest blocked cluster.

**Effort estimate.** The pilot took roughly 25 subjects × ~15 minutes of
judgement each, on top of retrieval. At that rate 438 records is on the order of
100+ hours of human assessment. **Bulk ingestion cannot be fully automated** —
the automatable part is retrieval and metadata; the `note`, `limitations` and
`missing` fields are irreducibly editorial.

## 7. Recommendation

**Do not proceed to bulk ingestion yet.** Make changes 1–4, then re-run this pilot
on a fresh 25 subjects to confirm the fixes hold. Scaling before then would
propagate the compound-claim flattening (change 5) across the whole corpus, and
that is exactly the class of error this project has already had to remediate once.

The evidence model itself is sound. What is not yet ready is the *pipeline* around
it.
