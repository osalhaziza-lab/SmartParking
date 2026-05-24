import { C } from "../constants/colors";
import { inputStyle } from "../constants/data";

export default function ProfilePage({ onNavigate }) {
  return (
    <div
      style={{
        padding: "30px 20px",
        maxWidth: 800,
        margin: "0 auto",
        minHeight: "70vh",
      }}
    >
      <button
        onClick={() => onNavigate("home")}
        style={{
          background: "none",
          border: "none",
          color: C.teal,
          cursor: "pointer",
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        ← Accueil
      </button>

      <h1
        style={{
          fontFamily: "Syne",
          color: C.navy,
          fontSize: 28,
          marginBottom: 24,
        }}
      >
        Mon Profil
      </h1>

      {/* Personal info card */}
      <div
        className="card"
        style={{ marginBottom: 20 }}
      >
        <h3 style={{ marginBottom: 16, fontSize: 16, color: C.navy }}>
          Informations personnelles
        </h3>
        <div style={{ display: "grid", gap: 12 }}>
          <input
            type="text"
            defaultValue="Jean Dupont"
            style={inputStyle}
          />
          <input
            type="email"
            defaultValue="jean.dupont@email.com"
            style={inputStyle}
          />
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "grid", gap: 15 }}>
        <div
          onClick={() => onNavigate("history")}
          className="card"
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: 700, color: C.navy }}>
            📜 Historique des réservations
          </div>
          <span style={{ color: C.teal }}>→</span>
        </div>

        <button
          onClick={() => onNavigate("home")}
          style={{
            background: "#fee2e2",
            color: "#ef4444",
            border: "none",
            padding: 16,
            borderRadius: 12,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
