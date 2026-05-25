import { C } from "../../constants/colors";

const QUICK_LINKS = [
  "Accueil",
  "Rechercher un parking",
  "Mes réservations",
  "Comment ça marche",
  "Devenir partenaire",
];

const SUPPORT_LINKS = [
  "Centre d'aide",
  "FAQ",
  "Conditions d'utilisation",
  "Politique de confidentialité",
  "Politique de remboursement",
];

const CONTACT_INFO = [
  ["📍", "15 Avenue des Champs-Élysées, 75008 Paris"],
  ["📞", "+33 1 23 45 67 89"],
  ["✉️", "contact@smartparking.fr"],
];

export default function Footer() {
  return (
    <footer
      style={{
        background: C.navy,
        color: "rgba(255,255,255,0.72)",
        padding: "40px 20px 28px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 28,
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                background: C.teal,
                color: "#fff",
                fontWeight: 800,
                fontSize: 18,
                width: 34,
                height: 34,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Syne', sans-serif",
              }}
            >
              P
            </div>
            <span
              style={{
                color: "#fff",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              SmartParking
            </span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7 }}>
            La solution intelligente pour trouver et réserver votre place de
            parking en temps réel.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            {["f", "𝕏", "📸", "in"].map((ic, i) => (
              <div
                key={i}
                style={{
                  width: 32,
                  height: 32,
                  background: "rgba(255,255,255,0.10)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                {ic}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div
            style={{
              color: "#fff",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              marginBottom: 14,
            }}
          >
            Liens Rapides
          </div>
          {QUICK_LINKS.map((l) => (
            <div
              key={l}
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.65)",
                marginBottom: 8,
                cursor: "pointer",
              }}
            >
              {l}
            </div>
          ))}
        </div>

        {/* Support */}
        <div>
          <div
            style={{
              color: "#fff",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              marginBottom: 14,
            }}
          >
            Support
          </div>
          {SUPPORT_LINKS.map((l) => (
            <div
              key={l}
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.65)",
                marginBottom: 8,
                cursor: "pointer",
              }}
            >
              {l}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div
            style={{
              color: "#fff",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              marginBottom: 14,
            }}
          >
            Contact
          </div>
          {CONTACT_INFO.map(([ic, txt]) => (
            <div
              key={txt}
              style={{
                display: "flex",
                gap: 8,
                alignItems: "flex-start",
                fontSize: 13,
                marginBottom: 10,
              }}
            >
              <span style={{ color: C.teal, flexShrink: 0 }}>{ic}</span>
              <span>{txt}</span>
            </div>
          ))}
          <button
            style={{
              marginTop: 10,
              width: "100%",
              background: C.teal,
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "11px 0",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            📱 Téléchargez l'application
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1100,
          margin: "24px auto 0",
          borderTop: "1px solid rgba(255,255,255,0.10)",
          paddingTop: 18,
          fontSize: 12,
          color: "rgba(255,255,255,0.38)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span>© 2025 SmartPark. Tous droits réservés.</span>
        <span>Made with ❤️ in Paris</span>
      </div>
    </footer>
  );
}
