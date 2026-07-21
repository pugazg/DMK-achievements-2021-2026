# Evidence Remediation Queue

**Generated:** 2026-07-21 by `scripts/evidence_queue.mjs`.
**Diagnostic only — nothing here has been fixed, and this script changes no data.**

Classifies all 438 achievement records and 505 manifesto promises by
**the evidence this project actually holds**, independent of how the government or
the external tracker describes them.

---

## 1. Attribute support

The evidence model (`docs/EVIDENCE_MODEL.md`) names the attributes a record should
be able to carry. This is how many can carry each one today.

| Attribute | Records supporting it | Note |
|---|---|---|
| source authority | 0 (0.0%) | no `authority` field on records; `source` is a volume tag |
| source URL | 0 (0.0%) | no URL field on records |
| document title | 0 (0.0%) | no field |
| document date | 438 (100.0%) | record-level date, not document date |
| page / reference | 191 (43.6%) |  |
| evidence stage | 0 (0.0%) | 16 stages defined, none assigned |
| verification status | 438 (100.0%) | computed; always "unverified" |
| rationale | 438 (100.0%) | computed from the grade |
| linked document (GO/Act) | 62 (14.2%) |  |

**The structured evidence store does not exist.** `EVIDENCE_STAGES`
(16 values) and `SOURCE_AUTHORITIES` (9 values)
are defined and exported but **never assigned to any record**. Grade, rationale
and verification status are computed at render time from the GO/Act link — they
are not stored, cannot be overridden by a human assessment, and carry no
per-document provenance.

## 2. Records by evidence position

| Bucket | Records | Priority |
|---|---|---|
| Marked complete, no completion evidence | 192 (43.8%) | Highest |
| Announcement only, not spot-checkable | 26 (5.9%) | High |
| Mixed delivered/planned components | 6 (1.4%) | High |
| Announcement only, page recorded | 153 (34.9%) | Medium |
| Document-backed, page missing | 26 (5.9%) | Low |
| Document-backed and page recorded | 35 (8.0%) | Lowest |

### Marked complete, no completion evidence — 192 records
**Priority: Highest.** `status: done` but no Government Order or Act is linked. The claim of completion rests entirely on the government's own summary volume.

- `eco1` (Economy) — India's #1 growth state — *11.19%*
- `eco2` (Economy) — State GDP (GSDP) — *₹31.19 lakh cr*
- `eco3` (Economy) — Per-capita income — *₹3,61,619*
- `eco4` (Economy) — Investment & jobs — *₹12 lakh cr · 35 lakh jobs*
- `eco5` (Economy) — Startup ecosystem — *#1 in India*
- `wom2` (Women) — Free bus travel for women — *71.81 lakh daily*
- `wom3` (Women) — ₹1,000/month for girl students — *₹1,000/month*
- `wom4` (Women) — Free HPV cervical-cancer vaccine — *India's 1st state*
- `wom5` (Women) — 50% reservation in local bodies — *50%*
- `wom6` (Women) — Women self-help-group credit — *₹1.34 lakh cr*
- `edu1` (Education) — CM's free Breakfast Scheme — *20.59 lakh children · 37,484 schools*
- `edu4` (Education) — Ambedkar Overseas Higher Education — *385 students · ₹162 cr*
- `hea3` (Health) — CM Comprehensive Health Insurance — *1.48 crore families*
- `hea5` (Health) — Mortality reduction — *Maternal 73→35 · TFR 1.3*
- `agr1` (Agriculture) — Crop loans — *₹69,087 cr · 83.07 lakh farmers*
- `agr2` (Agriculture) — Free farm power connections — *2 lakh new*
- `agr3` (Agriculture) — Paddy procurement price — *₹2,500/quintal*
- `agr4` (Agriculture) — Milk procurement price — *₹38/litre*
- `agr5` (Agriculture) — #1 in production — *Oilseeds · groundnut · sugarcane*
- `fis1` (Fisheries) — Fishing-ban-period relief — *₹5,000 → ₹8,000*
- `fis2` (Fisheries) — New fish-landing centres — *72 · ₹1,428 cr*
- `fis3` (Fisheries) — Diesel tax exemption — *up to 18,000 litres*
- `inf3` (Infrastructure) — Drinking-water connections — *75 lakh · 3 crore people*
- `her1` (Heritage) — Keeladi & Porunai museums — *Tamil antiquity*
- `her2` (Heritage) — Antiquity of iron — *5,000 years*
- …and 167 more

### Announcement only, not spot-checkable — 26 records
**Priority: High.** No linked document AND no page reference. A reader cannot trace this claim to anything.

