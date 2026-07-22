import { useT, textSafe } from "../lib/theme.js";
import { REFERENCES } from "../data/dashboard.js";
import { Section, SectionHead } from "../components/layout.jsx";
import { scrollToId } from "../lib/hooks.js";
import { versionLine } from "../lib/version.js";
import { REPO_URL, ISSUES_URL } from "../data/transparency.js";
import RisingSun from "../components/RisingSun.jsx";

const DISCLOSURES = [
  ["What this is", "An interactive, source-linked explorer of the Tamil Nadu government's published 2021–2026 record. It is a reference and discovery tool, not an independent audit or a fact-checking platform."],
  ["What the data is", "Achievement records are quoted from the government's own published summary material (souvenir / minister-by-minister volumes) — government-reported evidence, graded E by default. Records rise to grade D where a Government Order or gazetted Act names the scheme. No record is graded A/B/C here, because outcome-, delivery- and execution-level primary documents are not yet embedded."],
  ["Manifesto statuses", "The five promise statuses mirror the independent Pudhiyavan DMK Manifesto 2021 Tracker (18 Jul 2026), matched by promise number — they are that tracker's assessments, not this project's own verification. Promise texts are condensed English summaries, not the manifesto's original wording."],
  ["Coverage limits", "Government Orders: 3,501 catalogued in the archive listing, 186 embedded here. Assembly debates: 138 sitting links, 38 measured for pages/words. These distinctions are shown in each section, and the remainder is a resumable ingestion queue."],
  ["Corrections", "Encoding, duplicate-title and mixed-status fixes are logged in the repository's docs/CHANGELOG.md and migration files. Original manifesto/promise wording is preserved. Report issues via the repository."],
];

export default function Footer() {
  const t = useT();
  return (
    <>
      <Section id="references" style={{ paddingTop: "clamp(40px,6vw,72px)" }}>
        <SectionHead eyebrow="Sources" title="Where every figure comes from" />
        <div style={{ display: "grid", gap: 8 }}>
          {REFERENCES.map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 12, background: t.panel, border: `1px solid ${t.line}`, borderRadius: 10, padding: "13px 15px" }}>
              <span style={{ color: t.gold, fontFamily: "ui-monospace,monospace", fontSize: 12, fontWeight: 700 }}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div style={{ color: t.text, fontSize: 13.5, fontWeight: 600, lineHeight: 1.4 }}>{r.t}</div>
                <div style={{ color: t.mute, fontSize: 11.5, marginTop: 2 }}>{r.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="about" style={{ paddingTop: "clamp(36px,5vw,60px)" }}>
        <SectionHead eyebrow="About & methodology" title="How to read this — and what it is not" />
        <div style={{ display: "grid", gap: 8 }}>
          {DISCLOSURES.map(([h, body]) => (
            <div key={h} style={{ background: t.panel, border: `1px solid ${t.line}`, borderRadius: 10, padding: "13px 16px" }}>
              <div style={{ color: t.gold, fontSize: 11.5, fontFamily: "ui-monospace,monospace", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 5 }}>{h}</div>
              <p style={{ color: t.textDim, fontSize: 12.5, lineHeight: 1.7, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
        <button onClick={() => scrollToId("transparency")}
          style={{ marginTop: 12, padding: "10px 16px", background: "transparent", border: `1px solid ${t.gold}66`, color: textSafe(t.gold, t.name), borderRadius: 10, fontSize: 12.5, cursor: "pointer", fontFamily: "ui-monospace,monospace" }}>
          Full transparency &amp; methodology →
        </button>
      </Section>

      <footer style={{ maxWidth: 1080, margin: "40px auto 0", padding: "28px 18px 60px" }}>
        <div style={{ background: t.panel2, border: `1px solid ${t.line2}`, borderRadius: 16, padding: "24px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <RisingSun size={28} glow />
            <span style={{ color: t.text, fontWeight: 800, fontSize: 15 }}>The Dravidian Model · 2021–2026</span>
          </div>
          <p style={{ color: t.textSoft, fontSize: 12, lineHeight: 1.75, margin: "0 0 14px", maxWidth: 760 }}>
            A source-linked civic reference, data as of 18 July 2026. Figures are quoted from the official sources
            listed above; where a source itself gives differing figures, both are noted. This is government-reported
            and third-party-assessed material, not an independent audit — read each record against its linked source
            before drawing conclusions. Built to be shared, checked and disputed against its own sources.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={() => scrollToId("transparency")}
              style={{ padding: "9px 16px", background: "transparent", border: `1px solid ${t.gold}66`, color: textSafe(t.gold, t.name), borderRadius: 9, fontSize: 12.5, cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: ".06em" }}>
              Transparency &amp; methodology
            </button>
            <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer"
              style={{ padding: "9px 16px", background: "transparent", border: `1px solid ${t.line}`, color: t.faint, borderRadius: 9, fontSize: 12.5, textDecoration: "none", fontFamily: "ui-monospace,monospace", letterSpacing: ".06em" }}>
              Submit a correction ↗
            </a>
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer"
              style={{ padding: "9px 16px", background: "transparent", border: `1px solid ${t.line}`, color: t.faint, borderRadius: 9, fontSize: 12.5, textDecoration: "none", fontFamily: "ui-monospace,monospace", letterSpacing: ".06em" }}>
              Repository ↗
            </a>
            <button onClick={() => scrollToId("overview")} style={{ padding: "9px 16px", background: "transparent", border: `1px solid ${t.line}`, color: textSafe(t.gold, t.name), borderRadius: 9, fontSize: 12.5, cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: ".06em" }}>↑ Back to top</button>
          </div>
          {/* Version line: a reader needs the data cut-off and the methodology
              version to know what this artefact could possibly know. */}
          <div style={{ marginTop: 16, paddingTop: 12, borderTop: `1px solid ${t.line2}`, color: t.mute, fontSize: 11.5, fontFamily: "ui-monospace,monospace", lineHeight: 1.9 }}>
            <div>{versionLine()}</div>
            <div>Maintained independently by Pugazhendhi R · no political affiliation · self-funded · code MIT, data CC BY 4.0</div>
          </div>
        </div>
      </footer>
    </>
  );
}
