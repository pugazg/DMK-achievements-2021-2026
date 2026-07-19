# Tamil Nadu Government Gazette — sources & extraction

This document records how the Gazette data in *The Dravidian Model* was gathered,
what it covers, and where it stops. It backs two things in the app: the **Laws**
section (Acts/Bills) and the **Gazette GOs** second source inside the **Orders**
section.

## Where it comes from

Department of Stationery & Printing archive — <https://www.stationeryprinting.tn.gov.in/archives.php>.
The archive splits into two streams, both crawled for 2021–2026:

| Stream | Listing page | What it is |
|---|---|---|
| **Extraordinary Gazette** | `extra_ordinary_lists.php?id=<b64 year>` | One notification per issue, published out of cycle. **Itemised** — every entry has a Part/Section, department, subject line and its own PDF. |
| **Regular (weekly) Gazette** | `Gazette_Publications_2008.php?id=<b64 year>` → `gazette_list_details.php?id=<b64>&date=<b64>` | The weekly gazette. Each issue bundles its Parts into **combined part PDFs** (e.g. `52_II_2.pdf`) with part descriptions but no per-entry subject in the listing. |

## The Parts of the Gazette

The Gazette is divided into Parts; each carries a different class of instrument:

| Part | Contents | In this app |
|---|---|---|
| **Part I** | First appointments, magisterial powers (Secretariat) | Gazette GOs |
| **Part II — Section 1** | Government notifications of general interest | Gazette GOs |
| **Part II — Section 2** | **Government Orders / notifications** (the bulk of GOs) | Gazette GOs |
| **Part III** | Notifications by Heads of Departments, statutory bodies | Gazette GOs |
| **Part IV — Section 1** | **Bills** | Laws section |
| **Part IV — Section 2** | **Acts / Ordinances** | Laws section |
| **Part V** | Notifications under Central Acts | (indexed, not surfaced) |
| **Part VI** | Advertisements, tenders, private notices | (indexed, not surfaced) |

## What was extracted (2021–2026)

**Extraordinary Gazette — all parts:** 1,182 distinct entries.

| Part | Entries |
|---|---|
| Part II-2 (Government Orders) | 548 |
| Part II-1 (notifications) | 137 |
| Part III | 85 |
| Part I | 47 |
| Part VI (advertisements) | 247 |
| Part V | 66 |
| Part IV (Acts/Bills → **Laws** section) | 48 |

Of these, **788 are government orders / notifications** (Parts I, II, III) — the
"second GO source". **550** carry an extractable `G.O.(Ms)/(D) No.`, which lets each
be **cross-referenced** against the tn.gov.in portal GOs (the *Orders* section's
first source); matches are flagged `inPortal`.

**Regular (weekly) Gazette:** 289 weekly issues indexed (≈53/year), each linking to
its combined Part PDFs. These are bundle files, so they are surfaced as an issue-level
archive (date → part PDFs), not itemised orders.

## The two GO sources, and why both

| Source | Origin | Granularity | Numbering |
|---|---|---|---|
| **Portal GOs** (Orders §, source 1) | tn.gov.in dept listings | Per-GO, with abstract | `G.O.(Ms)/(D) No.` per department |
| **Gazette GOs** (Orders §, source 2) | Extraordinary Gazette, Parts I/II/III | Per-notification, with subject | Gazette issue no. + embedded `G.O. No.` |

They use different primary keys, so they don't line up one-to-one. Where a Gazette
Part II-2 entry embeds a `G.O. No.` and department, we match it to the portal GO of
the same number+department — that is the `inPortal` cross-reference.

## Honest limits

- The **portal** listing is a *published subset*, not every GO the state issues.
- The **weekly** gazette parts are bundle PDFs; per-order subjects would require
  downloading and OCR-parsing each part PDF (not done).
- Gazette GO **subjects are terse** (`Notification No.II(2)/CTR/957(c)/2021 — G.O. Ms.
  No. 185 …`), so topical links to schemes/Acts are sparse by nature.
- Everything is **quoted** from the source; scheme/Act links are topical matches, not
  official classifications.

## Data files

- `src/data/legislation.js` — Acts/Bills/Ordinances (Part IV).
- `src/data/gazettegos.js` — the 788 Gazette GO/notification entries + aggregate.
- `src/data/govorders.js` — portal GOs (Orders §, source 1).
