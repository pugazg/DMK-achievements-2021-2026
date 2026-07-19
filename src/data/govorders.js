/* ============================================================
   TAMIL NADU GOVERNMENT ORDERS 2021-2026 — evidence layer
   Crawled dept-wise from tn.gov.in. GO_META carries the full scale
   (all indexed GOs, by department and year); GO_LINKS bundles the
   GOs that map to a named scheme/achievement, an Act, or a budget
   announcement. Abstracts quoted from the GO; links are topical.
   ============================================================ */

export const GO_META = {
  "total": 3501,
  "mapped": 186,
  "departments": 36,
  "byYear": {
    "2021": 695,
    "2022": 838,
    "2023": 500,
    "2024": 679,
    "2025": 625,
    "2026": 164
  },
  "byDept": {
    "Health and Family Welfare Department": 517,
    "Water Resources Department": 389,
    "Home, Prohibition and Excise Department": 371,
    "Environment, Climate Change and Forests Department": 283,
    "Rural Development and Panchayat Raj Department": 246,
    "Labour Welfare and Skill Development Department": 172,
    "Finance Department": 169,
    "Agriculture - Farmers Welfare Department": 155,
    "Highways and Minor Ports Department": 142,
    "Housing and Urban Development Department": 125,
    "Micro , Small and Medium Enterprises Department": 108,
    "Transport Department": 72,
    "Public Department": 69,
    "Revenue and Disaster Management Department": 69,
    "Higher Education Department": 65,
    "Municipal Administration and Water Supply Department": 61,
    "Industries, Investment Promotion & Commerce Department": 58,
    "Commercial Taxes and Registration Department": 54,
    "Human Resources Management Department": 52,
    "Planning, Development and Special Initiatives Department": 50,
    "Information Technology and Digital Services Department": 45,
    "Law Department": 43,
    "BC, MBC & Minorities Welfare Department": 39,
    "School Education Department": 31,
    "Welfare of Differently Abled Persons": 22,
    "Handlooms, Handicrafts, Textiles and Khadi Department": 18,
    "Social Justice Department": 16,
    "Co-operation, Food and Consumer Protection Department": 14,
    "Tourism,Culture and Religious Endowments Department": 13,
    "Social Welfare and Women Empowerment Department": 9,
    "Energy Department": 7,
    "Public Works Department": 5,
    "Youth Welfare and Sports Development Department": 5,
    "Animal Husbandry, Dairying, Fisheries and Fishermen Welfare Department": 4,
    "Special Programme Implementation": 2,
    "Natural Resources Department": 1
  },
  "toRecords": 16,
  "toLaws": 28,
  "budget": 142,
  "from": "2021",
  "to": "2026",
  "source": "Government Orders — Government of Tamil Nadu",
  "sourceUrl": "https://www.tn.gov.in/godept_list.php"
};

