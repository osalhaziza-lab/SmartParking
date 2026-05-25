import { useState } from "react";
import { C } from "../constants/colors";
import { PARKINGS } from "../constants/data";

import StatsBar      from "../components/layout/StatsBar";
import { useNavigate } from "react-router-dom"; 
import Hero          from "../components/sections/Hero";
import Partners      from "../components/sections/Partners";
import ParkingCard   from "../components/parking/ParkingCard";
import DesktopSidebar from "../components/parking/DesktopSidebar";
import FilterDrawer  from "../components/parking/FilterDrawer";
import logoApp from '../assets/logo.png';


export default function HomePage() {
  const navigate = useNavigate();

  const [filterOpen, setFilterOpen]       = useState(false);
  const [visibleCount, setVisibleCount]   = useState(3);
  const [filters, setFilters] = useState({
    maxPrice: 5,
    dist500: true,
    dist1k: true,
    dist2k: false,
    covered: true,
    secure: false,
    electric: false,
    cctv: false,
  });

  const filtered = PARKINGS.filter((p) => p.price <= filters.maxPrice);
  const visible  = filtered.slice(0, visibleCount);
  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <>
      <StatsBar />
      <Hero />

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "20px 14px 32px",
        }}
      >
        {/* Section header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 20,
              color: C.navy,
            }}
          >
            Casablanca: {filtered.length} parkings
          </div>
          <button
            className="sp-mobile"
            onClick={() => setFilterOpen(true)}
            style={{
              background: "#fff",
              border: `1.5px solid ${C.grayMid}`,
              borderRadius: 10,
              padding: "9px 14px",
            }}
          >
            ⚙️ Filtres{" "}
            {activeCount > 0 && <span>({activeCount})</span>}
          </button>
        </div>

        {/* Main layout */}
        <div style={{ display: "flex", gap: 20 }}>
          <DesktopSidebar filters={filters} setFilters={setFilters} />
          <div style={{ flex: 1 }}>
            {visible.map((p) => (
              <ParkingCard
                key={p.id}
                p={p}
                onReserve={(parking) => navigate(`/parking/${parking.id}`)} 
              />
            ))}
          </div>
        </div>
      </div>

      <Partners />

      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />

     
    </>
  );
}
