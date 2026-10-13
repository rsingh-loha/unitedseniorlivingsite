import { useState, useEffect } from "react";
import logoImg from "@/imports/image.png";
const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.4)",
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 10,
  padding: "12px 16px",
  color: "white",
  fontSize: 15,
  outline: "none",
  fontFamily: "'Inter', sans-serif",
};
/* ─── LOGO ─────────────────────────────────────────────────────────────── */
// blend="multiply"  → white bg disappears on light surfaces (ivory nav, footer pill)
// blend="screen"    → dark bg disappears on dark surfaces (not used currently)
// blend="normal"    → no blending, use on pure white backgrounds
function Logo({
  height = 52,
  blend = "multiply",
}: {
  height?: number;
  blend?: "multiply" | "screen" | "normal";
}) {
  return (
    <a
      href="#home"
      onClick={(e) => { e.preventDefault(); smoothScroll("#home"); }}
      style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}
    >
      <img
        src={logoImg}
        alt="United Senior Living Inc"
        style={{
          height,
          width: "auto",
          display: "block",
          objectFit: "contain",
          mixBlendMode: blend as React.CSSProperties["mixBlendMode"],
        }}
      />
    </a>
  );
}

/* ─── SMOOTH SCROLL ──────────────────────────────────────────────────────── */
function smoothScroll(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ─── NAV ────────────────────────────────────────────────────────────────── */
const NAV = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Home", href: "#home-section" },
  { label: "Our Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(248,244,238,0.97)" : "transparent",
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
      backdropFilter: scrolled ? "blur(10px)" : "none",
      transition: "all 0.3s",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 76, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo — multiply blend makes white transparent on the ivory nav bg;
            over the dark hero we get a slight tint which still reads well */}
        <Logo height={scrolled ? 52 : 58} blend="multiply" />

        <nav style={{ display: "flex", gap: 28, alignItems: "center" }} className="hide-mobile">
          {NAV.map(l => (
            <a key={l.href} href={l.href}
              onClick={e => { e.preventDefault(); smoothScroll(l.href); setOpen(false); }}
              style={{
                fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color 0.2s",
                color: scrolled ? "#222831" : "white",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = scrolled ? "#1a7a6a" : "#a8ddd4")}
              onMouseLeave={e => (e.currentTarget.style.color = scrolled ? "#222831" : "white")}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }} className="hide-mobile">
          <a href="tel:5596842981" style={{
            fontSize: 14, fontWeight: 700, textDecoration: "none",
            color: scrolled ? "#1a7a6a" : "white",
          }}>
            (559) 684‑2981
          </a>
          <a href="#contact" onClick={e => { e.preventDefault(); smoothScroll("#contact"); }}
            className="btn-primary" style={{ padding: "10px 20px", fontSize: 14 }}>
            Schedule a Tour
          </a>
        </div>

        <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none" }} className="show-mobile">
          <div style={{ width: 24, display: "flex", flexDirection: "column", gap: 5 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: "block", height: 2, background: "#1a7a6a", borderRadius: 2,
                transform: open ? (i === 0 ? "rotate(45deg) translateY(7px)" : i === 2 ? "rotate(-45deg) translateY(-7px)" : "scaleX(0)") : "none",
                transition: "all 0.2s",
              }}/>
            ))}
          </div>
        </button>
      </div>

      {open && (
        <div style={{ background: "#F8F4EE", padding: "16px 24px 24px", borderTop: "1px solid #E5DFD5" }}>
          {NAV.map(l => (
            <a key={l.href} href={l.href}
              onClick={e => { e.preventDefault(); smoothScroll(l.href); setOpen(false); }}
              style={{ display: "block", padding: "12px 0", fontSize: 16, fontWeight: 500, color: "#222831", textDecoration: "none", borderBottom: "1px solid #EDE8DF" }}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={e => { e.preventDefault(); smoothScroll("#contact"); setOpen(false); }}
            className="btn-primary" style={{ marginTop: 16, width: "100%", justifyContent: "center" }}>
            Schedule a Tour
          </a>
        </div>
      )}
    </header>
  );
}

/* ─── HERO ───────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <img
        src="https://images.unsplash.com/photo-1758691462477-976f771224d8?w=1600&h=900&fit=crop&auto=format"
        alt="Compassionate senior care"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(26,39,68,0.88) 0%, rgba(26,39,68,0.65) 55%, rgba(26,122,106,0.45) 100%)" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "100px 24px 60px", width: "100%" }}>
        <div style={{ maxWidth: 640 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(26,122,106,0.25)", border: "1px solid rgba(26,122,106,0.5)", borderRadius: 50, padding: "6px 16px", marginBottom: 24 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "block", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#a8ddd4", letterSpacing: "0.05em" }}>Now Accepting Residents · Bakersfield, CA</span>
          </div>

          <h1 className="serif" style={{ fontSize: "clamp(38px, 6vw, 64px)", fontWeight: 700, color: "white", lineHeight: 1.15, marginBottom: 20 }}>
            Welcome to<br />
            <em style={{ color: "#a8ddd4", fontStyle: "italic" }}>United Senior Living</em>
          </h1>

          <p className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 26px)", color: "rgba(255,255,255,0.85)", fontStyle: "italic", marginBottom: 20, fontWeight: 400 }}>
            Where Care Becomes Home
          </p>

          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 36, maxWidth: 520 }}>
            A boutique six-bed RCFE in the City in the Hills — delivering hospital-grade clinical safety
            with the warmth of a private home. LTC Insurance accepted. LVN on-site.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="#contact" onClick={e => { e.preventDefault(); smoothScroll("#contact"); }} className="btn-primary" style={{ fontSize: 16, padding: "15px 32px" }}>
              Schedule a Free Tour
            </a>
            <a href="#about" onClick={e => { e.preventDefault(); smoothScroll("#about"); }} className="btn-outline" style={{ fontSize: 16, padding: "15px 32px" }}>
              Learn More
            </a>
          </div>

          <div style={{ display: "flex", gap: 32, marginTop: 52, flexWrap: "wrap" }}>
            {[
              { n: "15+", l: "Years Medical Experience" },
              { n: "6‑Bed", l: "Intimate Setting" },
              { n: "24/7", l: "On-Site Care" },
              { n: "LTC", l: "Insurance Accepted" },
            ].map(s => (
              <div key={s.n}>
                <div className="serif" style={{ fontSize: 28, fontWeight: 700, color: "#a8ddd4" }}>{s.n}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", letterSpacing: "0.05em", marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1}50%{opacity:.4} }`}</style>
    </section>
  );
}

/* ─── TRUST BAR ──────────────────────────────────────────────────────────── */
function TrustBar() {
  const items = [
    { icon: "✓", text: "RCFE Licensed Facility" },
    { icon: "♥", text: "LVN-Led Clinical Oversight" },
    { icon: "🛡", text: "LTC Insurance Accepted" },
    { icon: "⭐", text: "ADA-Compliant Infrastructure" },
    { icon: "🏠", text: "City in the Hills, Bakersfield" },
    { icon: "📋", text: "Electronic Health Records" },
  ];
  return (
    <div style={{ background: "#1a7a6a", padding: "16px 24px", overflowX: "auto" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap" }}>
        {items.map(i => (
          <div key={i.text} style={{ display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
            <span style={{ color: "#a8ddd4", fontWeight: 700 }}>{i.icon}</span>
            <span style={{ color: "white", fontSize: 13, fontWeight: 500 }}>{i.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ABOUT / MISSION ────────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" style={{ background: "#F8F4EE", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
        <div>
          <span className="section-label">Our Philosophy</span>
          <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 46px)", fontWeight: 700, color: "#1a2744", lineHeight: 1.2, marginBottom: 24 }}>
            A Place to Belong,<br />
            <em style={{ color: "#1a7a6a" }}>Not Just to Live</em>
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: "#4a4035", marginBottom: 18 }}>
            At the heart of our care is a simple belief: <strong>every resident deserves to be treated
            with dignity, encouraged to maintain their independence, and supported with compassionate,
            personalized care.</strong>
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: "#6B6258", marginBottom: 18 }}>
            United Senior Living Inc bridges the gap between the clinical safety of a large institution
            and the personalized comfort of a private home. Our six-bed model is specifically designed
            so each resident receives individualized care — not a one-size-fits-all approach.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: "#6B6258", marginBottom: 32 }}>
            We serve seniors aged 60 and older in Bakersfield, CA, providing assistance with activities
            of daily living (ADLs), laundry, meals, and personalized care plans — all under on-site
            LVN coordination with physicians, families, and healthcare providers.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["RCFE Licensed", "LVN On-Site", "LTC Insurance", "ADA-Compliant"].map(tag => (
              <span key={tag} style={{ background: "#e6f4f1", color: "#1a7a6a", fontSize: 13, fontWeight: 600, padding: "7px 14px", borderRadius: 50 }}>
                ✓ {tag}
              </span>
            ))}
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: -16, left: -16, right: 32, bottom: 32, background: "#d4ebe5", borderRadius: 20, zIndex: 0 }} />
          <img
            src="https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=700&h=580&fit=crop&auto=format"
            alt="Caregiver assisting senior residents"
            style={{ position: "relative", zIndex: 1, width: "100%", height: 500, objectFit: "cover", borderRadius: 20 }}
          />
          <div style={{
            position: "absolute", bottom: -20, right: -20, zIndex: 2,
            background: "#1a2744", color: "white", borderRadius: 16, padding: "20px 24px",
          }}>
            <div className="serif" style={{ fontSize: 22, fontWeight: 700 }}>Bakersfield, CA</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>City in the Hills · 93306</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── WHY CHOOSE US ──────────────────────────────────────────────────────── */
function WhyUs() {
  const advantages = [
    {
      icon: "👥",
      title: "Superior Staffing Ratios",
      desc: "Unlike overburdened staff at large local chains, our six-bed model ensures every resident receives proactive monitoring, immediate assistance, and genuine personal attention — not a number.",
    },
    {
      icon: "🏗",
      title: "Modern, Accessible Infrastructure",
      desc: "ADA-compliant fixtures, Hoyer lifts, walk-in showers, grab bars, and clinical-grade safety hardware — designed for both ambulatory and non-ambulatory residents.",
    },
    {
      icon: "🔗",
      title: "Integrated Referral Network",
      desc: "Strong partnerships with Bakersfield hospitals and LTC insurance providers mean seamless transitions from acute care. We handle insurance verification so families don't have to.",
    },
  ];

  return (
    <section style={{ background: "#1a2744", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C8943A" }}>
            Our Competitive Edge
          </span>
          <h2 className="serif" style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, color: "white", marginTop: 12, lineHeight: 1.25 }}>
            Why Families Choose<br />
            <em style={{ color: "#a8ddd4" }}>United Senior Living</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, maxWidth: 560, margin: "16px auto 0", lineHeight: 1.7 }}>
            We bridge the gap between clinical safety and home-like comfort — delivering
            what large nursing chains cannot.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {advantages.map((a, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20, padding: 36, transition: "all 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(26,122,106,0.2)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)"; }}
            >
              <div style={{ fontSize: 40, marginBottom: 20 }}>{a.icon}</div>
              <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "white", marginBottom: 12 }}>{a.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.65)" }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES ───────────────────────────────────────────────────────────── */
