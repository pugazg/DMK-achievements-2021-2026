/* ============================================================
   EVIDENCE PILOT CORPUS — Phase C0.

   25 subjects: 10 achievements (one per domain), 10 manifesto
   promises across maturity levels, 5 contested high-impact claims.

   HONESTY RULES OBSERVED WHILE BUILDING THIS FILE
   - Every `url`, `document_no`, `date` and `quote` below is either
     already held in this repo's datasets, or was fetched on
     2026-07-21 and hashed into sources/pilot_c0/manifest.tsv.
   - Where a document was fetched but not read, extraction is
     "retrieved", not "parsed". Where it was never opened,
     "identified". Nothing is upgraded on the strength of a
     plausible-sounding title.
   - `missing` is filled in for every record. An empty `missing`
     would mean nobody looked, which is worse than a long list.
   - CAG quotes are verbatim from the Executive Summary of the
     State Finances Audit Report 2023-24 (Report No. 2 of 2025),
     retrieved and text-extracted on 2026-07-21.

   The CAG findings are STATE-LEVEL fiscal observations. They are
   attached as `contextual` or `contrary` where they bear on the
   claim's class (delivery assurance, spend-versus-outcome), and
   are explicitly NOT presented as findings about the individual
   scheme — no CAG paragraph in this pilot names any of these
   schemes. That distinction is recorded in each source's `note`.
   ============================================================ */

export const PILOT_META = {
  version: "1.0",
  compiled: "2026-07-21",
  methodology: "1.0",
  purpose:
    "Validate that the evidence model can represent a complete picture — supporting and adverse — before any bulk ingestion.",
  fetch_manifest: "sources/pilot_c0/manifest.tsv",
};

/* Sources reused across records. Defined once so a document's
   metadata cannot drift between the records that cite it. */
const CAG_SFAR = {
  source_type: "audit",
  authority: "audit",
  title:
    "Report of the Comptroller and Auditor General of India on State Finances for the year ended 31 March 2024 (Report No. 2 of 2025), Executive Summary",
  issuing_authority: "Comptroller and Auditor General of India / Principal Accountant General (Audit-I), Tamil Nadu",
  document_no: "Report No. 2 of 2025",
  date: "2025",
  url: "https://cag.gov.in/uploads/download_audit_report/2025/5_Executive-Summary-068f705993d63b5.26103778.pdf",
  sha256: "3cab4ca020bcfc98d82f2294ff5ed6ccdf59edc991ad927184a5b618be023a21",
  retrieved_at: "2026-07-21",
  stage: "independent_audit",
  extraction: "quoted",
};

const cagUC = {
  ...CAG_SFAR,
  reference: "Executive Summary — Outstanding Utilisation Certificates",
  stance: "contrary",
  quote:
    "Despite the requirement of submitting Utilisation Certificates (UCs) against conditional grants within a stipulated time period, 111 outstanding UCs of ₹2,805.94 crore were pending as on 31 March 2024. Non-submission of UCs indicates the failure of the departmental officers to comply with the rules to ensure accountability.",
  note:
    "State-level finding. Does not name this scheme. Attached because it is direct independent evidence that, in this state and period, released funds do not reliably evidence delivery — which is exactly the inference a reader might otherwise draw from a sanction document.",
};

const cagUnspent = {
  ...CAG_SFAR,
  reference: "Executive Summary — Single Nodal Agency accounts",
  stance: "contrary",
  quote:
    "As of 31 March 2024, the unspent amounts lying in the SNA Accounts was ₹10,083.87 crore. There were delays ranged between one day and 106 days in release of GOI share and State Government share to SNA in seven schemes.",
  note:
    "State-level finding; does not name this scheme. Evidence that allocation and release are not the same as expenditure, and that release delays are systemic rather than exceptional.",
};

const cagFiscal = {
  ...CAG_SFAR,
  reference: "Executive Summary — Receipt-Expenditure Mismatch",
  stance: "contextual",
  quote:
    "The continuous mismatch between receipts and expenditure indicates rising fiscal stress. Revenue deficit increased from ₹36,215 crore to ₹45,121 crore registering 24.59 per cent increase over 2022-23, while fiscal deficit increased significantly from ₹81,886 crore in 2022-23 to ₹90,430 crore in 2023-24.",
  note: "Fiscal context for any large spending commitment in this period. Names no scheme.",
};

const cagGsdp = {
  ...CAG_SFAR,
  reference: "Executive Summary — GSDP",
  stance: "contrary",
  quote:
    "Gross State Domestic Product (GSDP) (at current prices) grew at an average growth rate of 10.92 per cent from ₹17,43,144 crore in 2019-20 to ₹27,21,571 crore in 2023-24. There was 13.71 per cent growth in GSDP over 2022-23.",
  note:
    "State-level figure; names no scheme. Independent official GSDP number, on a different base year from the claim it is attached to. Marked contrary because it is the only independent figure available against which this project's GSDP claims can be sanity-checked, and the two are not directly comparable — which is itself the finding.",
};

