import { useT, textSafe } from "../lib/theme.js";
import { Section, SectionHead, Reveal } from "../components/layout.jsx";
import { GRADES } from "../lib/evidence.js";
import { DERIVED } from "../lib/publicMetrics.js";
import {
  REPO_URL, ISSUES_URL, PUBLISHER, PURPOSE, AFFILIATION, FUNDING,
  GRADE_LADDER, GO_CAVEAT, METHOD_SUMMARY, CORRECTION_FIELDS,
  VERSION_ROWS, LICENCE_ROWS,
} from "../data/transparency.js";

/* Public transparency + methodology page (#transparency).

   Everything here is also in docs/PUBLISHER_TRANSPARENCY.md,
   docs/METHODOLOGY.md and docs/CORRECTIONS.md — this is the version for a
   reader who will never open the repository. Copy lives in
   src/data/transparency.js; only presentation lives here.

   Grade counts are derived at render time rather than written down, for the
   same reason the hero counters are: a hard-coded number on a transparency
   page is the last place a stale figure should be able to hide. */

function Card({ children, style }) {
  const t = useT();
  return (
    <div style={{ background: t.panel, border: `1px solid ${t.line}`, borderRadius: 12, padding: "15px 17px", ...style }}>
      {children}
    </div>
  );
}

