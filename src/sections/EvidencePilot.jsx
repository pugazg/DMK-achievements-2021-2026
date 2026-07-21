import { useState, useMemo } from "react";
import { useT, textSafe } from "../lib/theme.js";
import { Section, SectionHead } from "../components/layout.jsx";
import { GRADES } from "../lib/evidence.js";
import { EVIDENCE_PILOT, PILOT_META } from "../data/evidencePilot.js";
import { summarise, isIndependentlyEvidenced, hasIndependentScrutiny, hasContraryIndependent, STAGES } from "../lib/evidenceRecord.js";

/* Pilot evidence view (#evidence-pilot).

   Renders one subject at a time as:
     Claim -> Evidence timeline -> Sources -> Grade -> Limitations -> Missing

   Two presentation rules follow from the model rather than from taste:

   1. "Missing evidence" is rendered with the same weight as the sources,
      not as a footnote. A reader who sees five citations and skims past an
      absence has been misled by layout alone.
   2. Contrary sources are marked and are never sorted below supporting
      ones — the timeline is ordered by delivery stage, so an audit finding
      lands where it belongs in the lifecycle, not at the bottom. */

const STANCE_STYLE = (t, stance) => ({
  supporting: { c: textSafe(t.green, t.name), mark: "+", label: "supporting" },
  contrary: { c: textSafe(t.red, t.name), mark: "!", label: "contrary" },
  contextual: { c: textSafe(t.grey, t.name), mark: "~", label: "context" },
}[stance] || { c: t.mute, mark: "·", label: stance });

const EXTRACTION_LABEL = {
  identified: "identified only — not opened",
  retrieved: "retrieved — not read",
  parsed: "read",
  quoted: "read & quoted",
  unavailable: "not available",
};

