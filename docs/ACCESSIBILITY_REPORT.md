# Accessibility Report

**Audit date:** 21 July 2026 · **Standard:** WCAG 2.1 Level AA
**Automated check:** `npm run a11y` (`scripts/check_contrast.mjs`)

---

## Summary

| Area | Status |
|---|---|
| Text contrast (both themes) | **Fixed** — 0 failures, verified in-browser across 1,585 rendered nodes |
| Keyboard operation | Fixed — modals trap focus, Esc closes, focus is restored |
| Screen-reader labelling | Fixed for dialogs, nav, charts, the evidence-grade chip, and (Phase A) the Explore and Manifesto inputs |
| Skip link | Present and now contrast-correct in both themes |
| Reduced motion | Respected across all animation |
| Textual alternative to charts | **Not done** — see Outstanding |
| Full AT testing (VoiceOver/NVDA) | **Not done** — see Outstanding |

## 1. Colour contrast

### What the audit found

Every text node rendered by the running app was measured against its own
computed background. The first pass found:

- **76 failures on the dark theme**
- **78 failures on the light theme**

Almost all were a single systemic defect. Categories, evidence grades, origin
markers, legislation kinds and manifesto statuses each carry an **identity hue**,
and that hue was applied verbatim as text in *both* themes. Because a colour
readable on cream is unreadable on near-black, essentially every identity hue
failed in one theme or the other:

| Element | Theme | Before | Required |
|---|---|---|---|
| Evidence grade chip, grade D | light | 2.25:1 | 4.5:1 |
| Evidence grade chip, grade E | light | 3.32:1 | 4.5:1 |
| Category label "Governance" | dark | 2.17:1 | 4.5:1 |
| Category label "Sports" | light | 1.72:1 | 4.5:1 |
| `wisp` (record/promise count labels) | dark | 1.62:1 | 4.5:1 |
| `wisp` | light | 2.31:1 | 4.5:1 |
| `ghost` (input placeholders) | dark | 2.39:1 | 4.5:1 |
| Timeline dates (brand red) | dark | 3.49:1 | 4.5:1 |

The grade chip mattered most: it appears on **every one of the 438 record
cards**, and it is the element carrying the project's central caveat — that a
record is government-reported rather than verified. A caveat nobody can read is
not a caveat.

### The fix

`textSafe(color, themeName)` in `src/lib/theme.js` walks a colour's own
lightness — hue and saturation held fixed, so the category stays recognisably
itself — until it clears 4.5:1 against the worst-case surface of the active
theme. Results are memoised.

This replaced what would otherwise have been five separate hand-maintained
light/dark palettes. `onColor(background)` handles the inverse case, where text
sits *on* a filled brand swatch: the skip link is gold-on-dark in the dark theme
but the light theme's "gold" token is actually a dark red, so a fixed near-black
label failed there.

Two colours were changed at the palette level rather than wrapped, because both
are only ever used as text: `ghost` (input placeholders) and `wisp` (small meta
labels).

### Verification

In-browser, both themes, every section mounted including the lazy-loaded Laws,
Orders and Debates:

```
dark  — 0 failures / 1,585 nodes
light — 0 failures / 1,585 nodes
```

`npm run a11y` re-checks the palette and every identity hue statically, so a new
colour that fails AA is caught without opening a browser. Measured ratios now
range from 4.62:1 to 14.94:1.

### Known limitation

In the light theme, grades A (#157b3b) and B (#16793a) resolve to nearly the
same green. Both clear AA against the background but are hard to tell apart from
each other. This is currently harmless — auto-grading never assigns A or B (see
`docs/EVIDENCE_MODEL.md`) — but if those grades are ever populated by manual
assessment, the two hues need separating.

## 2. Keyboard and focus

- `useModalA11y` (`src/lib/hooks.js`) gives both dialogs — Search overlay and
  Share card — a focus trap, Esc-to-close, focus moved into the dialog on open,
  and focus restored to the triggering element on close.
- Skip-to-content link is the first focusable element and reveals itself on focus.
- The mobile menu button carries `aria-expanded` and `aria-controls`.
- The evidence-grade chip is focusable (`tabIndex={0}`) and exposes its rationale
  as an accessible name. Previously the rationale lived only in a `title`
  tooltip on a non-focusable `<span>`, which is invisible to keyboard and
  screen-reader users.
- The claim-lookup submit button is now genuinely `disabled` when the field is
  empty, instead of being a live control painted in a low-contrast "off" style.

## 3. Screen readers and semantics

- Both dialogs use `role="dialog"` + `aria-modal="true"` + an `aria-label`.
- Charts are inline SVG with `role="img"` and a descriptive `aria-label` carrying
  the actual values, not just the title.
- Claim-lookup results are in an `aria-live="polite"` region so an assistive
  technology announces a result that appears without navigation.
- Icon-only buttons (search, theme, menu, back-to-top) have `aria-label`s.
- Origin markers pair colour with a glyph (✓ ↗ →) and grades with a letter, so
  no distinction is carried by colour alone.

## 4. Motion

`prefers-reduced-motion: reduce` is respected in the chart reveal animations,
programmatic scrolling, and CSS `scroll-behavior`.

## 5. Outstanding

1. **Textual data-table alternative for charts.** The `aria-label` on each chart
   carries its headline values, but there is no full tabular equivalent of the
   series data. This is the largest remaining gap.
2. **No testing with real assistive technology.** Everything above is verified by
   computed-style measurement and code inspection. VoiceOver and NVDA passes have
   not been done, and they routinely surface problems automation cannot.
3. **No automated axe/Lighthouse run in CI.** `npm run a11y` covers contrast only.
4. ~~Tamil-script content is not language-tagged.~~ **Fixed in Phase A.** Tamil
   scheme names in `RecordCard` and `ShareCard` now carry `lang="ta"`. The document
   language stays `en`: the interface is English and only the scheme proper nouns
   are Tamil, so `<html lang="ta">` would make a screen reader apply Tamil
   pronunciation to the entire English UI.
5. **Focus-visible styling** relies on browser defaults; it has not been designed
   or measured against the 3:1 non-text contrast requirement.

## Phase A additions (21 July 2026)

Fixes made after the adversarial verification audit:

- **Accessible names on the two remaining inputs.** The verification audit found
  the Explore search and Manifesto filter inputs were placeholder-only, despite
  the remediation record claiming labels were complete. Both now carry an
  `aria-label`. **0 interactive elements without an accessible name.**
- **Tamil language tagging.** `lang="ta"` on Tamil scheme names; document stays
  `lang="en"` (see above for why).
- **Small-text review.** 176 sub-11px text nodes were classified rather than
  blanket-enlarged:
  - *Carriers of meaning* — the evidence-grade and origin chips appear on all 438
    record cards and hold the project's central caveat. They were the smallest
    type attached to the most important claim. Raised **10 → 11.5px**.
  - *Below any floor* — 9.5px chart axis ticks and the progress-ring label.
    Raised to **10.5px**. The smallest text in the app is now **10px**.
  - *Intentional chart metadata* — axis labels and units at 10.5px are kept.
    They are conventional for chart axes, and every chart also exposes its values
    through an `aria-label`, so the information is not sight-only.
  - Sub-11px nodes: **176 → 150**, smallest **9.5px → 10px**.