export const GO_LINKS = [
 {
  "no": null,
  "date": "27-02-2026",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Home Department - Section 5(2) of the Tamil Nadu Money Lending Entities (Prevention of Coercive Actions) Act, 2025 (Tamil Nadu Act 40 of 2025) - Notification of online portal - Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_103_2026_ms.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Bill",
    "no": null,
    "year": 2025
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "13-02-2026",
  "dept": "Water Resources Department",
  "cat": "Infrastructure",
  "abstract": "Water Resources Department - Announcement made by the Honble Minister (Water Resources) f the year 2025 - 2026 - Construction of 4 Check dams in Chennai Region at a total cost of Rs.87.74 cre - Administrative Sanction - Accded -…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/wrd_e_15_Ms_2026.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "31-12-2025",
  "dept": "Water Resources Department",
  "cat": "Infrastructure",
  "abstract": "Water Resources Department - Announcement made by the Honble Minister for Finance and Environment and Climate Change during Budget Speech 2025 - 2026 - Formation of a New Drinking Water Reservoir in Kovalam Sub-Basin in between…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/wrd_e_70_Ms_2025.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "07-10-2025",
  "dept": "Health and Family Welfare Department",
  "cat": "Health",
  "abstract": "Tamil Nadu Health Systems Project - Innuyir Kappom - Nammai Kakkum 48 - Extend the scheme under assurance mode for the policy year 2025-2027 - Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hfw_e_1110_D_2025.pdf",
  "records": [
   "hea2"
  ],
  "laws": [],
  "budget": false
 },
 {
  "no": null,
  "date": "11-09-2025",
  "dept": "Health and Family Welfare Department",
  "cat": "Health",
  "abstract": "Establishment - Further Continuance for 217 temporary posts of various categories attached to Kalaignar Centenary Super Speciality Hospital, Chennai - Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hfw_e_1016_2025_D.pdf",
  "records": [
   "hea4"
  ],
  "laws": [],
  "budget": false
 },
 {
  "no": "G.O. Rt.No 201",
  "date": "10-09-2025",
  "dept": "School Education Department",
  "cat": "Education",
  "abstract": "FOREIGN TOUR - School Education - Public Libraries - Thiru. J.Jaba Joselin Librarian and Information Officer Kalaignar Centenary Library Madurai - Permission to visit the International Book Fair to be held at Frankfurt Germany…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/schedu_e_201_2025_Rt.pdf",
  "records": [
   "her5"
  ],
  "laws": [],
  "budget": false
 },
 {
  "no": null,
  "date": "30-06-2025",
  "dept": "Labour Welfare and Skill Development Department",
  "cat": "Social",
  "abstract": "Budget Speech 2025-2026 – Introducing a Group Insurance Scheme for 50000 Gig Workers – Insurance coverage against accidental death and disability - Sanction for a sum of Rs.66,95,000- Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/labemp_e_70_2025.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "27-06-2025",
  "dept": "Micro , Small and Medium Enterprises Department",
  "cat": "Economy",
  "abstract": "Micro, Small Medium Enterprises Department – TANCOIR - Announcement made by the Honble Minister (MS and ME) fforthe year 2025-26 - Scheme for “Promotion of Value Addition in Coir Sector” - Permission assistance under existing…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/msme_e_32_ms_2025.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "16-06-2025",
  "dept": "Labour Welfare and Skill Development Department",
  "cat": "Social",
  "abstract": "Budget Speech 2025-2026 - Providing subsidy of Rs.20,000 each to 2000 registered Gig Wkers of Tamil Nadu Manual Wkers Social Security Welfare Board f purchasing a new electric vehicle e-scooter - Sanction of expenditure f…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/labemp_e_62_2025.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "11-06-2025",
  "dept": "Micro , Small and Medium Enterprises Department",
  "cat": "Economy",
  "abstract": "Micro, Small Medium Enterprises Department – TANSIM – Announcement made by the Honble Minister (MSME) f the year 2025-26 - Implementation of the “Gramam Thum Puthozhil” Scheme to promote 100 Startups in 100 Villages across Tamil…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/msme_e_23_ms_2025.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "10-06-2025",
  "dept": "Micro , Small and Medium Enterprises Department",
  "cat": "Economy",
  "abstract": "Micro, Small Medium Enterprises Department – TANSIM – Announcement made by the Hon’ble Minister f Finance Environment Climate Change during Budget Speech f the year 2025-26 - Launch of the “Tamil Nadu Space Tech Fund” to Promote…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/msme_e_26_ms_2025.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "06-06-2025",
  "dept": "Water Resources Department",
  "cat": "Infrastructure",
  "abstract": "Water Resources Department – Announcement made by the Honourable Minister for Finance and Environment and Climate Change for 2025-2026 – Constitution of Empowered Committee to identify, examine, prioritize, finalize and approve…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/wrd_e_22_Ms_2025.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "22-05-2025",
  "dept": "Micro , Small and Medium Enterprises Department",
  "cat": "Economy",
  "abstract": "Micro, Small Medium Enterprises Department – Entrepreneurship Development Innovation Institute - Tamil Nadu (EDII-TN) - Innovation Voucher Programme (IVP) - Announcement made by the Honble Minister (MSME) for the year 2025-26 -…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/msme_e_16_ms_2025.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "22-05-2025",
  "dept": "Micro , Small and Medium Enterprises Department",
  "cat": "Economy",
  "abstract": "Micro, Small Medium Enterprises Department – Industrial Cooperatives - Irula Snake Catchers Industrial Co-operative Society Ltd., Chengalpattu District - Announcement made by the Honble Minister (MSME) f the year 2025-26…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/msme_e_17_ms_2025.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "09-05-2025",
  "dept": "School Education Department",
  "cat": "Education",
  "abstract": "School Education - Ennum Ezhuthum Mission - Extension of Ennum Ezhuththum Mission till the academic year 2026-2027 for classes 1 to 5 and continuation of Expert Committee and granting permission for constitution of Working…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/schedu_e_105_2025.pdf",
  "records": [
   "edu_b2_ennum"
  ],
  "laws": [],
  "budget": false
 },
 {
  "no": null,
  "date": "06-05-2025",
  "dept": "Micro , Small and Medium Enterprises Department",
  "cat": "Economy",
  "abstract": "MSME - Micro, Small Medium Enterprises Department – Entrepreneurship Development Innovative Institute-Tamil Nadu (EDII-TN) – Strategic Plan Phase II (2025-2030) - Announcement made by the Honble Minister (MSME) on 09.04.2025 -…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/msme_e_11_ms_2025.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "02-05-2025",
  "dept": "Rural Development and Panchayat Raj Department",
  "cat": "Infrastructure",
  "abstract": "திட்டங்கள் – மாநிலத் திட்டம் – நமக்கு நாமே திட்டம் (NNT) – 2025–26ஆம் ஆண்டில் நமக்கு நாமே திட்டத்தினை செயல்படுத்த நிர்வாக அனுமதி மற்றும் வழிகாட்டு நெறிமுறைகள் வழங்கி ஆணை வெளியிடப்படுகிறது.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/rd_t_68_2025.pdf",
  "records": [
   "rur_b6_namakkunaame"
  ],
  "laws": [],
  "budget": false
 },
 {
  "no": null,
  "date": "27-04-2025",
  "dept": "Water Resources Department",
  "cat": "Infrastructure",
  "abstract": "Water Resources Department – Announcement 2025-2026 – Announcement made by the Honourable Minister (Finance and Environment and Climate Change) and Honourable Minister (Water Resources) – 254 works approved by the Empowered…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/wrd_e_39_Ms_2025.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "09-04-2025",
  "dept": "Agriculture - Farmers Welfare Department",
  "cat": "Agriculture",
  "abstract": "Agriculture-Farmers Welfare — Agricultural Marketing and Agri Business -Tiruppur Market Committee - To cre ate new Regulated Market at Nathakadaiyur village, KangayamTaluk, Tiruppur District – Under section 6 (1) of the Tamil…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/agri_e_98_2025_ms.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Act",
    "no": null,
    "year": 2026
   },
   {
    "kind": "Act",
    "no": null,
    "year": 2024
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "25-03-2025",
  "dept": "BC, MBC & Minorities Welfare Department",
  "cat": "Social",
  "abstract": "Act - Tamil Nadu State Minorities Commission Act, 2010 (Act 21 of 2010) - Parsi Community as Religious Minority in the State of Tamil Nadu - Recognized by Notification - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/bcmbc_e_ms_17_2025.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Bill",
    "no": 10,
    "year": 2021
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "25-03-2025",
  "dept": "Rural Development and Panchayat Raj Department",
  "cat": "Infrastructure",
  "abstract": "Schemes – State Government Scheme – Implementation of “Kalaignarin Kanavu Illam” Scheme – Announcement made by the Hon’ble Minister for Finance and Environment Climate Change during the Budget speech 2025-26 - Construction of one…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/rd_e_41_2025.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "20-03-2025",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Police - Announcement of the Honble Chief Minister of Tamil Nadu during the Budget Session 2023-2024 - Creation of Social Media Cell in Intelligence Section of Greater Chennai Police - Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_143_2025_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "19-03-2025",
  "dept": "Rural Development and Panchayat Raj Department",
  "cat": "Infrastructure",
  "abstract": "Schemes – State Scheme – Implementation of Anaithu Grama Anna Marumalarchi Thittam-II (AGAMT-II) for the year 2025-26 – Announcement made by the Hon’ble Minister for Finance and Environment Climate Change during the Budget Speech…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/rd_e_39_2025.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "18-03-2025",
  "dept": "Health and Family Welfare Department",
  "cat": "Health",
  "abstract": "Pay Ward – Fmation of Pay wards in Kalaignar Centenary Super Speciality Hospital, Guindy, Chennai – Permission accded – Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hfw_e_69_2025.pdf",
  "records": [
   "hea4"
  ],
  "laws": [],
  "budget": false
 },
 {
  "no": null,
  "date": "14-03-2025",
  "dept": "Rural Development and Panchayat Raj Department",
  "cat": "Infrastructure",
  "abstract": "Schemes – State Government Scheme – “Muthalamaicharin Veedugal Marukattumana Thittam” – 2025-26 – Announcement made by the Hon’ble Minister for Finance and Environment and Climate Change during the Budget speech 2025-26 -…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/rd_e_37_2025.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "06-03-2025",
  "dept": "Agriculture - Farmers Welfare Department",
  "cat": "Agriculture",
  "abstract": "Agriculture - Farmers Welfare - Horticulture - Announcement made by the Hon ble Minister for Agriculture - Farmers Welfare during the Budget Speech on 20.02.2024 — Establishment of a Honey Production Hub at Kanyakumari District…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/agri_e_lr_ms_52_au_2025.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O.Ms.No.649",
  "date": "26-11-2024",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Police - Announcement made by the Honble Chief Minister of Tamil Nadu during the Budget Session 2024 - 2025 on Demand No.22 Police - Training Programme Magilchi for targeted Police Officers / Personnel of South Zone, Madurai and…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_649_2024_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "22-10-2024",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Pudukkottai Judicial District - Announcement made by the Honble Minister for Law on the floor of the Tamil Nadu Legislative Assembly on 24.06.2024 - Bifurcation of District Munsif-cum-Judicial Magistrate Court at…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_591_2024_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "18-10-2024",
  "dept": "Health and Family Welfare Department",
  "cat": "Health",
  "abstract": "Para Medical Education – To start 11 Paramedical Courses (Certificate Course-08, Diploma Course-02 and Degree Course-01) at Kalaignar Centenary Super Speciality Hospital, Guindy, Chennai from the academic year 2024-2025 –…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hfw_e_337_2024.pdf",
  "records": [
   "hea4"
  ],
  "laws": [],
  "budget": false
 },
 {
  "no": null,
  "date": "17-10-2024",
  "dept": "Water Resources Department",
  "cat": "Infrastructure",
  "abstract": "Water Resources Department – Announcement made by the Honourable Minister (Water Resources) for the year 2024 - 2025 – Rehabilitation of Palar Anicut near Thirumalaicheri and Pudupadi Villages in Walajah and Arcot Taluk of…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/wrd_e_103_Ms_2024.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O.Ms.No.563",
  "date": "07-10-2024",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Kallakurichi Judicial District - Announcement made by the Honble Minister for law on the floor of the Tamil Nadu Legislative Assembly on 24.06.2024 - sanction for constitution of a district Munsif-cum-Judicial Magistrate…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_563_2024_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "04-10-2024",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Announcement made by the Honble Minister for Law on the floor of the Tamil Nadu Legislative Assembly on 24.06.2024 - sanction for constitution of an Additional Family Court at Madurai District - Expenditure of…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_559_2024_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "04-10-2024",
  "dept": "Water Resources Department",
  "cat": "Infrastructure",
  "abstract": "Water Resources Department – Announcement made by the Honourable Minister for Water Resources for 2020 - 2021 – Surveying and Levelling work under State Fund at an estimated cost of Rs.15,00,000/ - – Administrative Sanction…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/wrd_e_188_D_2024.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "30-09-2024",
  "dept": "Water Resources Department",
  "cat": "Infrastructure",
  "abstract": "Water Resources Department – Announcement made by the Honourable Minister (Water Resources) for the year 2024 - 2025 - Fixing of Boundary stones at the banks of Thamiraparani River using DGPS System in Tirunelveli District at an…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/wrd_e_46_2D_2024.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O.Ms.No.537",
  "date": "25-09-2024",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Kanniyakumari Judicial District - Announcement made by the Honble Minister for law on the floor of the Tamil Nadu legislative Assembly on 24.06.2024 - sanction for constitution of a district Munsif cum Judicial…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_537_2024_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "24-09-2024",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Dindigul Judicial District - Announcement made by the Honble Minister for Law on the floor of the Tamil Nadu Legislative Assembly on 24.06.2024 - sanction for constitution of a district Munsif-cum-Judicial Magistrate…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_533_2024_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "19-09-2024",
  "dept": "Micro , Small and Medium Enterprises Department",
  "cat": "Economy",
  "abstract": "Micro Small Medium Enterprises Department - Announcement made by the Honble Minister for MSME- 2024- 2025- Bifurcation of Micro Small Enterprises Facilitation Council Chennai region into Chennai Vellore Regions- Madurai region…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/msme_e_38_2024.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "11-09-2024",
  "dept": "Water Resources Department",
  "cat": "Infrastructure",
  "abstract": "Water Resources Department - Announcement made by the Honourable Minister (Water Resources) for the year 2024 - 2025 - Rehabilitation of 7 Ex-Zamin Minor Tanks in Sivagangai District at an estimated cost of Rs.4.97 Crore under…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/wrd_e_42_2D_2024.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "11-09-2024",
  "dept": "Water Resources Department",
  "cat": "Infrastructure",
  "abstract": "Water Resources Department - Announcement made by the Honourable Minister (Water Resources) for the year 2024-2025 - Rehabilitation, Restoration and Renovation of damaged Tanks and its structures in 14 places at an estimated cost…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/wrd_e_44_4D_2024.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "11-09-2024",
  "dept": "Water Resources Department",
  "cat": "Infrastructure",
  "abstract": "Water Resources Department - Announcement made by the Honurable Minister (Water Resources) for the year 2024-2025 - Rehabilitation, Restoration and Renovation of damaged irrigation structures like Canals, supply channels and…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/wrd_e_43_4D_2024.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "11-09-2024",
  "dept": "Water Resources Department",
  "cat": "Infrastructure",
  "abstract": "Water Resources Department - Announcement made by the Honourable Minister (Water Resources) for the year 2024 - 2025 - Construction of Sub Surface Dykes in Tiruvannamalai and Thiruvarur Districts at an estimated cost of Rs.10.23…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/wrd_e_95_Ms_2024.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "11-09-2024",
  "dept": "Water Resources Department",
  "cat": "Infrastructure",
  "abstract": "Water Resources Department – Announcement made by the Honble Minister (Water Resources) for the year 2024-2025 – Rehabilitation, Restoration and Renovation of damaged regulators in 6 places at an estimated cost of Rs.23.85 Crore…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/wrd_e_43_2D_2024.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "11-09-2024",
  "dept": "Water Resources Department",
  "cat": "Infrastructure",
  "abstract": "Water Resources Department - Announcement made by the Honourable Minister (Water Resources) for the year 2024-2025 - Construction of Check Dams at 10 places at an estimated cost of Rs.71.86 Crore under NABARD loan assistance -…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/wrd_e_93_Ms_2024.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "11-09-2024",
  "dept": "Water Resources Department",
  "cat": "Infrastructure",
  "abstract": "Water Resources Department – Announcement made by the Honourable Minister (Water Resources) for the year 2024-2025 – Rehabilitation, Restoration and Renovation of damaged causeway, protection wall and other structures and removal…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/wrd_e_44_2D_2024.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "11-09-2024",
  "dept": "Water Resources Department",
  "cat": "Infrastructure",
  "abstract": "Water Resources Department - Announcement made by the Honourable Minister (Water Resources) for the year 2024-2025 - Rehabilitation, Restoration and Renovation of damaged Check dams and Anicuts in 22 places at an estimated cost…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/wrd_e_42_4D-2024.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "02-09-2024",
  "dept": "Micro , Small and Medium Enterprises Department",
  "cat": "Economy",
  "abstract": "Micro Small Medium Enterprises Department Announcement made by the Honble Minister for MSME on 28.06.2024 Extending subsidy for availing quality certification to MSMEs which are renewing their existing international quality…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/msme_e_34_2024.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "06-08-2024",
  "dept": "Water Resources Department",
  "cat": "Infrastructure",
  "abstract": "Water Resources Department – Announcement made by the Honourable Minister (Water Resources) for the year 2024 - 2025 – 4 works in Thiruvallur, Vellore, Trichy and Ariyalur Districts at an estimated cost of Rs.10,16,00,000/ -…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/wrd_e_72_Ms_2024.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "26-07-2024",
  "dept": "Social Justice Department",
  "cat": "Social",
  "abstract": "Adi Dravidar and Tribal Welfare - Announcement of Hon ble Minister (Finance and Human Resources Management) during Budget Speech for the year 2024-2025 - Administrative sanction for implementation of Tholkudi scheme at a total…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/adtw_e_55_ms_2024.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "24-07-2024",
  "dept": "Agriculture - Farmers Welfare Department",
  "cat": "Agriculture",
  "abstract": "Agriculture — Farmers Welfare - Agricultural Marketing Agri Business - Notification under section 9(1)(d) read with section 3 of the Tami! Nadu Agricultural Produce Marketing (Regulation) Act, 1987 (Tamil Nadu Act 27 of 1989),…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/agri_e_160_2024_ms.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Act",
    "no": null,
    "year": 2026
   },
   {
    "kind": "Act",
    "no": null,
    "year": 2024
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "23-07-2024",
  "dept": "Highways and Minor Ports Department",
  "cat": "Infrastructure",
  "abstract": "Highways and Minor Ports Department – Announcements during Budget Session 2021-2022 - Villupuram (H) Construction and Maintenance Circle – Ariyalur (H) Construction and Maintenance Division – “Land Acquisition for formation of…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hw_e_82_2024_Ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "19-07-2024",
  "dept": "Agriculture - Farmers Welfare Department",
  "cat": "Agriculture",
  "abstract": "Agriculture — Farmers Welfare - Agricultural Marketing Agri Business —Notification under section 9(1)(d) read with section 3 of the Tamil Nadu Agricultural Produce Marketing (Regulation) Act, 1987 (Tamil Nadu Act 27 of 1989),…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/agri_e_151_2024_ms.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Act",
    "no": null,
    "year": 2026
   },
   {
    "kind": "Act",
    "no": null,
    "year": 2024
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "30-05-2024",
  "dept": "Agriculture - Farmers Welfare Department",
  "cat": "Agriculture",
  "abstract": "Agricultural Marketing Agri Business — Notification under section 9(1)(d) read with section 3 of the Tamil Nadu Agricultural Produce Marketing (Regulation) Act, 1987 (Tamil Nadu Act 27 of 1989), declaring regulation of purchase…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/agri_e_105_2024_ms.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Act",
    "no": null,
    "year": 2026
   },
   {
    "kind": "Act",
    "no": null,
    "year": 2024
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "16-03-2024",
  "dept": "Water Resources Department",
  "cat": "Infrastructure",
  "abstract": "Water Resources Department — Budget Speech by the Hon’ble Minister (Finance and Human Resources Management) for the year 2024-2025 - Announcement for Reconstruction of masonries in Jambu Cauvery channel from LS 0 km to 0.050 km…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/wrd_e_54_Ms_2024.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O.Ms.No.226",
  "date": "15-03-2024",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Prisons and Correctional Services - Announcement made by the Honble Minister Law on the floor of Legislative Assembly on 10.04.2023 - Purchase of 28 Nos. of the e-auto each 2 numbers to 9 Central Prisons and 5 Special Prisons for…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_226_2024_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O.Ms.No.223",
  "date": "15-03-2024",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Prisons and Correctional Services - Announcement made by the Honble Minister Law on the floor of Legislative Assembly on 10.04.2023 - Purchase of 28 Numbers of Tilting Wet Grinders with Coconut scrapper each 2 numbers to 9…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_223_2024_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O.Ms.No.227",
  "date": "15-03-2024",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Prisons and Correctional Service - Announcement made by the Honble Minister Law on the floor of Legislative Assembly on 10.04.2023 - Purchase of 28 numbers of Flour Mills with its accessories each 2 numbers to 9 Central Prisons…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_227_2024_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O.Ms.No.224",
  "date": "15-03-2024",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Prisons and Correctional Services - Announcement made by the Honble Minister law on the floor of Legislative Assembly on 10.04.2023 - Purchase of 13 Numbers of X Ray Baggage for 13 District Jails in the State - Financial Sanction…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_224_2024_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "15-03-2024",
  "dept": "Rural Development and Panchayat Raj Department",
  "cat": "Infrastructure",
  "abstract": "Announcement - Announcement No.27, made by Honble Minister (Finance and Human Resources Management) in the Budget Speech - Mudalvarin Grama Salaigal Membattu Thittam - 2024-2025 - Improvement of Village Panchayat and Panchayat…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/rd_e_71_2024.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "15-03-2024",
  "dept": "Rural Development and Panchayat Raj Department",
  "cat": "Infrastructure",
  "abstract": "Schemes – State Scheme – “Kalaignarin Kanavu Illam” – Announcement made by the Hon’ble Minister for Finance and Human Resources Management during the Budget speech 2024-2025 – Administrative sanction and Guidelines prescribed -…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/rd_e_70_2024.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "13-03-2024",
  "dept": "Water Resources Department",
  "cat": "Infrastructure",
  "abstract": "Water Resources Department – Budget Speech by the Hon’ble Minister (Finance and Human Resources Management) for the year 2024-2025 - Announcement for carrying out repair and renewal works to the shutters and other allied parts…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/wrd_e_45_Ms_2024.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "13-03-2024",
  "dept": "Water Resources Department",
  "cat": "Infrastructure",
  "abstract": "Water Resources Department – Announcement made by the Honourable Minister for Water Resources for 2023-2024 Reservoir operation system and real time Hydrological Data Monitoring and Management and SCADA Reservoir Management…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/wrd_e_47_Ms_2024.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "12-03-2024",
  "dept": "Industries, Investment Promotion & Commerce Department",
  "cat": "Economy",
  "abstract": "Industries, Investment Promotion and Commerce – Announcement made in the Budget Speech (2024-2025) by the Hon’ble Minister for Finance and Human Resources Management – ‘Special Scheme to incentivize employment of women,…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/ind_e_35_2024.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "12-03-2024",
  "dept": "Industries, Investment Promotion & Commerce Department",
  "cat": "Economy",
  "abstract": "Industries, Investment Promotion and Commerce – Announcement made in the Budget Speech (2024-2025) by the Honorable Minister for Finance and Human Resources Management – Special Scheme to promote Global Capability Centres (GCCs)…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/ind_e_34_2024.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "11-03-2024",
  "dept": "Social Welfare and Women Empowerment Department",
  "cat": "Women",
  "abstract": "Social Welfare and Women Empowerment Department – Moovalur Ramamirtham Ammaiyar Higher Education Assurance Scheme – Extension to the Tamil Medium girl students studied in all Government aided schools – Orders – Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/swwe_e_16_2024.pdf",
  "records": [
   "soc_b17_marriage"
  ],
  "laws": [],
  "budget": false
 },
 {
  "no": null,
  "date": "29-12-2023",
  "dept": "Health and Family Welfare Department",
  "cat": "Health",
  "abstract": "Establishment – Attaching Kalaignar Centenary Super Specialty Hospital in the premises of King Institute of Preventive Medicine and Research, Guindy, Chennai with Kilpauk Medical College and Hospital - Orders – Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hfw_e_402_2023.pdf",
  "records": [
   "hea4"
  ],
  "laws": [],
  "budget": false
 },
 {
  "no": "G.O Ms.No. 106",
  "date": "13-12-2023",
  "dept": "Energy Department",
  "cat": "Infrastructure",
  "abstract": "Energy department - Announcement made in the Budget Speech for the year 2023-2024 -Execution of 12 Nos. Pumped Storage Projects by Tamil Nadu Generation and Distribution Corporation Limited under Public Private Partnership (PPP)…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/energy_e_106_2023.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "15-06-2023",
  "dept": "Highways and Minor Ports Department",
  "cat": "Infrastructure",
  "abstract": "Announcement – Announcement made by the Hon’ble Minister for Public Works, Highways and Minor Ports Department – during the budget session 2022-2023 - Construction and Maintenance wing – Chennai City Roads Division - the work of…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hw_e_69_2023.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "12-05-2023",
  "dept": "Micro , Small and Medium Enterprises Department",
  "cat": "Economy",
  "abstract": "Micro, Small and Medium Enterprises – Schemes - Announcement made by Hon’ble Minister (Finance and Human Resources Management) during the Budget Speech 2023-2024–Implementation of Annal Ambedkar Business Champions Scheme (AABCS)…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/msme_e_33_2023.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "11-05-2023",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Budget Announcements - Forensic Sciences Department - Announcement made on the floor of the Legislative Assembly during the Budget Session for the year 2022-2023 - Creation of Forensic DNA analysis Division and augmenting the…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_230_Ms_2023.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "11-05-2023",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Budget Announcements - Forensic Sciences Department - Announcement made on the floor of the Legislative Assembly during the Budget Session for the year 2022-2023 - Establishing a Dedicated Unit in Computer Forensic Division in…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_229_Ms_2023.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "26-04-2023",
  "dept": "BC, MBC & Minorities Welfare Department",
  "cat": "Social",
  "abstract": "Welfare of Minorities – Budget Speech made in the Tamil Nadu Legislative Assembly for the year 2023-2024-Grant provided for Repair and Renovation of Heritage Churches increased from Rs.6/- crore to Rs.10/- crore-Administrative…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/bcmbc_e_26_2023.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "25-04-2023",
  "dept": "Transport Department",
  "cat": "Infrastructure",
  "abstract": "Land Acquisition – Thoothukudi District – Vilathikulam and Ottapidaram Taluks – Ayanbommayapuram and other 26 Villages – Acquisition through Private Negotitation / Acquisition of 1.17.97 Hectare of Wet lands, 336.53.77 Hectare of…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/trans_e_65_2023.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Bill",
    "no": null,
    "year": 2021
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "17-04-2023",
  "dept": "Transport Department",
  "cat": "Infrastructure",
  "abstract": "Land Acquisition – Dharmapuri District – Harur, Pappireddipatty and Dharmapuri Taluks – 15 Villages – Acquisition of 76.49.13 hectare of dry / wet lands, 1.20.64 hectare of Hindu Religious and Charitable Endowments lands totally…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/trans_e_54_2023.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Bill",
    "no": null,
    "year": 2021
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "29-03-2023",
  "dept": "Rural Development and Panchayat Raj Department",
  "cat": "Infrastructure",
  "abstract": "Schemes – State Scheme – Construction of new Classrooms and additional Classroom Buildings in Panchayat Union Primary and Middle Schools at an estimated cost of Rs.800 Crore as per the Announcement under Rule 110 made by the…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/rd_e_49_2023.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "16-03-2023",
  "dept": "Rural Development and Panchayat Raj Department",
  "cat": "Infrastructure",
  "abstract": "Schemes – State Scheme – Construction of new Classrooms and additional Classroom Buildings in Panchayat Union Primary and Middle Schools at an estimated cost of Rs.800 Crore as per the Announcement under Rule 110 made by the…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/rd_e_33_2023.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "16-03-2023",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Budget - Announcements - Forensic Sciences Department - Announcement made on the floor of the Legislative Assembly during the budget session for the year 2021-2022 - Establishing of Computer Forensics Division in the Regional…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_122_Ms_2023.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "16-03-2023",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Budget - Announcement - Forensic Sciences Department - Announcements made on the floor of the Legislative Assembly during the budget session for the year 2021-2022 - Establishment of 7 (seven) Mobile Forensic Science…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_123_Ms_2023.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "16-03-2023",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Budget - Announcement - Forensic Sciences Department - Announcements made on the floor of the Legislative Assembly during the Budget session for the year 2022-2023 - Up-gradation of Regional Forensic Science Laboratories at…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_124_Ms_2023.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "09-03-2023",
  "dept": "Highways and Minor Ports Department",
  "cat": "Infrastructure",
  "abstract": "Announcements – Announcement made by the Hon’ble Minister of Tamil Nadu on Assembly during the Budget Session of 2022-2023 - for the work of “Construction of Foot Over Bridge with Escalator at Km 14/8 of Inner Ring Road at Temple…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hw_e_18_2023.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "06-03-2023",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Budget - Announcement - Forensic Sciences Department - Announcements made on the floor of the Legislative Assembly during the Budget session for the year 2022-2023 - Creation of Two (2) Mobile Forensic Services Laboratories…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_97_Ms_2023.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "02-03-2023",
  "dept": "Transport Department",
  "cat": "Infrastructure",
  "abstract": "Land Acquisition – Madurai District – Usilampatti Taluk –Valanthur Village – Survey Nos.103A/5B, 103A/4B5 and 103A/5A- Acquisition of 574 sq.m of dry lands, under Tamil Nadu Acquisition of Land for Industrial Purposes Act, 1997…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/trans_e_32_2023.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Bill",
    "no": null,
    "year": 2021
   }
  ],
  "budget": false
 },
 {
  "no": "G.O.Ms.No.1",
  "date": "03-01-2023",
  "dept": "Agriculture - Farmers Welfare Department",
  "cat": "Agriculture",
  "abstract": "Agricultural Marketing and Agri Business – Tamil Nadu Agricultural Produce Marketing (Regulation) Act, 1987 - Uniform Notification to declare the regulation of purchase and sale of the 40 agricultural produces in Tamil Nadu…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/agri_e_ms_1_am2_2023.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Act",
    "no": null,
    "year": 2026
   },
   {
    "kind": "Act",
    "no": null,
    "year": 2024
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "06-12-2022",
  "dept": "Rural Development and Panchayat Raj Department",
  "cat": "Infrastructure",
  "abstract": "Schemes – State Scheme – Construction of new Classrooms and additional Classroom Buildings in Panchayat Union Primary and Middle Schools at an estimated cost of Rs.800 Crore as per the Announcement under Rule 110 made by the…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/rd_e_132_2022.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "05-12-2022",
  "dept": "Transport Department",
  "cat": "Infrastructure",
  "abstract": "Land Acquisition – Chengalpattu District – Maduranthakam Taluk – Maduranthakam Town and Pallipettai Village – Acquisition of 2.82.69 Hectare of Patta and Poramboke lands in Survey Nos. 8B, 116/2A1 etc., under Tamil Nadu…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/trans_e_122_2022.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Bill",
    "no": null,
    "year": 2021
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "21-11-2022",
  "dept": "Agriculture - Farmers Welfare Department",
  "cat": "Agriculture",
  "abstract": "Agriculture and Farmers Welfare - Tamil Nadu Agricultural University - Announcement made by the Honourable Minister for Agriculture and Farmers Welfare in the Agriculture Budget 2022-2023 - Sl.No.11 Digital Agriculture and…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/agri_e_lr_ms_278_au_2022.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "10-11-2022",
  "dept": "Industries, Investment Promotion & Commerce Department",
  "cat": "Economy",
  "abstract": "Industries – Land Acquisition – Kancheepuram District – Sriperumbudur Taluk – Vallam ‘A’ Village – Withdrawal from land acquisition proceedings – Notification under sub section (1) of section 4 of the Tamil Nadu Acquisition of…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/G.O.(MS) NO.224 DT.10.11.2022.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Bill",
    "no": null,
    "year": 2021
   }
  ],
  "budget": false
 },
 {
  "no": "G.O.Ms.No.259",
  "date": "03-11-2022",
  "dept": "Agriculture - Farmers Welfare Department",
  "cat": "Agriculture",
  "abstract": "Agriculture and Farmers Welfare - Announcement made by the Honourable Minister for Agriculture and Farmers Welfare - Electric motor pump-sets with subsidy Scheme at an outlay of Rs.5.00 crore to provide subsidy assistance of…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/agri_e_ms_259_h1_2022.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "22-09-2022",
  "dept": "Highways and Minor Ports Department",
  "cat": "Infrastructure",
  "abstract": "Highways Department - Announcement made in Assembly during budget session 2022-23 - “Preparation of Detailed Project Report (DPR) With Techno Economic Feasibility for Industrial Port Road to connect Manamadurai - Soorangudi” -…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hw_e_189_2022_Ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "21-09-2022",
  "dept": "Industries, Investment Promotion & Commerce Department",
  "cat": "Economy",
  "abstract": "Industries – SIPCOT Industrial Park – Land Acquisition – Krishnagiri District – Shoolagiri and Krishnagiri Taluks – Attakurukki, Dhoripalli and Kurubarapalli villages – Survey Nos.251/1 etc – Tamil Nadu Acquisition of Land for…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/ind_e_196_2022.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Bill",
    "no": null,
    "year": 2021
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "12-09-2022",
  "dept": "Transport Department",
  "cat": "Infrastructure",
  "abstract": "Land Acquisition – Erode District – Perundurai Taluk – Chennimalai and Voipadi Villages – Survey Numbers 51/2 etc., - Acquisition of 12.38.18 Hectare of Dry Lands and 0.41.50 Hectare of Poramboke Lands, totally 12.79.68 Hectare…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/trans_e_91_2022.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Bill",
    "no": null,
    "year": 2021
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "04-09-2022",
  "dept": "School Education Department",
  "cat": "Education",
  "abstract": "School Education-Announcement made by the Honble Chief Minister on 07.05.2022 under Rule 110 of Tamil Nadu Legislative Assembly-Establishment of 28 Schools of Excellence in the academic year 2022-23-Orders-Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/schedu_e_149_2022_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "26-08-2022",
  "dept": "Highways and Minor Ports Department",
  "cat": "Infrastructure",
  "abstract": "Highways and Minor Ports Department - Announcement during the Budget Demand 2022-2023 – “Construction of Road Over Bridge of Km 1/6 of Sirudhaiyur – Sengaraiyur road in lieu of existing Level Crossing No.226 at Railway Km 311/8-9…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hw_e_171_2022.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "26-08-2022",
  "dept": "Highways and Minor Ports Department",
  "cat": "Infrastructure",
  "abstract": "Highways and Minor Ports Department - Announcement during the Budget Demand 2022-2023 – “Construction of Road Over Bridge at Km 0/4 of Cauvery road in lieu of the existing Level Crossing No. 249, at Railway Km 331/7-8 in between…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hw_e_172_2022.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "24-08-2022",
  "dept": "Highways and Minor Ports Department",
  "cat": "Infrastructure",
  "abstract": "Highways and Minor Ports Department - Announcement during the Budget Demand 2022-2023 – Work of “Construction of High Level Bridge across the River Cauvery in between Unniyur in Trichirappalli District and Nerur in Karur…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hw_e_163_2022_Ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "17-08-2022",
  "dept": "Transport Department",
  "cat": "Infrastructure",
  "abstract": "Land Acquisition – Ramanathapuram District – Rameshwaram Taluk and Group – Acquisition/Alienation of 36672 square meter of patta lands and transfer of 724312 square meter of poramboke lands totally 760984 square meter of lands…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/trans_e_82_2022.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Bill",
    "no": null,
    "year": 2021
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "16-08-2022",
  "dept": "Highways and Minor Ports Department",
  "cat": "Infrastructure",
  "abstract": "Highways and Minor Ports Department - Announcements during the Budget Demand 2022-2023 on 12.04.2022 – “Construction of Road Over Bridge in lieu of existing Level Crossing No.48 at Railway km 77/700-800 between Nagore and…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hw_e_155_2022.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "11-08-2022",
  "dept": "Industries, Investment Promotion & Commerce Department",
  "cat": "Economy",
  "abstract": "Industries - Land Acquisition - Kancheepuram District - Sriperumbudur Taluk - Irumbedu village - Withdrawal from the land acquisition proceedings in respect of 1.20.50 hectare of land in S.Nos 58/1C1 58/1C2 58/1C3 58/2 - Under…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/ind_t_174_2022.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Bill",
    "no": null,
    "year": 2021
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "11-08-2022",
  "dept": "Highways and Minor Ports Department",
  "cat": "Infrastructure",
  "abstract": "Highways Department – Announcement made by the Hon’ble Minister for Public Works, Highways and Minor Ports Department during the Budget Session 2022–2023 – “Construction of High Level Bridge in lieu of existing old narrow bridge…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hw_e_151_2022_Ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "11-08-2022",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Civil and Criminal - Announcement made by the Honble Minister for law on the floor of the Legislative Assembly - Constitution of 4 district Munsif-cum-Judicial Magistrate Courts at Modakurichi in Erode District,…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_432_2022_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "08-08-2022",
  "dept": "Highways and Minor Ports Department",
  "cat": "Infrastructure",
  "abstract": "Highways Department – Announcement made by the Hon’ble Minister for Public Works, Highways and Minor Ports Department during the Budget Session 2022–2023 – “Construction of High Level Bridge in lieu of existing old narrow bridge…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hw_e_144_2022_Ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "08-08-2022",
  "dept": "Highways and Minor Ports Department",
  "cat": "Infrastructure",
  "abstract": "Highways Department – Announcement made by the Hon’ble Minister for Public Works, Highways and Minor Ports Department during the Budget Session 2022–2023 – “Construction of High Level Bridge in lieu of existing old narrow bridge…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hw_e_145_2022_Ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "02-08-2022",
  "dept": "Social Welfare and Women Empowerment Department",
  "cat": "Women",
  "abstract": "Social Welfare and Women Empowerment - “Moovalur Ramamirtham Ammaiyar Higher Education Assurance Scheme” in the place of Moovalur Ramamirtham Ammaiyar Memorial Marriage Assistance Scheme – Implementation Guidelines - Orders -…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/swwe_e_46_2022.pdf",
  "records": [
   "soc_b17_marriage"
  ],
  "laws": [],
  "budget": false
 },
 {
  "no": null,
  "date": "01-08-2022",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Police - Honble Chief Minister Announcement during the Budget Session on 13.09.2021 - Formation of Marina Beach life guard unit in Chennai - Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_401_2022_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "26-07-2022",
  "dept": "Micro , Small and Medium Enterprises Department",
  "cat": "Economy",
  "abstract": "MSME Policy, 2021 - Budget Speech for 2021-2022 - Enhancement of the rate of incentive and maximum eligible subsidy for IPO listing expenditure of SMEs from Rs.5 lakh (20 percent) to Rs.30 lakh (50 percent) - Amendment to para…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/msme_e_56_2022.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "22-07-2022",
  "dept": "Transport Department",
  "cat": "Infrastructure",
  "abstract": "Land Acquisition – Chennai District – Tiruvottiyur Taluk and Town – Sathangadu Village – Acquisition of 593 sq.m of dry lands in Ward F, Block No. 3, Town Survery No. 1, 2, 24 etc., under Tamil Nadu Acquisition of Land for…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/trans_e_73_2022.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Bill",
    "no": null,
    "year": 2021
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "19-07-2022",
  "dept": "Transport Department",
  "cat": "Infrastructure",
  "abstract": "Land Acquisition – Virudhunagar District – Aruppukottai Taluk and Village – Survey Numbers 301 1 and 301 2 – Acquistion through Private Negotitation Acquisition of 3534 square meter of dry lands, under Tamil Nadu Acquisition of…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/trans_e_72_2022.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Bill",
    "no": null,
    "year": 2021
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "15-07-2022",
  "dept": "Highways and Minor Ports Department",
  "cat": "Infrastructure",
  "abstract": "Highways Department – Announcement made by the Hon’ble Minister for Public Works, Highways and Minor Ports Department during the Budget Session 2022–2023 – “Construction of Road Over Bridge at km 0/2 of Sedapalayam –…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hw_e_130_2022_Ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "29-06-2022",
  "dept": "Highways and Minor Ports Department",
  "cat": "Infrastructure",
  "abstract": "Highways Department – Construction and Maintenance Wing – Announcement made in Assembly during budget session 2022-2023 – Preparation of Detailed Project Report for Widening and Improvements in Km 0/0-77/400 of Paramanandhal in…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hw_e_116_2022_Ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "27-06-2022",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Transport Department - Tamil Nadu Motor Vehicles Rules, 1989 - Announcement made by the Honble Minister for Transport on the floor of the Assembly for the year 2022-2023 - Draft amendment to Rule 230 of the Tamil Nadu Motor…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_318_2022_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "24-06-2022",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Civil - Announcement made by the Honble Minister for Law on the floor of the Assembly - Constitution of a Sub court at Srivaikuntam in Thoothukudi District - Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_314_2022_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "24-06-2022",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - civil - Announcement made by the Honble Minister for law on the floor of the Assembly - constitution of a Sub court at Kodumudi in Erode District - Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_312_2022_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "24-06-2022",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Civil - Announcement made by the Honble Minister for Law on the floor of the assembly - Consitution of a Sub Court at Sankarapuram in villupuram district - Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_313_2022_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "15-06-2022",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Motor Vehicles - Tamil Nadu Motor Vehicles (Regulation and Control of School Buses) Special Rules, 2012 - Announcement made by the Honble Minister for Transport on the floor of the Assembly for the year 2022-2023 - Draft…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_292_2022_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "14-06-2022",
  "dept": "Highways and Minor Ports Department",
  "cat": "Infrastructure",
  "abstract": "Highways Department – Announcement made by the Hon’ble Minister for Public Works, Highways and Minor Ports Department during the Budget Session 2022 – 23 – “Preparation of Detailed Project Report for Forming of Eastern bypass to…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hw_e_100_2022_Ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "14-06-2022",
  "dept": "Highways and Minor Ports Department",
  "cat": "Infrastructure",
  "abstract": "Highways Department – Announcement made by the Hon’ble Minister for Public Works, Highways and Minor Ports Department during the Budget Session 2022 – 23 – “Preparation of Detailed Project report for Reducing Traffic Congestion,…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hw_e_101_2022_Ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "07-06-2022",
  "dept": "Transport Department",
  "cat": "Infrastructure",
  "abstract": "Land Acquisition - Dindigul District - Oddanchatram Taluk - Virupatchi Village - Acquisition of 0.05.80 Hectare of dry lands, under Tamil Nadu Acquisition of Land for Industrial Purposes Act, 1997 (Tamil Nadu Act 10 of 1999) for…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/trans_e_53_2022.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Bill",
    "no": null,
    "year": 2021
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "02-06-2022",
  "dept": "Highways and Minor Ports Department",
  "cat": "Infrastructure",
  "abstract": "Highways Department – Announcement made by the Hon’ble Minister for Public Works, Highways and Minor Ports Department during the Budget Session for the year 2022-2023 - Preparation of Details Project Report for the work…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hw_e_92_2022.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "24-05-2022",
  "dept": "Highways and Minor Ports Department",
  "cat": "Infrastructure",
  "abstract": "Highways Department – Announcement made in Assembly during budget session 2022-23 - Preparation of Detailed Project Report for construction of pedestrian subway near CMC Hospital in Arcot Road – Administrative and Financial…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hw_e_84_2022.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "23-05-2022",
  "dept": "Highways and Minor Ports Department",
  "cat": "Infrastructure",
  "abstract": "Highways Department – Announcement made by the Hon’ble Minister for Public Works, Highways and Minor Ports Department during the Budget Session 2022 – 23 – Preparation of Detailed Project Report for the work of “Providing…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hw_e_83_2022_Ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "23-05-2022",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Civil - Announcement made by the Honble Minister for Law on the floor of the Assembly - Constitution of a Sub Court at Vandavasi in Tiruvannamalai District - Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_241_2022_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "23-05-2022",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Civil - Announcement made by the Honble Minister for Law on the floor of the Assembly - Constitution of a Sub Court at Sirkali in Nagapattinam District - Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_240_2022_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "20-05-2022",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Transport Department - Announcement made by the Honble Minister for Transport for the year 2022-2023 on the floor of the Assembly on 05.05.2022 - Implementation of Contactless services Surrender of class of vehicle from Driving…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_237_2022_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "19-05-2022",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Civil and Criminal - Announcement made by the Honble Minister for Law - Constitution of a District Munsif-cum-Judicial Magistrate Court at Anaicut in Vellore District - Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_232_2022_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "19-05-2022",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Civil - Announcement made by the Honble Minister for Law on the floor of the Assembly - Constitution of a Sub Court at Bodinayakanur in Theni District - Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_231_2022_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "19-05-2022",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Civil - Announcement made by the Honble Minister for Law on the floor of the Assembly - Constitution of a Sub Court at Musiri in Tiruchirappalli District - Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_233_2022_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O Ms. No. 125",
  "date": "09-05-2022",
  "dept": "Finance Department",
  "cat": "Economy",
  "abstract": "Tamil Nadu Government Pensioners’ Family Security Fund Scheme – Sanction of a sum ofRs.50.00crore as advance from the Government of Tamil Nadu to the Government Pensioners Family Security Fund Scheme – Announcement made by the…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/fin_e_125_2022.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "29-04-2022",
  "dept": "Transport Department",
  "cat": "Infrastructure",
  "abstract": "Land Acquisition – Tiruchirappalli District – Tiruchirappalli (East) Taluk - Tharanallur Village – Ward Q – Block No.1 – T.S. No.14/1- Acquisition of 454 Square Meter of wetlands, under Tamil Nadu Acquisition of Land for…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/trans_e_40_2022.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Bill",
    "no": null,
    "year": 2021
   }
  ],
  "budget": false
 },
 {
  "no": "G.O.Ms No. 101",
  "date": "02-04-2022",
  "dept": "Finance Department",
  "cat": "Economy",
  "abstract": "Announcement in Budget Speech 2021-22 – Constitution of an advisory council to develop a Federal Fiscal Model and its Terms of Reference – Appointment of Chairman and Members – Orders – Issued",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/fin_e_101_2022.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "01-04-2022",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Motor Vehicles - Transport Department - Announcement made by the Honble Minister for Transport on the floor of the Assembly for the year 2021-2022 - Construction of own building for the Regional Transport Office, Madurai (South)…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_172_2022_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O Ms.No.30",
  "date": "17-03-2022",
  "dept": "Human Resources Management Department",
  "cat": "Governance",
  "abstract": "Public Services - Tamil Nadu Public Service Commission (Additional Functions) Act, 2022, (Tamil Nadu Act 14 of 2022) - Bringing into force - Framing of Tamil Nadu Public Service Commission (Additional Functions) Rules, 2022 -…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hrm_e_30_2022.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Act",
    "no": null,
    "year": 2022
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "16-03-2022",
  "dept": "Transport Department",
  "cat": "Infrastructure",
  "abstract": "Land Acquisition – Tiruvarur District – Nannilam Taluk - Peralam Village – Acquisition through Private Negotiation (or) Acquisition of 1.94.33 Hectare of wetlands and transfer of 0.09.05 Hectare of Government Poramboke lands…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/trans_e_24_2022.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Bill",
    "no": null,
    "year": 2021
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "15-03-2022",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Road safety - Innuyir Kappom Thittam - Announcement made by the Honble Chief Minister during the Meeting on Road Safety - Constitution of Special Task Force on Road Safety (STF-RS) for implementation of Innuyir Kappom Thittam -…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_146_2022_ms.pdf",
  "records": [
   "hea2"
  ],
  "laws": [],
  "budget": false
 },
 {
  "no": null,
  "date": "08-03-2022",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Civil - Announcement made by the Honble Minister for Law on the Floor of the Assembly - Constitution of a Sub Court at Thirumayam in Pudukkottai District - Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_135_2022_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O. Ms. No.15",
  "date": "22-02-2022",
  "dept": "Planning, Development and Special Initiatives Department",
  "cat": "Economy",
  "abstract": "CMRL - Land Acquisition Appointment of Special District Revenue Officer (LA), Chennai Airport Expansion scheme to perform the functions of the Collector under the Tamil Nadu Acquisition of Land for Industrial purposes Act 1997 to…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/pdsi_e_15_2022.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Bill",
    "no": null,
    "year": 2021
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "03-02-2022",
  "dept": "Health and Family Welfare Department",
  "cat": "Health",
  "abstract": "Tamil Nadu Health Systems Project - Chief Ministers Comprehensive Health Insurance Scheme - Innuyir Kappom Thittam - Nammai Kaakkum 48 - Nammai Kaakkum 48 Process Flow, Nammai Kaakkum 48 Guidelines, Nammai Kaakkum 48 Logo and…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hfw_e_46_2022.pdf",
  "records": [
   "hea2"
  ],
  "laws": [],
  "budget": false
 },
 {
  "no": null,
  "date": "07-01-2022",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Criminal - Announcement made by the Honble Minister for Law on the Floor of the Legislative Assembly - Constitution of new Chief Judicial Magistrate Courts in the newly formed Kallakurichi, Tenkasi, Mayiladuthurai,…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_17_2022_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "06-01-2022",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Budget - Announcement - Forensic Sciences Department - Announcements made on the floor of the Legislative Assembly during the Budget session for the year 2021-2022 - Establishment of DNA analysis Division in the Regional Forensic…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_13_2022_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O.Ms.No.256",
  "date": "23-12-2021",
  "dept": "Agriculture - Farmers Welfare Department",
  "cat": "Agriculture",
  "abstract": "Agriculture and Framers Welfare Department – Tamil Nadu Agricultural University – Announcement made by the Honourable Minister for Agriculture and Farmers Welfare during Agriculture and Farmers Welfare Department Demand 2021-2022…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/agri_e_ms_256_au_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O.Ms.No.254",
  "date": "21-12-2021",
  "dept": "Agriculture - Farmers Welfare Department",
  "cat": "Agriculture",
  "abstract": "Agriculture and Framers Welfare Department – Tamil Nadu Agricultural University – Announcement made by the Honourable Minister for Agriculture and Farmers Welfare during Agriculture and Farmers Welfare Department Demand 2021-2022…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/agri_e_ms_254_au_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O.Ms.No.249",
  "date": "17-12-2021",
  "dept": "Agriculture - Farmers Welfare Department",
  "cat": "Agriculture",
  "abstract": "Agriculture and Framers Welfare Department – Tamil Nadu Agricultural University – Announcement made by the Honourable Minister for Agriculture and Farmers Welfare during Agriculture and Farmers Welfare Department Demand 2021-2022…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/agri_e_ms_249_au_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O.Ms.No.250",
  "date": "17-12-2021",
  "dept": "Agriculture - Farmers Welfare Department",
  "cat": "Agriculture",
  "abstract": "Agriculture and Framers Welfare Department – Tamil Nadu Agricultural University – Announcement made by the Honourable Minister for Agriculture and Farmers Welfare during Agriculture and Farmers Welfare Department Demand 2021-2022…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/agri_e_ms_250_au_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O.Ms.No.246",
  "date": "16-12-2021",
  "dept": "Agriculture - Farmers Welfare Department",
  "cat": "Agriculture",
  "abstract": "Agriculture and Framers Welfare Department – Tamil Nadu Agricultural University – Agriculture Budget Speech 2021-2022 – Announcements made by the Hon’ble Minister for Agriculture and Farmers Welfare – Introduction of Tamil medium…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/agri_e_ms_246_au_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "10-12-2021",
  "dept": "Highways and Minor Ports Department",
  "cat": "Infrastructure",
  "abstract": "Highways Department - Announcement made by the Hon’ble Minister, (Public works) during Budget session 2021-2022 - Preparation of Detailed Project Report for the work of Construction of Bypasses to 13 towns in 8 Districts -…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hw_e_127_2021_Ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "07-12-2021",
  "dept": "Highways and Minor Ports Department",
  "cat": "Infrastructure",
  "abstract": "Highways Department - Announcement made by the Honble Minister (Public works) during Budget session 2021-2022 - Preparation of Detailed Project Report for the work of Construction of 2 Elevated Corridors each in Trichy and…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hw_e_120_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "02-12-2021",
  "dept": "Transport Department",
  "cat": "Infrastructure",
  "abstract": "Land Acquisition – Cuddalore District – Thittakudi Taluk- Pennadam and other 8 Villages – Acquisition/Alienation of 7.74.00 Hectare of patta lands, 1.60.50 Hectare of Government dry lands, 0.62.50 Hectare of natham lands, 1.49.50…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/trans_e_123_2021.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Bill",
    "no": null,
    "year": 2021
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "27-11-2021",
  "dept": "Environment, Climate Change and Forests Department",
  "cat": "Heritage",
  "abstract": "Budget Speech 2021-22 setting up of the Integrated Environmental Monitoring Studio with Continuous Ambient Air Quality Monitoring Stations (CAAQMS) by TNPCB orders issued",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/env_e_115_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "26-11-2021",
  "dept": "Higher Education Department",
  "cat": "Education",
  "abstract": "Technical Education – Announcement during the Budget Speech 2021-22 – Provision of One Smart Class Room in 50 Government Polytechnic Colleges and Procurement of Education Video Modules / Simulation Software for the office of the…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hedu_e_237_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "19-11-2021",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Civil - Announcement made by the Honble Minister for Law on the Floor of the Assembly - Constitution of a Sub Court at Polur in Tiruvannamalai District - Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_514_2021_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "19-11-2021",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Civil - Announcement made by the Honble Minister for Law on the Floor of the Assembly - Constitution of an Additional District Court at Aruppukottai in Virudhunagar District - Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_513_2021_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "19-11-2021",
  "dept": "School Education Department",
  "cat": "Education",
  "abstract": "School Education –Announcement made by the Hon’ble Finance Minister during the reply for the Revised Budget for the year 2021-2022 in the Tamil Nadu Legislative Assembly – Implementation of a mission mode “Illam Thedi Kalvi”…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/schedu_e_156_2021_ms.pdf",
  "records": [
   "edu5",
   "edu_b2_itk"
  ],
  "laws": [],
  "budget": false
 },
 {
  "no": null,
  "date": "19-11-2021",
  "dept": "Health and Family Welfare Department",
  "cat": "Health",
  "abstract": "National Health Mission - Strengthening of Health and Wellness Centers and Makkalai Thedi Maruthuvam Scheme - Placement of 2448 Multipurpose Health Worker (Male) Health Inspector Grade the Health Sub Centres - Health and Wellness…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hfw_e_516_2021.pdf",
  "records": [
   "hea1"
  ],
  "laws": [],
  "budget": false
 },
 {
  "no": null,
  "date": "17-11-2021",
  "dept": "Highways and Minor Ports Department",
  "cat": "Infrastructure",
  "abstract": "Highways and Minor Ports Department – Announcements -Budget Speech 2021 – Taking up of widening works under the New Scheme “Chief Minister’s Road Development Programme” – In Principle approval - Accorded – Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hw_e_105_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "15-11-2021",
  "dept": "Higher Education Department",
  "cat": "Education",
  "abstract": "Technical Education – Announcement made by Hon ble Minister for Higher Education during the Budget Session 2021-22 – Enhancing the number of students availing Post Graduate Assistantship in Engineering Colleges from 600 to 1200 –…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hedu_e_220_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "03-11-2021",
  "dept": "Micro , Small and Medium Enterprises Department",
  "cat": "Economy",
  "abstract": "MSME Policy, 2021 - Budget Speech for 2021-2022 - Enhancement of the rate of incentive and maximum eligible subsidy for IPO listing expenditure of SMEs from Rs.5 lakh to Rs.30 lakh - Amendment to the Guidelines for Administration…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/msme_e_64_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "01-11-2021",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Civil - Announcement made by the Honble Minister for Law on the Floor of the Assembly - Constitution of a Sub Court at Thiruthuraipoondi in Tiruvarur District - Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_464_2021_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "29-10-2021",
  "dept": "Micro , Small and Medium Enterprises Department",
  "cat": "Economy",
  "abstract": "Micro, Small and Medium Enterprises Tamil Nadu Small Industries Development Corporation Limited (TANSIDCO) Budget Speech delivered by Hon’ble Minister (Finance and Human Resources Management ) on 13.08.2021 Construction of…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/msme_e_57_ms_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O.Ms.No.172",
  "date": "28-10-2021",
  "dept": "Agriculture - Farmers Welfare Department",
  "cat": "Agriculture",
  "abstract": "Agriculture and Farmers Welfare Department – Agriculture Budget Speech of 2021-22 – Announcement – Sanction for a sum of Rs. 299.976 Lakh for implementing the Scheme of “Special Package for increasing the Productivity in coconut…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/agri_e_ms_172_h2_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O.Ms.No.174",
  "date": "28-10-2021",
  "dept": "Agriculture - Farmers Welfare Department",
  "cat": "Agriculture",
  "abstract": "Agriculture and Farmers Welfare – Tamil Nadu Agricultural University – Announcement made by the Hon’ble Minister of Agriculture and Farmers Welfare during Agriculture and Farmers Welfare Department Budget Speech 2021-2022 –…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/agri_e_ms_174_au_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O.Ms.No.168",
  "date": "28-10-2021",
  "dept": "Agriculture - Farmers Welfare Department",
  "cat": "Agriculture",
  "abstract": "Agriculture and Farmers Welfare – Tamil Nadu Agricultural University – Announcement made by the Hon’ble Minister of Agriculture and Farmers Welfare during Agriculture and Farmers Welfare Department Budget Speech 2021-2022 –…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/agri_e_ms_168_au_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O.Ms.No.164",
  "date": "27-10-2021",
  "dept": "Agriculture - Farmers Welfare Department",
  "cat": "Agriculture",
  "abstract": "Agriculture and Farmers Welfare – Tamil Nadu Agricultural University – Announcement made by the Hon’ble Minister of Agriculture and Farmers Welfare during Agriculture and Farmers Welfare Department Budget Speech 2021-2022 –…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/agri_e_ms_164_au_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O.Ms.No.165",
  "date": "27-10-2021",
  "dept": "Agriculture - Farmers Welfare Department",
  "cat": "Agriculture",
  "abstract": "Agriculture and Farmers Welfare – Tamil Nadu Agricultural University – Announcement made by the Hon’ble Minister of Agriculture and Farmers Welfare during Agriculture and Farmers Welfare Department Budget Speech 2021-2022 –…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/agri_e_ms_165_au_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O.Ms.No.163",
  "date": "26-10-2021",
  "dept": "Agriculture - Farmers Welfare Department",
  "cat": "Agriculture",
  "abstract": "Agriculture and Farmers Welfare – Tamil Nadu Agricultural University – Announcement made by the Hon’ble Minister of Agriculture and Farmers Welfare during Agriculture and Farmers Welfare Department Budget Speech 2021-2022 –…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/agri_e_ms_163_au_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O.Ms.No.161",
  "date": "26-10-2021",
  "dept": "Agriculture - Farmers Welfare Department",
  "cat": "Agriculture",
  "abstract": "Agriculture and Farmers Welfare – Tamil Nadu Agricultural University – Announcement made by the Hon’ble Minister of Agriculture and Farmers Welfare during Agriculture and Farmers Welfare Department Budget Speech 2021-2022 –…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/agri_e_2d_161_ap1_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O.Ms.No.162",
  "date": "26-10-2021",
  "dept": "Agriculture - Farmers Welfare Department",
  "cat": "Agriculture",
  "abstract": "Agriculture and Farmers Welfare – Tamil Nadu Agricultural University – Announcement made by the Hon’ble Minister of Agriculture and Farmers Welfare during Agriculture and Farmers Welfare Department Budget Speech 2021-2022 –…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/agri_e_ms_162_au_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O.Ms.No.160",
  "date": "26-10-2021",
  "dept": "Agriculture - Farmers Welfare Department",
  "cat": "Agriculture",
  "abstract": "Agriculture and Farmers Welfare – Agriculture Budget Speech of 2021-22 and Demand No.5 – Announcements – Integrated Horticulture Development Scheme 2021-2022 – Sanction for an amount of Rs. 41.5502 crore for implementation of…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/agri_e_ms_160_h2_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O.Ms.No.156",
  "date": "23-10-2021",
  "dept": "Agriculture - Farmers Welfare Department",
  "cat": "Agriculture",
  "abstract": "Agriculture and Farmers Welfare Department – Announcement made by the Hon’ble Minister for Agriculture and Farmers’ welfare in the floor of assembly during Agriculture Budget Speech on 14.08.2021 – For the “Distribution of…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/agri_e_ms_153_ae1_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "22-10-2021",
  "dept": "Environment, Climate Change and Forests Department",
  "cat": "Heritage",
  "abstract": "ECC-Blue Flag Beach Certification Programme in Tamil Nadu - Announcement made in the Budget speech - Orders - Issued",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/envfor_e_89_2021_Ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "01-10-2021",
  "dept": "Micro , Small and Medium Enterprises Department",
  "cat": "Economy",
  "abstract": "Micro, Small and Medium Enterprises Department - Announcement made by the Honble Minister for Rural Industries on the floor of Assembly - Relaxation of the educational qualification, enhancing the ceiling from Rs.50 lakh to Rs.75…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/msme_e_47_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "30-08-2021",
  "dept": "Health and Family Welfare Department",
  "cat": "Health",
  "abstract": "National Health Mission - Tamil Nadu - Universal Health Coverage - Makkalai Thedi Maruthuvam - Transformation of 2448 Health Sub Centres as Health and Wellness Centres for implementation of Universal Health Care Programme at a…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hfw_e_392_2021.pdf",
  "records": [
   "hea1"
  ],
  "laws": [],
  "budget": false
 },
 {
  "no": null,
  "date": "10-08-2021",
  "dept": "Law Department",
  "cat": "Governance",
  "abstract": "Law Department-Announcement made by the Honble Minister-Organizing of Legal History Congress at Tamil Nadu National Law University, Tiruchirappalli during the year 2021-2022-Financial sanction accorded-Orders -Issued",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/law_e_241_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "03-08-2021",
  "dept": "Health and Family Welfare Department",
  "cat": "Health",
  "abstract": "National Health Mission - Tamil Nadu - Implementation of Makkalai Thedi Maruthuvam Schemes in Tamil Nadu - Orders - Issued",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hfw_e_340_2021.pdf",
  "records": [
   "hea1"
  ],
  "laws": [],
  "budget": false
 },
 {
  "no": "G.O Ms. No. 41",
  "date": "06-07-2021",
  "dept": "BC, MBC & Minorities Welfare Department",
  "cat": "Social",
  "abstract": "Tamil Nadu State Minorities Commission – Appointment of Vice Chairman and Members – Notified – Orders – Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/bcmbcmw_e_41_2021.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Bill",
    "no": 10,
    "year": 2021
   }
  ],
  "budget": false
 },
 {
  "no": "G.O Ms. No. 39",
  "date": "28-06-2021",
  "dept": "BC, MBC & Minorities Welfare Department",
  "cat": "Social",
  "abstract": "Tamil Nadu State Minorities Commission – Appointment of Chairman – Notified – Orders – Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/bcmbcmw_e_39_2021.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Bill",
    "no": 10,
    "year": 2021
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "25-02-2021",
  "dept": "Industries, Investment Promotion & Commerce Department",
  "cat": "Economy",
  "abstract": "Industries Department - Land Acquisition - Krishnagiri District - Shoolagiri Taluk - Nallaganakothapalli Village - Acquisition of 12.32.5 Hectares of dry lands in S.No. 255/1A etc., Phase-IV, Unit I, Block-3, for setting up of…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/ind_e_86_2021.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Bill",
    "no": null,
    "year": 2021
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "22-02-2021",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Civil - Announcement made by the Honble Minister (Law, Courts and Prisons) on the Floor of the Assembly - Constitution of an Additional District Court at Tiruchengode in Namakkal District - Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_104_2021_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": "G.O. Ms. No.18",
  "date": "22-02-2021",
  "dept": "BC, MBC & Minorities Welfare Department",
  "cat": "Social",
  "abstract": "Act Tamil Nadu State Minorities Commission Act, 2010 (Act 21 of 2010) Religious and Linguistic Minorities recognised by Notifications Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/bcmbc_ms_18_2021.pdf",
  "records": [],
  "laws": [
   {
    "kind": "Bill",
    "no": 10,
    "year": 2021
   }
  ],
  "budget": false
 },
 {
  "no": null,
  "date": "15-02-2021",
  "dept": "Highways and Minor Ports Department",
  "cat": "Infrastructure",
  "abstract": "Announcement – Announcements made by the Hon’ble Chief Minister during the Budget Demand of Highways and Minor Ports Department for the year 2020-2021 – Preparation of Detailed Project Report for developing three major roads into…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hw_e_35_2021_Ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "15-02-2021",
  "dept": "Highways and Minor Ports Department",
  "cat": "Infrastructure",
  "abstract": "Highways Department – Announcement made by the Hon’ble Deputy Chief Minister during Budget Speech 2020-2021 – Formation of Road Safety Wing – Creation of 40 new posts in various categories – Sanctioned Scope and Objective of the…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hw_e_ 37_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "10-02-2021",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Civil - Announcement made by the Honble Minister (Law, Courts and Prisons) on the Floor of the Assembly - Constitution of a Sub Court at Thiruvottiyur in Tiruvallur District - Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_69_2021_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "10-02-2021",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Civil - Announcement made by the Honble Minister (Law, Courts and Prisons) on the Floor of the Assembly - Constitution of an Additional District Munsif Court at Kulithalai in Karur District - Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_70_2021_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "09-02-2021",
  "dept": "Rural Development and Panchayat Raj Department",
  "cat": "Infrastructure",
  "abstract": "Mahatma Gandhi National Rural Employment Guarantee Scheme - Announcement made by Hon’ble Chief Minister on the floor of the Legislative Assembly under Rule 110 on 19.03.2020 - Construction of 500 Panchayat Office Buildings in…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/rural_e_ms_26_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "05-02-2021",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Civil - Announcement made by the Honble Minister (Law, Courts and Prisons) on the Floor of the Assembly - Constitution of a Sub Court at keeranur in Pudukottai District - Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_58_2021_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "05-02-2021",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Civil - Announcement made by the Honble Minister (Law, Courts and Prisons) on the Floor of the Assembly - Constitution of one more Additional District Munsif Court at Jayamkondam in Ariyalur District - Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_59_2021_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "05-02-2021",
  "dept": "Home, Prohibition and Excise Department",
  "cat": "Governance",
  "abstract": "Courts - Civil and Criminal - Announcement made by the Honble Minister for Law, Courts and Prisons - Constitution of a District Munsif-cum-Judicial Magistrate Court at Thiruvennainallur in Villupuram District - Orders - Issued.",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/home_e_60_2021_ms.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "02-02-2021",
  "dept": "Rural Development and Panchayat Raj Department",
  "cat": "Infrastructure",
  "abstract": "Mahatma Gandhi National Rural Employment Guarantee Scheme - Announcement made by Hon’ble Chief Minister on the floor of the Legislative Assembly under Rule 110 on 19.03.2020 - Construction of cremation sheds in Adi Dravidar…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/rural_e_ms_17_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 },
 {
  "no": null,
  "date": "27-01-2021",
  "dept": "Higher Education Department",
  "cat": "Education",
  "abstract": "Higher Education – Announcement during the Budget Speech 2020-21 – Handing over of Rajah Muthiah Medical College attached to Annamalai University to Health and Family Welfare Department for treating it as Government Medical…",
  "pdf": "https://cms.tn.gov.in/cms_migrated/document/GO/hedu_e_16_2021.pdf",
  "records": [],
  "laws": [],
  "budget": true
 }
];
