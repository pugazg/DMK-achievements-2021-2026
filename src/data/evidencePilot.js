/* ============================================================
   EVIDENCE PILOT CORPUS — v2 (Phase C0.5 hardening)

   The same 25 subjects as the C0 pilot, migrated to the hardened
   schema. NO NEW RECORDS were added in this phase.

   What migration added to every record:
   - a mandatory `relationship` on each source: what it supports,
     what it does NOT prove, and its effect on the grade;
   - a `document` lifecycle block: download and extraction tracked
     separately, with method, text hash, confidence and review state;
   - `components[]`, so compound claims are graded part by part;
   - `assessment.confidence` with its own rationale, separate from
     the grade;
   - NG where a claim has no measurable criterion.

   HONESTY RULES (unchanged from C0)
   - Every url/document_no/date/quote is either already held in this
     repo's datasets or was fetched on 2026-07-21 and hashed into
     sources/pilot_c0/manifest.tsv.
   - CAG quotes are verbatim from the Executive Summary of the State
     Finances Audit Report 2023-24 (Report No. 2 of 2025). They are
     STATE-LEVEL findings and name none of these schemes; every use
     says so in its relationship note.
   ============================================================ */

export const PILOT_META = {
  version: "2.0",
  schema: "evidenceRecord v2",
  compiled: "2026-07-21",
  methodology: "1.0",
  purpose:
    "Validate the hardened evidence model against the same 25 subjects before any bulk ingestion.",
  fetch_manifest: "sources/pilot_c0/manifest.tsv",
  migrated_from: "pilot v1.0 (Phase C0) — same subjects, no additions",
};

// ---- document lifecycle helpers -------------------------------------

/* A document nobody has attempted to fetch (paper volumes, records we
   only know exist). Never quotable. */
const docNotFetched = () => ({
  download_status: "not_attempted",
  extraction_status: "not_attempted",
  extraction_method: "none",
  text_sha256: null,
  extraction_confidence: null,
  human_review: "unreviewed",
});

/* A document that was sought and could not be obtained. */
const docUnavailable = () => ({
  download_status: "not_attempted",
  extraction_status: "not_attempted",
  extraction_method: "none",
  text_sha256: null,
  extraction_confidence: null,
  human_review: "reviewed", // a human confirmed it could not be located
});

/* The CAG Executive Summary: fetched, extracted with pdftotext, read. */
const docCagExecSummary = () => ({
  download_status: "success",
  extraction_status: "success",
  extraction_method: "pdftotext",
  text_sha256: "743f3315b730d67b80235579f118ae68702b7debed8a48ab30debbd36b536db0",
  extraction_confidence: "high",
  human_review: "reviewed",
  retrieved_at: "2026-07-21",
  note: "pdftotext -layout produced clean text; passages below were read and transcribed verbatim.",
});

const rel = (supports, does_not_prove, grade_impact, component_id) => ({
  supports, does_not_prove, grade_impact, ...(component_id ? { component_id } : {}),
});

// ---- shared CAG sources (relationship supplied per use) --------------

const CAG_BASE = {
  source_type: "audit",
  authority: "audit",
  title:
    "Report of the Comptroller and Auditor General of India on State Finances for the year ended 31 March 2024 (Report No. 2 of 2025), Executive Summary",
  issuing_authority:
    "Comptroller and Auditor General of India / Principal Accountant General (Audit-I), Tamil Nadu",
  document_no: "Report No. 2 of 2025",
  date: "2025",
  url: "https://cag.gov.in/uploads/download_audit_report/2025/5_Executive-Summary-068f705993d63b5.26103778.pdf",
  sha256: "3cab4ca020bcfc98d82f2294ff5ed6ccdf59edc991ad927184a5b618be023a21",
  stage: "independent_audit",
  extraction: "quoted",
};

const cagUC = (relationship) => ({
  ...CAG_BASE, document: docCagExecSummary(),
  reference: "Executive Summary — Outstanding Utilisation Certificates",
  stance: "contrary",
  quote:
    "Despite the requirement of submitting Utilisation Certificates (UCs) against conditional grants within a stipulated time period, 111 outstanding UCs of ₹2,805.94 crore were pending as on 31 March 2024. Non-submission of UCs indicates the failure of the departmental officers to comply with the rules to ensure accountability.",
  relationship,
});

const cagUnspent = (relationship) => ({
  ...CAG_BASE, document: docCagExecSummary(),
  reference: "Executive Summary — Single Nodal Agency accounts",
  stance: "contrary",
  quote:
    "As of 31 March 2024, the unspent amounts lying in the SNA Accounts was ₹10,083.87 crore. There were delays ranged between one day and 106 days in release of GOI share and State Government share to SNA in seven schemes.",
  relationship,
});

const cagFiscal = (relationship) => ({
  ...CAG_BASE, document: docCagExecSummary(),
  reference: "Executive Summary — Receipt-Expenditure Mismatch",
  stance: "contextual",
  quote:
    "The continuous mismatch between receipts and expenditure indicates rising fiscal stress. Revenue deficit increased from ₹36,215 crore to ₹45,121 crore registering 24.59 per cent increase over 2022-23, while fiscal deficit increased significantly from ₹81,886 crore in 2022-23 to ₹90,430 crore in 2023-24.",
  relationship,
});

const cagGsdp = (relationship) => ({
  ...CAG_BASE, document: docCagExecSummary(),
  reference: "Executive Summary — GSDP",
  stance: "contrary",
  quote:
    "Gross State Domestic Product (GSDP) (at current prices) grew at an average growth rate of 10.92 per cent from ₹17,43,144 crore in 2019-20 to ₹27,21,571 crore in 2023-24. There was 13.71 per cent growth in GSDP over 2022-23.",
  relationship,
});

const cagOffBudget = (relationship) => ({
  ...CAG_BASE, document: docCagExecSummary(),
  reference: "Executive Summary — Off-Budget Borrowings and Guarantees",
  stance: "contrary",
  quote:
    "The State Government, through Public Sector Undertaking, raised ₹1,672.01 crore as off-budget borrowings, which did not flow into the Consolidated Fund of the State but are required to be repaid and serviced through budget. The total outstanding guarantees of the State Government were ₹1,22,269.91 crore as on 31 March 2024.",
  relationship,
});

const souvenir = (page, relationship) => ({
  source_type: "announcement",
  authority: "primary_official",
  title: "Tamil Nadu Government 2021–26 achievements record (souvenir / minister-by-minister volumes)",
  issuing_authority: "Government of Tamil Nadu",
  date: "2026",
  page: page ?? null,
  stage: "announcement",
  extraction: "identified",
  stance: "supporting",
  document: docNotFetched(),
  relationship,
});

const notLocated = (what, why, relationship) => ({
  source_type: "other",
  authority: "other",
  title: `${what} — not located`,
  issuing_authority: "n/a",
  stage: "context_only",
  extraction: "unavailable",
  stance: "contextual",
  document: docUnavailable(),
  relationship: { ...relationship, does_not_prove: why },
});

const go = (title, dept, date, url, relationship, document_no) => ({
  source_type: "go",
  authority: "primary_official",
  title, issuing_authority: dept, date, url,
  ...(document_no ? { document_no } : {}),
  stage: "administrative_sanction",
  extraction: "identified",
  stance: "supporting",
  document: docNotFetched(),
  relationship,
});

const law = (title, document_no, date, url, relationship, stage = "administrative_sanction", stance = "supporting") => ({
  source_type: "legislation",
  authority: "legislative",
  title, issuing_authority: "Tamil Nadu Legislative Assembly / Dept. of Stationery & Printing",
  document_no, date, url, stage, extraction: "identified", stance,
  document: docNotFetched(),
  relationship,
});

// ===============================================================
// 1. ACHIEVEMENTS
// ===============================================================