function SourceCard({ s }) {
  const t = useT();
  const st = STANCE_STYLE(t, s.stance);
  const unread = s.extraction === "identified" || s.extraction === "retrieved";
  return (
    <div style={{ background: t.panel2, border: `1px solid ${t.line2}`, borderLeft: `3px solid ${st.c}`, borderRadius: 9, padding: "11px 13px" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap", marginBottom: 4 }}>
        <span style={{ color: st.c, fontFamily: "ui-monospace,monospace", fontSize: 11, fontWeight: 800 }}>{st.mark} {st.label}</span>
        <span style={{ color: t.mute, fontSize: 11, fontFamily: "ui-monospace,monospace" }}>{s.source_type}</span>
        <span style={{ color: t.mute, fontSize: 11, fontFamily: "ui-monospace,monospace" }}>· {s.authority}</span>
        {s.stage && <span style={{ color: t.mute, fontSize: 11, fontFamily: "ui-monospace,monospace" }}>· {s.stage}</span>}
      </div>
      <div style={{ color: t.text, fontSize: 12.5, fontWeight: 600, lineHeight: 1.5 }}>{s.title}</div>
      <div style={{ color: t.textSoft, fontSize: 11.5, marginTop: 2 }}>
        {s.issuing_authority}
        {s.document_no ? ` · ${s.document_no}` : ""}
        {s.date ? ` · ${s.date}` : ""}
        {s.page ? ` · p.${s.page}` : ""}
      </div>
      <div style={{ marginTop: 6, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{
          color: unread ? textSafe(t.amber, t.name) : textSafe(t.green, t.name),
          border: `1px solid ${unread ? t.amber : t.green}55`,
          borderRadius: 5, padding: "1px 7px", fontSize: 10.5, fontFamily: "ui-monospace,monospace",
        }}>
          {EXTRACTION_LABEL[s.extraction] || s.extraction}
        </span>
        {s.url && (
          <a href={s.url} target="_blank" rel="noopener noreferrer"
            style={{ color: textSafe(t.gold, t.name), fontSize: 11, fontFamily: "ui-monospace,monospace" }}>
            source ↗
          </a>
        )}
        {s.sha256 && <span style={{ color: t.wisp, fontSize: 10.5, fontFamily: "ui-monospace,monospace" }}>sha256 {s.sha256.slice(0, 12)}…</span>}
      </div>
      {s.quote && (
        <blockquote style={{ margin: "8px 0 0", padding: "8px 11px", background: t.panel, borderLeft: `2px solid ${st.c}`, borderRadius: 6, color: t.textDim, fontSize: 12, lineHeight: 1.65, fontStyle: "italic" }}>
          “{s.quote}”
        </blockquote>
      )}
      {s.note && <p style={{ color: t.textSoft, fontSize: 11.5, lineHeight: 1.6, margin: "6px 0 0" }}>{s.note}</p>}
    </div>
  );
}

function Record({ r }) {
  const t = useT();
  const g = GRADES[r.assessment.grade];
  const gc = textSafe(g?.color || t.gold, t.name);
  // Timeline order = delivery lifecycle, so contrary audit evidence sits at its
  // real position rather than being appended after the supporting sources.
  const ordered = useMemo(
    () => [...r.sources].sort((a, b) => STAGES.indexOf(a.stage) - STAGES.indexOf(b.stage)),
    [r],
  );
  // Distinguish "anyone independent looked at this" from "an independent
  // source SUPPORTS it". Only the second can lift a grade.
  const scrutinised = r.sources.some(hasIndependentScrutiny);
  const independentSupport = r.sources.some(isIndependentlyEvidenced);
  const contradicted = hasContraryIndependent(r);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {/* CLAIM */}
      <div style={{ background: t.panel, border: `1px solid ${t.line}`, borderRadius: 12, padding: "15px 17px" }}>
        <div style={{ color: textSafe(t.gold, t.name), fontSize: 11, fontFamily: "ui-monospace,monospace", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>
          Claim · {r.subject_type.replace("_", " ")} · {r.domain}
        </div>
        <p style={{ color: t.text, fontSize: 14.5, lineHeight: 1.6, margin: 0, fontWeight: 600 }}>{r.claim}</p>
      </div>

      {/* EVIDENCE TIMELINE */}
      <div style={{ background: t.panel, border: `1px solid ${t.line}`, borderRadius: 12, padding: "15px 17px" }}>
        <div style={{ color: textSafe(t.gold, t.name), fontSize: 11, fontFamily: "ui-monospace,monospace", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>
          Evidence timeline — {r.sources.length} sources, ordered by delivery stage
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          {ordered.map((s, i) => <SourceCard key={i} s={s} />)}
        </div>
      </div>

      {/* GRADE */}
      <div style={{ background: t.panel, border: `1px solid ${t.line}`, borderLeft: `3px solid ${gc}`, borderRadius: 12, padding: "15px 17px" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "baseline", flexWrap: "wrap", marginBottom: 8 }}>
          <span style={{ color: gc, fontFamily: "ui-monospace,monospace", fontSize: 22, fontWeight: 800 }}>{r.assessment.grade}</span>
          <span style={{ color: gc, fontSize: 13.5, fontWeight: 700 }}>{g?.label}</span>
          <span style={{ color: textSafe(t.amber, t.name), border: `1px solid ${t.amber}55`, borderRadius: 5, padding: "1px 7px", fontSize: 10.5, fontFamily: "ui-monospace,monospace" }}>
            {r.assessment.verification_status}
          </span>
          {!independentSupport && (
            <span style={{ color: textSafe(t.red, t.name), fontSize: 11, fontFamily: "ui-monospace,monospace" }}>
              no independent source supports this — cannot exceed D
            </span>
          )}
          {contradicted && (
            <span style={{ color: textSafe(t.red, t.name), border: `1px solid ${t.red}55`, borderRadius: 5, padding: "1px 7px", fontSize: 10.5, fontWeight: 700, fontFamily: "ui-monospace,monospace" }}>
              independent evidence contradicts part of this
            </span>
          )}
          {scrutinised && !independentSupport && (
            <span style={{ color: t.mute, fontSize: 11, fontFamily: "ui-monospace,monospace" }}>
              (independent scrutiny exists but does not support the claim)
            </span>
          )}
        </div>
        <p style={{ color: t.textDim, fontSize: 12.5, lineHeight: 1.7, margin: 0 }}>{r.assessment.rationale}</p>
      </div>

      {/* LIMITATIONS */}
      <div style={{ background: t.panel, border: `1px solid ${t.line}`, borderLeft: `3px solid ${t.amber}`, borderRadius: 12, padding: "15px 17px" }}>
        <div style={{ color: textSafe(t.amber, t.name), fontSize: 11, fontFamily: "ui-monospace,monospace", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>
          Limitations of this assessment
        </div>
        <ul style={{ margin: 0, paddingLeft: 18, color: t.textDim, fontSize: 12.5, lineHeight: 1.75 }}>
          {r.assessment.limitations.map((l, i) => <li key={i}>{l}</li>)}
        </ul>
      </div>

      {/* MISSING EVIDENCE — same visual weight as the sources, by design */}
      <div style={{ background: t.panel, border: `1px solid ${t.red}55`, borderLeft: `3px solid ${t.red}`, borderRadius: 12, padding: "15px 17px" }}>
        <div style={{ color: textSafe(t.red, t.name), fontSize: 11, fontFamily: "ui-monospace,monospace", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>
          Missing evidence — {r.missing.length} items not held
        </div>
        <ul style={{ margin: 0, paddingLeft: 18, color: t.textDim, fontSize: 12.5, lineHeight: 1.75 }}>
          {r.missing.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
        <p style={{ color: t.textSoft, fontSize: 11.5, lineHeight: 1.6, margin: "8px 0 0" }}>
          This list is part of the record, not an apology for it. A subject with nothing
          listed here would mean nobody looked.
        </p>
      </div>
    </div>
  );
}

export default function EvidencePilot() {
  const t = useT();
  const [idx, setIdx] = useState(0);
  const [filter, setFilter] = useState("all");
  const list = useMemo(
    () => (filter === "all" ? EVIDENCE_PILOT : EVIDENCE_PILOT.filter((r) => r.subject_type === filter)),
    [filter],
  );
  const rec = list[Math.min(idx, list.length - 1)];
  const s = useMemo(() => summarise(EVIDENCE_PILOT), []);

  const chip = (id, label) => (
    <button key={id} onClick={() => { setFilter(id); setIdx(0); }}
      style={{
        padding: "5px 12px", fontSize: 12, cursor: "pointer", borderRadius: 20,
        background: filter === id ? `${t.gold}22` : t.panel,
        border: `1px solid ${filter === id ? t.gold + "77" : t.line}`,
        color: filter === id ? textSafe(t.gold, t.name) : t.faint,
      }}>{label}</button>
  );

  return (
    <Section id="evidence-pilot" style={{ paddingTop: "clamp(36px,5vw,60px)" }}>
      <SectionHead
        eyebrow={`Evidence pilot · v${PILOT_META.version}`}
        title="What the evidence actually shows, one claim at a time"
        lede={`A ${s.total}-subject pilot testing whether the evidence model can hold the complete picture — supporting and adverse. ${s.sources} sources, of which ${s.read} have actually been read and ${s.contrary} are contrary. Not a sample of the main dataset: these were chosen to stress the model.`}
      />

      <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", marginBottom: 14 }}>
        {[
          ["Subjects", s.total], ["Sources", s.sources], ["Actually read", s.read],
          ["Contrary sources", s.contrary], ["With contrary evidence", `${s.withContrary}/${s.total}`],
          ["Missing items logged", s.missingItems],
        ].map(([k, v]) => (
          <div key={k} style={{ background: t.panel, border: `1px solid ${t.line}`, borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ color: t.text, fontSize: 18, fontWeight: 800, fontFamily: "ui-monospace,monospace" }}>{v}</div>
            <div style={{ color: t.mute, fontSize: 11 }}>{k}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        {chip("all", `All ${EVIDENCE_PILOT.length}`)}
        {chip("achievement", "Achievements 10")}
        {chip("promise", "Promises 10")}
        {chip("contested_claim", "Contested claims 5")}
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
        <label htmlFor="pilot-select" style={{ color: t.mute, fontSize: 12 }}>Subject</label>
        <select id="pilot-select" value={Math.min(idx, list.length - 1)} onChange={(e) => setIdx(+e.target.value)}
          style={{ flex: "1 1 320px", padding: "9px 12px", background: t.panel, border: `1px solid ${t.line}`, borderRadius: 10, color: t.text, fontSize: 13 }}>
          {list.map((r, i) => (
            <option key={r.id} value={i}>{r.assessment.grade} · {r.claim.slice(0, 74)}</option>
          ))}
        </select>
        <span style={{ color: t.mute, fontSize: 12, fontFamily: "ui-monospace,monospace" }}>
          {Math.min(idx, list.length - 1) + 1} / {list.length}
        </span>
      </div>

      {rec && <Record r={rec} />}
    </Section>
  );
}