- `eco6` (Economy) — $1 trillion economy target — *by 2030*
- `inf1` (Infrastructure) — Housing for the poor — *2 lakh homes*
- `her_keeladi` (Heritage) — Keeladi Museum — *₹18.42 cr · opened 5 Mar 2023*
- `her_porunai` (Heritage) — Porunai & Gangaikondacholapuram museums — *₹33.02 cr + ₹22.10 cr*
- `pol_b3_coastal` (Governance) — Coastal security & fishermen — *456 trained; 1,000 home guards*
- `leg_b3_law` (Education) — Law education expansion — *+1,320 seats; new colleges*
- `spo_b3_academies` (Sports) — Olympic academies & sports science — *Chennai/Trichy/Madurai/Nilgiris*
- `gov_b4_sdg` (Governance) — SDGs & first Economic Survey — *2nd in India SDG Index*
- `nut_b4_balanced` (Social) — Balanced Growth Fund (nutrition) — *maternal & child nutrition*
- `inf_b5_desal` (Infrastructure) — Seawater desalination plants — *150 MLD live · 400 MLD building*
- `inf_b5_twadwater` (Infrastructure) — District water schemes (TWAD) — *₹15,591 cr · 165 lakh people*
- `inf_b5_hogenakkal` (Infrastructure) — Hogenakkal water Phase-3 — *₹8,428 cr proposed*
- `inf_b5_swd` (Infrastructure) — Chennai stormwater drains — *₹6,495 cr · 1,422 km*
- `inf_b5_gccroads` (Infrastructure) — Greater Chennai roads — *₹2,360 cr · 3,455 km*
- `inf_b5_bridges` (Infrastructure) — Chennai bridges & flyovers — *₹1,400 cr+ · 36 structures*
- `inf_b5_busmarket` (Infrastructure) — New bus stands & markets — *₹498 cr · 30 bus stands*
- `soc_b5_amma` (Social) — Amma Unavagam upgrade — *227 canteens*
- `inf_b5_beach` (Infrastructure) — Chennai beachfront upgrades — *Blue Flag · accessibility*
- `gov_b5_padaippagam` (Education) — Mudhalvar Padaippagam — *multiple centres*
- `soc_b5_shelter` (Social) — Urban shelters & housing — *177 shelters · 15,574 homes*
- `gov_b9_autonomy` (Governance) — State-autonomy & rights committee — *Committee + SC wins*
- `her_b9_tamilchairs` (Heritage) — Classical Tamil promotion worldwide — *Tamil chairs abroad*
- `her_b9_tamilai` (Heritage) — Tamil official-language outreach & Tamil-AI — *outreach academy + AI*
- `gov_b12_anticorruption` (Governance) — Anti-corruption & clean administration — *austerity · Lok Ayukta · clean recruitment*
- `gov_b12_fiscal` (Governance) — Economic Advisory Council & fiscal reform — *EAC · White Paper · PSU review*
- …and 1 more

### Mixed delivered/planned components — 6 records
**Priority: High.** Detail text mixes delivered with planned or ongoing work. Flagged `mixedStatus: true`; components need splitting before any grade is meaningful.

- `edu3` (Education) — Free laptops for students — *10 lakh (+10 lakh)*
- `hea4` (Health) — Kalaignar Super-Speciality Hospital — *1,000 beds*
- `inf5` (Infrastructure) — Modern bus terminuses — *Chennai & Tiruchi*
- `eco_b2_tidel` (Economy) — Mini Tidel Parks — *6 done · 10 planned*
- `her_b2_temples` (Heritage) — Temple consecrations & renovation — *12,803 temples · ₹8,057 cr*
- `env_b4_thoonmai` (Governance) — Thoonmai Iyakkam (Clean TN) — *₹133 cr+ to treasury*

### Announcement only, page recorded — 153 records
**Priority: Medium.** No linked document, but the source page is recorded so it can at least be checked against the volume.

