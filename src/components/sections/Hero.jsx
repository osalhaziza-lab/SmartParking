import { useState } from "react";
import { C } from "../../constants/colors";

const FIELDS = [
  { icon: "📍", ph: "Destination",   defaultVal: "Casablanca Centre" },
  { icon: "📅", ph: "Date d'arrivée", defaultVal: "Aujourd'hui" },
  { icon: "🕐", ph: "Heure",          defaultVal: "14:00" },
];

export default function Hero() {
  const [values, setValues] = useState(
    FIELDS.reduce((acc, f) => ({ ...acc, [f.ph]: f.defaultVal }), {})
  );

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #0d1f3c 0%, #0d3a5c 60%, #0d2a4a 100%)",
        padding: "clamp(28px,6vw,54px) 16px clamp(24px,5vw,48px)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 70% 40%, rgba(0,229,204,0.10) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(0,137,123,0.14) 0%, transparent 50%)",
        }}
      />

      <h1
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(20px,5.5vw,36px)",
          color: "#fff",
          fontWeight: 800,
          marginBottom: 10,
          position: "relative",
          lineHeight: 1.25,
        }}
      >
        Trouvez votre parking
        <br />
        en temps réel
      </h1>

      <p
        style={{
          color: "rgba(255,255,255,0.7)",
          fontSize: "clamp(13px,3vw,15px)",
          marginBottom: 28,
          position: "relative",
        }}
      >
        Plus de 120 parkings disponibles près de vous
      </p>

      {/* Search card */}
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          padding:
            "clamp(16px,4vw,28px) clamp(14px,4vw,24px) clamp(14px,4vw,22px)",
          maxWidth: 720,
          margin: "0 auto",
          boxShadow: "0 8px 40px rgba(0,0,0,0.22)",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: 14,
          }}
        >
          {FIELDS.map((f) => (
            <div
              key={f.ph}
              style={{
                border: `1.5px solid ${C.grayMid}`,
                borderRadius: 12,
                padding: "11px 14px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 16 }}>{f.icon}</span>
              <input
                value={values[f.ph]}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [f.ph]: e.target.value }))
                }
                placeholder={f.ph}
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: 14,
                  color: C.navy,
                  width: "100%",
                  fontFamily: "'DM Sans', sans-serif",
                  background: "transparent",
                }}
              />
            </div>
          ))}
        </div>

        <button
          style={{
            width: "100%",
            background: C.green,
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: 15,
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Rechercher des parkings disponibles
        </button>
      </div>
    </div>
  );
}
