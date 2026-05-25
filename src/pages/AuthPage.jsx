import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthPage.css';
import logoApp from '../assets/logo.png';

const ParkingSpot = ({ count, label, variant }) => (
  <div className={`spot spot--${variant}`}>
    <span className="spot__count">{count}</span>
    <span className="spot__label">{label}</span>
  </div>
);

const StatItem = ({ value, label }) => (
  <div className="stat">
    <span className="stat__value">{value}</span>
    <span className="stat__label">{label}</span>
  </div>
);

const AuthPage = ({ onSuccess }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess();        // active la HomePage 
    navigate('/home');  // change l'URL pour que surMaPage = false
  };

  return (
    <div className="auth-container">

      {/* ── Bannière Desktop ── */}
      <aside className="banner" aria-hidden="true">
        <div className="banner__inner">

          <div className="banner__content">
            <span className="live-badge">
              <span className="live-badge__dot" />
              Casablanca · Live
            </span>

            <h1 className="banner__title">
              Stationnez<br />plus malin.
            </h1>

            <p className="banner__sub">
              SmartParking connecte conducteurs et parkings en temps réel
              à Casablanca. Réservez, payez, accédez.
            </p>

            <div className="banner__stats">
              <StatItem value="142" label="places disponibles" />
              <StatItem value="18"  label="parkings actifs" />
              <StatItem value="4.8★" label="note moyenne" />
            </div>
          </div>

          <div className="banner__map-card">
            <div className="map-preview">
              <svg width="100%" height="100%" viewBox="0 0 300 120">
                <rect width="300" height="120" fill="rgba(24,95,165,.08)" />
                {[40, 80].map(y => (
                  <line key={y} x1="0" y1={y} x2="300" y2={y}
                    stroke="#185FA5" strokeWidth=".5" opacity=".25" />
                ))}
                {[75, 150, 225].map(x => (
                  <line key={x} x1={x} y1="0" x2={x} y2="120"
                    stroke="#185FA5" strokeWidth=".5" opacity=".25" />
                ))}
                <rect x="45"  y="22" width="50" height="22" rx="3" fill="#185FA5" opacity=".28" />
                <rect x="120" y="48" width="65" height="26" rx="3" fill="#185FA5" opacity=".22" />
                <rect x="200" y="18" width="45" height="20" rx="3" fill="#185FA5" opacity=".28" />
                <circle cx="150" cy="60" r="15" fill="rgba(4,44,83,.25)" />
                <circle cx="150" cy="60" r="9"  fill="#042C53" />
                <path d="M147 60L150 53L153 60L150 63Z" fill="white" />
                <circle cx="150" cy="60" r="3"  fill="#1D9E75" />
                <circle cx="85"  cy="35" r="5"  fill="rgba(29,158,117,.5)" />
                <circle cx="225" cy="65" r="5"  fill="rgba(29,158,117,.35)" />
              </svg>
            </div>

            <div className="spots-row">
              <ParkingSpot count="18" label="Maarif"   variant="free" />
              <ParkingSpot count="24" label="Gauthier" variant="free" />
              <ParkingSpot count="2"  label="Racine"   variant="busy" />
            </div>
          </div>

        </div>
      </aside>

      {/* ── Formulaire Connexion ── */}
      <main className="form-side">
        <div className="auth-card">

          <div className="auth-card__logo">
            <img src={logoApp} alt="SmartParking" />
          </div>

          <div className="auth-tabs" role="tablist">
            <button
              role="tab"
              aria-selected="true"
              className="auth-tab auth-tab--active"
            >
              Connexion
            </button>
            <button
              role="tab"
              aria-selected="false"
              className="auth-tab"
              onClick={() => navigate('/signup')}
            >
              Inscription
            </button>
          </div>

          <h2 className="auth-card__title">Bon retour !</h2>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="votre@email.com" autoComplete="email" />
            </div>

            <div className="field">
              <label htmlFor="password">Mot de passe</label>
              <input id="password" type="password" placeholder="••••••••" autoComplete="current-password" />
            </div>

            <button type="submit" className="btn-primary">
              Se connecter
            </button>
          </form>

          <div className="divider"><span>ou continuer avec</span></div>

          <div className="social-row">
            <button type="button" className="btn-social">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="" aria-hidden="true" />
              Google
            </button>
            <button type="button" className="btn-social">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="" aria-hidden="true" />
              Apple
            </button>
          </div>

        </div>
      </main>

    </div>
  );
};

export default AuthPage;