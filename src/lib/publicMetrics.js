import { DATA, CATEGORIES } from "../data/records.js";
import { PROMISES } from "../data/promises.js";

/* ============================================================
   PUBLIC METRICS — the single source of truth for every number
   the interface shows to a reader.

   The artefact audit found "438 verified records" hard-coded in
   the hero strip: changing it to 999 left every gate passing,
   because nothing tied the displayed number to the dataset.

   The fix is structural rather than a new assertion. Any number
   the UI displays is DERIVED here, so a stale literal cannot
   exist. `reconcile()` then catches the remaining failure mode —
   someone replacing a derivation with a literal again — and is
   run by both scripts/validate.mjs and test/metrics.test.mjs.

   Rule: if a number is shown to a reader, it belongs in DERIVED.

   IMPORTANT — keep this module's imports to records.js and promises.js.
   Those two are already in the eager bundle. Legislation, Government Orders,
   the gazette and debates are lazy-loaded chunks, and importing them here
   drags ~315KB of data back into the initial download: adding them once took
   the main chunk from 842KB to 1,157KB and emptied the lazy chunks. Metrics
   derived from those datasets belong in scripts/validate.mjs, which runs in
   Node and pays no bundle cost.
   ============================================================ */

export const DERIVED = {
  // "All" is a filter control, not a domain — counting it was the
  // original 12-vs-11 error.
  achievements: DATA.length,
  domains: CATEGORIES.filter((c) => c.id !== "all").length,
  promises: PROMISES.length,
  promisesFulfilled: PROMISES.filter((p) => p.status === "fulfilled").length,
};

/* Invariants that must hold whatever the data says. Unlike DERIVED
   these are not display values — they are properties the dataset
   must have for the displayed values to mean anything. */
export const INVARIANTS = [
  {
    name: "achievement IDs are unique",
    ok: () => new Set(DATA.map((r) => r.id)).size === DATA.length,
    detail: () => `${new Set(DATA.map((r) => r.id)).size} unique of ${DATA.length}`,
  },
  {
    name: "promise numbers are unique",
    ok: () => new Set(PROMISES.map((p) => p.num)).size === PROMISES.length,
    detail: () => `${new Set(PROMISES.map((p) => p.num)).size} unique of ${PROMISES.length}`,
  },
  {
    name: "the All filter is never counted as a domain",
    ok: () => DERIVED.domains === CATEGORIES.length - 1 && CATEGORIES.some((c) => c.id === "all"),
    detail: () => `${DERIVED.domains} domains from ${CATEGORIES.length} categories`,
  },
  {
    name: "fulfilled promises do not exceed total promises",
    ok: () => DERIVED.promisesFulfilled <= DERIVED.promises,
    detail: () => `${DERIVED.promisesFulfilled} of ${DERIVED.promises}`,
  },
];

/* Reconcile any display list against DERIVED.

   `items` is an array of display entries. Any entry carrying a
   `metric` key is claiming to show DERIVED[metric]; its `value`
   must equal it exactly. Entries without a `metric` are prose or
   editorial constants and are reported as unchecked, so they stay
   visible rather than silently exempt.

   Returns { ok, checked, unchecked, failures[] } — never throws,
   so callers decide how to report. */
export function reconcile(items, { source = "display" } = {}) {
  const failures = [];
  const unchecked = [];
  let checked = 0;

  for (const item of items || []) {
    if (!item || item.metric === undefined) {
      unchecked.push(item?.label ?? "(unlabelled)");
      continue;
    }
    if (!(item.metric in DERIVED)) {
      failures.push({
        source,
        label: item.label,
        metric: item.metric,
        reason: `unknown metric "${item.metric}" — not defined in DERIVED`,
      });
      continue;
    }
    checked++;
    if (item.value !== DERIVED[item.metric]) {
      failures.push({
        source,
        label: item.label,
        metric: item.metric,
        declared: item.value,
        derived: DERIVED[item.metric],
        reason: `displays ${item.value} but the dataset yields ${DERIVED[item.metric]}`,
      });
    }
  }
  return { ok: failures.length === 0, checked, unchecked, failures };
}

/* Every invariant, evaluated. Returns [{ name, ok, detail }]. */
export const checkInvariants = () =>
  INVARIANTS.map((i) => ({ name: i.name, ok: i.ok(), detail: i.detail() }));