function Head({ children }) {
  const t = useT();
  return (
    <div style={{ color: textSafe(t.gold, t.name), fontSize: 11.5, fontFamily: "ui-monospace,monospace", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>
      {children}
    </div>
  );
}

function Rows({ rows }) {
  const t = useT();
  return (
    <dl style={{ display: "grid", gap: 9, margin: 0 }}>
      {rows.map(([k, v]) => (
        <div key={k} style={{ display: "grid", gridTemplateColumns: "minmax(150px,210px) 1fr", gap: "4px 12px" }}>
          <dt style={{ color: t.text, fontSize: 12.5, fontWeight: 700 }}>{k}</dt>
          <dd style={{ color: t.textDim, fontSize: 12.5, lineHeight: 1.65, margin: 0 }}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Transparency({ gradeCounts }) {
  const t = useT();
  const link = { color: textSafe(t.gold, t.name), textDecoration: "underline" };

  return (
    <Section id="transparency" style={{ paddingTop: "clamp(36px,5vw,60px)" }}>
      <SectionHead
        eyebrow="Transparency"
        title="Who made this, how it works, and what it cannot tell you"
        lede="This project holds what the Tamil Nadu government published about its own record. Nothing in it is independently verified. This page states who is behind it, how records are graded, and where the evidence stops."
      />

      <div style={{ display: "grid", gap: 12 }}>
        {/* ---------- publisher ---------- */}
        <Reveal>
          <Card>
            <Head>Publisher</Head>
            <Rows rows={PUBLISHER} />
            <p style={{ color: t.textDim, fontSize: 12.5, lineHeight: 1.65, margin: "10px 0 0" }}>
              Repository and full documentation:{" "}
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer" style={link}>
                github.com/pugazg/DMK-achievements-2021-2026 ↗
              </a>
            </p>
            <p style={{ color: t.textSoft, fontSize: 12, lineHeight: 1.65, margin: "8px 0 0" }}>
              One maintainer decides what is included, how it is graded and what is corrected.
              There is no editorial board and no second reviewer. The rules are written down in
              advance and enforced by automated checks where possible, but that is not a
              substitute for independent review.
            </p>
          </Card>
        </Reveal>

        {/* ---------- purpose ---------- */}
        <Reveal>
          <Card>
            <Head>What this is — and what it is not</Head>
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
              <div>
                <div style={{ color: textSafe(t.green, t.name), fontSize: 12, fontWeight: 700, marginBottom: 6 }}>It is</div>
                <ul style={{ margin: 0, paddingLeft: 18, color: t.textDim, fontSize: 12.5, lineHeight: 1.7 }}>
                  {PURPOSE.is.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
              <div>
                <div style={{ color: textSafe(t.red, t.name), fontSize: 12, fontWeight: 700, marginBottom: 6 }}>It is not</div>
                <ul style={{ margin: 0, paddingLeft: 18, color: t.textDim, fontSize: 12.5, lineHeight: 1.7 }}>
                  {PURPOSE.isNot.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
            </div>
          </Card>
        </Reveal>

        {/* ---------- affiliation ---------- */}
        <Reveal>
          <Card style={{ borderLeft: `3px solid ${t.gold}` }}>
            <Head>Affiliation</Head>
            <p style={{ color: t.text, fontSize: 14, fontWeight: 700, margin: "0 0 10px" }}>{AFFILIATION.headline}</p>
            <Rows rows={AFFILIATION.rows} />
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${t.line2}` }}>
              <div style={{ color: t.text, fontSize: 12.5, fontWeight: 700, marginBottom: 6 }}>
                Two things to weigh anyway
              </div>
              {AFFILIATION.perspective.map((x) => (
                <div key={x.h} style={{ marginBottom: 8 }}>
                  <div style={{ color: textSafe(t.amber, t.name), fontSize: 12, fontWeight: 700 }}>{x.h}</div>
                  <p style={{ color: t.textDim, fontSize: 12.5, lineHeight: 1.65, margin: "2px 0 0" }}>{x.p}</p>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>

        {/* ---------- funding ---------- */}
        <Reveal>
          <Card>
            <Head>Funding</Head>
            <Rows rows={FUNDING} />
          </Card>
        </Reveal>

        {/* ---------- evidence grades ---------- */}
        <Reveal>
          <Card>
            <Head>Evidence grades</Head>
            <p style={{ color: t.textDim, fontSize: 12.5, lineHeight: 1.7, margin: "0 0 12px" }}>
              Every record carries a grade describing <b style={{ color: t.text }}>the paper trail this
              project holds</b> — never the underlying reality. The ladder is ordered by distance from
              the government's own voice.
            </p>
            <div style={{ display: "grid", gap: 6 }}>
              {GRADE_LADDER.map(([g, name, what]) => {
                const n = gradeCounts?.[g] ?? 0;
                const c = textSafe(GRADES[g]?.color || t.gold, t.name);
                return (
                  <div key={g} style={{ display: "flex", gap: 11, alignItems: "flex-start", background: t.panel2, border: `1px solid ${t.line2}`, borderRadius: 9, padding: "10px 12px" }}>
                    <span style={{ color: c, fontFamily: "ui-monospace,monospace", fontSize: 15, fontWeight: 800, minWidth: 16 }}>{g}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: c, fontSize: 12.5, fontWeight: 700 }}>{name}</div>
                      <div style={{ color: t.textDim, fontSize: 12.5, lineHeight: 1.6, marginTop: 1 }}>{what}</div>
                    </div>
                    <span style={{ color: n > 0 ? t.text : t.mute, fontFamily: "ui-monospace,monospace", fontSize: 12.5, fontWeight: 700, whiteSpace: "nowrap" }}>
                      {n} {n === 1 ? "record" : "records"}
                    </span>
                  </div>
                );
              })}
            </div>
            <p style={{ color: t.textSoft, fontSize: 12, lineHeight: 1.65, margin: "10px 0 0" }}>
              Automatic grading is capped at D and this is enforced by an automated check, not by
              convention. A, B and C require a body other than the implementing department to have
              counted something, and no such source is in this corpus — so those grades are
              currently unreachable in principle, not merely unassigned.
            </p>
          </Card>
        </Reveal>

        {/* ---------- the GO caveat ---------- */}
        <Reveal>
          <Card style={{ borderLeft: `3px solid ${t.red}` }}>
            <Head>{GO_CAVEAT.h}</Head>
            <p style={{ color: t.textDim, fontSize: 12.5, lineHeight: 1.7, margin: "0 0 10px" }}>{GO_CAVEAT.lead}</p>
            <div style={{ color: t.text, fontSize: 12.5, fontWeight: 700, marginBottom: 6 }}>It does not prove:</div>
            <div style={{ display: "grid", gap: 5, marginBottom: 10 }}>
              {GO_CAVEAT.notProof.map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                  <span style={{ color: textSafe(t.red, t.name), fontSize: 12.5, fontWeight: 700, minWidth: 132 }}>✕ {k}</span>
                  <span style={{ color: t.textDim, fontSize: 12.5, lineHeight: 1.6 }}>{v}</span>
                </div>
              ))}
            </div>
            <p style={{ color: t.textDim, fontSize: 12.5, lineHeight: 1.7, margin: 0 }}>{GO_CAVEAT.tail}</p>
          </Card>
        </Reveal>

        {/* ---------- methodology ---------- */}
        <Reveal>
          <Card>
            <Head>Methodology</Head>
            <div style={{ display: "grid", gap: 10 }}>
              {METHOD_SUMMARY.map((m) => (
                <div key={m.h}>
                  <div style={{ color: t.text, fontSize: 12.5, fontWeight: 700 }}>{m.h}</div>
                  <p style={{ color: t.textDim, fontSize: 12.5, lineHeight: 1.65, margin: "2px 0 0" }}>{m.p}</p>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>

        {/* ---------- limitations ---------- */}
        <Reveal>
          <Card style={{ borderLeft: `3px solid ${t.amber}` }}>
            <Head>Limitations</Head>
            <ul style={{ margin: 0, paddingLeft: 18, color: t.textDim, fontSize: 12.5, lineHeight: 1.8 }}>
              <li><b style={{ color: t.text }}>Nothing here is independently verified.</b> No record is graded above D; {gradeCounts?.E ?? 0} of {DERIVED.achievements} rest solely on government-published summaries.</li>
              <li><b style={{ color: t.text }}>247 of {DERIVED.achievements} records carry no page reference</b> to their source volume and cannot be spot-checked by a reader.</li>
              <li><b style={{ color: t.text }}>No independent verification is available</b> for most claims. The state's own statistical publications are currently unreachable, which is why grades A and B cannot be earned.</li>
              <li><b style={{ color: t.text }}>Tamil metadata is missing.</b> The corpus is written in English; only 20 of {DERIVED.achievements} records carry a Tamil scheme name and none has a Tamil description. Tamil claim search works for those and reports a coverage limit otherwise — it never reports a Tamil term as absent when the limitation is the index.</li>
              <li><b style={{ color: t.text }}>The manifesto headline is not independently reproducible.</b> Of the 400 promises the external tracker marks fulfilled, 0 are outcome-verified here, 79 have a linked Government Order or Act, and 158 have nothing linked at all.</li>
              <li><b style={{ color: t.text }}>Records await evidence enrichment.</b> 192 are marked complete with no completion evidence; 6 mix delivered with planned components.</li>
              <li><b style={{ color: t.text }}>No contrary evidence has been ingested</b> — no audit findings, opposition material or press criticism. This is the largest editorial weakness.</li>
              <li><b style={{ color: t.text }}>Source coverage is catalogued, not collected.</b> 108 sources are catalogued and reachability-checked; 0 have been ingested.</li>
            </ul>
          </Card>
        </Reveal>

        {/* ---------- corrections ---------- */}
        <Reveal>
          <Card>
            <Head>Found an error? Submit a correction</Head>
            <p style={{ color: t.textDim, fontSize: 12.5, lineHeight: 1.7, margin: "0 0 10px" }}>
              This project transcribes and cross-links thousands of entries by hand. Errors exist.
              Open an issue with the fields below —{" "}
              <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer" style={link}>
                report a correction ↗
              </a>
            </p>
            <Rows rows={CORRECTION_FIELDS} />
            <p style={{ color: t.textSoft, fontSize: 12, lineHeight: 1.65, margin: "10px 0 0" }}>
              <b style={{ color: t.text }}>Contrary evidence is especially wanted.</b> A CAG finding,
              RTI response, court record or departmental document that contradicts a record is more
              valuable than a dozen small fixes — grade F exists so contradiction can be recorded.
              Corrections are announced, never silent: every applied change is logged with its record ID.
            </p>
          </Card>
        </Reveal>

        {/* ---------- licence ---------- */}
        <Reveal>
          <Card>
            <Head>Licence and source handling</Head>
            <div style={{ display: "grid", gap: 9 }}>
              {LICENCE_ROWS.map(([scope, lic, note]) => (
                <div key={scope}>
                  <div style={{ display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap" }}>
                    <span style={{ color: t.text, fontSize: 12.5, fontWeight: 700 }}>{scope}</span>
                    <span style={{ color: textSafe(t.gold, t.name), fontSize: 11.5, fontFamily: "ui-monospace,monospace" }}>{lic}</span>
                  </div>
                  <p style={{ color: t.textDim, fontSize: 12.5, lineHeight: 1.65, margin: "2px 0 0" }}>{note}</p>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>

        {/* ---------- versions ---------- */}
        <Reveal>
          <Card>
            <Head>Version</Head>
            <div style={{ display: "grid", gap: 7 }}>
              {VERSION_ROWS.map(([k, v, why]) => (
                <div key={k} style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
                  <span style={{ color: t.text, fontSize: 12.5, fontWeight: 700, minWidth: 150 }}>{k}</span>
                  <span style={{ color: textSafe(t.gold, t.name), fontSize: 12.5, fontFamily: "ui-monospace,monospace", fontWeight: 700 }}>{v}</span>
                  <span style={{ color: t.textSoft, fontSize: 12, lineHeight: 1.6, flex: "1 1 240px" }}>{why}</span>
                </div>
              ))}
            </div>
            <p style={{ color: t.textSoft, fontSize: 12, lineHeight: 1.65, margin: "10px 0 0" }}>
              The methodology version is tracked separately from the data because changing the rules
              can change what an existing record <i>means</i> without any data changing.
            </p>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
