import { useState, useEffect, lazy, Suspense, Component } from "react";
import { ThemeCtx, THEMES, useT, onColor } from "./lib/theme.js";
import { usePersisted, useScrollProgress } from "./lib/hooks.js";

import Nav from "./components/Nav.jsx";
import SearchOverlay from "./components/SearchOverlay.jsx";
import ShareCard from "./components/ShareCard.jsx";

import Hero from "./sections/Hero.jsx";
import Dashboard from "./sections/Dashboard.jsx";
import Method from "./sections/Method.jsx";
import Explore from "./sections/Explore.jsx";
import Claim from "./sections/Claim.jsx";
import Manifesto from "./sections/Manifesto.jsx";
import Footer from "./sections/Footer.jsx";

// Lazy-load heavy below-the-fold sections (esp. GovOrders -> gazettegos.js, ~340KB)
const Legislation = lazy(() => import("./sections/Legislation.jsx"));
const GovOrders = lazy(() => import("./sections/GovOrders.jsx"));
const Debates = lazy(() => import("./sections/Debates.jsx"));

class ErrorBoundary extends Component {
  constructor(p) { super(p); this.state = { err: null }; }
  static getDerivedStateFromError(err) { return { err }; }
  render() {
    if (this.state.err) return <div style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 18px", color: "#c0392b" }}>This section failed to load. The rest of the page is unaffected.</div>;
    return this.props.children;
  }
}
function LazySection() {
  return <div style={{ maxWidth: 1080, margin: "0 auto", padding: "60px 18px", color: "#7a6c4c", fontFamily: "ui-monospace,monospace", fontSize: 12 }}>Loading section…</div>;
}

function BackToTop() {
  const t = useT();
  const p = useScrollProgress();
  if (p < 0.08) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
      style={{ position: "fixed", right: 18, bottom: 18, zIndex: 300, width: 44, height: 44, borderRadius: "50%", border: "none", cursor: "pointer", background: t.gold, color: t.name === "dark" ? "#1a1206" : "#fff", fontSize: 18, boxShadow: "0 8px 24px -8px rgba(0,0,0,.6)" }}>↑</button>
  );
}

export default function App() {
  const [themeName, setThemeName] = usePersisted("dr_theme", "dark");
  const theme = THEMES[themeName] || THEMES.dark;
  const [search, setSearch] = useState(false);
  const [card, setCard] = useState(null);

  // Cmd/Ctrl+K opens search
  useEffect(() => {
    const on = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearch((s) => !s); }
      if (e.key === "/" && !/input|textarea/i.test(document.activeElement?.tagName || "")) { e.preventDefault(); setSearch(true); }
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, []);

  // reflect theme on the body so the base background matches
  useEffect(() => { document.body.style.background = theme.bg; }, [theme]);

  return (
    <ThemeCtx.Provider value={theme}>
      <style>{`
        *{box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{margin:0;font-family:'Inter',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased}
        ::-webkit-scrollbar{width:8px;height:8px}
        ::-webkit-scrollbar-thumb{background:${theme.line};border-radius:4px}
        ::selection{background:${theme.gold}44}
        input::placeholder{color:${theme.ghost}}
        :focus-visible{outline:2px solid ${theme.gold};outline-offset:2px;border-radius:4px}
        @media (max-width:760px){
          .nav-desk{display:none!important}
          .nav-burger{display:inline-block!important}
        }
        @media (min-width:761px){ .nav-mobile{display:none!important} }
        @media (prefers-reduced-motion:reduce){ html{scroll-behavior:auto} }
      `}</style>

      <div style={{ minHeight: "100vh", background: theme.bgGrad, color: theme.text }}>
        <a href="#overview" className="skip-link" style={{ position: "absolute", left: -9999, top: 0, zIndex: 999, background: theme.gold, color: onColor(theme.gold), padding: "8px 14px", borderRadius: 8 }} onFocus={(e)=>{e.target.style.left="8px";e.target.style.top="8px"}} onBlur={(e)=>{e.target.style.left="-9999px"}}>Skip to content</a>
        <Nav onSearch={() => setSearch(true)} theme={themeName} onToggleTheme={() => setThemeName(themeName === "dark" ? "light" : "dark")} />
        <Hero />
        <Dashboard />
        <Method />
        <Explore onCard={setCard} />
        <Claim onCard={setCard} />
        <Manifesto onPickRecord={setCard} />
        <ErrorBoundary><Suspense fallback={<LazySection />}>
          <Legislation onPickRecord={setCard} />
          <GovOrders onPickRecord={setCard} />
          <Debates />
        </Suspense></ErrorBoundary>
        <Footer />
      </div>

      <SearchOverlay open={search} onClose={() => setSearch(false)} onPickRecord={setCard} />
      {card && <ShareCard rec={card} onClose={() => setCard(null)} />}
      <BackToTop />
    </ThemeCtx.Provider>
  );
}