const cagOffBudget = {
  ...CAG_SFAR,
  reference: "Executive Summary — Off-Budget Borrowings and Guarantees",
  stance: "contrary",
  quote:
    "The State Government, through Public Sector Undertaking, raised ₹1,672.01 crore as off-budget borrowings, which did not flow into the Consolidated Fund of the State but are required to be repaid and serviced through budget. The total outstanding guarantees of the State Government were ₹1,22,269.91 crore as on 31 March 2024.",
  note:
    "State-level finding. Relevant wherever a headline investment or infrastructure figure may be financed off-budget; names no scheme.",
};

const souvenir = (page) => ({
  source_type: "announcement",
  authority: "primary_official",
  title: "Tamil Nadu Government 2021–26 achievements record (souvenir / minister-by-minister volumes)",
  issuing_authority: "Government of Tamil Nadu",
  date: "2026",
  page: page ?? null,
  stage: "announcement",
  extraction: page ? "identified" : "identified",
  stance: "supporting",
  note: page
    ? `Page ${page} recorded, so the claim can be located in the volume. The volume itself is not digitised in this repository.`
    : "No page reference recorded — this claim cannot be spot-checked by a reader against the source volume.",
});

const NOT_SOUGHT = (what, why) => ({
  source_type: "other",
  authority: "other",
  title: `${what} — not located`,
  issuing_authority: "n/a",
  stage: "context_only",
  extraction: "unavailable",
  stance: "contextual",
  note: why,
});

// ---------------------------------------------------------------
// 1. ACHIEVEMENTS — one per requested domain, varied evidence maturity
// ---------------------------------------------------------------

