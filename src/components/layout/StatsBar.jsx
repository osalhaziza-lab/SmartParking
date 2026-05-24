const STATS = [
  { val: "+120", label: "Parkings disponibles" },
  { val: "98%",  label: "Satisfaction" },
  { val: "3min", label: "Réservation" },
];

export default function StatsBar() {
  return (
    <div
      style={{
        background: "linear-gradient(90deg, #0d2a4a 0%, #00897b 100%)",
        display: "flex",
      }}
    >
      {STATS.map((s, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            textAlign: "center",
            padding: "12px 4px",
            borderRight:
              i < STATS.length - 1
                ? "1px solid rgba(255,255,255,0.15)"
                : "none",
          }}
        >
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(16px,4vw,22px)",
              color: "#fff",
            }}
          >
            {s.val}
          </div>
          <div
            style={{
              fontSize: "clamp(10px,2.5vw,12px)",
              color: "rgba(255,255,255,0.7)",
              marginTop: 2,
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
