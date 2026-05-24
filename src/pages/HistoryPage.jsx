import { C } from "../constants/colors";
import { HISTORY_DATA, inputStyle } from "../constants/data";

function getStatusStyle(status) {
  switch (status) {
    case "Confirmée": return { background: "#e1f5fe", color: "#0288d1" };
    case "Terminée":  return { background: "#e8f5e9", color: "#2e7d32" };
    case "Annulée":   return { background: "#ffebee", color: "#c62828" };
    default:          return { background: "#f5f5f5", color: "#616161" };
  }
}

export default function HistoryPage({ onNavigate }) {
  return (
    <div
      style={{
        padding: "30px 20px",
        maxWidth: 900,
        margin: "0 auto",
        minHeight: "70vh",
      }}
    >
      <button
        onClick={() => onNavigate("profile")}
        style={{
          background: "none",
          border: "none",
          color: C.teal,
          cursor: "pointer",
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        ← Profil
      </button>

      <h1
        style={{
          fontFamily: "Syne",
          color: C.navy,
          marginBottom: 20,
        }}
      >
        Mon Historique
      </h1>

      {/* Filter bar — scroll horizontal sur mobile */}
      <div style={{
        display: "flex",
        gap: 10,
        marginBottom: 20,
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        paddingBottom: 4,          /* évite de couper les ombres */
        scrollbarWidth: "none",    /* Firefox: masque la scrollbar */
      }}>
        <input type="date" style={{ ...inputStyle, minWidth: 150, flex: "0 0 auto" }} />
        <select style={{ ...inputStyle, minWidth: 160, flex: "0 0 auto" }}>
          <option value="">Tous les statuts</option>
          <option value="Confirmée">Confirmée</option>
          <option value="Terminée">Terminée</option>
        </select>
        <input type="text" placeholder="Parking..." style={{ ...inputStyle, minWidth: 160, flex: "0 0 auto" }} />
      </div>

      {/* Reservations list */}
      <div style={{ display: "grid", gap: 15 }}>
        {HISTORY_DATA.map((res) => (
          <div
            key={res.id}
            className="card"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: 12, color: C.grayText }}>
                #{res.id} • {res.date}
              </div>
              <div style={{ fontWeight: 700, color: C.navy }}>
                {res.parking}
              </div>
              <span
                style={{
                  ...getStatusStyle(res.status),
                  padding: "4px 8px",
                  borderRadius: 20,
                  fontSize: 10,
                  fontWeight: 800,
                  marginTop: 5,
                  display: "inline-block",
                }}
              >
                {res.status.toUpperCase()}
              </span>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 800, color: C.navy }}>
                {res.price} €
              </div>
              <button
                onClick={() => alert("PDF généré")}
                className="btn-outline"
                style={{ marginTop: 8 }}
              >
                📥 Reçu PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}