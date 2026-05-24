import { C } from "../../constants/colors";


export default function ParkingCard({ p, onReserve }) {
  const urgency = p.available / p.total < 0.15;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        marginBottom: 14,
        boxShadow: "0 4px 24px rgba(13,31,60,0.10)",
        overflow: "hidden",
      }}
    >
      {/* Photo banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a3a60 0%, #00897b 100%)",
          height: 110,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {p.badge === "top" && (
          <span
            style={{
              position: "absolute",
              top: 10,
              left: 12,
              background: "#00897b",
              color: "#fff",
              borderRadius: 20,
              padding: "3px 12px",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            Top noté
          </span>
        )}
        {p.badge === "limited" && (
          <span
            style={{
              position: "absolute",
              top: 10,
              left: 12,
              background: C.red,
              color: "#fff",
              borderRadius: 20,
              padding: "3px 12px",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            Places limitées
          </span>
        )}
       <img src={p.photo} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 12,
            background: "rgba(255,255,255,0.95)",
            borderRadius: 10,
            padding: "4px 10px",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span style={{ color: C.yellow, fontSize: 13 }}>⭐</span>
          <span style={{ fontWeight: 700, fontSize: 13, color: C.navy }}>
            {p.rating}
          </span>
          <span style={{ fontSize: 11, color: C.grayText }}>({p.reviews})</span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "14px 16px 16px" }}>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            color: C.navy,
            marginBottom: 4,
          }}
        >
          {p.name}
        </div>
        <div style={{ fontSize: 13, color: C.grayText, marginBottom: 2 }}>
          📍 {p.address}
        </div>
        <div style={{ fontSize: 13, color: C.grayText, marginBottom: 10 }}>
          ⬆️ {p.distance} km de votre position
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          {p.tags.map((t) => (
            <span
              key={t}
              style={{
                background: "#eef2f7",
                color: C.navy,
                borderRadius: 6,
                padding: "3px 10px",
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: urgency ? C.orange : C.green,
                  display: "inline-block",
                  boxShadow: `0 0 0 3px ${
                    urgency
                      ? "rgba(255,112,67,0.25)"
                      : "rgba(29,185,84,0.25)"
                  }`,
                }}
              />
              <span style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>
                {p.available} places dispo
              </span>
            </div>
            <div style={{ fontSize: 12, color: C.grayText, marginLeft: 14 }}>
              sur {p.total}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: C.grayText }}>À partir de</div>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 22,
                color: C.navy,
              }}
            >
              {p.price}€
              <span style={{ fontSize: 13, fontWeight: 400, color: C.grayText }}>
                /h
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onReserve(p)}
          style={{
            width: "100%",
            background: C.green,
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "14px 0",   /* ≥44px de hauteur totale */
            fontSize: 15,        /* un peu plus grand sur mobile */
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            marginTop: 12,
            minHeight: 44,
          }}
        >
          Réserver →
        </button>
      </div>
    </div>
  );
}