/* ============================================================
   VERSION INFORMATION — one definition, used by the interface,
   the transparency page, the docs and the validator.

   Three versions move independently and must not be conflated:

   - RELEASE   the application build (package.json). Changes when
               code changes, even if no data or method changed.
   - DATA      the cut-off of the underlying record. A reader needs
               this to know what the artefact could possibly know.
   - METHODOLOGY  the evidence model, grading rules and claim-lookup
               behaviour. Changing it can change what an existing
               record *means*, so it is versioned separately and any
               bump must be described in docs/METHODOLOGY.md.
   ============================================================ */

export const VERSION = {
  release: "2.0.0",
  // Cut-off of the underlying government record. Nothing published after
  // this date is reflected anywhere in the datasets.
  data: "2026-07-18",
  // Last edit to any dataset or generated document.
  dataUpdated: "2026-07-21",
  // Evidence model + claim-lookup semantics. See docs/METHODOLOGY.md.
  methodology: "1.0",
  methodologyUpdated: "2026-07-21",
  status: "Internal beta",
};

/* Human-readable one-liner for footers and share text. */
export const versionLine = () =>
  `Data ${VERSION.data} · Methodology v${VERSION.methodology} · Build ${VERSION.release}`;
