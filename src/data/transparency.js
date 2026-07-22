import { VERSION } from "../lib/version.js";

/* ============================================================
   TRANSPARENCY CONTENT — the public-facing copy for the
   /#transparency section.

   This is the same disclosure as docs/PUBLISHER_TRANSPARENCY.md,
   docs/METHODOLOGY.md and docs/CORRECTIONS.md, written for a
   reader who will never open the repository. If those documents
   change, this must change with them: a transparency page that
   disagrees with its own documentation is worse than none.

   Rules for editing this file:
   - No claim of verification. Nothing here is verified.
   - No invented fact about the publisher.
   - Counts that come from the data are injected at render time
     from publicMetrics/evidence, never written as literals here.
   ============================================================ */

export const REPO_URL = "https://github.com/pugazg/DMK-achievements-2021-2026";
export const ISSUES_URL = `${REPO_URL}/issues`;

export const PUBLISHER = [
  ["Project", "The Dravidian Model · Tamil Nadu 2021–2026"],
  ["Maintainer", "Pugazhendhi R — independently maintained by one person"],
  ["Contact", "GitHub issues on the repository"],
  ["Published from", "India"],
];

/* The two-sided statement: what it is, and what it explicitly is not.
   The second list is the more important one. */
export const PURPOSE = {
  is: [
    "An evidence explorer of publicly available records.",
    "A searchable index of what the Tamil Nadu government published about its own 2021–2026 record.",
    "A way to get from a claim to the primary document quickly.",
  ],
  isNot: [
    "Not an official government publication, and not government-endorsed.",
    "Not an independent certification of any claim — no record here is verified.",
    "Not a fact-checking platform. The claim lookup never returns a verdict.",
    "Not an assessment of the manifesto. Those statuses are an external tracker's.",
    "Not a claim of ownership over any government document.",
  ],
};

export const AFFILIATION = {
  headline: "Independently maintained. No political affiliation.",
  rows: [
    ["Affiliation with DMK", "None — no membership, office, employment, volunteering or commissioned work"],
    ["Any other political party", "None"],
    ["Any government body", "None — no official standing; not requested, reviewed or approved"],
    ["Any campaign organisation", "None"],
    ["Commissioned by anyone", "No"],
  ],
  /* A disclosure that only says "no affiliation" and stops is not a
     disclosure. These are the two things a reader should weigh. */
  perspective: [
    {
      h: "The source material is one-sided by construction",
      p: "Records are drawn almost entirely from the government's own publications, because that is what is published in bulk. No opposition material, press criticism or audit finding has been ingested. An explorer built only from a government's own account of itself will reflect that account, however carefully each item is labelled. This is the project's most significant editorial limitation.",
    },
    {
      h: "Some framing is editorial and sympathetic",
      p: "“The Method” section and the rising-sun visual identity are presentational choices, not data, and they are not neutral. The data sections and evidence grades follow written rules; the narrative framing does not, and should be read as the maintainer's presentation.",
    },
  ],
};

export const FUNDING = [
  ["Funding model", "Self-funded by the maintainer"],
  ["Government funding", "None"],
  ["Party, campaign or political funding", "None"],
  ["Grants or institutional funding", "None"],
  ["Advertisements", "None, and none planned"],
  ["Sponsorships", "None"],
  ["Donations", "Not accepted — there is no donation channel"],
  ["Paid contributors", "None; all work is unpaid"],
];

/* Grade ladder copy. Colours come from evidence.js at render time so the
   two can never disagree about what a grade means. */
export const GRADE_LADDER = [
  ["A", "Outcome verified", "An independent official dataset or audit confirms the outcome — not the activity, the outcome."],
  ["B", "Delivery verified", "Expenditure records plus beneficiary or completion records exist and are consistent."],
  ["C", "Execution verified", "Tender, contract, work-order or physical-progress documentation exists."],
  ["D", "Sanctioned", "A Government Order, administrative sanction or budget allocation exists."],
  ["E", "Announced / government-reported", "A government publication reports it."],
  ["F", "Unsupported / disputed", "Adequate support is absent, or reliable contrary evidence exists."],
];

