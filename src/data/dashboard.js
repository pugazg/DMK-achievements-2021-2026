/* ============================================================
   DASHBOARD, NARRATIVE & TIMELINE DATA
   Curated from the Tamil Nadu Government 2021–26 record and the
   Economic Survey of Tamil Nadu 2025–26. Chart series use only
   figures that appear verbatim in the sources — no invented
   intermediate points. Each block carries its own source note.
   ============================================================ */

/* ---- HERO: the four figures that lead the report ---- */
export const HERO_FIGURES = [
  { value: 11.19, decimals: 2, suffix: "%", label: "GSDP growth — #1 in India", note: "up from 0.07% in 2020–21" },
  { value: 31.19, decimals: 2, prefix: "₹", suffix: " L·cr", label: "State GDP (GSDP), 2024–25", note: "from ₹17.89 lakh crore" },
  { value: 862, decimals: 0, suffix: " cr", label: "Free bus trips by women", note: "to Jan 2026 · ₹13,820 cr saved" },
  { value: 2.59, decimals: 2, suffix: " cr", label: "People reached at their door", note: "Makkalai Thedi Maruthuvam" },
];

/* ---- HERO strip: smaller supporting counters ---- */
export const HERO_STRIP = [
  { value: 438, suffix: "", label: "verified records" },
  { value: 505, suffix: "", label: "manifesto promises tracked" },
  { value: 12, suffix: "", label: "domains of governance" },
  { value: 0, suffix: "", label: "facts invented", accent: true },
];

/* ---- CHARTS ----
   type "compare": before → after (two bars, delta computed)
   type "series":  multi-point (bars over a labelled axis)
   lowerIsBetter flips the delta framing (e.g. mortality)         */
