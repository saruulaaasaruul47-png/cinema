import { useState } from "react";

const RED = "#E50914";

/* ── Badge ─────────────────────────────────────────────── */
const BADGE_VARIANTS = {
  default:    { background:"rgba(255,255,255,0.06)", color:"#aaa",   border:"1px solid rgba(255,255,255,0.1)" },
  red:        { background:RED,                       color:"#fff" },
  redOutline: { background:"rgba(229,9,20,0.1)",      color:RED,    border:"1px solid rgba(229,9,20,0.3)" },
  amber:      { background:"rgba(245,158,11,0.12)",   color:"#f59e0b", border:"1px solid rgba(245,158,11,0.25)" },
  green:      { background:"rgba(34,197,94,0.1)",     color:"#22c55e", border:"1px solid rgba(34,197,94,0.2)" },
  ghost:      { background:"rgba(255,255,255,0.04)",  color:"#777",  border:"1px solid rgba(255,255,255,0.08)" },
};
export function Badge({ children, variant = "default", style: s }) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"3px 10px",
      borderRadius:999, fontSize:11, fontWeight:600, letterSpacing:.4,
      ...BADGE_VARIANTS[variant], ...s }}>
      {children}
    </span>
  );
}

/* ── Button ─────────────────────────────────────────────── */
const BTN_VARIANTS = {
  primary:  { background:RED,                             color:"#fff", boxShadow:`0 0 18px rgba(229,9,20,0.3)` },
  secondary:{ background:"rgba(255,255,255,0.07)",        color:"#ddd", border:"1px solid rgba(255,255,255,0.12)" },
  ghost:    { background:"transparent",                   color:"#888", border:"1px solid rgba(255,255,255,0.1)" },
  outline:  { background:"transparent",                   color:RED,   border:`1px solid rgba(229,9,20,0.4)` },
  danger:   { background:"rgba(229,9,20,0.15)",           color:RED,   border:`1px solid rgba(229,9,20,0.3)` },
};
const BTN_SIZES = {
  sm: { padding:"6px 14px", fontSize:12 },
  md: { padding:"10px 20px", fontSize:13 },
  lg: { padding:"13px 28px", fontSize:15 },
};
export function Btn({ children, variant="primary", size="md", onClick, disabled, style:s, type="button" }) {
  const [hov, setHov] = useState(false);
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:6,
        borderRadius:10, fontWeight:600, transition:"all .2s", cursor:"pointer", fontFamily:"inherit",
        ...BTN_SIZES[size], ...BTN_VARIANTS[variant],
        opacity: disabled ? .4 : 1,
        filter: hov && !disabled ? "brightness(1.15)" : "none",
        ...s }}>
      {children}
    </button>
  );
}

/* ── Input ─────────────────────────────────────────────── */
export function Input({ placeholder, value, onChange, icon, type="text", name, label }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      {label && <p style={{ color:"#888", fontSize:11, textTransform:"uppercase", letterSpacing:1.5, marginBottom:6 }}>{label}</p>}
      <div style={{ position:"relative" }}>
        {icon && <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"#555", fontSize:14 }}>{icon}</span>}
        <input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ width:"100%", padding: icon ? "11px 14px 11px 38px" : "11px 14px",
            background:"#161616", borderRadius:10, color:"#f5f5f5", fontSize:13, outline:"none",
            border: `1px solid ${focused ? "rgba(229,9,20,0.5)" : "rgba(255,255,255,0.08)"}`,
            transition:"border .2s", fontFamily:"inherit" }}
        />
      </div>
    </div>
  );
}

/* ── Spinner ─────────────────────────────────────────────── */
export function Spinner({ size=32 }) {
  return (
    <div style={{ width:size, height:size, border:`2px solid rgba(255,255,255,0.08)`,
      borderTopColor:RED, borderRadius:"50%", animation:"spin .8s linear infinite" }} />
  );
}

/* ── Tag (genre pill) ─────────────────────────────────────── */
export function Tag({ children }) {
  return (
    <span style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)",
      color:"#bbb", fontSize:11, padding:"3px 10px", borderRadius:999 }}>
      {children}
    </span>
  );
}

/* ── Skeleton ────────────────────────────────────────────── */
export function Skeleton({ w="100%", h=20, r=8 }) {
  return (
    <div style={{ width:w, height:h, borderRadius:r,
      background:"linear-gradient(90deg,#1a1a1a 25%,#252525 50%,#1a1a1a 75%)",
      backgroundSize:"200% 100%", animation:"shimmer 1.8s linear infinite" }} />
  );
}

/* ── Divider ─────────────────────────────────────────────── */
export function Divider({ label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, margin:"12px 0" }}>
      <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.07)" }} />
      {label && <span style={{ color:"#555", fontSize:11 }}>{label}</span>}
      <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.07)" }} />
    </div>
  );
}

/* ── StarRating ──────────────────────────────────────────── */
export function StarRating({ rating }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:5,
      background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.2)",
      padding:"3px 10px", borderRadius:999 }}>
      <span style={{ color:"#f59e0b", fontSize:11 }}>★</span>
      <span style={{ color:"#f59e0b", fontSize:12, fontWeight:700 }}>{rating}</span>
    </div>
  );
}

/* ── Select ──────────────────────────────────────────────── */
export function Select({ value, onChange, options, label }) {
  return (
    <div>
      {label && <p style={{ color:"#888", fontSize:11, textTransform:"uppercase", letterSpacing:1.5, marginBottom:6 }}>{label}</p>}
      <select value={value} onChange={onChange}
        style={{ padding:"11px 14px", background:"#161616", border:"1px solid rgba(255,255,255,0.08)",
          borderRadius:10, color:"#f5f5f5", fontSize:13, cursor:"pointer", fontFamily:"inherit", outline:"none",
          width:"100%", transition:"border .2s" }}
        onFocus={e => e.target.style.borderColor="rgba(229,9,20,0.5)"}
        onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.08)"}
      >
        {options.map(o => (
          <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
        ))}
      </select>
    </div>
  );
}

/* ── EmptyState ──────────────────────────────────────────── */
export function EmptyState({ icon="🎬", title="Мэдээлэл байхгүй", subtitle, action, onAction }) {
  return (
    <div style={{ textAlign:"center", padding:"80px 20px" }}>
      <p style={{ fontSize:48, marginBottom:12 }}>{icon}</p>
      <p style={{ color:"#fff", fontSize:18, fontWeight:600, marginBottom:6 }}>{title}</p>
      {subtitle && <p style={{ color:"#555", fontSize:13, marginBottom:action ? 20 : 0 }}>{subtitle}</p>}
      {action && onAction && <Btn onClick={onAction}>{action}</Btn>}
    </div>
  );
}