- `inf4` (Infrastructure) — Rural roads & bridges (all schemes) — *28,139 km roads · 559 bridges · ₹15,344 cr*
- `rur_b2_roads` (Infrastructure) — CM's Rural Roads Scheme — *20,485 km · ₹8,914 cr*
- `rur_b2_housing` (Infrastructure) — Kalaignar Kanavu Illam (rural housing) — *2 lakh houses · ₹6,600 cr*
- `rur_b2_water` (Infrastructure) — Jal Jeevan Mission — rural tap water — *1.12 cr of 1.25 cr homes connected*
- `rur_b2_nrega` (Infrastructure) — MGNREGS rural employment — India's #1 — *~154 cr person-days · 73.89 lakh workers*
- `rur_b2_mlamp` (Infrastructure) — 15th Finance Commission rural works — *4.3 lakh+ works · ₹10,000 cr+*
- `rur_b6_reforms` (Governance) — Panchayat governance & digital reforms — *12,525 GPs digitised*
- `rur_b6_nammaooru` (Governance) — Namma Ooru Namma Arasu — *37,440 grievances · 64% resolved*
- `rur_b6_newbodies` (Governance) — New panchayats, secretariats & caste-name removal — *90 new GPs · 600 secretariats*
- `rur_b6_mla` (Governance) — MLA Constituency Development — *46,294 works · ₹3,487 cr*
- `rur_b6_pmayg` (Social) — PM Awas Yojana – Gramin (with state top-up) — *₹8,643 cr · state adds ₹1.2 lakh/house*
- `rur_b6_janman` (Social) — PM-JANMAN tribal housing — *13,079 sanctioned · ₹2 lakh + state top-up*
- `rur_b6_renovate` (Social) — Rural house renovation scheme — *1.48 lakh houses · ₹1,041 cr*
- `rur_b6_repair` (Social) — Disaster house repair & CM Redesign — *~20,000 houses repaired/redesigned*
- `rur_b6_camphousing` (Social) — Housing for camps & tribal welfare — *~13,800 houses*
- `rur_b6_samathuvapuram` (Social) — Periyar Ninaivu Samathuvapuram — *237 renovated · 8 new*
- `rur_b6_agamt` (Infrastructure) — Anaithu Grama Anna Marumalarchi Thittam-II — *82,000+ works · ₹5,200 cr+*
- `rur_b6_scpar` (Infrastructure) — Rural office buildings & crematoria — *119 union offices · ₹910 cr works*
- `rur_b6_schools` (Education) — Rural school classrooms (RD dept) — *31,000+ works · ₹2,200 cr+*
- `rur_b6_sbm` (Health) — Swachh Bharat Gramin sanitation — *4.29 lakh toilets · 12,470 ODF villages*
- `rur_b6_swworkers` (Social) — Rural sanitation workers' welfare — *75,761 in welfare board · ₹5,000 wage*
- `rur_b6_mgnrega_assets` (Agriculture) — MGNREGS rural assets created — *₹47,000 cr+ of works*
- `inf_b7_bridges` (Infrastructure) — Bridges, flyovers & rail over-bridges — *1,167 + 301 high-level bridges*
- `inf_b7_ports` (Infrastructure) — Minor ports & international ferry — *Nagapattinam–Sri Lanka ferry revived*
- `edu_b7_iti` (Education) — ITIs modernised to Industry 4.0 — *91 → 132 ITIs*
- …and 128 more

### Document-backed, page missing — 26 records
**Priority: Low.** A GO or Act is linked; only the souvenir page reference is missing.

- `edu5` (Education) — Illam Thedi Kalvi — *learning recovery*
- `hea1` (Health) — Doorstep medical care — *2.59 crore people*
- `hea2` (Health) — Accident emergency care – 48 — *4.62 lakh lives · ₹434 cr*
- `her4` (Heritage) — Jallikattu Arena, Madurai — *Madurai*
- `soc4` (Social) — Pension increase — *up to ₹1,500 · 36.36 lakh*
- `edu_b2_itk` (Education) — Illam Thedi Kalvi funding — *₹704.76 cr*
- `edu_b2_ennum` (Education) — Ennum Ezhuthum — *goal: 2027*
- `edu_b2_danspark` (Education) — DAN Spark — AI in govt schools — *classes 6–9*
- `edu_b2_aadhaar` (Education) — Aadhaar updated in schools — *78 lakh students*
- `yth_constitution` (Governance) — Constitution preamble in schools — *from 26 Nov 2024*
- `soc_b2_promo` (Social) — Reservation widened — *4% promotion · Siragugal*
- `gov_b2_safety` (Governance) — Safety & law-and-order — *safest for women*
- `pol_b3_fire` (Governance) — Fire & Rescue Services — *52,837 lives saved*
- `pol_b3_kavalkarangal` (Governance) — Kaval Karangal (humanitarian) — *from 21 Apr 2021*
- `pol_b3_housing` (Governance) — Police & fire buildings — *₹600 cr+ quarters*
- `dis_b3_welfare` (Social) — Differently-abled welfare (detailed) — *₹813 cr → ₹1,432 cr budget*
- `inf_b3_metro` (Infrastructure) — Metro rail expansion — *Chennai Ph-2 ₹63,246 cr*
- `spo_b4_peuniv` (Sports) — TN Physical Education & Sports University — *new pool & centres*
- `gov_b4_arise` (Governance) — CM ARISE / prosperous blocks — *₹100 cr · 50 blocks*
- `gov_b4_sadp` (Governance) — Special Area Development (hills) — *₹351 cr · 1,262 works*
- `inf_b5_chennaiwater` (Infrastructure) — Chennai water supply raised — *830 → ~1,230 MLD/day*
- `inf_b5_sewerage` (Infrastructure) — Underground sewerage & STPs — *₹2,431 cr · 19 schemes*
- `gov_b5_knmt` (Governance) — Kalaignar Urban Development Scheme — *₹1,000 cr/year*
- `gov_b5_iccc` (Governance) — Chennai flood command centre — *24×7 monsoon ops*
- `gov_b5_ulbjobs` (Governance) — Urban-body recruitment — *1,600+ technical posts*
- …and 1 more