export const GO_CAVEAT = {
  h: "What a Government Order does and does not prove",
  lead: "A Government Order proves administrative action. It records that the government formally authorised something and usually allocated money to it. That is real evidence, and it is why GO-backed records earn grade D.",
  notProof: [
    ["Completion", "that the work was finished, or finished as specified"],
    ["Beneficiary delivery", "that the money or service reached the people named"],
    ["Outcome", "that the intended effect actually occurred"],
  ],
  tail: "The gap between sanction and delivery is where public-spending failures live. A scheme can be sanctioned, funded, tendered and still deliver nothing — so D is the ceiling for a Government Order, and an announcement alone stays at E.",
};

export const METHOD_SUMMARY = [
  {
    h: "Source selection",
    p: "Primary sources are the government's own published record: the 2021–26 achievements souvenir and minister-by-minister volumes, the Economic Survey, the Government Gazette, Government Orders on tn.gov.in, and the Assembly's published sitting index. The manifesto tracker is an external source, labelled as such.",
  },
  {
    h: "Inclusion criteria",
    p: "A record is included when it appears in one of those published sources, can be stated without inventing a figure, date, amount or beneficiary count, and can be attributed to a named source volume. A news report or social-media claim alone is not sufficient.",
  },
  {
    h: "Status classification",
    p: "Achievement records carry the government's own status framing. Where a record's own detail text mixes delivered with planned components it is flagged so the interface cannot present it as wholly complete. Manifesto statuses are the external tracker's, not this project's.",
  },
  {
    h: "Evidence grading",
    p: "The A–F ladder above. Automatic grading is capped at D and this is enforced by an automated check, not by convention. Every automatic grade is marked unverified, pending manual review.",
  },
  {
    h: "Acquisition ethics",
    p: "robots.txt, CAPTCHA and terms of service are respected; blocked sources go to a manual queue and no bypass is built. A source counts as reviewed only if a document was actually fetched and hashed.",
  },
  {
    h: "Corrections",
    p: "Every applied change is logged with its record ID. Record IDs are stable and never reused. Text quoted from a gazette or Government Order is preserved verbatim — including OCR defects — so a reader can match it against the original PDF.",
  },
];

export const CORRECTION_FIELDS = [
  ["Issue type", "factual error, wrong source, broken link, misleading framing, grade dispute, contrary evidence, transcription, accessibility…"],
  ["Record ID", "the stable identifier — e.g. rur_b2_housing, promise #162, Bill-6-2026. IDs never change."],
  ["Source reference", "the document that supports the correction: a G.O. number and date, gazette issue, Act number, page, or URL. This is the field that matters most."],
  ["Explanation", "what is wrong and what it should be. For a wrong number, give both the current and the correct value."],
  ["Review status", "received → investigating → confirmed → applied, or declined with a reason. Target first response: 14 days."],
];

export const VERSION_ROWS = [
  ["Data version", VERSION.data, "Cut-off of the underlying record. Nothing published after this date is reflected."],
  ["Data last updated", VERSION.dataUpdated, "Last edit to any dataset or generated document."],
  ["Methodology version", `v${VERSION.methodology}`, "Evidence model, grading rules and claim-lookup behaviour."],
  ["Release", VERSION.release, "The application build."],
  ["Release status", VERSION.status, "See the release checklist in the repository."],
];

export const LICENCE_ROWS = [
  ["Software", "MIT", "The application code, scripts and tests."],
  ["Data compilation", "CC BY 4.0", "The structuring, linking, categorisation and grading in this project."],
  ["Government documents", "Not licensed here", "Government Orders, gazettes, Acts and Assembly proceedings belong to their issuing authorities under their own terms. This project claims no ownership, links to the authority's own PDF rather than rehosting, and quotes text verbatim for identification."],
];