const ACHIEVEMENTS = [
  {
    id: "ev_hea4", subject_type: "achievement", subject_id: "hea4", domain: "health",
    claim: "Kalaignar Super-Speciality Hospital — a 1,000-bed hospital with 15 operating theatres at Guindy, opened 15 June 2023 for ₹240 cr plus ₹146 cr of equipment.",
    sources: [
      souvenir(null, rel(
        "The existence of the hospital and every figure in the claim: bed count, theatre count, opening date and cost.",
        "Nothing independently — it is the government's own summary of its own work, with no page reference recorded so a reader cannot even locate it in the volume.",
        "caps", "existence")),
      go("Pay Ward — Formation of Pay wards in Kalaignar Centenary Super Speciality Hospital, Guindy",
        "Health and Family Welfare Department, Government of Tamil Nadu", "18-03-2025",
        "https://cms.tn.gov.in/cms_migrated/document/GO/hfw_e_69_2025.pdf",
        rel("That the hospital exists and was operating as a functioning facility by March 2025 — a pay-ward order presupposes wards in use.",
          "The 1,000-bed capacity, the 15 theatres, the 15 June 2023 opening date, or the ₹240 cr cost. This order is about pay-ward formation and touches none of them.",
          "raises", "existence")),
      go("Establishment — Further continuance of 217 temporary posts attached to the hospital",
        "Health and Family Welfare Department, Government of Tamil Nadu", "11-09-2025",
        "https://cms.tn.gov.in/cms_migrated/document/GO/hfw_e_1016_2025_D.pdf",
        rel("That the hospital is staffed and continuing to operate into late 2025.",
          "Any element of the capacity or cost claim. Staffing continuance is independent of how many beds exist.",
          "supports_current", "existence")),
      cagUC(rel(
        "Nothing about this hospital. It is attached as independent evidence about the class of assurance this claim needs.",
        "It does not name this hospital, this department's spending on it, or any defect in this project. It is a state-level finding that released funds do not reliably evidence delivery.",
        "caps", "capacity")),
      notLocated("Completion certificate / commissioning record",
        "Without it, the 1,000-bed figure and the opening date rest solely on the government's own summary. No work-completion or commissioning document has been located.",
        rel("Nothing — recorded to make the absence visible.", "", "caps", "capacity")),
    ],
    components: [
      { id: "existence", text: "A super-speciality hospital exists at Guindy and is operating.",
        status: "documented", grade: "D", confidence: "high", evidence: [0, 1, 2],
        limitations: ["Both GOs are identified but unread — the inference rests on their titles and abstracts."] },
      { id: "capacity", text: "It has 1,000 beds and 15 operating theatres.",
        status: "asserted_only", grade: "E", confidence: "low", evidence: [0, 3, 4],
        limitations: ["No bed-strength notification, licensing record or completion certificate located.",
          "No page reference to the source volume."] },
      { id: "cost", text: "It was built for ₹240 cr plus ₹146 cr of equipment.",
        status: "asserted_only", grade: "E", confidence: "low", evidence: [0, 4],
        limitations: ["No budget line, tender, contract or expenditure record located for either figure."] },
      { id: "opening_date", text: "It opened on 15 June 2023.",
        status: "asserted_only", grade: "E", confidence: "low", evidence: [0],
        limitations: ["No inauguration order, press release or gazette notice located."] },
    ],
    assessment: {
      grade: "E", confidence: "low",
      rationale:
        "The hospital's existence and operation are genuinely documented — two Government Orders presuppose a working facility. But every number in the claim (beds, theatres, cost, date) is asserted by the government's own summary alone. Because the parent takes its weakest component, the record grades E despite one component reaching D.",
      confidence_rationale:
        "Low: three of four components rest on a single unread source, and the two GOs that do exist were read only as titles.",
      limitations: [
        "No GO or completion record attests the 1,000-bed figure.",
        "The ₹240 cr / ₹146 cr split has no located financial document.",
        "Record is flagged mixedStatus in the main dataset.",
        "No page reference, so the claim cannot be spot-checked.",
      ],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: [
      "Work completion certificate or commissioning order",
      "Tender and contract-award documents for the ₹240 cr construction",
      "Expenditure record confirming the ₹240 cr / ₹146 cr split",
      "Bed-strength notification or hospital licensing record",
      "Occupancy or patient-throughput data proving the beds are in use",
    ],
  },

  {
    id: "ev_edu3", subject_type: "achievement", subject_id: "edu3", domain: "education",
    claim: "10 lakh free laptops distributed to students, with 10 lakh more planned; a college laptop scheme launched 5 January 2026.",
    sources: [
      souvenir(null, rel(
        "Both halves of the claim: the 10 lakh delivered and the 10 lakh planned.",
        "Any distinction between delivered and planned, and any procurement or delivery fact. No page reference recorded.",
        "caps", "delivered")),
      notLocated("Procurement tender for laptop supply",
        "One of the largest single hardware purchases a state could make, and no tender or contract-award document has been located.",
        rel("Nothing — recorded to make the absence visible.", "", "caps", "delivered")),
      notLocated("Distribution / beneficiary records",
        "No district-wise or institution-wise distribution record has been located, so the 10 lakh figure cannot be checked at any level.",
        rel("Nothing — recorded to make the absence visible.", "", "caps", "delivered")),
      cagUnspent(rel(
        "Nothing about this scheme. Attached as independent evidence that allocation and release are not the same as expenditure in this period.",
        "It does not name this scheme or any laptop procurement. State-level finding only.",
        "caps", "delivered")),
    ],
    components: [
      { id: "delivered", text: "10 lakh laptops have been distributed to students.",
        status: "asserted_only", grade: "E", confidence: "low", evidence: [0, 1, 2, 3],
        limitations: ["No procurement, delivery or beneficiary document of any kind located.",
          "A purchase of this scale would normally leave a large documentary trail."] },
      { id: "planned", text: "A further 10 lakh laptops are planned.",
        status: "announced", grade: "E", confidence: "medium", evidence: [0],
        limitations: ["A statement of intent, not a delivery claim. Included so the headline cannot present it as delivered."] },
      { id: "college_scheme", text: "A college laptop scheme launched on 5 January 2026.",
        status: "announced", grade: "E", confidence: "low", evidence: [0],
        limitations: ["Post-dates the 18 July 2026 data cut-off for any outcome purpose.", "No launch order located."] },
    ],
    assessment: {
      grade: "E", confidence: "low",
      rationale:
        "No Government Order, tender, contract or delivery record was located for a procurement that would be among the largest the state has made. All three components rest on the government's own summary, and the headline conflates 10 lakh delivered with 10 lakh planned.",
      confidence_rationale:
        "Low: a single unread source supports all three components, and the most checkable one (procurement) has no document at all.",
      limitations: [
        "Nothing beyond the government's own publication supports this.",
        "The headline conflates delivered with planned.",
        "No page reference to the source volume.",
      ],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: [
      "Procurement tender and contract award",
      "Government Order sanctioning the scheme",
      "Budget line and expenditure record",
      "District-wise distribution or beneficiary lists",
      "Any independent count of laptops received by students",
    ],
  },

  {
    id: "ev_soc_b7_hostels", subject_type: "achievement", subject_id: "soc_b7_hostels", domain: "welfare",
    claim: "Hostels and buildings for Backward, Most Backward, Denotified, SC/ST and minority students built, maintained and upgraded across the state.",
    sources: [
      souvenir(287, rel(
        "That a hostel construction and upgrade programme was reported by the government, locatable at page 287 of the volume.",
        "Any count, location or completion of any individual hostel. The claim is unquantified in the source itself.",
        "caps", "programme")),
      law("An Act to repeal the Tamil Nadu Building and Construction Workers (Conditions of Employment) Act",
        "Act 3 of 2023", "2023", "https://www.stationeryprinting.tn.gov.in/extraordinary/2023/",
        rel("Legislative context on construction labour regulation during the period.",
          "That any hostel was built, upgraded or occupied. This is a construction-labour statute wrongly suggestive of delivery evidence by its presence in the link list.",
          "none", "programme"),
        "context_only", "contextual"),
      cagUC(rel(
        "Nothing about this programme. Independent evidence on the reliability of delivery assurance generally.",
        "It does not name this programme, these hostels or this department. State-level finding.",
        "caps", "programme")),
      notLocated("Hostel-wise completion records",
        "The claim is quantified only as 'hundreds', with no located list of works, so it cannot be verified even in principle as stated.",
        rel("Nothing — recorded to make the absence visible.", "", "caps", "programme")),
    ],
    components: [
      { id: "programme", text: "A hostel construction/upgrade programme for BC, MBC, DNC, SC/ST and minority students was run.",
        status: "asserted_only", grade: "E", confidence: "medium", evidence: [0, 1, 2, 3],
        limitations: ["Page reference makes it locatable, which is more than most records offer.",
          "The only linked statute is a construction-labour Act, unrelated to hostel delivery."] },
      { id: "quantum", text: "The programme covered 'hundreds' of hostels.",
        status: "unquantified", grade: "E", confidence: "low", evidence: [0, 3],
        limitations: ["'Hundreds' is not a verifiable quantity.", "No list of works exists to count against."] },
    ],
    assessment: {
      grade: "E", confidence: "low",
      rationale:
        "The page reference makes the claim locatable, which is genuinely better than most. But the only linked legal instrument is a construction-labour statute unrelated to hostel delivery, and the claim is unquantified, so no amount of evidence could confirm it as worded.",
      confidence_rationale:
        "Low: the quantum component cannot be assessed at all, and the linked Act is misleading rather than supportive.",
      limitations: [
        "The linked Act is contextual only and evidences no construction.",
        "The claim is unquantified.",
        "Record status is 'ongoing' but the framing reads as completed work.",
      ],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: [
      "A specific count of hostels built versus upgraded",
      "Government Orders sanctioning individual works",
      "Completion certificates",
      "Occupancy figures showing the hostels are in use",
      "Any independent inspection of hostel condition",
    ],
  },

  {
    id: "ev_inf_b15_cumta", subject_type: "achievement", subject_id: "inf_b15_cumta", domain: "transport",
    claim: "CUMTA — Chennai Unified Metropolitan Transport Authority integrating city transport; 5 lakh+ 'Chennai One' users.",
    sources: [
      souvenir(452, rel(
        "Both the creation of CUMTA and the 5 lakh Chennai One user figure, locatable at page 452.",
        "The user figure independently — no ridership system output is cited by the volume.",
        "caps", "adoption")),
      law("The Chennai Unified Metropolitan Transport Authority Act", "Act of 2024", "2024",
        "https://www.stationeryprinting.tn.gov.in/extraordinary/2024/",
        rel("That CUMTA exists in law as a statutory authority — directly on point for the first half of the claim.",
          "That transport is actually integrated in practice, or anything about Chennai One adoption. A statute creates a body; it does not operate one.",
          "raises", "authority")),
      law("The Chennai Unified Metropolitan Transport Authority Bill", "Bill 13 of 2024", "2024",
        "https://www.stationeryprinting.tn.gov.in/extraordinary/2024/",
        rel("The legislative pathway that produced the Act.",
          "Anything beyond the legislative stage — a Bill is a step, not an outcome.",
          "supports_current", "authority"),
        "administrative_sanction", "contextual"),
      notLocated("Chennai One ridership dataset",
        "The 5 lakh user figure has no located departmental or independent dataset behind it, so adoption cannot be checked.",
        rel("Nothing — recorded to make the absence visible.", "", "caps", "adoption")),
    ],
    components: [
      { id: "authority", text: "CUMTA was created as a statutory transport authority.",
        status: "documented", grade: "D", confidence: "high", evidence: [0, 1, 2],
        limitations: ["The Act is identified but unread; the inference rests on its title.",
          "Legal creation is not operational integration."] },
      { id: "integration", text: "City transport is integrated under CUMTA.",
        status: "asserted_only", grade: "E", confidence: "low", evidence: [0],
        limitations: ["'Integration' is undefined in the claim, so there is no criterion to test.",
          "No operational evidence located."] },
      { id: "adoption", text: "Chennai One has 5 lakh or more users.",
        status: "asserted_only", grade: "E", confidence: "low", evidence: [0, 3],
        limitations: ["No ridership or registration data located.",
          "Registered users and active users are different measures; the claim does not say which."] },
    ],
    assessment: {
      grade: "E", confidence: "low",
      rationale:
        "The gazetted Act is the strongest documentary position any subject in this pilot reaches, and it genuinely evidences CUMTA's legal creation (component grade D). But the claim also asserts operational integration and a 5 lakh user figure, neither of which has any source. The weakest component governs.",
      confidence_rationale:
        "Low: two of three components have no supporting document, and the strongest one rests on an unread statute.",
      limitations: [
        "The Act evidences creation, not integration in practice.",
        "The 5 lakh user figure is unsupported by any located dataset.",
        "'Integration' is not defined in the claim.",
      ],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: [
      "Chennai One registration or active-user data",
      "Evidence of operational integration between transport operators",
      "CUMTA budget allocation and expenditure",
      "Any independent assessment of the authority's functioning",
    ],
  },

  {
    id: "ev_rur_b2_housing", subject_type: "achievement", subject_id: "rur_b2_housing", domain: "urban development",
    claim: "Kalaignar Kanavu Illam rural housing — 2 lakh houses, ₹6,600 cr; in 2024-25 the full one lakh sanctioned houses were completed within the ₹3,500 cr allocation.",
    sources: [
      souvenir(269, rel(
        "The scheme's existence, the 2 lakh / ₹6,600 cr headline and the 2024-25 completion claim, locatable at page 269.",
        "Any completion, expenditure or beneficiary fact independently. It is the government reporting on its own flagship scheme.",
        "caps", "completion_2425")),
      cagUnspent(rel(
        "Nothing about this scheme. Independent evidence that, in this period, funds released to implementing agencies were substantially unspent and releases were delayed.",
        "It does not name this scheme, and does not assert that these particular houses were unbuilt. State-level finding.",
        "caps", "completion_2425")),
      cagUC(rel(
        "Nothing about this scheme. Independent evidence that utilisation certificates — the standard proof that sanctioned money was spent as intended — were substantially outstanding.",
        "It does not name this scheme. It establishes a general assurance gap, not a specific failure here.",
        "caps", "completion_2425")),
      notLocated("Scheme Government Order",
        "No GO for this flagship scheme is present in the embedded GO dataset, so even the sanction is undocumented here.",
        rel("Nothing — recorded to make the absence visible.", "", "caps", "scheme")),
      notLocated("Completion certificates for the claimed one lakh houses",
        "A specific completion claim with no completion or physical-progress record located.",
        rel("Nothing — recorded to make the absence visible.", "", "caps", "completion_2425")),
    ],
    components: [
      { id: "scheme", text: "A rural housing scheme (2 lakh houses, ₹6,600 cr) exists.",
        status: "asserted_only", grade: "E", confidence: "medium", evidence: [0, 3],
        limitations: ["No sanctioning GO located, though the scheme is widely reported."] },
      { id: "completion_2425", text: "In 2024-25 the full one lakh sanctioned houses were completed within ₹3,500 cr.",
        status: "asserted_only", grade: "E", confidence: "low", evidence: [0, 1, 2, 4],
        limitations: ["A precise completion claim with no completion certificate, expenditure record or beneficiary list.",
          "Independent audit evidence shows release-to-spend gaps were systemic in exactly this period."] },
    ],
    assessment: {
      grade: "E", confidence: "low",
      rationale:
        "This is a completion claim — 'the full one lakh sanctioned houses were completed' — with no sanction document, no expenditure record and no completion certificate located. The CAG's findings on unspent SNA balances and 111 pending utilisation certificates speak directly to the class of assurance this claim needs, without naming the scheme.",
      confidence_rationale:
        "Low: the load-bearing component is a specific completion figure supported only by the claimant, against independent evidence of systemic release-to-spend gaps.",
      limitations: [
        "A specific completion claim rests solely on the government's own summary.",
        "Independent audit evidence indicates systemic release-to-spend gaps in this period.",
        "The 2 lakh / ₹6,600 cr headline mixes the whole scheme with the one-year figure.",
      ],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: [
      "Government Order sanctioning the scheme and the one lakh houses",
      "Expenditure record against the ₹3,500 cr allocation",
      "Completion certificates or geo-tagged completion data",
      "Beneficiary list or allotment records",
      "Any independent verification that houses are occupied",
    ],
  },

  {
    id: "ev_eco_b2_tidel", subject_type: "achievement", subject_id: "eco_b2_tidel", domain: "industry",
    claim: "Mini Tidel Parks built at Villupuram, Vellore, Thanjavur, Thoothukudi, Salem and Tiruppur — 6 done, 10 planned.",
    sources: [
      souvenir(null, rel(
        "Six named completed parks and ten planned ones.",
        "Completion, commissioning or occupancy of any individual park. No page reference recorded.",
        "caps", "built")),
      cagOffBudget(rel(
        "Nothing about these parks. Independent evidence that state infrastructure is in part financed through public sector undertakings outside the Consolidated Fund.",
        "It does not name TIDEL, ELCOT or any of these six parks. State-level finding about financing structure.",
        "caps", "built")),
      notLocated("TIDEL/ELCOT project completion records",
        "Six specific completion claims and no completion or commissioning record located for any of them.",
        rel("Nothing — recorded to make the absence visible.", "", "caps", "built")),
    ],
    components: [
      { id: "built", text: "Six Mini Tidel Parks were built at the named locations.",
        status: "asserted_only", grade: "E", confidence: "low", evidence: [0, 1, 2],
        limitations: ["Six specific, checkable completion claims with no documentation located.",
          "'Done' is undefined — built, commissioned and occupied are different states."] },
      { id: "planned", text: "Ten further parks are planned.",
        status: "announced", grade: "E", confidence: "medium", evidence: [0],
        limitations: ["A statement of intent. Recorded separately so the headline cannot present it as delivery."] },
    ],
    assessment: {
      grade: "E", confidence: "low",
      rationale:
        "Six named locations make this unusually checkable, which is a genuine strength of the claim as written. But no sanction, tender, completion or occupancy document has been located for any of them, and the headline mixes six delivered with ten planned.",
      confidence_rationale:
        "Low: the specific completion component has no document, despite being the most verifiable claim in the achievement set.",
      limitations: [
        "Six specific completion claims, none documented beyond the government's summary.",
        "'Done' is not defined.",
        "No page reference to the source volume.",
      ],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: [
      "Completion or commissioning records for each of the six parks",
      "Occupancy / tenancy data showing the parks are in use",
      "Capital cost and funding route for each park",
      "Whether any were financed via off-budget borrowing",
    ],
  },

  {
    id: "ev_wom_b2_gender", subject_type: "achievement", subject_id: "wom_b2_gender", domain: "women/social welfare",
    claim: "Gender Resource / Vanavil Centres providing counselling and legal aid.",
    sources: [
      souvenir(null, rel(
        "That centres exist and provide counselling and legal aid.",
        "Any count, location, staffing or caseload. The claim is entirely unquantified and no page reference is recorded.",
        "caps", "service")),
      notLocated("Centre-wise establishment orders",
        "No GO establishing the centres has been located, so even their existence is undocumented outside the summary volume.",
        rel("Nothing — recorded to make the absence visible.", "", "caps", "service")),
      notLocated("Service-usage data",
        "No caseload, counselling or legal-aid usage data located, so no aspect of the service claim can be checked.",
        rel("Nothing — recorded to make the absence visible.", "", "caps", "service")),
    ],
    components: [
      { id: "service", text: "Gender Resource / Vanavil Centres exist and provide counselling and legal aid.",
        status: "unquantified", grade: "E", confidence: "low", evidence: [0, 1, 2],
        limitations: ["No count of centres, staff, locations or cases.",
          "No document of any type located.",
          "As stated, the claim is not falsifiable."] },
    ],
    assessment: {
      grade: "E", confidence: "low",
      rationale:
        "An entirely unquantified service claim with no located document of any kind. There is no number to verify and no sanction order to point to. This is the weakest evidential position in the achievement set, and is representative of the wider corpus rather than exceptional.",
      confidence_rationale:
        "Low: nothing at all supports the claim beyond a single unread summary entry, and the claim as worded admits no test.",
      limitations: [
        "No count of centres, staff, locations or cases.",
        "No document of any type located.",
        "No page reference to the source volume.",
        "As stated, the claim is not falsifiable.",
      ],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: [
      "Government Order establishing the centres",
      "Number and location of centres",
      "Staffing and budget",
      "Caseload or service-delivery data",
      "Any user or independent assessment of service quality",
    ],
  },

  {
    id: "ev_coop_b16_societies", subject_type: "achievement", subject_id: "coop_b16_societies", domain: "agriculture",
    claim: "Co-operative societies modernised (PACS, marketing societies) across the state.",
    sources: [
      souvenir(460, rel(
        "That a co-operative modernisation programme was reported, locatable at page 460.",
        "What 'modernised' means, or how many societies were affected.",
        "caps", "modernisation")),
      law("Tamil Nadu co-operative societies legislation linked to this record (13 instruments)",
        "13 instruments, 2021–2026", "2021–2026", "https://www.stationeryprinting.tn.gov.in/archives.php",
        rel("That legislative activity on co-operatives occurred during the period — 13 instruments are linked to this record.",
          "That any society was modernised. None of the 13 has been read, so which of them even bears on modernisation is unknown. The link count flatters the evidence.",
          "raises", "legislative")),
      cagUC(rel(
        "Nothing about co-operatives. Independent evidence on general delivery assurance in the period.",
        "It does not name co-operative societies or this programme. State-level finding.",
        "caps", "modernisation")),
    ],
    components: [
      { id: "legislative", text: "Legislation affecting co-operative societies was enacted during the period.",
        status: "documented", grade: "D", confidence: "medium", evidence: [1],
        limitations: ["13 instruments linked, 0 read.",
          "Which instruments relate to modernisation is unknown."] },
      { id: "modernisation", text: "Co-operative societies (PACS, marketing societies) were modernised across the state.",
        status: "unquantified", grade: "E", confidence: "low", evidence: [0, 2],
        limitations: ["'Modernised' has no definition or criterion.",
          "No count of societies affected, against a total."] },
    ],
    assessment: {
      grade: "E", confidence: "low",
      rationale:
        "The largest set of linked legislative instruments in the pilot (13) plus a page reference, which looks like the best-evidenced record here. It is not: none of the 13 has been read, 'modernised' is undefined, and no delivery evidence exists. Legislative activity is documented; modernisation is not.",
      confidence_rationale:
        "Low: the headline component is undefined and unquantified, and the strong-looking legislative component is 13 unread titles.",
      limitations: [
        "13 linked instruments, 0 read — the link count flatters the evidence.",
        "'Modernised' has no definition or criterion.",
        "No count of societies affected.",
      ],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: [
      "Which of the 13 instruments actually relate to modernisation",
      "Definition of 'modernised' and the criterion applied",
      "Number of societies modernised, versus total",
      "Expenditure on the programme",
      "Any audit of co-operative society functioning",
    ],
  },

  {
    id: "ev_inf5", subject_type: "achievement", subject_id: "inf5", domain: "infrastructure",
    claim: "Modern integrated bus terminuses opened at Kilambakkam (Chennai) — the ₹393.74 cr Kalaignar Centenary Bus Terminus — and at Tiruchi.",
    sources: [
      souvenir(null, rel(
        "Both terminuses and the ₹393.74 cr cost figure for Kilambakkam.",
        "Completion, expenditure or operation of either facility. No page reference recorded.",
        "caps", "kilambakkam")),
      cagOffBudget(rel(
        "Nothing about these terminuses. Independent evidence on off-budget financing of state infrastructure.",
        "It does not name either terminus or the transport department. State-level finding about financing structure.",
        "caps", "kilambakkam")),
      notLocated("Construction contract and completion certificate",
        "A ₹393.74 cr capital project with no located tender, contract award or completion record.",
        rel("Nothing — recorded to make the absence visible.", "", "caps", "kilambakkam")),
    ],
    components: [
      { id: "kilambakkam", text: "The Kilambakkam terminus was built and opened at a cost of ₹393.74 cr.",
        status: "asserted_only", grade: "E", confidence: "low", evidence: [0, 1, 2],
        limitations: ["A precise cost figure with no located financial document.",
          "A capital project of this size would normally leave a substantial documentary trail."] },
      { id: "tiruchi", text: "A modern terminus was also opened at Tiruchi.",
        status: "asserted_only", grade: "E", confidence: "low", evidence: [0],
        limitations: ["Bundled with the Chennai claim; its status is not stated separately in the source."] },
    ],
    assessment: {
      grade: "E", confidence: "low",
      rationale:
        "A precise cost figure and a named facility make this highly checkable, yet no procurement, expenditure or completion document has been located. The absence reflects the state of this repository's collection rather than necessarily of the public record — but as held, nothing supports it.",
      confidence_rationale:
        "Low: both components rest on one unread source, and the Tiruchi facility is not separately evidenced at all.",
      limitations: [
        "A precise cost figure with no located financial document.",
        "Record is flagged mixedStatus in the main dataset.",
        "No page reference to the source volume.",
      ],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: [
      "Tender and contract award for Kilambakkam",
      "Expenditure records against the ₹393.74 cr figure",
      "Completion / commissioning certificate",
      "Passenger throughput showing the terminus is in use",
      "Status of the Tiruchi facility separately from Chennai",
    ],
  },

  {
    id: "ev_env_b4_thoonmai", subject_type: "achievement", subject_id: "env_b4_thoonmai", domain: "environment",
    claim: "Thoonmai Iyakkam (Clean Tamil Nadu) — over ₹133 cr returned to the treasury in 2025.",
    sources: [
      souvenir(null, rel(
        "The ₹133 cr treasury return figure and the programme's existence.",
        "Any treasury or accounting fact. This is a claim about public accounts supported only by a promotional volume, with no page reference.",
        "caps", "return")),
      cagUnspent(rel(
        "Nothing about this programme. Independent evidence that unspent balances and fund-flow timing were material issues in this period.",
        "It does not name Thoonmai Iyakkam, and does not characterise this ₹133 cr. State-level finding.",
        "caps", "return")),
      notLocated("Treasury receipt or departmental account",
        "A claim about money credited to the treasury, with no treasury credit record or departmental account located.",
        rel("Nothing — recorded to make the absence visible.", "", "caps", "return")),
    ],
    components: [
      { id: "return", text: "Over ₹133 cr was returned to the treasury in 2025.",
        status: "asserted_only", grade: "E", confidence: "low", evidence: [0, 1, 2],
        limitations: ["A treasury figure with no treasury document.",
          "'Returned to the treasury' is ambiguous — savings, recoveries and unspent balances are different things."] },
    ],
    assessment: {
      grade: "E", confidence: "low",
      rationale:
        "A specific financial claim about public accounts, with no financial document attached. Public accounts are precisely the class of record that can be independently verified, which makes the absence of any source here more significant than usual.",
      confidence_rationale:
        "Low: the single component is a precise accounting figure with an ambiguous meaning and no supporting record.",
      limitations: [
        "A treasury figure with no treasury document.",
        "Record is flagged mixedStatus in the main dataset.",
        "'Returned to the treasury' is ambiguous.",
        "No page reference to the source volume.",
      ],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: [
      "Treasury credit records or the relevant departmental account",
      "Definition of what the ₹133 cr represents",
      "Whether the figure appears in the CAG State Finances report",
      "Programme cost against which the return should be read",
    ],
  },
];

// ===============================================================
// 2. MANIFESTO PROMISES
// ===============================================================

const manifestoSource = (relationship) => ({
  source_type: "manifesto", authority: "party_source",
  title: "DMK Election Manifesto 2021",
  issuing_authority: "Dravida Munnetra Kazhagam",
  date: "2021", stage: "manifesto", extraction: "identified", stance: "contextual",
  document: docNotFetched(),
  relationship,
});

const trackerSource = (num, status, relationship) => ({
  source_type: "external_tracker", authority: "external_tracker",
  title: `Pudhiyavan DMK Manifesto 2021 Tracker — promise #${num}, status "${status}"`,
  issuing_authority: "Pudhiyavan (external, independent of this project and of the government)",
  date: "2026-07-18", stage: "context_only", extraction: "identified", stance: "contextual",
  document: docNotFetched(),
  relationship,
});

const promiseRecord = (num, maturity, claim, status, sources, components, assessment, missing) => ({
  id: `ev_promise_${num}`, subject_type: "promise", subject_id: String(num),
  domain: "manifesto", claim, maturity,
  sources: [
    manifestoSource(rel(
      "That the promise was made in the 2021 manifesto.",
      "Anything about whether it was kept. The text held here is a condensed English summary, not the manifesto's binding wording.",
      "none", "fulfilment")),
    trackerSource(num, status, rel(
      `That an external tracker assessed this promise as "${status}" on 18 July 2026.`,
      "That the assessment is correct. This project has not verified it; it is reproduced, not endorsed, and the tracker's criteria are not published.",
      "none", "fulfilment")),
    ...sources,
  ],
  components, assessment, missing,
});

const PROMISES_PILOT = [
  promiseRecord(8, "apparently completed",
    "Establish Tamil Chairs in international universities. Tracker status: fulfilled.", "fulfilled",
    [go("Government Order linked to promise #8", "Government of Tamil Nadu", null, null,
      rel("That an administrative order exists connected to this promise.",
        "What the order actually does — it is unread, so whether it sanctions a chair, funds one or merely proposes one is unknown.",
        "raises", "fulfilment"), "G.O. 23")],
    [{ id: "fulfilment", text: "Tamil Chairs were established in international universities.",
      status: "documented", grade: "D", confidence: "low", evidence: [0, 1, 2],
      limitations: ["The linked GO is unread.", "No count of chairs, universities or occupants.",
        "'Fulfilled' is the tracker's judgement, not this project's."] }],
    { grade: "D", confidence: "low",
      rationale: "Among the best-evidenced promises in the corpus: an external tracker marks it fulfilled and a Government Order is linked, so an administrative act is documented. Whether any chair was actually established, staffed and is teaching is not.",
      confidence_rationale: "Low: the sole supporting document is unread, so the grade rests on the existence of a GO rather than its contents.",
      limitations: ["The GO has not been read.", "'Fulfilled' is the tracker's judgement.", "No count of chairs or occupants."],
      verification_status: "unverified", assessed_on: "2026-07-21" },
    ["Contents of the linked GO", "Names of universities and chairs established", "Funding and occupancy status", "Whether any chair is currently active"]),

  promiseRecord(17, "apparently completed",
    "Create a Non-Resident Tamils Department. Tracker status: fulfilled.", "fulfilled",
    [go("Government Order linked to promise #17", "Government of Tamil Nadu", null, null,
      rel("That an administrative order exists connected to the creation of this department.",
        "The department's functioning, budget or staffing. Creation and effectiveness are different claims.",
        "raises", "fulfilment"), "G.O. 827")],
    [{ id: "fulfilment", text: "A Non-Resident Tamils Department was created.",
      status: "documented", grade: "D", confidence: "medium", evidence: [0, 1, 2],
      limitations: ["The linked GO is unread.", "Existence is not effectiveness."] }],
    { grade: "D", confidence: "medium",
      rationale: "Creating a department is one of the few promise types where a sanction order genuinely approaches fulfilment — a department either exists in the government's structure or it does not. A GO is linked, so the administrative act is documented.",
      confidence_rationale: "Medium: the claim type aligns unusually well with the evidence type, even though the GO itself is unread.",
      limitations: ["The GO has not been read.", "Departmental functioning, budget and staffing are unevidenced.", "Existence is not effectiveness."],
      verification_status: "unverified", assessed_on: "2026-07-21" },
    ["Contents of the linked GO", "Department budget and staffing", "Any output or service data"]),

  promiseRecord(18, "partially completed",
    "Revive the Lok Ayukta. Tracker status: modified.", "modified",
    [notLocated("Lok Ayukta appointment or amendment records",
      "No GO, Act or appointment notification located, so 'modified' cannot be distinguished from non-fulfilment.",
      rel("Nothing — recorded to make the absence visible.", "", "caps", "fulfilment"))],
    [{ id: "fulfilment", text: "The Lok Ayukta was revived.",
      status: "contested", grade: "E", confidence: "low", evidence: [0, 1, 2],
      limitations: ["No document of any kind located.", "'Modified' is undefined by the tracker.",
        "This project cannot distinguish partial fulfilment from non-fulfilment."] }],
    { grade: "E", confidence: "low",
      rationale: "Marked 'modified' by the tracker, a judgement this project cannot check without appointment and statutory records. An anti-corruption institution's revival is exactly the kind of promise where partial fulfilment is contestable and the documentary trail matters most.",
      confidence_rationale: "Low: no document at all, and the tracker's own category is undefined.",
      limitations: ["No document of any kind located.", "'Modified' is undefined.", "Partial fulfilment cannot be distinguished from non-fulfilment."],
      verification_status: "unverified", assessed_on: "2026-07-21" },
    ["Lok Ayukta appointment notifications", "Any amending legislation", "Case disposal statistics", "Budget and staffing of the institution"]),

  promiseRecord(19, "partially completed",
    "Pass a Right to Services Act. Tracker status: modified.", "modified",
    [notLocated("Right to Services Act or Bill",
      "No such Act or Bill was found among the 222 legislative instruments held in this repository, yet the tracker marks the promise 'modified'.",
      rel("Nothing — recorded to make the absence visible, and to record a divergence from the tracker.", "", "caps", "fulfilment"))],
    [{ id: "fulfilment", text: "A Right to Services Act was passed.",
      status: "contested", grade: "E", confidence: "low", evidence: [0, 1, 2],
      limitations: ["No matching statute among the 222 instruments held.",
        "Absence here may reflect this repository's coverage rather than the statute book.",
        "The tracker's 'modified' is unexplained."] }],
    { grade: "E", confidence: "low",
      rationale: "A legislative promise is uniquely checkable: either a statute was gazetted or it was not. This repository holds 222 legislative instruments for the period and none matching was located, yet the tracker marks it 'modified'. That divergence is recorded rather than resolved.",
      confidence_rationale: "Low: this project's legislative coverage is incomplete, so absence here is weak evidence either way.",
      limitations: ["No matching statute located in the instruments held.", "Coverage gap may explain the absence.", "The tracker's reasoning is unpublished."],
      verification_status: "unverified", assessed_on: "2026-07-21" },
    ["A search of the complete Tamil Nadu statute book, not just the instruments held here", "The tracker's reasoning for 'modified'"]),

  promiseRecord(1, "ongoing",
    "Fight to restore the state's lost rights. Tracker status: in progress.", "progress",
    [notLocated("Any measurable criterion",
      "This promise defines no outcome, so no document could settle it. The absence is structural, not a collection gap.",
      rel("Nothing — recorded to show why this claim is not gradeable.", "", "none", "fulfilment"))],
    [{ id: "fulfilment", text: "The state's 'lost rights' were restored.",
      status: "not_assessable", grade: "NG", ng_reason: "no_measurable_criteria", confidence: "high", evidence: [0, 1, 2],
      limitations: ["'Lost rights' is undefined, so no evidence could confirm or refute fulfilment.",
        "Graded NG rather than E: the problem is the claim's form, not missing documents."] }],
    { grade: "NG", ng_reason: "no_measurable_criteria", confidence: "high",
      rationale: "An open-ended political commitment with no criterion for fulfilment. Grading it E would imply that better evidence could settle it; nothing could. NG records that the claim is not evidence-testable as worded, which is a finding about the promise rather than about the research.",
      confidence_rationale: "High: we are confident this cannot be assessed. Confidence attaches to the NG determination itself, not to any factual claim.",
      limitations: ["No fulfilment criterion exists.", "The evidence ladder does not apply to open-ended political commitments."],
      verification_status: "unverified", assessed_on: "2026-07-21" },
    ["A definition of 'lost rights' and what restoration would look like", "Any milestone against which progress could be measured"]),

  promiseRecord(10, "ongoing",
    "Translate world books into Tamil and Tamil classics outward. Tracker status: in progress.", "progress",
    [souvenir(null, rel(
      "That a translation programme was reported; three achievement records in this dataset link to this promise.",
      "Independent corroboration. All three linked records trace to this same volume, so they are one source presented three times.",
      "caps", "fulfilment"))],
    [{ id: "fulfilment", text: "World books were translated into Tamil and Tamil classics outward.",
      status: "asserted_only", grade: "E", confidence: "low", evidence: [0, 1, 2],
      limitations: ["Three linked records share one underlying source; this is not corroboration.",
        "No publication list or catalogue record located."] }],
    { grade: "E", confidence: "low",
      rationale: "A countable promise — books translated is a number — linked to three achievement records, all of which trace to the same government summary volume. Multiple linked records create an impression of corroboration that a shared single source does not support.",
      confidence_rationale: "Low: apparent multiplicity of evidence collapses to one unread source.",
      limitations: ["Linked records share one source.", "No publication list located."],
      verification_status: "unverified", assessed_on: "2026-07-21" },
    ["A list of titles translated", "Publisher or catalogue records", "Distribution and availability data"]),

  promiseRecord(7, "announcement-only",
    "Revive the Classical Tamil Institute; Thirukkural as a national book. Tracker status: fulfilled.", "fulfilled",
    [notLocated("Any supporting document or linked record",
      "Nothing is linked to this promise in this dataset — no achievement record and no Government Order — yet it is counted in the public '400 fulfilled' headline.",
      rel("Nothing — recorded because the absence is the finding.", "", "caps", "institute"))],
    [{ id: "institute", text: "The Classical Tamil Institute was revived.",
      status: "asserted_only", grade: "E", confidence: "low", evidence: [0, 1, 2],
      limitations: ["Zero linked evidence of any kind.", "Counted in a public headline this project cannot substantiate."] },
     { id: "thirukkural", text: "Thirukkural was made a national book.",
      status: "not_assessable", grade: "NG", ng_reason: "responsible_authority_unclear", confidence: "high", evidence: [0, 1],
      limitations: ["Declaring a national book is a Union-government matter outside state control.",
        "The state cannot fulfil this unilaterally, so state action cannot settle it."] }],
    { grade: "E", confidence: "low",
      rationale: "Counted within the public '400 fulfilled' headline while this dataset holds nothing at all for it. One of 158 such promises, and the clearest demonstration that the headline is not reproducible from this project's own evidence. The compound structure also matters: the second half is not the state's to deliver.",
      confidence_rationale: "Low: no evidence exists for the gradeable component.",
      limitations: ["Zero linked evidence.", "Counted as fulfilled in a public headline this project cannot substantiate.",
        "Compound promise with one component outside state control."],
      verification_status: "unverified", assessed_on: "2026-07-21" },
    ["Any document at all", "Institute revival order, funding, staffing", "The tracker's basis for 'fulfilled'"]),

  promiseRecord(9, "announcement-only",
    "Refurbish Semmozhi Poonga; Semmozhi Park in all corporations. Tracker status: fulfilled.", "fulfilled",
    [notLocated("Any supporting document or linked record",
      "Nothing is linked to this promise in this dataset, despite one half being a precisely testable claim about every corporation.",
      rel("Nothing — recorded because the absence is the finding.", "", "caps", "refurbish"))],
    [{ id: "refurbish", text: "Semmozhi Poonga was refurbished.",
      status: "asserted_only", grade: "E", confidence: "low", evidence: [0, 1, 2],
      limitations: ["No works order or completion record located."] },
     { id: "all_corporations", text: "A Semmozhi Park was created in all corporations.",
      status: "asserted_only", grade: "E", confidence: "low", evidence: [0, 1, 2],
      limitations: ["'All corporations' is precisely testable and nothing here tests it.",
        "No list of corporations with and without a park exists."] }],
    { grade: "E", confidence: "low",
      rationale: "Marked fulfilled with nothing linked. The promise has two parts of very different difficulty — refurbishing one park, versus a park in every corporation — and a single 'fulfilled' status cannot represent both. Splitting them is exactly what the component model is for.",
      confidence_rationale: "Low: neither component has any evidence, and the harder one is the more testable.",
      limitations: ["Zero linked evidence.", "A compound promise flattened to one status by the tracker.",
        "'All corporations' is testable and untested."],
      verification_status: "unverified", assessed_on: "2026-07-21" },
    ["Works orders or completion records for any park", "A list of corporations with and without a Semmozhi Park"]),

  promiseRecord(2, "difficult to assess",
    "Move 'Education' from the Concurrent List back to the State List. Tracker status: stalled.", "stalled",
    [notLocated("Constitutional amendment record",
      "Fulfilment requires a Union constitutional amendment; no state document could evidence it, so the absence is structural.",
      rel("Nothing — recorded to show the authority problem.", "", "none", "fulfilment"))],
    [{ id: "fulfilment", text: "'Education' was moved from the Concurrent List to the State List.",
      status: "not_assessable", grade: "NG", ng_reason: "responsible_authority_unclear", confidence: "high", evidence: [0, 1, 2],
      limitations: ["Requires a Union constitutional amendment — outside the promising party's power.",
        "The ladder cannot distinguish inaction from action that could not succeed."] }],
    { grade: "NG", ng_reason: "responsible_authority_unclear", confidence: "high",
      rationale: "Fulfilment is outside the state government's power: it needs a constitutional amendment by the Union. The tracker's 'stalled' is descriptively accurate but says nothing about state effort. Grading this on a delivery ladder would misattribute responsibility, so NG is the honest outcome.",
      confidence_rationale: "High: the authority constraint is a matter of constitutional structure, not of evidence availability.",
      limitations: ["Outcome is not within the promising party's control.", "The ladder cannot separate inaction from impossibility."],
      verification_status: "unverified", assessed_on: "2026-07-21" },
    ["Assembly resolutions or formal representations to the Union", "Correspondence or litigation records"]),

  promiseRecord(4, "difficult to assess",
    "Oppose Hindi imposition; state languages as official languages. Tracker status: stalled.", "stalled",
    [souvenir(null, rel(
      "That language-policy positions were reported; two achievement records link to this promise.",
      "That the promise was kept or broken — opposition is a continuous stance with no completion state.",
      "none", "fulfilment"))],
    [{ id: "fulfilment", text: "Hindi imposition was opposed and state languages made official.",
      status: "not_assessable", grade: "NG", ng_reason: "not_objectively_assessable", confidence: "medium", evidence: [0, 1, 2],
      limitations: ["A continuous political posture has no completion state.",
        "'Stalled' may describe outcomes rather than effort.",
        "Any grade here would be read as a political judgement."] }],
    { grade: "NG", ng_reason: "not_objectively_assessable", confidence: "medium",
      rationale: "A continuous political posture rather than a deliverable. Two achievement records are linked, but opposition has no completion state, and the second half depends on Union acceptance. Marked 'stalled' by the tracker, which is itself a contestable characterisation of an ongoing position.",
      confidence_rationale: "Medium: the NG determination is sound, but reasonable people could argue the 'official languages' half is partly assessable.",
      limitations: ["No completion state exists for a continuous posture.", "'Stalled' may describe outcomes rather than effort.",
        "Highly politically contested; any grade would read as a political judgement."],
      verification_status: "unverified", assessed_on: "2026-07-21" },
    ["A criterion for what fulfilment would look like", "Record of formal state actions taken"]),
];

// ===============================================================
// 3. CONTESTED / HIGH-IMPACT CLAIMS
// ===============================================================

const CONTESTED = [
  {
    id: "ev_contested_investment_jobs", subject_type: "contested_claim", subject_id: "eco4",
    domain: "investment commitments / employment numbers",
    claim: "₹12 lakh crore of investment attracted and 35 lakh jobs created.",
    sources: [
      souvenir(null, rel(
        "Both the ₹12 lakh cr investment figure and the 35 lakh jobs figure.",
        "Whether 'attracted' means signed or realised, and whether any job exists. No page reference recorded.",
        "caps", "investment")),
      cagFiscal(rel(
        "Nothing about these figures. Independent fiscal context for large commitments made in this period.",
        "It does not name any investment programme or dispute these figures. State-level fiscal observation.",
        "none", "investment")),
      cagOffBudget(rel(
        "Nothing about these figures. Independent evidence that some state capital activity is financed outside the Consolidated Fund.",
        "It does not name this programme or assert that these investments were off-budget.",
        "none", "investment")),
      notLocated("MoU register and realisation data",
        "No register of signed MoUs, nor any data on how many converted into operating investment, has been located — so 'attracted' cannot be interpreted.",
        rel("Nothing — recorded to make the absence visible.", "", "caps", "investment")),
      notLocated("Employment verification (EPFO/ESI or state labour data)",
        "No independent employment dataset located to test the 35 lakh jobs figure, though such series exist nationally.",
        rel("Nothing — recorded to make the absence visible.", "", "caps", "jobs")),
    ],
    components: [
      { id: "investment", text: "₹12 lakh crore of investment was attracted.",
        status: "asserted_only", grade: "E", confidence: "low", evidence: [0, 1, 2, 3],
        limitations: ["'Attracted' almost certainly means MoUs signed, not capital deployed — the claim does not say which.",
          "No MoU register or realisation data located.",
          "No time base stated, so it cannot be compared with any other period."] },
      { id: "jobs", text: "35 lakh jobs were created.",
        status: "asserted_only", grade: "E", confidence: "low", evidence: [0, 4],
        limitations: ["No independent employment data of any kind.",
          "'Job created' is undefined — direct, indirect and projected are very different.",
          "This is the figure most likely to be quoted from this project."] },
    ],
    assessment: {
      grade: "E", confidence: "low",
      rationale:
        "The highest-impact economic claim in the project and among the least evidenced. Investment 'attracted' conventionally counts MoUs signed rather than capital deployed, and jobs 'created' at this scale requires an independent employment series to test. Neither is present.",
      confidence_rationale:
        "Low: both components are undefined in the claim itself, so even a supporting document might not settle what is being asserted.",
      limitations: [
        "'Attracted' is ambiguous between signed and realised.",
        "No independent employment data.",
        "No time base stated.",
        "This is the figure most likely to be quoted, and it is grade E.",
      ],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: [
      "MoU register with signed-versus-realised status",
      "Independent employment data (EPFO/ESI payroll, PLFS)",
      "Definition of 'job created' and whether it is direct, indirect or projected",
      "Sector and district breakdown",
      "Any independent economic evaluation",
    ],
  },

  {
    id: "ev_contested_growth_ranking", subject_type: "contested_claim", subject_id: "eco1",
    domain: "rankings",
    claim: "India's #1 growth state — GSDP growth of 11.19% in 2024-25, up from 0.07% in 2020-21.",
    sources: [
      souvenir(null, rel(
        "Both the 11.19% growth figure and the '#1 in India' ranking.",
        "The ranking, which requires a comparable inter-state table the volume does not cite. No page reference recorded.",
        "caps", "ranking")),
      cagGsdp(rel(
        "An independent official GSDP series for Tamil Nadu — the only independent figure available against which this project's GSDP claims can be sanity-checked.",
        "It does not confirm or refute the 11.19% figure. This is a state-level aggregate that names no scheme; the CAG covers 2023-24 and reports 13.71% growth over 2022-23, a different year on a different basis. Non-comparability is itself the finding.",
        "caps", "growth_rate")),
      notLocated("Comparable inter-state growth table",
        "No source ranking all states on the same basis and year has been located, so the '#1' claim has no foundation in this corpus.",
        rel("Nothing — recorded to make the absence visible.", "", "caps", "ranking")),
    ],
    components: [
      { id: "growth_rate", text: "GSDP growth was 11.19% in 2024-25, up from 0.07% in 2020-21.",
        status: "asserted_only", grade: "E", confidence: "low", evidence: [0, 1],
        limitations: ["The independent CAG figure covers 2023-24, not 2024-25 — not comparable.",
          "The 0.07% base year is the pandemic year, which flatters any growth comparison."] },
      { id: "ranking", text: "Tamil Nadu was India's #1 growth state.",
        status: "asserted_only", grade: "E", confidence: "low", evidence: [0, 2],
        limitations: ["No inter-state table attached.",
          "Unclear whether the ranking covers all states or only large states."] },
    ],
    assessment: {
      grade: "E", confidence: "low",
      rationale:
        "A ranking claim requires a comparable series across all states for the same year on the same basis; none is attached. The CAG independently reports GSDP growth of 13.71% over 2022-23 — a real independent figure, but for a different year and basis, so it neither confirms nor refutes the claim. Recording that non-comparability is more useful than forcing a verdict.",
      confidence_rationale:
        "Low: the only independent figure available is not comparable, and the base year choice materially affects the headline.",
      limitations: [
        "CAG covers 2023-24; the claim covers 2024-25.",
        "The 0.07% base year is the pandemic year.",
        "'#1' is unsourced.",
      ],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: [
      "An inter-state GSDP growth table for the same year and basis",
      "The 2024-25 CAG or DES figure for Tamil Nadu",
      "Whether the ranking covers all states or only large states",
      "Constant-price as well as current-price figures",
    ],
  },

  {
    id: "ev_contested_free_bus", subject_type: "contested_claim", subject_id: "wom1",
    domain: "beneficiary counts",
    claim: "71.81 lakh women travel free daily under Vidiyal Payanam; 862 crore trips to January 2026, saving ₹13,820 crore.",
    sources: [
      souvenir(null, rel(
        "The daily rider figure, the cumulative trip count and the savings estimate.",
        "Any of them independently — a daily ridership figure of this precision must come from a ticketing system whose output is not cited.",
        "caps", "ridership")),
      cagUnspent(rel(
        "Nothing about this scheme. Independent evidence about fund-flow reliability in the period.",
        "It does not name this scheme or the transport corporations, and does not address whether the subsidy was reimbursed.",
        "caps", "reimbursement")),
      notLocated("Transport corporation ridership returns",
        "No ticketing or ridership dataset located, so the daily figure cannot be checked at any level.",
        rel("Nothing — recorded to make the absence visible.", "", "caps", "ridership")),
      notLocated("Reimbursement accounts to transport corporations",
        "No record of the subsidy actually paid to operators located, so the fiscal side of the scheme is undocumented.",
        rel("Nothing — recorded to make the absence visible.", "", "caps", "reimbursement")),
    ],
    components: [
      { id: "ridership", text: "71.81 lakh women travel free daily; 862 crore trips to January 2026.",
        status: "asserted_only", grade: "E", confidence: "low", evidence: [0, 2],
        limitations: ["No ticketing data attached.",
          "Daily riders and unique beneficiaries are different measures; the claim does not distinguish them."] },
      { id: "savings", text: "The scheme saved women ₹13,820 crore.",
        status: "modelled", grade: "E", confidence: "low", evidence: [0],
        limitations: ["A derived estimate, not a measurement.",
          "Depends on an assumed fare and an assumed counterfactual journey; the model is not published."] },
      { id: "reimbursement", text: "The fare subsidy was borne and settled by the state.",
        status: "asserted_only", grade: "E", confidence: "low", evidence: [1, 3],
        limitations: ["Not claimed explicitly in the headline but implied by it.",
          "No reimbursement accounts located."] },
    ],
    assessment: {
      grade: "E", confidence: "low",
      rationale:
        "The most-quoted beneficiary figure in the project. A daily ridership number of this precision must come from a ticketing system, and that system's output has not been located. The ₹13,820 crore saving is a derived estimate whose method is unpublished — it depends on an assumed fare and an assumed counterfactual journey.",
      confidence_rationale:
        "Low: one component is modelled rather than measured, and the measurement that would anchor it does not exist in this corpus.",
      limitations: [
        "No ticketing data attached.",
        "The savings figure is modelled, and the model is not published.",
        "Daily trips and unique beneficiaries are conflated.",
        "Whether the subsidy was reimbursed is unevidenced.",
      ],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: [
      "Ticketing/ridership data from the transport corporations",
      "The method behind the ₹13,820 cr savings estimate",
      "Reimbursement accounts showing the subsidy was paid",
      "Distinction between daily trips and unique beneficiaries",
    ],
  },

  {
    id: "ev_contested_doorstep_health", subject_type: "contested_claim", subject_id: "hea1",
    domain: "beneficiary counts",
    claim: "Makkalai Thedi Maruthuvam doorstep medical care has reached 2.59 crore people.",
    sources: [
      souvenir(null, rel(
        "The 2.59 crore beneficiary figure — roughly a third of the state's population.",
        "What 'reached' means, or whether the count is of unique people or of visits. No page reference recorded.",
        "caps", "reach")),
      cagUC(rel(
        "Nothing about this programme. Independent evidence on delivery assurance generally in the period.",
        "It does not name this programme or dispute its beneficiary count. State-level finding.",
        "caps", "reach")),
      notLocated("HMIS or programme MIS extract",
        "No health management information system extract located, although the Union HMIS holds comparable data and is catalogued in this project's source registry but has never been fetched.",
        rel("Nothing — recorded to make the absence visible, and to note that verification is available in principle.", "", "caps", "reach")),
    ],
    components: [
      { id: "reach", text: "The programme reached 2.59 crore people.",
        status: "asserted_only", grade: "E", confidence: "low", evidence: [0, 1, 2],
        limitations: ["No programme MIS or HMIS extract attached.",
          "'Reached' is undefined — a single screening and continuing treatment are very different.",
          "Cumulative counts may double-count repeat visits."] },
    ],
    assessment: {
      grade: "E", confidence: "low",
      rationale:
        "A beneficiary count of roughly a third of the state's population, with no programme data attached. This is a case where independent verification is genuinely available in principle: the Union HMIS holds comparable data and is catalogued in this project's source registry, but has never been retrieved.",
      confidence_rationale:
        "Low: the key term is undefined and the obvious verification route exists but is unused, so the figure is neither supported nor tested.",
      limitations: [
        "No programme MIS or HMIS extract attached.",
        "'Reached' is undefined.",
        "Cumulative counts may double-count repeat visits.",
      ],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: [
      "Programme MIS extract with unique-beneficiary counts",
      "Union HMIS comparison data (catalogued in the registry, never fetched)",
      "Definition of 'reached'",
      "Any health-outcome data attributable to the programme",
    ],
  },

  {
    id: "ev_contested_hospital_completion", subject_type: "contested_claim", subject_id: "hea4",
    domain: "major infrastructure completion",
    claim: "A 1,000-bed super-speciality hospital was completed and opened on 15 June 2023 at a cost of ₹240 crore.",
    sources: [
      souvenir(null, rel(
        "The completion, the bed count, the opening date and the cost.",
        "Any of them independently. No page reference recorded.",
        "caps", "capacity_cost")),
      go("Pay Ward — Formation of Pay wards in Kalaignar Centenary Super Speciality Hospital, Guindy",
        "Health and Family Welfare Department, Government of Tamil Nadu", "18-03-2025",
        "https://cms.tn.gov.in/cms_migrated/document/GO/hfw_e_69_2025.pdf",
        rel("That the hospital was operating as a functioning facility by March 2025.",
          "The bed count, the opening date or the ₹240 cr cost. A pay-ward order is being used as existence evidence — legitimate, but it is not what the order is for.",
          "raises", "operating")),
      cagUC(rel(
        "Nothing about this hospital. Independent evidence on the reliability of spend-to-delivery assurance.",
        "It does not name this hospital or this project. State-level finding.",
        "caps", "capacity_cost")),
      notLocated("Completion certificate and final bill",
        "Neither located for a ₹240 cr capital project, so the completion claim itself is undocumented.",
        rel("Nothing — recorded to make the absence visible.", "", "caps", "capacity_cost")),
    ],
    components: [
      { id: "operating", text: "The hospital is complete and operating.",
        status: "documented", grade: "D", confidence: "high", evidence: [0, 1],
        limitations: ["Inferred from a pay-ward order, which presupposes wards in use but is not a completion record."] },
      { id: "capacity_cost", text: "It has 1,000 beds and cost ₹240 crore, opening on 15 June 2023.",
        status: "asserted_only", grade: "E", confidence: "low", evidence: [0, 2, 3],
        limitations: ["No completion certificate, bed notification or final bill located.",
          "Three distinct figures bundled into one claim."] },
    ],
    assessment: {
      grade: "E", confidence: "low",
      rationale:
        "Included deliberately as the strongest completion claim in the pilot, to test whether the model can distinguish 'the facility demonstrably exists and operates' from 'the specific completion claim is verified'. A 2025 GO establishes the first at grade D. The second — beds, date, cost — has nothing, so the parent rolls up to E. Before components existed, this record graded D and looked better evidenced than it is.",
      confidence_rationale:
        "Low: the well-evidenced component is not the one the claim is really making.",
      limitations: [
        "Operation is documented; the specific figures are not.",
        "A pay-ward GO is being used as existence evidence.",
        "No completion certificate for a major capital project.",
      ],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: [
      "Completion certificate and final contract bill",
      "Bed-strength notification",
      "Opening-date record independent of the souvenir",
      "Utilisation data showing the beds are staffed and in use",
    ],
  },
];

export const EVIDENCE_PILOT = [...ACHIEVEMENTS, ...PROMISES_PILOT, ...CONTESTED];
