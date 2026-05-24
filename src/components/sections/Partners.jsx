import { C } from "../../constants/colors";
import { PARTNERS } from "../../constants/data";

export default function Partners() {
  return (
    <div
      style={{
        background: "#fff",
        padding: "44px 20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: 20,
          color: C.navy,
          marginBottom: 28,
        }}
      >
        Nos Partenaires de Confiance
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        {PARTNERS.map((p) => (
          <div
          >
           <img src={p.logo} width={70} height={70} ></img>
          </div>
        ))}
      </div>
    </div>
  );
}