const SERVICES = [
  { icon: "💊", title: "Medication Management", desc: "Accurate administration and oversight of all prescriptions and dosing schedules by our LVN, minimizing errors 24/7." },
  { icon: "🩺", title: "LVN Clinical Oversight", desc: "On-site Licensed Vocational Nurse coordinates with physicians, families, and specialists for early risk recognition and timely intervention." },
  { icon: "🛏", title: "Private & Shared Rooms", desc: "Comfortable private and shared accommodations each featuring a television, designed to feel like a real home." },
  { icon: "🍽", title: "Home-Cooked Meals", desc: "Nutritious meals prepared with cultural sensitivity and attention to therapeutic diets, nutritional needs, and personal preferences." },
  { icon: "📱", title: "Electronic Health Records", desc: "Real-time EHR and eMAR systems ensure accurate care documentation accessible to our LVN, reducing risk of clinical error." },
  { icon: "♿", title: "Ambulatory & Non-Ambulatory", desc: "Hoyer lifts, transfer rails, ADA-compliant bathrooms, and specialized safety hardware for residents at every mobility level." },
  { icon: "🌿", title: "Activities & Socialization", desc: "Gardening, outdoor patio time, daily activities, and companionship programs to combat isolation and support cognitive health." },
  { icon: "🏥", title: "Hospital Transition Support", desc: "Direct referral partnerships with Bakersfield hospitals for streamlined placement — we manage insurance verification for your family." },
  { icon: "👨‍👩‍👧", title: "Family Communication", desc: "Regular updates and transparent communication with families so loved ones feel connected, and families feel reassured." },
  { icon: "🛁", title: "Personal Care (ADLs)", desc: "Dignified assistance with bathing, dressing, grooming, toileting, and all activities of daily living, tailored to each resident." },
  { icon: "🧺", title: "Laundry Services", desc: "Full laundry services included, ensuring residents always have clean, comfortable clothing without burden on family." },
  { icon: "📋", title: "Personalized Care Plans", desc: "Each resident receives a detailed, individualized care plan reviewed regularly and coordinated with their healthcare providers." },
];

