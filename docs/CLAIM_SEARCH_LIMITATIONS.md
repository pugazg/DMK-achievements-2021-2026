# Claim Search — What It Does and What It Cannot Do

**Implementation:** `src/lib/search.js` (`lookupClaim`), `src/sections/Claim.jsx`.
**Tests:** `test/claim.test.mjs` — 8 adversarial cases.

---

## The one-sentence version

**This is a retrieval tool, not a fact-checker.** It finds records in this dataset that may
relate to a claim you paste in, and shows you why they matched. It never tells you whether
the claim is true.

## Why the tool was rebuilt

The original feature was labelled "Fact-check" and answered a pasted claim by matching
keywords against 438 records and reporting "who actually started it". That design has a
structural flaw: **keyword overlap is not verification.** A claim and a record can share
every important word and still be about different things, opposite things, or different
years. Presenting a lookup result as a verdict manufactures confidence that the underlying
method cannot support — and does so on politically contested material, where a false
verdict does real damage.

The feature is now called **Claim lookup**. It returns records and reasons, never verdicts.

## What it returns

`lookupClaim(query)` returns one of three assessments:

| Assessment | Meaning |
|---|---|
| `not_found` | No meaningful term in the claim matched any record. |
| `insufficient_match` | Some overlap, but too weak to show as related. **No conclusion is possible.** |
| `related_records` | Strong topical overlap. These records are *about the same subject*. Still not verification. |

There is deliberately no boolean field, no "true/false", no "verdict", and no confidence
percentage anywhere in the return value. `test/claim.test.mjs` asserts the absence of a
verdict field so it cannot be reintroduced by accident.

## The abstention rules

To reach `related_records`, the top-scoring record must satisfy **all** of:

- **≥ 60% coverage** — at least three-fifths of the claim's meaningful terms appear in it;
- **≥ 2 matched terms** — a single lucky word is never enough;
- **at least one distinctive term** (≥ 6 characters), **or** three or more matched terms.

Meaningful terms exclude a stopword list that is tuned for this domain: besides the usual
English function words it drops words that appear in nearly every record here — *government,
tamil, nadu, scheme, crore, lakh, launched, announced, mission, project*. Those words carry
no discriminating power in a corpus where everything is a government scheme in Tamil Nadu.

The effect is that the tool abstains often. That is the intended behaviour. Abstention is
the correct output when the evidence does not distinguish between hypotheses.

## Negation flagging

Claims containing negation words (*cancelled, stopped, banned, scrapped, abolished,
withdrawn, discontinued, failed, never, not*, …) are flagged explicitly, because **the
presence or absence of a record cannot confirm or deny a negative.**

If someone pastes "the DMK cancelled the breakfast scheme", finding a breakfast-scheme
record does not refute it — the scheme could have existed and then been cancelled, and this
dataset has a cut-off date. The tool says so instead of implying a rebuttal.

## Limits you should assume are real

1. **Coverage limit.** The corpus is 438 records transcribed from government summary
   publications, current to **18 July 2026**. A claim about something outside that corpus
   returns `not_found` — which means *not in this dataset*, not *false*.
2. **Source limit.** Every record reflects what the government reported. A claim can be
   contradicted by reality and still match a record perfectly. See `docs/EVIDENCE_MODEL.md`.
3. **Language limit.** Matching is English-only and literal — no stemming, no synonyms, no
   transliteration. Tamil-language claims and paraphrases will under-match.
4. **Numeric limit.** Numbers are matched as strings. The tool cannot tell you that a claim's
   figure is wrong, only that a similar figure does or does not appear.
5. **Temporal limit.** Records are not consistently dated at the event level, so the tool
   cannot check whether a claim's timeframe matches a record's.
6. **Attribution limit.** The origin markers (started / expanded / continued under DMK) come
   from the state record's own framing. They are a contested category by nature and should
   be read as the government's characterisation, not as an adjudicated finding.

## What a reader should do with a result

Treat `related_records` as *"here is where to start reading"*. Open the linked Government
Order, Act, or gazette PDF and check the primary document. The tool's job is to shorten the
path to the source, and then get out of the way.

## For maintainers

Any change that would let this tool emit a verdict, a truth score, a confidence percentage,
or a rebuttal is out of scope for this project — not a tuning decision. If verification is
wanted, it requires the evidence store described in `docs/EVIDENCE_MODEL.md` and human
assessment recorded per claim, not a change to the matching thresholds.