const ACHIEVEMENTS = [
  {
    id: "ev_hea4",
    subject_type: "achievement",
    subject_id: "hea4",
    domain: "health",
    claim: "Kalaignar Super-Speciality Hospital — a 1,000-bed hospital with 15 operating theatres at Guindy, opened 15 June 2023 for ₹240 cr plus ₹146 cr of equipment.",
    sources: [
      souvenir(null),
      {
        source_type: "go", authority: "primary_official",
        title: "Pay Ward — Formation of Pay wards in Kalaignar Centenary Super Speciality Hospital, Guindy",
        issuing_authority: "Health and Family Welfare Department, Government of Tamil Nadu",
        date: "18-03-2025",
        url: "https://cms.tn.gov.in/cms_migrated/document/GO/hfw_e_69_2025.pdf",
        stage: "administrative_sanction", extraction: "identified", stance: "supporting",
        note: "Confirms the hospital exists and is operating in 2025. Does NOT evidence the bed count, the opening date, or the construction cost — it is about pay-ward formation.",
      },
      {
        source_type: "go", authority: "primary_official",
        title: "Establishment — Further continuance of 217 temporary posts attached to the hospital",
        issuing_authority: "Health and Family Welfare Department, Government of Tamil Nadu",
        date: "11-09-2025",
        url: "https://cms.tn.gov.in/cms_migrated/document/GO/hfw_e_1016_2025_D.pdf",
        stage: "administrative_sanction", extraction: "identified", stance: "supporting",
        note: "Staffing continuance. Independent of the capacity claim.",
      },
      cagUC,
      NOT_SOUGHT("Completion certificate / commissioning record", "No work-completion or commissioning document has been located. The 1,000-bed figure rests on the government's own summary."),
    ],
    assessment: {
      grade: "D",
      rationale:
        "Two Government Orders confirm the hospital exists and is staffed and operating, so an administrative sanction and ongoing operation are documented. Neither GO evidences the headline claim itself — bed count, opening date and cost all come from the government's own summary volume. Sanction is proven; capacity and cost are asserted.",
      limitations: [
        "No GO or completion record attests the 1,000-bed figure.",
        "The ₹240 cr construction and ₹146 cr equipment figures have no located budget or expenditure document.",
        "Record is flagged mixedStatus: its own detail text mixes delivered with planned components.",
        "No page reference to the source volume, so a reader cannot spot-check the claim.",
      ],
      verification_status: "unverified",
      assessed_on: "2026-07-21",
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
    id: "ev_edu3",
    subject_type: "achievement",
    subject_id: "edu3",
    domain: "education",
    claim: "10 lakh free laptops distributed to students, with 10 lakh more planned; a college laptop scheme launched 5 January 2026.",
    sources: [
      souvenir(null),
      NOT_SOUGHT("Procurement tender for laptop supply", "No tender or contract-award document has been located for a procurement of this scale."),
      NOT_SOUGHT("Distribution/beneficiary records", "No district-wise or institution-wise distribution record has been located."),
      cagUnspent,
    ],
    assessment: {
      grade: "E",
      rationale:
        "No Government Order, tender, contract or delivery record has been located for a procurement that would be one of the largest single hardware purchases in the state. The claim rests entirely on the government's own summary volume, and the record's own text mixes 10 lakh delivered with 10 lakh planned.",
      limitations: [
        "Nothing beyond the government's own publication supports this.",
        "The headline conflates delivered (10 lakh) with planned (10 lakh more).",
        "The January 2026 college scheme post-dates the data cut-off for outcome purposes.",
        "No page reference to the source volume.",
      ],
      verification_status: "unverified",
      assessed_on: "2026-07-21",
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
    id: "ev_soc_b7_hostels",
    subject_type: "achievement",
    subject_id: "soc_b7_hostels",
    domain: "welfare",
    claim: "Hostels and buildings for Backward, Most Backward, Denotified, SC/ST and minority students built, maintained and upgraded across the state.",
    sources: [
      souvenir(287),
      {
        source_type: "legislation", authority: "legislative",
        title: "An Act to repeal the Tamil Nadu Building and Construction Workers (Conditions of Employment) Act",
        issuing_authority: "Tamil Nadu Legislative Assembly / Dept. of Stationery & Printing",
        document_no: "Act 3 of 2023", date: "2023",
        url: "https://www.stationeryprinting.tn.gov.in/extraordinary/2023/",
        stage: "context_only", extraction: "identified", stance: "contextual",
        note: "Linked in the dataset to this record, but it is a construction-labour statute. It provides legislative context, NOT evidence that any hostel was built. Recorded as context_only for that reason.",
      },
      cagUC,
      NOT_SOUGHT("Hostel-wise completion records", "The claim is quantified only as 'hundreds', with no located list of works."),
    ],
    assessment: {
      grade: "E",
      rationale:
        "The page reference makes the claim locatable in the source volume, which is more than most records offer. But the only linked legal instrument is a construction-labour statute unrelated to hostel delivery, and the claim itself is unquantified ('hundreds'). No sanction document specific to these works has been located.",
      limitations: [
        "The linked Act is contextual only and does not evidence any construction.",
        "The claim is unquantified, so it cannot be verified even in principle as stated.",
        "Record status is 'ongoing', but the summary framing reads as completed work.",
      ],
      verification_status: "unverified",
      assessed_on: "2026-07-21",
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
    id: "ev_inf_b15_cumta",
    subject_type: "achievement",
    subject_id: "inf_b15_cumta",
    domain: "transport",
    claim: "CUMTA — Chennai Unified Metropolitan Transport Authority integrating city transport; 5 lakh+ 'Chennai One' users.",
    sources: [
      souvenir(452),
      {
        source_type: "legislation", authority: "legislative",
        title: "The Chennai Unified Metropolitan Transport Authority Act",
        issuing_authority: "Tamil Nadu Legislative Assembly / Dept. of Stationery & Printing",
        document_no: "Act of 2024", date: "2024",
        url: "https://www.stationeryprinting.tn.gov.in/extraordinary/2024/",
        stage: "administrative_sanction", extraction: "identified", stance: "supporting",
        note: "Directly on point: this statute creates the authority the claim describes. Strong evidence that CUMTA exists in law.",
      },
      {
        source_type: "legislation", authority: "legislative",
        title: "The Chennai Unified Metropolitan Transport Authority Bill",
        issuing_authority: "Tamil Nadu Legislative Assembly",
        document_no: "Bill 13 of 2024", date: "2024",
        url: "https://www.stationeryprinting.tn.gov.in/extraordinary/2024/",
        stage: "administrative_sanction", extraction: "identified", stance: "contextual",
        note: "The Bill preceding the Act — evidences the legislative stage, not delivery.",
      },
      NOT_SOUGHT("Chennai One ridership dataset", "The 5 lakh user figure has no located independent or departmental dataset behind it."),
    ],
    assessment: {
      grade: "D",
      rationale:
        "A gazetted Act creates the authority, which is the strongest documentary position any record in this pilot reaches. That evidences legal existence and administrative sanction. It says nothing about the 5 lakh 'Chennai One' user figure, which is a delivery/adoption claim with no located source.",
      limitations: [
        "The Act evidences CUMTA's creation, not transport integration in practice.",
        "The 5 lakh user figure is unsupported by any located dataset.",
        "'Integration' is not defined in the claim, so there is no criterion to test.",
      ],
      verification_status: "unverified",
      assessed_on: "2026-07-21",
    },
    missing: [
      "Chennai One registration or active-user data",
      "Evidence of operational integration between transport operators",
      "CUMTA budget allocation and expenditure",
      "Any independent assessment of the authority's functioning",
    ],
  },
  {
    id: "ev_rur_b2_housing",
    subject_type: "achievement",
    subject_id: "rur_b2_housing",
    domain: "urban development",
    claim: "Kalaignar Kanavu Illam rural housing — 2 lakh houses, ₹6,600 cr; in 2024-25 the full one lakh sanctioned houses were completed within the ₹3,500 cr allocation.",
    sources: [
      souvenir(269),
      cagUnspent,
      cagUC,
      NOT_SOUGHT("Scheme Government Order", "No GO for this flagship scheme is present in the embedded GO dataset."),
      NOT_SOUGHT("Completion certificates for the claimed one lakh houses", "No completion or physical-progress record located."),
    ],
    assessment: {
      grade: "E",
      rationale:
        "A page reference exists, but this is a completion claim — 'the full one lakh sanctioned houses were completed' — with no sanction document, no expenditure record and no completion certificate located. The CAG's state-level findings on unspent SNA balances and 111 pending utilisation certificates are directly relevant to the class of assurance this claim needs, without naming the scheme.",
      limitations: [
        "A specific completion claim rests solely on the government's own summary.",
        "Independent audit evidence shows release-to-spend gaps are systemic in this period, which is the exact assurance this claim lacks.",
        "The 2 lakh / ₹6,600 cr headline mixes the whole scheme with the one-year figure.",
      ],
      verification_status: "unverified",
      assessed_on: "2026-07-21",
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
    id: "ev_eco_b2_tidel",
    subject_type: "achievement",
    subject_id: "eco_b2_tidel",
    domain: "industry",
    claim: "Mini Tidel Parks built at Villupuram, Vellore, Thanjavur, Thoothukudi, Salem and Tiruppur — 6 done, 10 planned.",
    sources: [
      souvenir(null),
      cagOffBudget,
      NOT_SOUGHT("TIDEL/ELCOT project completion records", "No completion or commissioning record located for any of the six named parks."),
    ],
    assessment: {
      grade: "E",
      rationale:
        "Six named locations make this a specific and checkable claim, which is a strength. But no sanction, tender, completion or occupancy document has been located for any of them. The CAG finding on off-budget borrowing through public sector undertakings is relevant context, since such parks are typically built through PSUs.",
      limitations: [
        "Six specific completion claims, none documented beyond the government's summary.",
        "'Done' is not defined — built, commissioned, or occupied are different things.",
        "No page reference to the source volume.",
      ],
      verification_status: "unverified",
      assessed_on: "2026-07-21",
    },
    missing: [
      "Completion or commissioning records for each of the six parks",
      "Occupancy / tenancy data showing the parks are in use",
      "Capital cost and funding route for each park",
      "Whether any were financed via off-budget borrowing",
    ],
  },
  {
    id: "ev_wom_b2_gender",
    subject_type: "achievement",
    subject_id: "wom_b2_gender",
    domain: "women/social welfare",
    claim: "Gender Resource / Vanavil Centres providing counselling and legal aid.",
    sources: [
      souvenir(null),
      NOT_SOUGHT("Centre-wise establishment orders", "No GO establishing the centres has been located."),
      NOT_SOUGHT("Service-usage data", "No caseload, counselling or legal-aid usage data has been located."),
    ],
    assessment: {
      grade: "E",
      rationale:
        "An entirely unquantified service claim with no located document of any kind. There is no number to verify and no sanction order to point to. This is the weakest evidential position in the achievement set, and is representative of the corpus rather than exceptional.",
      limitations: [
        "No count of centres, staff, locations or cases.",
        "No document of any type located.",
        "No page reference to the source volume.",
        "As stated, the claim is not falsifiable.",
      ],
      verification_status: "unverified",
      assessed_on: "2026-07-21",
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
    id: "ev_coop_b16_societies",
    subject_type: "achievement",
    subject_id: "coop_b16_societies",
    domain: "agriculture",
    claim: "Co-operative societies modernised (PACS, marketing societies) across the state.",
    sources: [
      souvenir(460),
      {
        source_type: "legislation", authority: "legislative",
        title: "Tamil Nadu co-operative societies legislation linked to this record (13 instruments)",
        issuing_authority: "Tamil Nadu Legislative Assembly / Dept. of Stationery & Printing",
        date: "2021–2026",
        url: "https://www.stationeryprinting.tn.gov.in/archives.php",
        stage: "administrative_sanction", extraction: "identified", stance: "supporting",
        note: "13 legislative instruments are linked to this record in the dataset. They evidence legislative activity on co-operatives; none has been read, so which of them bears on 'modernisation' is unknown.",
      },
      cagUC,
    ],
    assessment: {
      grade: "D",
      rationale:
        "The largest set of linked legislative instruments in the pilot (13) plus a page reference. Legislative activity on co-operatives is well documented. But 'modernised' is undefined, none of the 13 instruments has been read, and no delivery evidence exists — so the documentation supports legislative action, not modernisation of any society.",
      limitations: [
        "13 linked instruments, 0 read — the link count flatters the evidence.",
        "'Modernised' has no definition or criterion.",
        "No count of societies affected.",
      ],
      verification_status: "unverified",
      assessed_on: "2026-07-21",
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
    id: "ev_inf5",
    subject_type: "achievement",
    subject_id: "inf5",
    domain: "infrastructure",
    claim: "Modern integrated bus terminuses opened at Kilambakkam (Chennai) — the ₹393.74 cr Kalaignar Centenary Bus Terminus — and at Tiruchi.",
    sources: [
      souvenir(null),
      cagOffBudget,
      NOT_SOUGHT("Construction contract and completion certificate", "No tender, contract award or completion record located for a ₹393.74 cr project."),
    ],
    assessment: {
      grade: "E",
      rationale:
        "A precise cost figure (₹393.74 cr) and a named facility make this highly checkable, yet no procurement, expenditure or completion document has been located. A capital project of this size would normally generate a substantial documentary trail; its absence here reflects the state of this repository's collection, not necessarily of the record.",
      limitations: [
        "A precise cost figure with no located financial document behind it.",
        "Record is flagged mixedStatus — delivered and planned components are mixed.",
        "No page reference to the source volume.",
      ],
      verification_status: "unverified",
      assessed_on: "2026-07-21",
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
    id: "ev_env_b4_thoonmai",
    subject_type: "achievement",
    subject_id: "env_b4_thoonmai",
    domain: "environment",
    claim: "Thoonmai Iyakkam (Clean Tamil Nadu) — over ₹133 cr returned to the treasury in 2025.",
    sources: [
      souvenir(null),
      cagUnspent,
      NOT_SOUGHT("Treasury receipt or departmental account", "No treasury credit record or departmental account located for the ₹133 cr figure."),
    ],
    assessment: {
      grade: "E",
      rationale:
        "A specific financial claim — money returned to the treasury — with no financial document attached. This is a claim about public accounts, and public accounts are precisely the class of record that can be independently verified, which makes the absence of any source more significant than usual.",
      limitations: [
        "A treasury figure with no treasury document.",
        "Record is flagged mixedStatus.",
        "'Returned to the treasury' is ambiguous — savings, recoveries and unspent balances are different things.",
        "No page reference to the source volume.",
      ],
      verification_status: "unverified",
      assessed_on: "2026-07-21",
    },
    missing: [
      "Treasury credit records or the relevant departmental account",
      "Definition of what the ₹133 cr represents",
      "Whether the figure appears in the CAG State Finances report",
      "Programme cost against which the return should be read",
    ],
  },
];

// ---------------------------------------------------------------
// 2. MANIFESTO PROMISES — across maturity levels
// ---------------------------------------------------------------

const trackerSource = (num, status) => ({
  source_type: "external_tracker",
  authority: "external_tracker",
  title: `Pudhiyavan DMK Manifesto 2021 Tracker — promise #${num}, status "${status}"`,
  issuing_authority: "Pudhiyavan (external, independent of this project and of the government)",
  date: "2026-07-18",
  stage: "context_only",
  extraction: "identified",
  stance: "contextual",
  note: "This is the ONLY basis for the status shown in the interface. This project has not verified it. It is an external judgement, reproduced.",
});

const manifestoSource = {
  source_type: "manifesto",
  authority: "party_source",
  title: "DMK Election Manifesto 2021",
  issuing_authority: "Dravida Munnetra Kazhagam",
  date: "2021",
  stage: "manifesto",
  extraction: "identified",
  stance: "contextual",
  note: "The promise text in this dataset is a condensed English summary, not the manifesto's binding wording. The original has not been parsed.",
};

const promise = (n, subject_id, claim, status, extra) => ({
  id: `ev_promise_${subject_id}`,
  subject_type: "promise",
  subject_id: String(subject_id),
  domain: "manifesto",
  claim,
  maturity: n,
  ...extra,
  sources: [manifestoSource, trackerSource(subject_id, status), ...(extra.sources || [])],
});

const PROMISES_PILOT = [
  promise("apparently completed", 8,
    "Establish Tamil Chairs in international universities. Tracker status: fulfilled.",
    "fulfilled", {
    sources: [{
      source_type: "go", authority: "primary_official",
      title: "Government Order linked to promise #8 (G.O. 23)",
      issuing_authority: "Government of Tamil Nadu", document_no: "G.O. 23",
      stage: "administrative_sanction", extraction: "identified", stance: "supporting",
      note: "A GO is linked to this promise in promiseGoLinks. It has not been read, so whether it sanctions a chair, funds one, or merely proposes one is unknown.",
    }],
    assessment: {
      grade: "D",
      rationale:
        "Among the best-evidenced promises in the corpus: an external tracker marks it fulfilled AND a Government Order is linked. Sanction is documented. Whether any chair was actually established, staffed and is teaching is not.",
      limitations: [
        "The GO has not been read.",
        "'Fulfilled' is the tracker's judgement, not this project's.",
        "No count of chairs, universities or occupants.",
      ],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: ["Contents of the linked GO", "Names of universities and chairs established", "Funding and occupancy status", "Whether any chair is currently active"],
  }),
  promise("apparently completed", 17,
    "Create a Non-Resident Tamils Department. Tracker status: fulfilled.",
    "fulfilled", {
    sources: [{
      source_type: "go", authority: "primary_official",
      title: "Government Order linked to promise #17 (G.O. 827)",
      issuing_authority: "Government of Tamil Nadu", document_no: "G.O. 827",
      stage: "administrative_sanction", extraction: "identified", stance: "supporting",
      note: "Linked in promiseGoLinks; not read.",
    }],
    assessment: {
      grade: "D",
      rationale:
        "Creating a department is one of the few promise types where a sanction order genuinely is close to fulfilment — a department either exists in the government's structure or it does not. A GO is linked, so the administrative act is documented, though unread.",
      limitations: ["The GO has not been read.", "Departmental functioning, budget and staffing are unevidenced.", "Existence is not effectiveness."],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: ["Contents of the linked GO", "Department budget and staffing", "Any output or service data"],
  }),
  promise("partially completed", 18,
    "Revive the Lok Ayukta. Tracker status: modified.",
    "modified", {
    sources: [NOT_SOUGHT("Lok Ayukta appointment or amendment records", "No GO, Act or appointment notification located.")],
    assessment: {
      grade: "E",
      rationale:
        "Marked 'modified' by the tracker, which is a judgement this project cannot check without the appointment and statutory records. An anti-corruption institution's revival is exactly the kind of promise where partial fulfilment is contestable and the documentary trail matters most.",
      limitations: ["No document of any kind located.", "'Modified' is undefined by the tracker.", "This project cannot distinguish partial fulfilment from non-fulfilment here."],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: ["Lok Ayukta appointment notifications", "Any amending legislation", "Case disposal statistics", "Budget and staffing of the institution"],
  }),
  promise("partially completed", 19,
    "Pass a Right to Services Act. Tracker status: modified.",
    "modified", {
    sources: [NOT_SOUGHT("Right to Services Act or Bill", "No such Act or Bill was found among the 222 legislative instruments held in this repository.")],
    assessment: {
      grade: "E",
      rationale:
        "A legislative promise is uniquely checkable: either a statute was gazetted or it was not. This repository holds 222 legislative instruments for the period and none matching this promise was located, yet the tracker marks it 'modified'. That divergence is recorded rather than resolved.",
      limitations: [
        "No matching statute located in the 222 instruments held.",
        "Absence here may reflect this repository's coverage rather than the statute book.",
        "The tracker's 'modified' is unexplained.",
      ],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: ["A search of the complete Tamil Nadu statute book, not just the instruments held here", "The tracker's reasoning for 'modified'"],
  }),
  promise("ongoing", 1,
    "Fight to restore the state's lost rights. Tracker status: in progress.",
    "progress", {
    sources: [NOT_SOUGHT("Any measurable criterion", "This promise has no defined outcome, so no document could settle it.")],
    assessment: {
      grade: "E",
      rationale:
        "An open-ended political commitment with no criterion for fulfilment. It is included in the pilot precisely because the evidence model must be able to represent claims that are not evidence-testable at all, rather than forcing them onto the same ladder as a bed count.",
      limitations: [
        "No fulfilment criterion exists, so no grade above E is achievable in principle.",
        "The evidence ladder is a poor fit for open-ended political commitments.",
      ],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: ["A definition of 'lost rights' and what restoration would look like", "Any milestone against which progress could be measured"],
  }),
  promise("ongoing", 10,
    "Translate world books into Tamil and Tamil classics outward. Tracker status: in progress.",
    "progress", {
    sources: [{
      ...souvenir(null),
      title: "Tamil Nadu Government 2021–26 achievements record — translation programme entries",
      note: "Three achievement records are linked to this promise, all resting on the souvenir volume.",
    }],
    assessment: {
      grade: "E",
      rationale:
        "A countable promise — books translated is a number — linked to three achievement records, all of which trace to the same government summary volume. Multiple linked records give an impression of corroboration that the shared single source does not support.",
      limitations: [
        "Three linked records share one underlying source; this is not independent corroboration.",
        "No publication list or catalogue record located.",
      ],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: ["A list of titles translated", "Publisher or catalogue records", "Distribution and availability data"],
  }),
  promise("announcement-only", 7,
    "Revive the Classical Tamil Institute; Thirukkural as a national book. Tracker status: fulfilled.",
    "fulfilled", {
    sources: [NOT_SOUGHT("Any supporting document or linked record", "Nothing is linked to this promise in this dataset — no achievement record and no Government Order.")],
    assessment: {
      grade: "E",
      rationale:
        "Counted within the public '400 fulfilled' headline while this dataset holds nothing at all for it — no record, no GO, no document. This is one of 158 such promises, and it is the clearest demonstration in the pilot that the headline number is not reproducible from this project's own evidence.",
      limitations: [
        "Zero linked evidence of any kind.",
        "Counted as fulfilled in a public headline this project cannot substantiate.",
        "The second half (Thirukkural as a national book) is a Union-government matter outside state control.",
      ],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: ["Any document at all", "Institute revival order, funding, staffing", "The tracker's basis for 'fulfilled'"],
  }),
  promise("announcement-only", 9,
    "Refurbish Semmozhi Poonga; Semmozhi Park in all corporations. Tracker status: fulfilled.",
    "fulfilled", {
    sources: [NOT_SOUGHT("Any supporting document or linked record", "Nothing is linked to this promise in this dataset.")],
    assessment: {
      grade: "E",
      rationale:
        "Marked fulfilled with nothing linked. The promise has two parts of very different difficulty — refurbishing one park, versus a park in every corporation — and a single 'fulfilled' status cannot represent both.",
      limitations: [
        "Zero linked evidence.",
        "A compound promise flattened to one status.",
        "'All corporations' is a testable claim that nothing here tests.",
      ],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: ["Works orders or completion records for any park", "A list of corporations with and without a Semmozhi Park"],
  }),
  promise("difficult to assess", 2,
    "Move 'Education' from the Concurrent List back to the State List. Tracker status: stalled.",
    "stalled", {
    sources: [NOT_SOUGHT("Constitutional amendment record", "This requires a Union constitutional amendment; no state document could evidence fulfilment.")],
    assessment: {
      grade: "E",
      rationale:
        "Fulfilment is outside the state government's power — it needs a constitutional amendment by the Union. The tracker's 'stalled' is descriptively accurate but says nothing about state effort. The evidence model has no way to represent 'attempted but not within the actor's control', which is a genuine gap.",
      limitations: [
        "Outcome is not within the promising party's control.",
        "The ladder cannot distinguish inaction from action that could not succeed.",
      ],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: ["Assembly resolutions or formal representations to the Union", "Correspondence or litigation records"],
  }),
  promise("difficult to assess", 4,
    "Oppose Hindi imposition; state languages as official languages. Tracker status: stalled.",
    "stalled", {
    sources: [{
      ...souvenir(null),
      title: "Tamil Nadu Government 2021–26 achievements record — language policy entries",
      note: "Two achievement records are linked to this promise; both rest on the souvenir volume.",
    }],
    assessment: {
      grade: "E",
      rationale:
        "A continuous political posture rather than a deliverable. Two achievement records are linked, but opposition is an ongoing stance with no completion state. Marked 'stalled' by the tracker, which is itself a contestable characterisation of an ongoing position.",
      limitations: [
        "No completion state exists for a continuous posture.",
        "'Stalled' may describe outcomes rather than effort.",
        "Highly politically contested; any grade here would be read as a political judgement.",
      ],
      verification_status: "unverified", assessed_on: "2026-07-21",
    },
    missing: ["A criterion for what fulfilment would look like", "Record of formal state actions taken"],
  }),
];

// ---------------------------------------------------------------
// 3. CONTESTED / HIGH-IMPACT CLAIMS
// ---------------------------------------------------------------

const CONTESTED = [
  {
    id: "ev_contested_investment_jobs",
    subject_type: "contested_claim",
    subject_id: "eco4",
    domain: "investment commitments / employment numbers",
    claim: "₹12 lakh crore of investment attracted and 35 lakh jobs created.",
    sources: [
      souvenir(null),
      cagFiscal,
      cagOffBudget,
      NOT_SOUGHT("MoU register and realisation data", "No register of signed MoUs, nor any data on how many converted into operating investment, has been located."),
      NOT_SOUGHT("Employment verification (EPFO/ESI or state labour data)", "No independent employment dataset has been located to test the 35 lakh jobs figure."),
    ],
    assessment: {
      grade: "E",
      rationale:
        "The single highest-impact economic claim in the project and among the least evidenced. Investment 'attracted' conventionally counts MoUs signed, not capital deployed, and jobs 'created' at this scale requires an independent employment series to test. Neither is present. The CAG's findings on fiscal stress and off-budget borrowing are attached as context because they bear on how such commitments are financed.",
      limitations: [
        "'Attracted' almost certainly means MoUs signed, not investment realised — the claim does not say which.",
        "No independent employment data of any kind.",
        "No time base stated, so the figures cannot be compared with any other period.",
        "This is the figure most likely to be quoted from this project, and it is grade E.",
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
    id: "ev_contested_growth_ranking",
    subject_type: "contested_claim",
    subject_id: "eco1",
    domain: "rankings",
    claim: "India's #1 growth state — GSDP growth of 11.19% in 2024-25, up from 0.07% in 2020-21.",
    sources: [
      souvenir(null),
      cagGsdp,
      NOT_SOUGHT("Comparable inter-state growth table", "No source ranking all states on the same basis and year has been located."),
    ],
    assessment: {
      grade: "E",
      rationale:
        "A ranking claim requires a comparable series across all states for the same year on the same basis; none is attached. The CAG independently reports GSDP growth of 13.71% over 2022-23 and a 10.92% average from 2019-20 — real independent figures, but for different years and on a different basis than the claim, so they neither confirm nor refute it. Recording that non-comparability is more useful than forcing a verdict.",
      limitations: [
        "The independent CAG figure covers 2023-24; the claim covers 2024-25. They are not comparable.",
        "The 0.07% base year is the pandemic year, which flatters any growth comparison.",
        "'#1' is unsourced — no inter-state table is attached.",
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
    id: "ev_contested_free_bus",
    subject_type: "contested_claim",
    subject_id: "wom1",
    domain: "beneficiary counts",
    claim: "71.81 lakh women travel free daily under Vidiyal Payanam; 862 crore trips to January 2026, saving ₹13,820 crore.",
    sources: [
      souvenir(null),
      cagUnspent,
      NOT_SOUGHT("Transport corporation ridership returns", "No STU ticketing or ridership dataset located."),
      NOT_SOUGHT("Reimbursement accounts to transport corporations", "No record of the subsidy actually paid to operators located."),
    ],
    assessment: {
      grade: "E",
      rationale:
        "The most-quoted beneficiary figure in the project. A daily ridership number of this precision must come from a ticketing system, and that system's output has not been located. The ₹13,820 crore saving is a derived estimate whose method is not stated — it depends on an assumed fare and an assumed counterfactual journey.",
      limitations: [
        "'71.81 lakh women daily' — no ticketing data attached.",
        "The savings figure is modelled, not measured, and the model is not published.",
        "Daily riders and unique beneficiaries are different measures; the claim does not distinguish them.",
        "Whether the subsidy was actually reimbursed to operators is unevidenced.",
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
    id: "ev_contested_doorstep_health",
    subject_type: "contested_claim",
    subject_id: "hea1",
    domain: "beneficiary counts",
    claim: "Makkalai Thedi Maruthuvam doorstep medical care has reached 2.59 crore people.",
    sources: [
      souvenir(null),
      cagUC,
      NOT_SOUGHT("HMIS or programme MIS extract", "No health management information system extract located, though such a system exists nationally."),
    ],
    assessment: {
      grade: "E",
      rationale:
        "A beneficiary count of 2.59 crore — roughly a third of the state's population — with no programme data attached. This is a case where independent verification is genuinely available in principle: the Union HMIS holds comparable data, and it is catalogued in this project's source registry but has never been retrieved.",
      limitations: [
        "No programme MIS or HMIS extract attached.",
        "'Reached' is undefined — a single screening and continuing treatment are very different.",
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
    id: "ev_contested_hospital_completion",
    subject_type: "contested_claim",
    subject_id: "hea4",
    domain: "major infrastructure completion",
    claim: "A 1,000-bed super-speciality hospital was completed and opened on 15 June 2023 at a cost of ₹240 crore.",
    sources: [
      souvenir(null),
      {
        source_type: "go", authority: "primary_official",
        title: "Pay Ward — Formation of Pay wards in Kalaignar Centenary Super Speciality Hospital, Guindy",
        issuing_authority: "Health and Family Welfare Department, Government of Tamil Nadu",
        date: "18-03-2025",
        url: "https://cms.tn.gov.in/cms_migrated/document/GO/hfw_e_69_2025.pdf",
        stage: "administrative_sanction", extraction: "identified", stance: "supporting",
        note: "Strong evidence the hospital is operating by March 2025. Silent on bed count, opening date and cost.",
      },
      cagUC,
      NOT_SOUGHT("Completion certificate and final bill", "Neither located for a ₹240 cr capital project."),
    ],
    assessment: {
      grade: "D",
      rationale:
        "Included deliberately as the strongest completion claim in the pilot, to test whether the model can distinguish 'the facility demonstrably exists and operates' from 'the specific completion claim is verified'. A 2025 GO proves the former. Nothing proves the latter: the bed count, the opening date and the ₹240 cr cost are all unevidenced.",
      limitations: [
        "Operation is documented; the specific figures in the claim are not.",
        "A GO about pay wards is being used as existence evidence — legitimate, but it is not what the GO is for.",
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