function Services() {
  return (
    <section id="services" style={{ background: "#F8F4EE", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-label">Comprehensive Care</span>
          <h2 className="serif" style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, color: "#1a2744", lineHeight: 1.25 }}>
            Our Services &amp; Amenities
          </h2>
          <p style={{ color: "#6B6258", fontSize: 16, maxWidth: 560, margin: "16px auto 0", lineHeight: 1.7 }}>
            Every service designed to support your loved one's health, independence,
            and quality of life — under one intimate roof.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          {SERVICES.map((s, i) => (
            <div key={i} className="card" style={{ padding: 28 }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{s.icon}</div>
              <h3 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#1a2744", marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: "#6B6258" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── AMENITIES & SPACE ─────────────────────────────────────────────────── */
function AmenitiesSpace() {
  const amenities = [
    { icon: "📺", label: "TV in Every Room", desc: "Each private and shared room includes its own television for entertainment and comfort." },
    { icon: "🍳", label: "Home-Cooked Meals", desc: "Culturally sensitive meals prepared fresh daily, accommodating therapeutic and specialty diets." },
    { icon: "🌿", label: "Outdoor Patio & Garden", desc: "A comfortable patio surrounded by greenery for fresh air, gardening, and peaceful relaxation." },
    { icon: "🌳", label: "Nearby Park", desc: "Situated steps from a neighborhood park — walks, nature, and outdoor time are always accessible." },
    { icon: "🧺", label: "Laundry Services", desc: "Full laundry and linen service included — residents always have clean, comfortable clothing." },
    { icon: "🔒", label: "Security Monitoring", desc: "24/7 security monitoring hardware throughout the home for resident safety and family peace of mind." },
    { icon: "📋", label: "Electronic Health Records", desc: "Modern EHR and eMAR systems for accurate medication tracking and health documentation." },
    { icon: "👨‍👩‍👧", label: "Family Communication", desc: "Regular updates and open communication channels so families always feel informed and connected." },
  ];

  return (
    <section style={{ background: "#1a2744", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C8943A" }}>
            Our Facility
          </span>
          <h2 className="serif" style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, color: "white", marginTop: 12, lineHeight: 1.25 }}>
            Amenities, Space &amp;<br />
            <em style={{ color: "#a8ddd4" }}>Accessibility</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, maxWidth: 560, margin: "16px auto 0", lineHeight: 1.7 }}>
            Every detail of our home — from room layout to outdoor space — is designed
            around the comfort, safety, and dignity of each resident.
          </p>
        </div>

        {/* Ambulatory / Non-Ambulatory banner */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 40 }}>
          <div style={{ background: "rgba(26,122,106,0.2)", border: "1px solid rgba(26,122,106,0.5)", borderRadius: 20, padding: "32px 36px" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🚶</div>
            <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "white", marginBottom: 12 }}>
              Ambulatory Residents
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>
              For residents who are mobile and independent in movement, our open floor plan,
              patio access, and nearby park provide space to stay active, socialize, and
              maintain autonomy — all within a safe, supervised environment.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {["Open common areas & patio access", "Park walks & outdoor activities", "Independent daily routines supported", "Social engagement programs"].map(f => (
                <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1a7a6a", flexShrink: 0 }} />{f}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: "rgba(91,79,207,0.2)", border: "1px solid rgba(91,79,207,0.5)", borderRadius: 20, padding: "32px 36px" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>♿</div>
            <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "white", marginBottom: 12 }}>
              Non-Ambulatory Residents
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>
              Our facility is purpose-built with ADA-compliant infrastructure to accommodate
              residents with limited or no independent mobility — ensuring safety, dignity,
              and comfort at every level of need.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {["Hoyer lifts & transfer rails installed", "Walk-in showers & ADA-compliant bathrooms", "Grab bars & emergency response hardware", "Full ADL assistance (bathing, dressing, transfers)"].map(f => (
                <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5b4fcf", flexShrink: 0 }} />{f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Amenities grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {amenities.map((a, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14, padding: "22px 24px",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.09)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)"; }}
            >
              <div style={{ fontSize: 28, marginBottom: 10 }}>{a.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 6 }}>{a.label}</div>
              <div style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.55)" }}>{a.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SIGNS ──────────────────────────────────────────────────────────────── */
const SIGNS = [
  "Frequent falls, wandering, or growing safety concerns at home",
  "Missed medications, incorrect doses, or difficulty managing prescriptions",
  "Changes in mobility or increased difficulty walking, standing, or transferring",
  "Difficulty with bathing, dressing, grooming, toileting, or other daily activities",
  "Social isolation, loneliness, or loss of interest in favorite activities",
  "Difficulty keeping up with housekeeping, laundry, meals, or household responsibilities",
  "Recent hospitalization, surgery, rehabilitation stay, or repeated ER visits",
  "A decline in overall health or the need for more frequent supervision",
  "A growing need for companionship, structure, and around-the-clock support",
];

function SignsSection() {
  return (
    <section style={{ background: "#EDE8DF", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
        <div style={{ position: "sticky", top: 100 }}>
          <span className="section-label">Recognizing the Signs</span>
          <h2 className="serif" style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, color: "#1a2744", lineHeight: 1.25, marginBottom: 20 }}>
            Is It Time to Consider<br />
            <em style={{ color: "#1a7a6a" }}>Residential Care?</em>
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: "#4a4035", marginBottom: 24 }}>
            Knowing when a loved one may benefit from additional support can be difficult.
            Every situation is different — but certain changes may signal it is time to
            consider a safe, supportive residential care setting.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: "#4a4035", marginBottom: 32, fontWeight: 600 }}>
            You do not have to navigate this decision alone.
          </p>
          <a href="#contact" onClick={e => { e.preventDefault(); smoothScroll("#contact"); }} className="btn-primary">
            Talk to Our Team Today
          </a>
          <div style={{ marginTop: 28, padding: 24, background: "#1a7a6a", borderRadius: 16, color: "white" }}>
            <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>Call us directly</div>
            <a href="tel:5596842981" style={{ fontSize: 22, fontWeight: 700, color: "white", textDecoration: "none", fontFamily: "'Playfair Display', serif" }}>
              (559) 684‑2981
            </a>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {SIGNS.map((s, i) => (
            <div key={i} style={{
              display: "flex", gap: 16, alignItems: "flex-start",
              background: "white", borderRadius: 14, padding: "18px 22px",
              border: "1px solid #E5DFD5",
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", background: "#1a7a6a",
                color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 1,
              }}>{i + 1}</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#4a4035", margin: 0 }}>{s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── OUR HOME ───────────────────────────────────────────────────────────── */
function OurHome() {
  const features = [
    { icon: "📺", label: "TV in Every Room" },
    { icon: "🌳", label: "Near a Park" },
    { icon: "🌿", label: "Patio & Garden" },
    { icon: "🍳", label: "Home-Cooked Meals" },
    { icon: "♿", label: "ADA-Compliant" },
    { icon: "🔒", label: "Emergency Response Hardware" },
    { icon: "🚗", label: "Easy Highway Access" },
    { icon: "🏥", label: "Near Major Hospitals" },
  ];

  return (
    <section id="home-section" style={{ background: "#F8F4EE", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-label">Our Facility</span>
          <h2 className="serif" style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, color: "#1a2744", lineHeight: 1.25 }}>
            Life in the City in the Hills
          </h2>
          <p style={{ color: "#6B6258", fontSize: 16, maxWidth: 600, margin: "16px auto 0", lineHeight: 1.7 }}>
            Our home is strategically located in Bakersfield's City in the Hills — a tranquil residential
            neighborhood that provides the calm, home-like atmosphere essential for senior wellness.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          {/* Photo collage */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "280px 200px", gap: 14 }}>
            <img
              src="https://images.unsplash.com/photo-1698870157085-11632d2ddef8?w=500&h=400&fit=crop&auto=format"
              alt="Warm living room"
              style={{ gridColumn: "1 / -1", width: "100%", height: "100%", objectFit: "cover", borderRadius: 16 }}
            />
            <img
              src="https://images.unsplash.com/photo-1759177273737-d891112cc6f3?w=400&h=280&fit=crop&auto=format"
              alt="Peaceful garden"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 16 }}
            />
            <img
              src="https://images.unsplash.com/photo-1770808250138-2ce5da80b312?w=400&h=280&fit=crop&auto=format"
              alt="Accessible care equipment"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 16 }}
            />
          </div>

          <div>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "#4a4035", marginBottom: 18 }}>
              United Senior Living Inc operates a specialized <strong>six-bed Residential Care Facility for
              the Elderly (RCFE)</strong> in Bakersfield, California. The facility is situated in the City of
              the Hills — a quiet residential neighborhood that provides a tranquil, home-like atmosphere
              essential for senior wellness and cognitive health.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "#6B6258", marginBottom: 18 }}>
              The property is specifically designed to accommodate both <strong>ambulatory and
              non-ambulatory residents</strong>, ensuring a continuum of care as residents' mobility needs
              evolve. Our comfortable patio and nearby park allow residents to enjoy fresh air, nature,
              and peaceful outdoor time.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "#6B6258", marginBottom: 32 }}>
              With easy access to major highways and proximity to Bakersfield's major hospitals, our
              location balances peaceful living with rapid healthcare connectivity.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {features.map(f => (
                <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 10, background: "#EDE8DF", borderRadius: 10, padding: "10px 14px" }}>
                  <span style={{ fontSize: 18 }}>{f.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#1a2744" }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── LTC INSURANCE BANNER ───────────────────────────────────────────────── */
function InsuranceBanner() {
  return (
    <section style={{ background: "linear-gradient(135deg, #1a7a6a 0%, #135a4e 100%)", padding: "64px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", borderRadius: 50, padding: "6px 16px", marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "white" }}>
              Financial Peace of Mind
            </span>
          </div>
          <h2 className="serif" style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 700, color: "white", marginBottom: 14 }}>
            We Accept Long-Term Care (LTC) Insurance
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, lineHeight: 1.75, maxWidth: 600 }}>
            We coordinate directly with LTC insurance providers, handling the complex verification
            and administrative workflows internally — so your family can focus on your loved one's
            transition, not the paperwork. Direct payments also accepted.
          </p>
        </div>
        <div style={{ flexShrink: 0 }}>
          <a href="#contact" onClick={e => { e.preventDefault(); smoothScroll("#contact"); }}
            style={{ display: "inline-block", background: "white", color: "#1a7a6a", fontWeight: 700, fontSize: 16, padding: "16px 32px", borderRadius: 50, textDecoration: "none", whiteSpace: "nowrap", transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Verify Your Coverage →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── WHO WE SERVE ───────────────────────────────────────────────────────── */
function WhoWeServe() {
  const segments = [
    {
      icon: "🏥",
      title: "Transitional Care Patients",
      desc: "Seniors currently in hospitals or rehabilitation centers who are medically stable but not yet safe to return home independently. We specialize in streamlined placements that eliminate the stress of a 'placement crisis' following an acute medical event.",
      tag: "Hospital Discharge Ready",
      tagColor: "#1a7a6a",
    },
    {
      icon: "👨‍👩‍👧",
      title: "Families Seeking Personalized Care",
      desc: "Family members dissatisfied with the high staff-to-resident ratios of large corporate nursing homes. You prioritize social engagement, proactive monitoring, and a genuine home-like environment — not an institutional one.",
      tag: "Family-Centered Approach",
      tagColor: "#5b4fcf",
    },
    {
      icon: "♿",
      title: "Seniors Requiring Specialized Oversight",
      desc: "Individuals aged 60 and older facing mobility challenges or complex medical needs. Our facility is designed for both ambulatory and non-ambulatory residents, integrating clinical safety directly into a home-like setting.",
      tag: "Ambulatory & Non-Ambulatory",
      tagColor: "#C8943A",
    },
    {
      icon: "🤝",
      title: "Professional Gatekeepers",
      desc: "Hospital discharge planners, LTC insurance agents, and senior care consultants who manage placement decisions. We are a reliable, high-quality facility built specifically to serve your clients' immediate needs with a streamlined intake process.",
      tag: "For Healthcare Professionals",
      tagColor: "#1a2744",
    },
  ];

  return (
    <section style={{ background: "#F8F4EE", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-label">Who We Serve</span>
          <h2 className="serif" style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, color: "#1a2744", lineHeight: 1.25 }}>
            The Right Home for<br />
            <em style={{ color: "#1a7a6a" }}>Every Journey</em>
          </h2>
          <p style={{ color: "#6B6258", fontSize: 16, maxWidth: 580, margin: "16px auto 0", lineHeight: 1.7 }}>
            We serve four distinct groups — each with specific needs around medical oversight,
            financial coordination, and the quality of daily life.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
          {segments.map((s, i) => (
            <div key={i} className="card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ fontSize: 36 }}>{s.icon}</div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: s.tagColor, background: `${s.tagColor}18`, padding: "4px 10px", borderRadius: 50, display: "inline-block", marginBottom: 10 }}>
                  {s.tag}
                </span>
                <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, color: "#1a2744", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: "#6B6258" }}>{s.desc}</p>
              </div>
              <a href="#contact" onClick={e => { e.preventDefault(); smoothScroll("#contact"); }}
                style={{ marginTop: "auto", fontSize: 13, fontWeight: 700, color: s.tagColor, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── THE PROBLEM WE SOLVE ───────────────────────────────────────────────── */
function ProblemSection() {
  const problems = [
    {
      title: "Critical Placement Shortages",
      desc: "Long waitlists at existing facilities often force families to delay necessary care or settle for sub-optimal living arrangements that don't meet their loved one's medical or social needs.",
    },
    {
      title: "Inadequate Staffing & Oversight",
      desc: "Many local providers struggle with high staff-to-resident ratios — leading to a lack of personalized attention, slower response times, and a general sense of neglect that compromises resident safety and dignity.",
    },
    {
      title: "Outdated Infrastructure",
      desc: "A significant portion of Bakersfield's assisted living inventory consists of aging facilities that lack modern amenities, specialized medical equipment, and the accessibility features required for contemporary senior wellness.",
    },
    {
      title: "Social Isolation",
      desc: "Existing solutions frequently prioritize basic clinical care over holistic well-being. There is a notable lack of robust community engagement and specialized social activities — essential for maintaining cognitive health and emotional vitality.",
    },
  ];

  return (
    <section style={{ background: "#EDE8DF", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div style={{ position: "sticky", top: 100 }}>
            <span className="section-label">The Problem We Solve</span>
            <h2 className="serif" style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, color: "#1a2744", lineHeight: 1.25, marginBottom: 20 }}>
              Bakersfield's Senior Care<br />
              <em style={{ color: "#1a7a6a" }}>Has a Gap. We Fill It.</em>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "#4a4035", marginBottom: 20 }}>
              Families in Bakersfield seeking quality care for seniors aged 60 and older are navigating
              a fragmented and overburdened assisted living landscape. As the local population ages,
              demand for residential care has outpaced the available supply — leaving many families
              in crisis when a loved one requires immediate placement.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "#6B6258", marginBottom: 32 }}>
              There is also a distinct gap in the market for facilities that maintain strong referral
              partnerships with local hospitals and insurance providers — making the transition from
              acute care unnecessarily complex and stressful.
            </p>
            <a href="#about" onClick={e => { e.preventDefault(); smoothScroll("#about"); }} className="btn-primary">
              Our Solution →
            </a>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {problems.map((p, i) => (
              <div key={i} style={{
                background: "white", borderRadius: 16, padding: "24px 28px",
                border: "1px solid #E5DFD5", borderLeft: "4px solid #1a7a6a",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1a2744", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a2744" }}>{p.title}</h3>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "#6B6258", paddingLeft: 40 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── TEAM / FOUNDER ─────────────────────────────────────────────────────── */
function Team() {
  return (
    <section id="team" style={{ background: "#EDE8DF", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-label">The People Behind the Care</span>
          <h2 className="serif" style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, color: "#1a2744", lineHeight: 1.25 }}>
            Meet Our Team
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28 }}>
          {/* Founder card */}
          <div className="card" style={{ overflow: "hidden" }}>
            <img
              src="https://images.unsplash.com/photo-1765896387387-0538bc9f997e?w=600&h=360&fit=crop&auto=format"
              alt="LVN Founder and Administrator"
              style={{ width: "100%", height: 280, objectFit: "cover" }}
            />
            <div style={{ padding: 32 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1a7a6a", marginBottom: 6 }}>
                Founder & Administrator · Licensed LVN
              </div>
              <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#1a2744", marginBottom: 14 }}>
                Our Founder
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "#6B6258", marginBottom: 14 }}>
                Our founder is a <strong>current Licensed Vocational Nurse with over 15 years of medical experience</strong> —
                six years as an LVN and the preceding years as a Medical Assistant specializing in
                geriatric care. This dual background gives her a uniquely deep understanding of the
                aging journey from early support all the way through advanced clinical needs.
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "#6B6258" }}>
                As the sole owner, operator, and licensed administrator, she serves as the on-site LVN
                — bringing hands-on clinical expertise that most residential care homes simply cannot
                offer. Her combination of geriatric medical assistance experience and active nursing
                licensure is the foundation of everything we do.
              </p>
            </div>
          </div>

          {/* Care Team card */}
          <div className="card" style={{ overflow: "hidden" }}>
            <img
              src="https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&h=360&fit=crop&auto=format"
              alt="Compassionate care team"
              style={{ width: "100%", height: 280, objectFit: "cover" }}
            />
            <div style={{ padding: 32 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1a7a6a", marginBottom: 6 }}>
                Compassionate Care Professionals
              </div>
              <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#1a2744", marginBottom: 14 }}>
                Our Care Team
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "#6B6258", marginBottom: 14 }}>
                Our trained caregivers are selected for both their clinical competence and their
                genuine compassion. Our low staff-to-resident ratios ensure each person receives
                <strong> proactive, attentive care</strong> — not reactive care triggered only by crisis.
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "#6B6258" }}>
                From assistance with ADLs to meaningful social engagement, our team builds real
                relationships with each resident — creating the sense of belonging that makes
                United Senior Living feel like home.
              </p>
            </div>
          </div>

          {/* Referral Partners card */}
          <div style={{ background: "#1a2744", borderRadius: 16, padding: 36, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 340 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#a8ddd4", marginBottom: 12 }}>
                Professional Referral Partners
              </div>
              <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "white", marginBottom: 18 }}>
                For Healthcare Professionals
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.65)", marginBottom: 20 }}>
                We maintain active partnerships with hospital discharge planners, insurance case
                managers, and senior care consultants across Bakersfield. Our streamlined intake
                process and LTC insurance coordination make us the preferred referral destination
                during placement crises.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {["Hospital Discharge Planners", "LTC Insurance Agents", "Senior Care Consultants", "Medical Group Partnerships"].map(p => (
                  <li key={p} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1a7a6a", flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a href="#contact" onClick={e => { e.preventDefault(); smoothScroll("#contact"); }}
              style={{ marginTop: 28, display: "inline-block", border: "1px solid rgba(255,255,255,0.3)", color: "white", fontWeight: 600, fontSize: 14, padding: "12px 24px", borderRadius: 50, textDecoration: "none", textAlign: "center" }}
            >
              Refer a Patient →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── GALLERY STRIP ──────────────────────────────────────────────────────── */
function GalleryStrip() {
  const imgs = [
    { src: "https://images.unsplash.com/photo-1781002219196-6627511653a3?w=500&h=350&fit=crop&auto=format", alt: "Senior relaxing outdoors" },
    { src: "https://images.unsplash.com/photo-1758691462321-9b6c98c40f7e?w=500&h=350&fit=crop&auto=format", alt: "Doctor consulting with patient" },
    { src: "https://images.unsplash.com/photo-1554331292-735256644d5f?w=500&h=350&fit=crop&auto=format", alt: "Couple enjoying outdoors" },
    { src: "https://images.unsplash.com/photo-1773227059784-c1e36cc8c8c9?w=500&h=350&fit=crop&auto=format", alt: "Seniors socializing together" },
    { src: "https://images.unsplash.com/photo-1780245993098-6095686947af?w=500&h=350&fit=crop&auto=format", alt: "Cozy comfortable room" },
  ];
  return (
    <div style={{ display: "flex", gap: 0, height: 260, overflow: "hidden" }}>
      {imgs.map((img, i) => (
        <div key={i} style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          <img
            src={img.src}
            alt={img.alt}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s" }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
      ))}
    </div>
  );
}

/* ─── CONTACT ────────────────────────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", type: "family" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch(
      "https://formsubmit.co/ajax/unitedseniorliving@gmail.com",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          inquiry_type: form.type,
          message: form.message,
          _subject: "New United Senior Living Website Inquiry",
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || result.success !== "true" && result.success !== true) {
      throw new Error("Submission failed");
    }

    setSent(true);
  } catch {
    alert(
      "Your message could not be sent. Please try again or email unitedseniorliving@gmail.com directly."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <section id="contact" style={{ background: "#1a2744", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C8943A" }}>
            Get in Touch
          </span>
          <h2 className="serif" style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, color: "white", marginTop: 12 }}>
            We're Here to Help
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, maxWidth: 520, margin: "12px auto 0", lineHeight: 1.7 }}>
            Reach out to schedule a tour, ask questions, or discuss your family's needs.
            We welcome every conversation.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 56, alignItems: "start" }}>
          {/* Left: contact info */}
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 28, marginBottom: 36 }}>
              {[
                { icon: "📞", label: "Call Us", val: "(559) 684‑2981", href: "tel:5596842981", sub: "Available 7 days a week" },
                { icon: "✉", label: "Email Us", val: "unitedseniorliving@gmail.com", href: "mailto:unitedseniorliving@gmail.com", sub: "We respond within 24 hours" },
                { icon: "📍", label: "Our Location", val: "Bakersfield, CA 93306", href: null, sub: "City in the Hills neighborhood" },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(26,122,106,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                    {c.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="serif" style={{ fontSize: 18, fontWeight: 600, color: "white", textDecoration: "none", display: "block", marginBottom: 3 }}>
                        {c.val}
                      </a>
                    ) : (
                      <div className="serif" style={{ fontSize: 18, fontWeight: 600, color: "white", marginBottom: 3 }}>{c.val}</div>
                    )}
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", marginBottom: 14 }}>Follow Us</div>
              <div style={{ display: "flex", gap: 12 }}>
                <a href="https://www.facebook.com/people/United-Senior-Living/61594495821608/" target="_blank" rel="noopener noreferrer"
                  style={{ width: 44, height: 44, borderRadius: "50%", background: "#1877f2", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, textDecoration: "none", transition: "opacity 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >f</a>
                <a href="https://www.instagram.com/united_senior_living" target="_blank" rel="noopener noreferrer"
                  style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(45deg, #f09433,#e6683c,#dc2743,#cc2366,#bc1888)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, textDecoration: "none", transition: "opacity 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >IG</a>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "16px 20px" }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.35)", marginBottom: 6 }}>RCFE License</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)" }}>License Application: Completed ✓</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>License number pending — contact us for details</div>
            </div>
          </div>

          {/* Right: form */}
          {sent ? (
            <div style={{ background: "rgba(26,122,106,0.2)", border: "1px solid rgba(26,122,106,0.4)", borderRadius: 20, padding: 56, textAlign: "center" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>✓</div>
              <h3 className="serif" style={{ fontSize: 28, fontWeight: 700, color: "white", marginBottom: 12 }}>Thank You!</h3>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, lineHeight: 1.7 }}>
                We'll be in touch shortly to answer your questions
                and arrange your visit to United Senior Living.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "40px 36px", display: "flex", flexDirection: "column", gap: 20 }}>
              <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "white", marginBottom: 4 }}>
                Schedule a Tour or Ask a Question
              </h3>

              {/* Inquiry type */}
              <div>
                <label style={labelStyle}>I am a...</label>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {[{ v: "family", l: "Family Member" }, { v: "professional", l: "Healthcare Professional" }, { v: "patient", l: "Prospective Resident" }].map(o => (
                    <label key={o.v} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", background: form.type === o.v ? "rgba(26,122,106,0.4)" : "rgba(255,255,255,0.06)", border: `1px solid ${form.type === o.v ? "#1a7a6a" : "rgba(255,255,255,0.15)"}`, borderRadius: 50, padding: "8px 14px", fontSize: 13, color: "white", transition: "all 0.15s" }}>
                      <input type="radio" name="type" value={o.v} checked={form.type === o.v} onChange={e => setForm({ ...form, type: e.target.value })} style={{ display: "none" }} />
                      {o.l}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <FormField label="Full Name" type="text" placeholder="Your name" value={form.name} onChange={v => setForm({ ...form, name: v })} required />
                <FormField label="Phone Number" type="tel" placeholder="(559) 000-0000" value={form.phone} onChange={v => setForm({ ...form, phone: v })} required />
              </div>
             <FormField
  label="Email Address"
  type="email"
  placeholder="your@email.com"
  value={form.email}
  onChange={v => setForm({ ...form, email: v })}
  required
/>

{/* Privacy notice */}
<p style={{
  fontSize: 12,
  lineHeight: 1.6,
  color: "rgba(255,255,255,0.55)"
}}>
  Please do not include confidential medical, financial, or other sensitive
  personal information in this message.
</p>

<div>
  <label style={labelStyle}>Message</label>
  <textarea
    placeholder="Tell us about your loved one's needs, questions about availability, or anything you'd like to know..."
    rows={5}
    value={form.message}
    onChange={e => setForm({ ...form, message: e.target.value })}
    style={{ ...inputStyle, resize: "none" }}
  />
</div>

<button
  type="submit"
  className="btn-primary"
  style={{
    justifyContent: "center",
    fontSize: 16,
    padding: "16px",
    opacity: loading ? 0.7 : 1,
    transition: "opacity 0.2s"
  }}
  disabled={loading}
>
  {loading ? "Sending..." : "Send Message →"}
</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        style={inputStyle}
      />
    </div>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "#0f1624", padding: "48px 24px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, paddingBottom: 40, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div>
            {/* screen blend makes the dark footer bg disappear, logo colours pop */}
            <div style={{ marginBottom: 14 }}>
              <Logo height={56} blend="screen" />
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.4)", maxWidth: 280 }}>
              A boutique six-bed RCFE in Bakersfield's City in the Hills, delivering
              compassionate, LVN-led care to seniors aged 60 and older.
            </p>
            <div style={{ marginTop: 16, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
              <a href="tel:5596842981" style={{ color: "#a8ddd4", textDecoration: "none", display: "block", marginBottom: 4 }}>(559) 684‑2981</a>
              <a href="mailto:unitedseniorliving@gmail.com" style={{ color: "#a8ddd4", textDecoration: "none" }}>unitedseniorliving@gmail.com</a>
            </div>
          </div>

          {[
            { title: "Navigate", links: NAV },
            { title: "Services", links: [
              { label: "Medication Management", href: "#services" },
              { label: "LVN Care Coordination", href: "#services" },
              { label: "Personal Care (ADLs)", href: "#services" },
              { label: "Activities & Social", href: "#services" },
            ]},
            { title: "Contact", links: [
              { label: "Schedule a Tour", href: "#contact" },
              { label: "Refer a Patient", href: "#contact" },
              { label: "LTC Insurance", href: "#contact" },
              { label: "(559) 684‑2981", href: "tel:5596842981" },
            ]},
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>
                {col.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(l => (
                  <a key={l.label} href={l.href} onClick={l.href.startsWith("#") ? e => { e.preventDefault(); smoothScroll(l.href); } : undefined}
                    style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} United Senior Living Inc. All rights reserved. · Bakersfield, CA 93306
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
            RCFE Licensed · LTC Insurance Accepted · ADA-Compliant Facility
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── RESPONSIVE STYLES ──────────────────────────────────────────────────── */
function ResponsiveStyles() {
  return (
    <style>{`
      @media (max-width: 768px) {
        .hide-mobile { display: none !important; }
        .show-mobile { display: flex !important; }
        section > div[style*="grid-template-columns: 1fr 1fr"] {
          grid-template-columns: 1fr !important;
        }
        section > div[style*="grid-template-columns: 2fr 1fr 1fr 1fr"] {
          grid-template-columns: 1fr 1fr !important;
        }
        section > div[style*="grid-template-columns: 1fr 1.4fr"] {
          grid-template-columns: 1fr !important;
        }
        section > div[style*="grid-template-columns: 1fr auto"] {
          grid-template-columns: 1fr !important;
        }
      }
      @media (min-width: 769px) {
        .show-mobile { display: none !important; }
      }
      * { margin: 0; padding: 0; }
      a { cursor: pointer; }
      input:focus, textarea:focus { border-color: rgba(26,122,106,0.6) !important; box-shadow: 0 0 0 3px rgba(26,122,106,0.15); }
      input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.3); }
    `}</style>
  );
}

/* ─── APP ────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <ResponsiveStyles />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <WhyUs />
        <Services />
        <AmenitiesSpace />
        <WhoWeServe />
        <ProblemSection />
        <SignsSection />
        <OurHome />
        <InsuranceBanner />
        <GalleryStrip />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