## 3. Promises by evidence position

| Bucket | Promises | Priority |
|---|---|---|
| Claimed fulfilled, nothing linked in this dataset | 158 | Highest |
| Claimed fulfilled, only a government-reported record | 163 | High |
| Claimed fulfilled, a GO/Act is linked | 79 | Medium |
| Not claimed fulfilled (progress / modified / stalled / not fulfilled) | 105 | n/a |

### Claimed fulfilled with nothing linked — 158 promises

These are counted in the public "400 fulfilled" headline while this dataset holds
**no record and no document** for them. They are the single largest evidence gap
in the project.

- **#7** (State Rights & Tamil) — Revive Classical Tamil Institute; Thirukkural as national text
- **#9** (State Rights & Tamil) — Refurbish Semmozhi Poonga; Semmozhi Park in all corporations
- **#13** (State Rights & Tamil) — Urge international judicial probe of Sri Lanka war crimes
- **#14** (State Rights & Tamil) — Urge UN intervention for Eelam Tamils' rights
- **#21** (Governance & Law) — Special courts for corruption cases
- **#22** (Governance & Law) — Probe Jayalalithaa's death
- **#28** (Agriculture) — Block Methane & Shale gas projects in the delta
- **#29** (Agriculture) — Separate annual agriculture budget
- **#43** (Agriculture) — Protect farmland from misuse
- **#49** (Agriculture) — Zonal calamity-advisory committees
- **#52** (Agriculture) — Oppose GM crop technology in Tamil Nadu
- **#54** (Agriculture) — Agricultural University in Madurai
- **#55** (Agriculture) — Mid-day-meal procurement from co-ops
- **#58** (Agriculture) — Free sediment soil from ponds for farmers
- **#59** (Agriculture) — Medicinal gardens for Siddha herbs
- **#60** (Agriculture) — Reopen Kavalur herbal garden
- **#61** (Agriculture) — Govt cocoon markets for sericulture
- **#66** (Agriculture) — Copra/coconut-oil procurement via Welfare Board
- **#72** (Agriculture) — Regulate coastal shrimp farming
- **#73** (Agriculture) — Revive Kudumiyanmalai Agri College
- **#80** (Agriculture) — Farm-machinery manufacturing plant, Erode
- **#81** (Agriculture) — Date-palm cultivation subsidy in 4 districts
- **#84** (Water) — Renovate Kannika sluice gates (40,000 acres)
- **#87** (Water) — Riverfront commissions (Cauvery/Vaigai/Thamirabarani)
- **#97** (Water) — Palar-Thamirabarani riverbed project
- **#98** (Water) — Urge interlinking of south Indian rivers
- **#101** (Water) — Sathaiyar Dam canal from Periyar-Vaigai
- **#102** (Water) — Desilt & restore Pechiparai dam
- **#106** (Water) — Complete Salem Mecheri irrigation
- **#107** (Water) — Salem Thoni Maduvu scheme
- **#108** (Water) — Salem Saanarpatti-Moolakkadu project
- **#110** (Water) — Krishnagiri Padedhaal lake canals
- **#111** (Water) — Cuddalore Aruvaal Mooku drainage
- **#117** (Fisheries) — National Fishermen Welfare Commission
- **#118** (Fisheries) — Withdraw Meena Kumari deep-sea recommendations
- **#119** (Fisheries) — Expedite fishermen death certificates
- **#120** (Fisheries) — Quarterly fishermen grievance meetings
- **#122** (Fisheries) — New/better schools in fishermen areas
- **#132** (Fisheries) — Sea-erosion barriers & bait arches
- **#138** (Handloom & Labour) — Handloom co-op bank & weaver ID cards
- …and 118 more

## 4. What must not be inferred from this document

- A record in the lowest-priority bucket is **not verified**. The best position in
  this dataset is grade D — a sanction exists — which says nothing about delivery.
- These buckets measure **paper trail held by this project**, not truth. A record
  with no evidence here may be perfectly accurate; a document-backed record may
  still overstate its outcome.
- Closing this queue requires reading primary documents, not adjusting thresholds.

## 5. Suggested order of work

1. **192 records marked complete without completion evidence** — the largest
   correctness risk, because "done" is the strongest claim the interface makes.
2. **158 promises counted as fulfilled with nothing linked** — the largest
   headline risk, because they inflate the most-quoted number in the project.
3. **6 mixed-status records** — split the components before grading.
4. **26 records with neither a document nor a page** — restore page provenance
   (see `docs/remediation_queue.json`).
5. Build the structured evidence store so stage, authority and per-document
   provenance can be recorded at all.
