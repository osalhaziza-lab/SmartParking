import { useState } from "react";

import Navbar      from "./components/layout/Navbar";
import Footer      from "./components/layout/Footer";
import HomePage    from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import HistoryPage from "./pages/HistoryPage";

export default function App() {
  const [view, setView] = useState("home"); // 'home' | 'profile' | 'history'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #f4f6f9; }
        .card {
          background: #fff;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          border: 1px solid #e0e4ea;
        }
        .btn-outline {
          background: transparent;
          border: 1px solid #00897b;
          color: #00897b;
          padding: 8px 12px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
        }
        /* ── Mobile-first: les styles ci-dessous sont pour mobile par défaut ── */
        .sp-mobile  { display: flex !important; }
        .sp-desktop { display: none !important; }

        /* ── Desktop: on réactive ce qui était caché ── */
        @media (min-width: 640px) {
          .sp-mobile  { display: none !important; }
          .sp-desktop { display: flex !important; }
        }

        /* ── Touch targets : tous les boutons font au moins 44px ── */
        button, [role="button"] { min-height: 44px; }

        /* ── Safe area pour iPhone avec barre d'accueil ── */
        .modal-sheet {
          padding-bottom: max(36px, env(safe-area-inset-bottom));
        }
      `}</style>

      <Navbar onProfileClick={() => setView("profile")} />

      {view === "home"    && <HomePage />}
      {view === "profile" && <ProfilePage  onNavigate={setView} />}
      {view === "history" && <HistoryPage  onNavigate={setView} />}

      <Footer />
    </>
  );
}