export const CHART_GROUPS = [
  {
    id: "economy",
    cat: "Economy",
    title: "An economy that changed gear",
    lede: "Tamil Nadu went from a pandemic contraction to the fastest-growing large state in India — the groundwork for a US $1 trillion economy by 2030.",
    charts: [
      {
        kind: "compare", unit: "%", label: "GSDP growth rate", decimals: 2, deltaAsPoints: true,
        a: { t: "2020–21", v: 0.07 }, b: { t: "2024–25", v: 11.19 },
        caption: "Double-digit growth — the highest among India's large states.",
      },
      {
        kind: "series", unit: "₹ lakh cr", label: "GSDP at current prices",
        points: [
          { t: "2020–21", v: 17.89 },
          { t: "2024–25", v: 31.19 },
          { t: "2025–26*", v: 36.57, est: true },
          { t: "2026–27*", v: 41.03, est: true },
        ],
        caption: "*2025–26 and 2026–27 are Economic Survey projections.",
      },
      {
        kind: "compare", unit: "US $ bn", label: "Merchandise exports",
        a: { t: "2020–21", v: 26.15 }, b: { t: "2024–25", v: 52.07 },
        caption: "Exports nearly doubled; 3rd-highest of any Indian state.",
      },
      {
        kind: "compare", unit: "₹", label: "Per-capita income", big: true,
        a: { t: "2020–21", v: 209628 }, b: { t: "2024–25", v: 361619 },
        caption: "1.77× the national average.",
      },
      {
        kind: "compare", unit: "", label: "Registered startups",
        a: { t: "2021", v: 2300 }, b: { t: "2025", v: 13003 },
        caption: "Last rank in 2018 → #1 in India by 2022.",
      },
      {
        kind: "compare", unit: "", label: "SIPCOT industrial estates",
        a: { t: "2021", v: 21 }, b: { t: "2025", v: 54 },
        caption: "Industrial firms rose 62,413 → 79,185.",
      },
    ],
    source: "Economic Survey of Tamil Nadu 2025–26; TN Government 2021–26 record.",
  },
  {
    id: "health",
    cat: "Health",
    title: "Health taken to the doorstep",
    lede: "A United Nations–awarded model that brings medicine, screening and emergency cover to people where they live.",
    charts: [
      {
        kind: "compare", unit: "per lakh", label: "Maternal mortality", lowerIsBetter: true,
        a: { t: "earlier", v: 73 }, b: { t: "2021–23", v: 35 },
        caption: "SRS 2021–23. Infant mortality fell 10.4 → 6.9.",
      },
      {
        kind: "compare", unit: "", label: "Total fertility rate", lowerIsBetter: true, decimals: 1,
        a: { t: "national", v: 2.0 }, b: { t: "Tamil Nadu", v: 1.3 },
        caption: "Well below the replacement-level national figure.",
      },
      {
        kind: "compare", unit: "cr people", label: "Doorstep medical care reach",
        a: { t: "Dec 2024", v: 2.0 }, b: { t: "2026", v: 2.59 },
        caption: "Makkalai Thedi Maruthuvam · UN Interagency award, 2024.",
      },
      {
        kind: "compare", unit: "cr families", label: "CM health-insurance cover", decimals: 2,
        a: { t: "earlier", v: 1.0 }, b: { t: "2026", v: 1.48 },
        caption: "Up to ₹5 lakh/family/year across 2,254 hospitals.",
      },
    ],
    source: "TN Government 2021–26 record; SRS 2021–23.",
  },
  {
    id: "women",
    cat: "Women",
    title: "Rights that reach the household",
    lede: "Cash in women's hands, fare-free mobility, and the workforce and civic power that follow.",
    charts: [
      {
        kind: "compare", unit: "lakh/day", label: "Women bus riders per day",
        a: { t: "before", v: 34.55 }, b: { t: "now", v: 69.52 },
        caption: "Daily women riders doubled under Vidiyal Payanam.",
      },
      {
        kind: "compare", unit: "%", label: "Women's workforce participation",
        a: { t: "national", v: 25 }, b: { t: "Tamil Nadu", v: 40.5 },
        caption: "TN has 42% of India's women factory workers.",
      },
      {
        kind: "compare", unit: "of 21", label: "City mayors who are women",
        a: { t: "before", v: 0 }, b: { t: "now", v: 11 },
        caption: "A record, on 50% local-body reservation.",
      },
      {
        kind: "compare", unit: "days", label: "Paid maternity leave", big: false,
        a: { t: "Union", v: 180 }, b: { t: "Tamil Nadu", v: 365 },
        caption: "First state in India to grant a full year.",
      },
    ],
    source: "TN Government 2021–26 record.",
  },
  {
    id: "education",
    cat: "Education",
    title: "From access to attainment",
    lede: "Breakfast before lessons, laptops for college, and a foundational-skills drive that lifted results.",
    charts: [
      {
        kind: "compare", unit: "%", label: "Class-10 pass rate",
        a: { t: "before", v: 85 }, b: { t: "now", v: 92 },
        caption: "After Illam Thedi Kalvi + 'Thodarndhu Karpom' remedial drive.",
      },
      {
        kind: "compare", unit: "lakh", label: "Children given free breakfast",
        a: { t: "start", v: 0 }, b: { t: "now", v: 20.59 },
        caption: "37,484 schools · the CM Breakfast Scheme.",
      },
      {
        kind: "compare", unit: "lakh", label: "Free laptops distributed",
        a: { t: "phase 1", v: 10 }, b: { t: "+ college drive", v: 20 },
        caption: "10 lakh AI-ready laptops added for UG/diploma students (2026).",
      },
      {
        kind: "compare", unit: "cr", label: "Ambedkar overseas scholars", decimals: 0, unitOverride: "students",
        a: { t: "—", v: 0 }, b: { t: "5 yrs", v: 385 },
        caption: "₹162 cr sent 385 students to Oxford, Cambridge, MIT & more.",
      },
    ],
    source: "TN Government 2021–26 record.",
  },
];

