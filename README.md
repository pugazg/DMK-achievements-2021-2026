# The Dravidian Record · Tamil Nadu 2021–2026

An interactive, **fully-offline** report on the DMK government's five-year record in
Tamil Nadu. It began life as the *DMK Record Checker* — a search-and-fact-check tool over
438 verified schemes — and has been expanded into a full digital report: an animated
hero, a statistics dashboard, a narrative "method" section, a district-aware record
explorer, a fact-checker, and the 2021 manifesto tracked promise by promise.

> Every figure comes **only** from the official Tamil Nadu record. There is no AI answering
> and no live internet call — the tool cannot invent a fact.

---

## What's inside

| Section | What it does |
|---|---|
| **Overview** | Animated headline figures — GSDP growth, state GDP, free-bus trips, doorstep-care reach. |
| **Dashboard** | A category donut plus themed chart groups (Economy, Health, Women, Education) rendered as hand-rolled SVG — every series drawn from the Economic Survey 2025–26 or the government record. |
| **The Method** | The Dravidian arc — Dignity → Ownership → Access → Innovation — with thematic essays and a term timeline. |
| **Explore** | All 438 verified records, filterable by 12 domains, searchable, each turnable into a shareable card. |
| **Fact-check** | Paste a forwarded claim; the deterministic engine matches it to the record and says *who actually started it*. |
| **Manifesto** | All 505 promises from the 2021 manifesto. Each promise's status (Fulfilled / Modified / In progress / Stalled / Not fulfilled) is mirrored from the independent [Pudhiyavan DMK Manifesto 2021 Tracker](https://dmk-manifesto-2021-tracker.pudhiyavan.com); where this tool holds a matching record it is linked beneath. |

Plus chrome: sticky scroll-spy nav, global search (`⌘/Ctrl-K` or `/`), light/dark theme,
reading-progress bar, back-to-top, shareable cards, and full reduced-motion support.

## Design principles

- **Fully offline / zero runtime dependencies** beyond React. No CDN, no web fonts, no
  chart library — all charts are inline SVG. The report runs anywhere, forever, and can be
  audited against its own sources.
- **Never invent a fact.** Data lives in `src/data/*` extracted verbatim from the record;
  every chart block carries its own source line.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
```

## Project layout

```
src/
  data/        records.js (438 verified records) · promises.js (505) · dashboard.js (charts, timeline, narrative)
  lib/         theme.js · hooks.js · search.js · format.js
  components/   charts.jsx · Nav · SearchOverlay · ShareCard · RecordCard · Counter · RisingSun · layout
  sections/    Hero · Dashboard · Method · Explore · Claim · Manifesto · Footer
  App.jsx      composition, theme provider, keyboard shortcuts
```

## Sources

Tamil Nadu Government 2021–26 achievement record (souvenir + minister-by-minister volumes);
Economic Survey of Tamil Nadu 2025–26; DMK Election Manifesto 2021; SRS 2021–23;
StartupTN / TANSIM published data.
