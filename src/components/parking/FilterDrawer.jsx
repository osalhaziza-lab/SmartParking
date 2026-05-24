import { useState } from "react";
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

export default function FilterDrawer({ open, onClose, filters, setFilters }) {
  const [local, setLocal] = useState({ ...filters });
  const toggle = (k) => setLocal((f) => ({ ...f, [k]: !f[k] }));

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          zIndex: 300,
        }}
      />

      {/* Bottom sheet */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 310,
          background: "#fff",
          borderRadius: "20px 20px 0 0",
          padding: "20px 20px 36px",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
          maxHeight: "88vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 18,
              color: C.navy,
            }}
          >
            Filtres
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 22,
              cursor: "pointer",
              color: C.grayText,
            }}
          >
            ✕
          </button>
        </div>

        {/* Price range */}
        <div
          style={{
            fontWeight: 600,
            fontSize: 14,
            color: C.navy,
            marginBottom: 8,
          }}
        >
          Prix par heure
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            color: C.grayText,
            marginBottom: 6,
          }}
        >
          <span>0€</span>
          <span style={{ color: C.teal, fontWeight: 600 }}>
            0€ – {local.maxPrice}€
          </span>
          <span>10€</span>
        </div>
        <input
          type="range"
          min={0}
          max={10}
          step={0.5}
          value={local.maxPrice}
          onChange={(e) => setLocal((f) => ({ ...f, maxPrice: +e.target.value }))}
          style={{ width: "100%", marginBottom: 20 }}
        />

        {/* Distance */}
        <div
          style={{
            fontWeight: 600,
            fontSize: 14,
            color: C.navy,
            marginBottom: 10,
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
              gap: 10,
              marginBottom: 10,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={!!local[k]}
              onChange={() => toggle(k)}
              style={{ accentColor: C.teal, width: 16, height: 16 }}
            />{" "}
            {l}
          </label>
        ))}

        {/* Equipment */}
        <div
          style={{
            fontWeight: 600,
            fontSize: 14,
            color: C.navy,
            margin: "16px 0 10px",
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
              gap: 10,
              marginBottom: 10,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={!!local[k]}
              onChange={() => toggle(k)}
              style={{ accentColor: C.teal, width: 16, height: 16 }}
            />{" "}
            {l}
          </label>
        ))}

        <button
          onClick={() => {
            setFilters(local);
            onClose();
          }}
          style={{
            width: "100%",
            background: C.navy,
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: 15,
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            marginTop: 8,
          }}
        >
          Appliquer les filtres
        </button>
      </div>
    </>
  );
}