/* ---- TIMELINE: landmark launches of the 2021–2026 term ---- */
export const TIMELINE = [
  { date: "12 Jul 2021", cat: "Women", title: "Vidiyal Payanam", note: "Fare-free town-bus travel for women and transgender persons begins." },
  { date: "5 Aug 2021", cat: "Health", title: "Makkalai Thedi Maruthuvam", note: "Doorstep medical care launched — later a UN-awarded model." },
  { date: "18 Dec 2021", cat: "Health", title: "Innuyir Kappom – 48", note: "India's first scheme to fund the first 48 hours of accident care." },
  { date: "2022", cat: "Education", title: "CM's Breakfast Scheme", note: "Free breakfast for primary-school children — an iconic first." },
  { date: "Jun 2022", cat: "Education", title: "Ennum Ezhuthum", note: "Foundational literacy-and-numeracy mission begins." },
  { date: "5 Mar 2023", cat: "Heritage", title: "Keeladi Museum", note: "World-class museum for Sangam-era Tamil finds opens." },
  { date: "15 Jun 2023", cat: "Health", title: "Kalaignar Super-Speciality Hospital", note: "1,000-bed hospital opens at Guindy, Chennai." },
  { date: "30 Dec 2023", cat: "Infrastructure", title: "Kalaignar Centenary Bus Terminus", note: "India's largest bus terminus opens at Kilambakkam." },
  { date: "Jan 2025", cat: "Heritage", title: "$1 million Indus prize", note: "CM announces a global prize to decipher the Indus script." },
  { date: "8 Mar 2025", cat: "Women", title: "Pink Auto scheme", note: "Women-driven autos with GPS and panic buttons, at the Magalir Ezhuchi Vizha." },
  { date: "5 Jan 2026", cat: "Education", title: "College laptop drive", note: "10 lakh AI-ready laptops for UG and diploma students." },
];

/* ---- THEMATIC NARRATIVE: the Dravidian Method ----
   Drawn from the long-form thesis: each generation asks what has
   become concentrated, and widens participation again.            */
export const THESIS = {
  kicker: "The recurring obligation",
  line: "Each generation asks what has become concentrated — and widens participation again.",
  tail: "The answer changes. The responsibility does not.",
  arc: [
    { stage: "Dignity", who: "Periyar", body: "The first question was self-respect — who is allowed to be a full person in public life." },
    { stage: "Ownership", who: "Anna", body: "Then, who owns the institutions — land, representation, the state itself." },
    { stage: "Access", who: "Kalaignar", body: "Then access — schooling, healthcare, mobility, a house, a name on the patta." },
    { stage: "Innovation", who: "Now", body: "Now the frontier is knowledge and enterprise — who gets to build, and to own what they build." },
  ],
};

export const THEMES_NARRATIVE = [
  {
    cat: "Economy",
    title: "Growth as a shared floor, not a private ceiling",
    body: "Record GSDP and exports matter here only because they are paired with a fare-free bus, a doorstep clinic and a girl's ₹1,000. The Dravidian wager is that a wide floor of dignity is what makes fast growth durable — demand, skills and stability all rise from the same base.",
    stat: "₹12 lakh cr investment · 35 lakh jobs",
  },
  {
    cat: "Social",
    title: "Social justice as an investment, not a cost",
    body: "69% reservation, 27% OBC quota in NEET won at the Supreme Court, house-site pattas for Irular and Narikuravar families — the record treats representation and assets as the mechanism of growth, not a drag on it.",
    stat: "22.71 lakh house-site pattas",
  },
  {
    cat: "Heritage",
    title: "A past worth funding",
    body: "Keeladi, Porunai, a $1 million Indus prize, digs in four other states: antiquity is treated as public infrastructure. A people confident of its history invests more freely in its future.",
    stat: "5,000-year iron antiquity · 15+ sites",
  },
  {
    cat: "Women",
    title: "The household as the unit of policy",
    body: "Free travel, ₹1,000 for the woman of the house, pink autos, a year of maternity leave, hostels at the factory gate. Each scheme meets women where decisions are actually made — and the workforce numbers follow.",
    stat: "71.81 lakh women travel free daily",
  },
];

/* ---- REFERENCES ---- */
export const REFERENCES = [
  { t: "Tamil Nadu Government — 2021–26 Achievement Record (souvenir; minister-by-minister volumes)", meta: "Primary source for every scheme record." },
  { t: "Economic Survey of Tamil Nadu 2025–26", meta: "GSDP, per-capita income, exports, sectoral growth." },
  { t: "DMK Election Manifesto 2021 (English)", meta: "The 505 promises tracked in the Manifesto section." },
  { t: "Tamil Nadu Legislative Assembly Digital Library — 16th Assembly debates (2021–2026)", meta: "138 verbatim sitting-day transcripts, indexed in the Debates section." },
  { t: "Sample Registration System (SRS) 2021–23", meta: "Maternal mortality and fertility figures." },
  { t: "StartupTN / TANSIM published data", meta: "Startup registrations, incubators, seed fund." },
];
