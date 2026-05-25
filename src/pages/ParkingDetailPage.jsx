import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import photo1 from '../assets/parking2.jpg';
import photo2 from '../assets/parking4.jpg';
import photo3 from '../assets/parking5.jpg';

import Paul from '../assets/Paul.jpg';
import funZone from '../assets/funZone.jpg';
import carrefour from '../assets/carrefour.jpg';

import gauthier from '../assets/gauthier.jpg';
import racine from '../assets/racine.jpg';
import zerktouni from '../assets/zerktouni.jpg';
import '../styles/ParkingDetailPage.css';

/* ─── Donnees statiques ─────────────────────────────────────── */

const EQUIPMENTS = [
  { icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 10.5L5 4l2.5 4L9 6.5l3 4" stroke="#1D9E75" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: 'Couvert', sub: 'Abri complet', on: true },
  { icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="3" stroke="#1D9E75" strokeWidth="1.2"/><path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13" stroke="#1D9E75" strokeWidth="1" strokeLinecap="round"/></svg>, label: 'Eclairage 24h', sub: 'Caméras incluses', on: true },
  { icon: <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 12V8.5A5.5 5.5 0 0113 8.5M3 12h10M8 9.5V12" stroke="#1D9E75" strokeWidth="1.2" strokeLinecap="round"/></svg>, label: 'Recharge VE', sub: '4 bornes Type 2', on: true },
  { icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="4" width="10" height="7" rx="1.5" stroke="#1D9E75" strokeWidth="1.2"/><path d="M5 4V3a2 2 0 014 0v1" stroke="#1D9E75" strokeWidth="1.2"/></svg>, label: 'Securisé', sub: 'Gardien + caméras', on: true },
];

const SHOPS = [
  {
    name: 'Paul',
    category: 'Café - Réstaurant',
    hours: 'Ouvert · Ferme à 22h',
    img: Paul,
    level: 'RDC',
  },
  {
    name: 'Fun Zone Kids',
    category: 'Espace jeux · 3–12 ans',
    hours: 'Ouvert · Ferme à 21h',
    img: funZone,
    level: 'RDC',
  },
  {
    name: 'Carrefour',
    category: 'Epicerie · Market',
    hours: 'Ouvert · Ferme à 23h',
    img: carrefour,
    level: 'N-1',
  },
];

const TARIFFS = [
  { label: 'Courte duree', sub: 'Moins de 1h',    price: '5 MAD',   unit: '/30 min' },
  { label: 'Tarif horaire', sub: '1h – 6h',        price: '8 MAD',   unit: '/heure' },
  { label: 'Journee complete', sub: '6h et plus',  price: '60 MAD',  unit: '/jour' },
  { label: 'Abonnement mensuel', sub: 'Place reservee', price: '800 MAD', unit: '/mois' },
];

const REVIEWS = [
  { initials: 'KA', color: '#185FA5', name: 'Karim Amrani', date: 'Il y a 2 jours', stars: 5, text: 'Tres bien situe a Maarif, propre et securise. Le systeme de reservation via l\'app est pratique.', tags: ['Propre', 'Securise', 'Bien situe'] },
  { initials: 'SB', color: '#1D9E75', name: 'Sara Benali',  date: 'Il y a 5 jours', stars: 4, text: 'Bonne experience. Les bornes de recharge pour voitures electriques sont un vrai plus !', tags: ['Recharge VE', 'Tarif correct'] },
  { initials: 'YO', color: '#042C53', name: 'Youssef Ouali', date: 'Il y a 1 semaine', stars: 4, text: 'Personnel sympa, parking bien eclaire la nuit. Seul bemol : l\'entree est un peu etroite.', tags: ['Eclaire', 'Personnel sympa'] },
];

const NEARBY = [
  { img : gauthier, name: 'Parking Gauthier', dist: '450m · 6 min', price: '7 MAD/h', rating: 4.5 },
  { img : racine, name: 'Parking Racine',   dist: '700m · 9 min', price: '10 MAD/h', rating: 4.3 },
  { img : zerktouni, name: 'Parking Zerktouni',  dist: '1.1km · 14 min', price: '5 MAD/h', rating: 4.6 },
];

const RATING_BARS = [
  { label: '5', pct: 72, count: 92, color: '#1D9E75' },
  { label: '4', pct: 18, count: 23, color: '#85B7EB' },
  { label: '3', pct: 6,  count: 8,  color: '#EF9F27' },
  { label: '2', pct: 2,  count: 3,  color: '#F09595' },
  { label: '1', pct: 1,  count: 1,  color: '#E24B4A' },
];

const PARKING_PHOTOS = [
  { src: photo1, alt: 'Vue interieure du parking' },
  { src: photo2, alt: 'Signalisation parking' },
  { src: photo3, alt: 'Entree principale' },
];

/* ─── Sous-composants ───────────────────────────────────────── */

const StarRow = ({ count, size = 11 }) => (
  <div className="star-row">
    {[1, 2, 3, 4, 5].map(i => (
      <svg key={i} width={size} height={size} viewBox="0 0 12 12">
        <path d="M6 1l1.4 2.8 3.1.4-2.2 2.2.5 3.1L6 8l-2.8 1.5.5-3.1L1.5 4.2l3.1-.4z"
          fill={i <= count ? '#EF9F27' : '#e2e8f0'} />
      </svg>
    ))}
  </div>
);

const Section = ({ title, link, onLink, children }) => (
  <div className="pd-section">
    <div className="pd-sec-title">
      {title}
      {link && <button type="button" className="pd-sec-link" onClick={onLink}>{link}</button>}
    </div>
    {children}
  </div>
);

/* ─── Page principale ───────────────────────────────────────── */

const ParkingDetailPage = () => {
  const navigate = useNavigate();
  const [fav, setFav]         = useState(false);
  const [dispo, setDispo]     = useState(18);
  const [pct, setPct]         = useState(60);
  const [writeStars, setWrite] = useState(0);
  const intervalRef           = useRef(null);

  /* Simulation dispo live */
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDispo(d => {
        const next = Math.max(0, Math.min(30, d + Math.floor(Math.random() * 3) - 1));
        setPct(Math.round((30 - next) / 30 * 100));
        return next;
      });
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const fillColor = pct < 40 ? '#1D9E75' : pct < 70 ? '#EF9F27' : '#E24B4A';

  return (
    <div className="pd-root">

      {/* ── Hero photos ── */}
      <div className="pd-hero">
        <button className="pd-nav-btn pd-nav-btn--back" onClick={() => navigate(-1)} aria-label="Retour">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 13L5 8l5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button className="pd-nav-btn pd-nav-btn--share" aria-label="Partager">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="12" cy="3" r="1.8" stroke="white" strokeWidth="1.2"/><circle cx="4" cy="8" r="1.8" stroke="white" strokeWidth="1.2"/><circle cx="12" cy="13" r="1.8" stroke="white" strokeWidth="1.2"/><path d="M5.7 7.1l4.6-2.7M5.7 8.9l4.6 2.7" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></svg>
        </button>
        <button className={`pd-fav-btn${fav ? ' pd-fav-btn--on' : ''}`} onClick={() => setFav(f => !f)} aria-label="Favoris">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 13.5S2 9.5 2 5.5A3.5 3.5 0 018 3.1 3.5 3.5 0 0114 5.5c0 4-6 8-6 8z"
              stroke="white" strokeWidth="1.3"
              fill={fav ? '#E24B4A' : 'none'}
              style={{ stroke: fav ? '#E24B4A' : 'white' }} />
          </svg>
        </button>

        <div className="pd-hero-inner">
          {/* Desktop-only hero info */}
          <div className="pd-hero-info">
            <div className="pd-breadcrumb">
              <span className="pd-bc-link" onClick={() => navigate(-1)}>Accueil</span>
              <span className="pd-bc-sep">&rsaquo;</span>
              <span className="pd-bc-link">Parkings</span>
              <span className="pd-bc-sep">&rsaquo;</span>
              <span>Maarif Centre</span>
            </div>
            <h1 className="pd-hero-title">Parking Maarif Centre</h1>
            <div className="pd-hero-addr">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1a4 4 0 014 4c0 3.5-4 8-4 8S2.5 8.5 2.5 5a4 4 0 014-4z" stroke="#85B7EB" strokeWidth="1.1"/><circle cx="6.5" cy="5" r="1.5" stroke="#85B7EB" strokeWidth=".9"/></svg>
              <span>15 Rue Abou Inane, Maarif, Casablanca</span>
            </div>
            <div className="pd-hero-chips">
              <span className="pd-chip pd-chip--green">
                <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill="#1D9E75"/></svg>
                Ouvert · 24h/7
              </span>
              <span className="pd-chip pd-chip--amber">
                {dispo} places libres
              </span>
              <span className="pd-chip pd-chip--blue">Couvert</span>
              <span className="pd-chip pd-chip--blue">Recharge VE</span>
              <span className="pd-chip pd-chip--blue">Fun Zone Kids</span>
            </div>
            <div className="pd-hero-rating">
              <span className="pd-hero-rating-big">4.7</span>
              <div className="pd-hero-rating-detail">
                <StarRow count={5} size={13} />
                <span className="pd-hero-rating-count">127 avis verifies</span>
              </div>
            </div>
          </div>

          {/* Photo grid with real images */}
          <div className="pd-photo-grid">
            <div className="pd-photo-main">
              <img src={PARKING_PHOTOS[0].src} alt={PARKING_PHOTOS[0].alt} className="pd-photo-img" />
              <span className="pd-photo-count">+5 photos</span>
            </div>
            <div className="pd-photo-s1">
              <img src={PARKING_PHOTOS[1].src} alt={PARKING_PHOTOS[1].alt} className="pd-photo-img" />
            </div>
            <div className="pd-photo-s2">
              <img src={PARKING_PHOTOS[2].src} alt={PARKING_PHOTOS[2].alt} className="pd-photo-img" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Body : main + sidebar ── */}
      <div className="pd-body">
        <div className="pd-main">

          {/* ── Infos principales (mobile only) ── */}
          <div className="pd-mobile-only">
            <Section>
              <div className="pd-name-row">
                <h1 className="pd-name">Parking Maarif Centre</h1>
                <div className="pd-rating-inline">
                  <svg width="13" height="13" viewBox="0 0 12 12"><path d="M6 1l1.4 2.8 3.1.4-2.2 2.2.5 3.1L6 8l-2.8 1.5.5-3.1L1.5 4.2l3.1-.4z" fill="#EF9F27"/></svg>
                  <span className="pd-rating-num">4.7</span>
                </div>
              </div>

              <div className="pd-addr-row">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1a3.5 3.5 0 013.5 3.5C9.5 7.5 6 11 6 11S2.5 7.5 2.5 4.5A3.5 3.5 0 016 1z" stroke="#185FA5" strokeWidth="1.1"/><circle cx="6" cy="4.5" r="1.2" stroke="#185FA5" strokeWidth="1"/></svg>
                <span className="pd-addr-text">15 Rue Abou Inane, Maarif, Casablanca</span>
                <button type="button" className="pd-addr-nav">Itineraire</button>
              </div>

              <div className="pd-chips">
                <span className="pd-chip pd-chip--green">
                  <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill="#1D9E75"/></svg>
                  Ouvert 24h/7
                </span>
            
                <span className="pd-chip pd-chip--amber">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><rect x="1" y="3" width="6" height="4" rx="1" stroke="#854F0B" strokeWidth=".9"/><path d="M3 3V2a1 1 0 012 0v1" stroke="#854F0B" strokeWidth=".9"/></svg>
                  {dispo} places libres
                </span>
                <span className="pd-chip pd-chip--blue">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4.5L4 1.5 7 4.5M4 1.5V6.5" stroke="#185FA5" strokeWidth=".9" strokeLinecap="round"/></svg>
                  Couvert
                </span>
                <span className="pd-chip pd-chip--blue">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 12V8.5A5.5 5.5 0 0113 8.5M3 12h10M8 9.5V12" stroke="#1D9E75" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    Recharge VE
                </span>
                <span className="pd-chip pd-chip--blue">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2V14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M5.5 4.5L8 2L10.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5.5 11.5L8 14L10.5 11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>                 
                    2 Niveaux
                </span>
              </div>

              <div className="pd-avail">
                <div className="pd-avail-labels">
                  <span>Occupation en temps reel</span>
                  <span>{pct}% occupe</span>
                </div>
                <div className="pd-avail-bar">
                  <div className="pd-avail-fill" style={{ width: `${pct}%`, background: fillColor }} />
                </div>
              </div>
            </Section>
          </div>

          {/* ── Disponibilite (desktop only) ── */}
          <div className="pd-desktop-only">
            <Section title="Disponibilite en temps reel">
              <div className="pd-dispo-grid">
                <div className="pd-dispo-box pd-dispo-box--green">
                  <span className="pd-dispo-num" style={{ color: '#1D9E75' }}>{dispo}</span>
                  <span className="pd-dispo-label">Places libres</span>
                </div>
                <div className="pd-dispo-box">
                  <span className="pd-dispo-num" style={{ color: '#042C53' }}>{30 - dispo}</span>
                  <span className="pd-dispo-label">Occupees</span>
                </div>
                <div className="pd-dispo-box pd-dispo-box--blue">
                  <span className="pd-dispo-num" style={{ color: '#185FA5' }}>30</span>
                  <span className="pd-dispo-label">Total</span>
                </div>
              </div>
              <div className="pd-avail-bar">
                <div className="pd-avail-fill" style={{ width: `${pct}%`, background: fillColor }} />
              </div>
              <div className="pd-avail-labels" style={{ marginTop: 4 }}>
                <span>0</span>
                <span>{pct}% occupe</span>
                <span>30</span>
              </div>
            </Section>
          </div>

          {/* ── Tarifs ── */}
          <Section title="Tarifs" link="Voir details">
            {TARIFFS.map(t => (
              <div className="pd-tariff-row" key={t.label}>
                <div>
                  <p className="pd-tariff-label">{t.label}</p>
                  <p className="pd-tariff-sub">{t.sub}</p>
                </div>
                <div className="pd-tariff-price-wrap">
                  <span className="pd-tariff-price">{t.price}</span>
                  <span className="pd-tariff-unit">{t.unit}</span>
                </div>
              </div>
            ))}
            <div className="pd-promo">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#1D9E75" strokeWidth="1.1"/><path d="M5 7l1.5 1.5L9 5.5" stroke="#1D9E75" strokeWidth="1.1" strokeLinecap="round"/></svg>
              <span>Premiere heure gratuite pour les nouveaux utilisateurs</span>
            </div>
          </Section>

          {/* ── Localisation (mobile only) ── */}
          <div className="pd-mobile-only">
            <Section title="Localisation">
              <div className="pd-map-box">
                <svg width="100%" height="100%" viewBox="0 0 328 130" fill="none">
                  <rect width="328" height="130" fill="#E6F1FB"/>
                  <line x1="0" y1="40" x2="328" y2="40" stroke="#B5D4F4" strokeWidth=".8"/>
                  <line x1="0" y1="80" x2="328" y2="80" stroke="#B5D4F4" strokeWidth=".8"/>
                  <line x1="80" y1="0" x2="80" y2="130" stroke="#B5D4F4" strokeWidth=".8"/>
                  <line x1="164" y1="0" x2="164" y2="130" stroke="#B5D4F4" strokeWidth=".8"/>
                  <line x1="248" y1="0" x2="248" y2="130" stroke="#B5D4F4" strokeWidth=".8"/>
                  <rect x="60" y="30" width="60" height="25" rx="3" fill="#B5D4F4" opacity=".6"/>
                  <rect x="140" y="55" width="80" height="30" rx="3" fill="#B5D4F4" opacity=".6"/>
                  <rect x="240" y="35" width="50" height="20" rx="3" fill="#B5D4F4" opacity=".6"/>
                  <circle cx="164" cy="65" r="16" fill="rgba(4,44,83,.15)"/>
                  <circle cx="164" cy="65" r="10" fill="#042C53"/>
                  <path d="M160 65L164 58L168 65L164 68Z" fill="white"/>
                  <circle cx="164" cy="65" r="3" fill="#1D9E75"/>
                </svg>
                <span className="pd-map-label">Maarif, Casablanca</span>
                <span className="pd-map-expand">Ouvrir la carte</span>
              </div>
              <div className="pd-distance">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5C2 4 4 2 6.5 2S11 4 11 6.5 9 11 6.5 11 2 9 2 6.5z" stroke="#185FA5" strokeWidth="1"/><path d="M6.5 4v3l2 1" stroke="#185FA5" strokeWidth="1" strokeLinecap="round"/></svg>
                <span>A 350m de votre position · ~5 min a pied</span>
              </div>
            </Section>
          </div>

          {/* ── Equipements & services ── */}
          <Section title="Equipements & services">
            <p className="pd-services-sub">Infrastructure</p>
            <div className="pd-equip-grid">
              {EQUIPMENTS.map(e => (
                <div key={e.label} className={`pd-equip${e.on ? ' pd-equip--on' : ' pd-equip--off'}`}>
                  <div className="pd-equip-icon">{e.icon}</div>
                  <div>
                    <p className="pd-equip-label">{e.label}</p>
                    <p className="pd-equip-sub">{e.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="pd-services-sub pd-services-sub--shops">Ces commerces sont physiquement intégrés au sein du parking Maarif Centre</p>
            <div className="pd-shops-grid">
              {SHOPS.map(s => (
                <div key={s.name} className="pd-shop-card">
                  <div className="pd-shop-img">
                    <img src={s.img} alt={s.name} loading="lazy" />
                    <span className="pd-shop-level">{s.level}</span>
                  </div>
                  <div className="pd-shop-info">
                    <p className="pd-shop-name">{s.name}</p>
                    <p className="pd-shop-cat">{s.category}</p>
                    <p className="pd-shop-hours">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><circle cx="4" cy="4" r="3" fill="#1D9E75"/></svg>
                      {s.hours}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Avis clients ── */}
          <Section title="Avis clients" link="Voir tout (127)">
            <div className="pd-rating-summary">
              <div className="pd-rating-big-col">
                <span className="pd-rating-big-num">4.7</span>
                <StarRow count={5} size={13} />
                <span className="pd-rating-count">127 avis</span>
              </div>
              <div className="pd-rating-bars">
                {RATING_BARS.map(b => (
                  <div key={b.label} className="pd-rb-row">
                    <span className="pd-rb-label">{b.label}</span>
                    <div className="pd-rb-track"><div className="pd-rb-fill" style={{ width: `${b.pct}%`, background: b.color }} /></div>
                    <span className="pd-rb-count">{b.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {REVIEWS.map(r => (
              <div key={r.name} className="pd-review">
                <div className="pd-rev-header">
                  <div className="pd-rev-avatar" style={{ background: r.color, color: 'white' }}>{r.initials}</div>
                  <div>
                    <p className="pd-rev-name">{r.name}</p>
                    <p className="pd-rev-date">{r.date}</p>
                  </div>
                  <StarRow count={r.stars} />
                </div>
                <p className="pd-rev-text">{r.text}</p>
                <div className="pd-rev-tags">
                  {r.tags.map(t => <span key={t} className="pd-rev-tag">{t}</span>)}
                </div>
              </div>
            ))}

            <div className="pd-write-review">
              <div className="pd-write-avatar">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="5" r="2.5" stroke="#185FA5" strokeWidth="1.1"/><path d="M2 12c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" stroke="#185FA5" strokeWidth="1.1" strokeLinecap="round"/></svg>
              </div>
              <span className="pd-write-placeholder">Laisser un avis...</span>
              <div className="pd-write-stars">
                {[1, 2, 3, 4, 5].map(i => (
                  <svg key={i} width="14" height="14" viewBox="0 0 12 12"
                    onMouseEnter={() => setWrite(i)}
                    onMouseLeave={() => setWrite(0)}
                    style={{ cursor: 'pointer' }}>
                    <path d="M6 1l1.4 2.8 3.1.4-2.2 2.2.5 3.1L6 8l-2.8 1.5.5-3.1L1.5 4.2l3.1-.4z"
                      fill={i <= writeStars ? '#EF9F27' : '#e2e8f0'} />
                  </svg>
                ))}
              </div>
            </div>
          </Section>

          {/* ── Parkings proches ── */}
          <Section title="Parkings proches">
            <div className="pd-nearby-scroll">
              {NEARBY.map(p => (
                <div key={p.name} className="pd-nearby-card">
                  <div className="pd-nearby-img">
                    <img src={p.img} alt={p.name} className="pd-nearby-photo" />
                  </div>
                  <div className="pd-nearby-info">
                    <p className="pd-nearby-name">{p.name}</p>
                    <p className="pd-nearby-dist">{p.dist}</p>
                    <div className="pd-nearby-bottom">
                      <span className="pd-nearby-price">{p.price}</span>
                      <span className="pd-nearby-rating">
                        <svg width="9" height="9" viewBox="0 0 9 9"><path d="M4.5 1l.9 1.8 2 .3-1.4 1.4.3 2L4.5 6l-1.8 1 .3-2L1.6 3.6l2-.3z" fill="#EF9F27"/></svg>
                        {p.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

        </div>

        {/* ── Sidebar desktop ── */}
        <aside className="pd-sidebar">
          {/* Resume & reservation */}
          <div className="pd-side-card">
            <div className="pd-side-price-row">
              <span className="pd-side-price-val">8 MAD</span>
              <span className="pd-side-price-unit">/heure</span>
            </div>
            <p className="pd-side-price-sub">Réservation confirmée après paiement</p>
            <div className="pd-side-detail">
              <div className="pd-side-row">
                <span className="pd-side-row-label">Disponibilite</span>
                <span className="pd-side-row-val" style={{ color: '#1D9E75' }}>{dispo} places</span>
              </div>
              <div className="pd-side-row">
                <span className="pd-side-row-label">Reservation</span>
                <span className="pd-side-row-val">Jusqu&apos;a 7j avant</span>
              </div>
              <div className="pd-side-row">
                <span className="pd-side-row-label">Niveaux</span>
                <span className="pd-side-row-val">2</span>
              </div>
              <div className="pd-side-row">
                <span className="pd-side-row-label">Accès</span>
                <span className="pd-side-row-val">24h</span>
              </div>
            </div>
            <button type="button" className="pd-side-reserve" onClick={() => navigate('/reservation')}>Réserver une place</button>
            <button type="button" className="pd-side-itinerary">Obtenir l&apos;itineraire</button>
          </div>

          {/* Carte */}
          <div className="pd-side-map">
            <svg width="100%" height="100%" viewBox="0 0 300 160" fill="none">
              <rect width="300" height="160" fill="#E6F1FB"/>
              <line x1="0" y1="53" x2="300" y2="53" stroke="#B5D4F4" strokeWidth=".7"/>
              <line x1="0" y1="107" x2="300" y2="107" stroke="#B5D4F4" strokeWidth=".7"/>
              <line x1="100" y1="0" x2="100" y2="160" stroke="#B5D4F4" strokeWidth=".7"/>
              <line x1="200" y1="0" x2="200" y2="160" stroke="#B5D4F4" strokeWidth=".7"/>
              <rect x="30" y="28" width="55" height="28" rx="3" fill="#B5D4F4" opacity=".7"/>
              <rect x="120" y="62" width="65" height="30" rx="3" fill="#B5D4F4" opacity=".6"/>
              <rect x="215" y="32" width="48" height="22" rx="3" fill="#B5D4F4" opacity=".7"/>
              <circle cx="150" cy="80" r="18" fill="rgba(4,44,83,.15)"/>
              <circle cx="150" cy="80" r="10" fill="#042C53"/>
              <path d="M147 80L150 73L153 80L150 83Z" fill="white"/>
              <circle cx="150" cy="80" r="3.5" fill="#1D9E75"/>
            </svg>
            <span className="pd-map-label">Maarif · 350m</span>
            <span className="pd-map-expand">Ouvrir la carte &#8599;</span>
          </div>

          {/* Favoris */}
          <div className="pd-side-fav" onClick={() => setFav(f => !f)} role="button" tabIndex={0}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 14S2 10 2 6a4 4 0 016-3.5A4 4 0 0114 6c0 4-6 8-6 8z"
                stroke="var(--navy)" strokeWidth="1.2"
                fill={fav ? '#E24B4A' : 'none'}
                style={{ stroke: fav ? '#E24B4A' : 'var(--navy)' }} />
            </svg>
            <span className="pd-side-fav-text">{fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}</span>
          </div>
        </aside>
      </div>

      <div className="pd-spacer" />

      {/* ── Barre de reservation (mobile) ── */}
      <div className="pd-reserve-bar">
        <div className="pd-res-price">
          <span className="pd-res-val">8 MAD<span className="pd-res-unit"> /h</span></span>
          <span className="pd-res-sub">A partir de</span>
        </div>
        <button type="button" className="pd-res-nav" aria-label="Itineraire">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2l6 14-6-3.5L3 16 9 2z" stroke="#185FA5" strokeWidth="1.3" strokeLinejoin="round" fill="none"/></svg>
        </button>
        <button type="button" className="pd-res-btn" onClick={() => navigate('/reservation')}>Réserver une place</button>
      </div>

    </div>
  );
};

export default ParkingDetailPage;
