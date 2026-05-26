import { useState } from "react";
import { C } from "../../constants/colors";
import logoApp from '../../assets/logo.png';

export default function Navbar({ onProfileClick }) {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <nav style={{ background: C.navy, position: "sticky", top: 0, zIndex: 200, boxShadow: "0 2px 16px rgba(0,0,0,0.22)" }}>

      {/* ── Barre principale ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", height: 56 }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={logoApp} alt="Logo" style={{ width: 60, height: 45 }} />
          <span style={{ color: "#ffffff", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18 }}>SmartParking</span>
        </div>

        {/* Actions droite */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>

          {/* Bouton loupe — mobile seulement */}
          <button
            className="sp-mobile"
            onClick={() => setSearchOpen(o => !o)}
            style={{
              background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 10,
              width: 44, height: 44, color: "#fff", fontSize: 18, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
            aria-label="Rechercher"
          >🔍</button>

          {/* Barre de recherche desktop */}
          <div className="sp-desktop" style={{
            display: "flex", alignItems: "center", background: "#fff",
            borderRadius: 24, padding: "0 14px", height: 36, gap: 8, width: 340,
          }}>
            <span style={{ color: C.grayText, fontSize: 14 }}>📍</span>
            <input style={{ border: "none", outline: "none", fontSize: 14, width: "100%", fontFamily: "'DM Sans', sans-serif", color: C.navy }} defaultValue="Casablanca" />
            <button style={{ background: C.teal, color: "#fff", border: "none", borderRadius: 20, padding: "5px 14px", fontSize: 13, cursor: "pointer", fontWeight: 2, whiteSpace: "nowrap" }}>Chercher</button>
          </div>

          {/* Avatar profil */}
          <button onClick={onProfileClick} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: 0, minHeight: 44 }} aria-label="Mon compte">
            <span className="sp-desktop" style={{ color: "#fff", fontSize: 14 }}>Mon Compte</span>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: C.teal, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>👤</div>
          </button>
        </div>
      </div>

      {/* ── Barre de recherche mobile dépliable ── */}
      {searchOpen && (
        <div style={{ padding: "0 16px 12px", display: "flex", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", background: "#fff", borderRadius: 12, padding: "0 14px", height: 44, gap: 8, flex: 1 }}>
            <span style={{ color: C.grayText }}>📍</span>
            <input autoFocus placeholder="Casablanca" style={{ border: "none", outline: "none", fontSize: 15, width: "100%", fontFamily: "'DM Sans', sans-serif", color: C.navy }} />
          </div>
          <button style={{ background: C.teal, color: "#fff", border: "none", borderRadius: 12, padding: "0 18px", fontSize: 14, fontWeight: 600, cursor: "pointer", minHeight: 44 }}>OK</button>
        </div>
      )}
    </nav>
  );
}