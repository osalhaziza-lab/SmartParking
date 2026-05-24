import { C } from "../../constants/colors";

const DISTANCE_OPTIONS = [
  ["dist500", "Moins de 500m"],
  ["dist1k",  "Moins de 1km"],
  ["dist2k",  "Moins de 2km"],
];

const EQUIPMENT_OPTIONS = [
  ["covered",  "Parking couvert"],
  ["secure",   "Sécurisé 24/7"],
  ["electric", "Bornes électriques"],
  ["cctv",     "Vidéosurveillance"],
];

export default function DesktopSidebar({ filters, setFilters }) {
  return (
    <div
      className="sp-desktop"
      style={{
        width: 270,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {/* Map widget */}
      <div
        style={{
          background: C.navy,
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(13,31,60,0.12)",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #e8edf4 0%, #d4dce8 100%)",
            height: 150,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: 36, color: C.teal }}>🧭</div>
          <div
            style={{
              fontSize: 13,
              color: C.grayText,
              fontWeight: 500,
              marginTop: 6,
            }}
          >
            Carte interactive
          </div>
          <div style={{ fontSize: 11, color: C.grayText }}>
            120 parkings disponibles
          </div>
        </div>
        <button
          style={{
            width: "100%",
            background: C.navy,
            color: "#fff",
            border: "none",
            padding: 13,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Voir sur la carte
        </button>
      </div>

      {/* Filters panel */}
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          padding: "18px 18px 16px",
          boxShadow: "0 4px 20px rgba(13,31,60,0.08)",
        }}
      >
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            color: C.navy,
            marginBottom: 16,
          }}
        >
          Filtres
        </div>

        {/* Price range */}
        <div
          style={{ fontWeight: 600, fontSize: 13, color: C.navy, marginBottom: 8 }}
        >
          Prix par heure
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            color: C.grayText,
            marginBottom: 4,
          }}
        >
          <span>0€</span>
          <span style={{ color: C.teal, fontWeight: 600 }}>
            0 – {filters.maxPrice}€
          </span>
          <span>10€</span>
        </div>
        <input
          type="range"
          min={0}
          max={10}
          step={0.5}
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((f) => ({ ...f, maxPrice: +e.target.value }))
          }
          style={{ width: "100%", marginBottom: 16 }}
        />

        {/* Distance */}
        <div
          style={{
            fontWeight: 600,
            fontSize: 13,
            color: C.navy,
            marginBottom: 8,
          }}
        >
          Distance
        </div>
        {DISTANCE_OPTIONS.map(([k, l]) => (
          <label
            key={k}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={!!filters[k]}
              onChange={() => setFilters((f) => ({ ...f, [k]: !f[k] }))}
              style={{ accentColor: C.teal }}
            />{" "}
            {l}
          </label>
        ))}

        {/* Equipment */}
        <div
          style={{
            fontWeight: 600,
            fontSize: 13,
            color: C.navy,
            margin: "12px 0 8px",
          }}
        >
          Équipements
        </div>
        {EQUIPMENT_OPTIONS.map(([k, l]) => (
          <label
            key={k}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={!!filters[k]}
              onChange={() => setFilters((f) => ({ ...f, [k]: !f[k] }))}
              style={{ accentColor: C.teal }}
            />{" "}
            {l}
          </label>
        ))}

        <button
          style={{
            width: "100%",
            background: C.navy,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: 11,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            marginTop: 8,
          }}
        >
          Appliquer les filtres
        </button>
      </div>
    </div>
  );
}
