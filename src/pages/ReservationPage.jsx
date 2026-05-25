import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ReservationPage.css';

/* ─── Donnees statiques ─────────────────────────────────────── */

const DAYS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const MONTHS = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];

const DURATION_OPTIONS = [
  { label: '30 min', value: 0.5 },
  { label: '1h', value: 1 },
  { label: '2h', value: 2 },
  { label: '3h', value: 3 },
  { label: '6h', value: 6 },
  { label: 'Journée', value: 12 },
];

const BUSY_SLOTS = {
  0: ['09:00', '11:30', '14:00', '17:00'],
  1: ['08:00', '10:30', '13:00'],
  2: ['09:30', '12:00', '15:30', '18:00'],
};

const PROMO_CODES = { SMART20: 20, POLO15: 15, BIENVENUE: 25 };

const PARTNERS = [
  {
    name: "McDonald's",
    category: 'Restauration rapide',
    offer: '-15% sur commande',
    bg: '#DA1020',
    icon: (
      <svg width="44" height="28" viewBox="0 0 44 28" fill="none">
        <path d="M4 20 L11 4 L18 16 L22 8 L26 16 L33 4 L40 20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    name: 'Cafe Polo',
    category: 'Cafe & salon de the',
    offer: 'Cafe offert des 2h',
    bg: '#6F4E37',
    icon: (
      <svg width="40" height="30" viewBox="0 0 40 30" fill="none">
        <ellipse cx="20" cy="16" rx="10" ry="7" stroke="white" strokeWidth="1.5" />
        <path d="M20 9V6M16 10L13 8M24 10L27 8" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M13 18 Q20 24 27 18" stroke="white" strokeWidth="1.2" fill="none" />
      </svg>
    ),
  },
  {
    name: 'Carrefour',
    category: 'Grande surface',
    offer: '30 min gratuites',
    bg: '#003087',
    icon: (
      <svg width="44" height="28" viewBox="0 0 44 28" fill="none">
        <rect x="6" y="6" width="32" height="16" rx="2" fill="none" stroke="white" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="5" fill="none" stroke="white" strokeWidth="1.2" />
        <circle cx="14" cy="14" r="2" fill="white" />
        <rect x="22" y="10" width="12" height="2" rx="1" fill="white" />
        <rect x="22" y="15" width="8" height="2" rx="1" fill="white" />
      </svg>
    ),
  },
  {
    name: 'Fun Zone',
    category: 'Espace jeux enfants',
    offer: '-10% entree',
    bg: '#FF6B35',
    icon: (
      <svg width="44" height="28" viewBox="0 0 44 28" fill="none">
        <circle cx="12" cy="14" r="6" stroke="white" strokeWidth="1.5" />
        <circle cx="32" cy="14" r="6" stroke="white" strokeWidth="1.5" />
        <path d="M18 14h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 11l2 3-2 3M34 11l-2 3 2 3" stroke="white" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Pharmacie',
    category: 'Sante & bien-etre',
    offer: 'Livraison parking',
    bg: '#1D9E75',
    icon: (
      <svg width="40" height="28" viewBox="0 0 40 28" fill="none">
        <rect x="6" y="8" width="28" height="14" rx="2" stroke="white" strokeWidth="1.4" />
        <path d="M12 8V6a2 2 0 014 0v2M24 8V6a2 2 0 014 0v2" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M10 14h20M10 18h14" stroke="white" strokeWidth="1" strokeLinecap="round" opacity=".6" />
      </svg>
    ),
  },
];

/* ─── Helpers ────────────────────────────────────────────────── */

function buildDates() {
  const now = new Date();
  const dates = [];
  for (let i = 0; i < 8; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    dates.push({ date: d, index: i, isToday: i === 0 });
  }
  return dates;
}

function isTimeBusy(dateIndex, time) {
  const busy = BUSY_SLOTS[dateIndex % 3] || [];
  return busy.includes(time);
}

function calcPrice(duration, promoDiscount) {
  const base = duration >= 8 ? 60 : Math.round(8 * duration);
  const disc = promoDiscount > 0 ? Math.round(base * promoDiscount / 100) : 0;
  return { base, disc, total: base - disc + 2 };
}

function formatDuration(val) {
  if (val >= 8) return 'Journee';
  if (val < 1) return '30 min';
  return val + 'h';
}

/* ─── Page principale ────────────────────────────────────────── */

const ReservationPage = () => {
  const navigate = useNavigate();
  const dates = useMemo(() => buildDates(), []);

  /* State */
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);
  const [arrivalTime, setArrivalTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(2);
  const [customDuration, setCustomDuration] = useState('');
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMsg, setPromoMsg] = useState({ type: '', text: '' });
  const [payMethod, setPayMethod] = useState('app');
  const [confirmed, setConfirmed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [confirmCode, setConfirmCode] = useState('');
  const [assignedPlace, setAssignedPlace] = useState('');

  /* Derived */
  const selectedDate = dates[selectedDateIdx]?.date || new Date();
  const price = calcPrice(selectedDuration, promoDiscount);

  /* Check arrival time availability */
  const timeStatus = useMemo(() => {
    if (!arrivalTime) return null;
    const match = arrivalTime.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return { ok: false, msg: 'Format invalide. Utilisez HH:MM (ex: 10:00)' };
    const h = parseInt(match[1], 10);
    const m = parseInt(match[2], 10);
    if (h < 7 || h > 22 || m < 0 || m > 59) {
      return { ok: false, msg: 'Le parking est ouvert de 07:00 a 22:00' };
    }
    const normalized = h.toString().padStart(2, '0') + ':' + m.toString().padStart(2, '0');
    if (isTimeBusy(selectedDateIdx, normalized)) {
      return { ok: false, msg: 'Aucune place disponible a cette heure. Veuillez essayer un autre creneau.' };
    }
    return { ok: true, msg: 'Place disponible ! Votre place sera attribuee automatiquement.' };
  }, [arrivalTime, selectedDateIdx]);

  /* Actions */
  const handleApplyPromo = () => {
    const code = promoInput.toUpperCase().trim();
    if (PROMO_CODES[code]) {
      setPromoCode(code);
      setPromoDiscount(PROMO_CODES[code]);
      setPromoMsg({ type: 'ok', text: `Code applique ! -${PROMO_CODES[code]}% sur le tarif de base` });
    } else {
      setPromoCode('');
      setPromoDiscount(0);
      setPromoMsg({ type: 'err', text: 'Code invalide ou expire.' });
    }
  };

  const handleFillPromo = (code) => {
    setPromoInput(code);
    const upper = code.toUpperCase().trim();
    if (PROMO_CODES[upper]) {
      setPromoCode(upper);
      setPromoDiscount(PROMO_CODES[upper]);
      setPromoMsg({ type: 'ok', text: `Code applique ! -${PROMO_CODES[upper]}% sur le tarif de base` });
    }
  };

  const handleDurationSelect = (val) => {
    setSelectedDuration(val);
    setCustomDuration('');
  };

  const handleCustomDuration = (val) => {
    const n = parseFloat(val) || 0;
    setCustomDuration(val);
    if (n >= 0.5 && n <= 24) {
      setSelectedDuration(n);
    }
  };

  const handleConfirm = () => {
    if (!arrivalTime || !timeStatus?.ok) return;
    setProcessing(true);
    setTimeout(() => {
      const places = ['A-02', 'A-03', 'B-03', 'C-01', 'C-04', 'D-02', 'D-04', 'E-02', 'E-03'];
      const place = places[Math.floor(Math.random() * places.length)];
      setAssignedPlace(place);
      setConfirmCode('SP-' + Math.floor(1000 + Math.random() * 9000));
      setConfirmed(true);
      setProcessing(false);
      navigate('/ticket/SP-4471');
    }, 1200);
  };

  const canConfirm = arrivalTime && timeStatus?.ok && !processing;

  /* ── Format for display ── */
  const dateDisplay = `${selectedDate.getDate()} ${MONTHS[selectedDate.getMonth()]}`;
  const durationDisplay = formatDuration(selectedDuration);

  /* ─────────────── RENDER ─────────────────────────────────────── */

  if (confirmed) {
    return (
      <div className="rv-root">
        {/* Header */}
        <div className="rv-header">
          <div className="rv-header-inner">
            <div className="rv-header-back" onClick={() => navigate(-1)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 13L5 8l5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div>
              <div className="rv-header-title">Reservation confirmee</div>
              <div className="rv-header-sub">Parking Maarif Centre</div>
            </div>
          </div>
        </div>

        <div className="rv-confirm-wrap">
          <div className="rv-confirm-screen">
            <div className="rv-conf-ring">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M8 18l6.5 6.5L28 11" stroke="#1D9E75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="rv-conf-title">Reservation confirmee !</div>
            <div className="rv-conf-sub">Votre place est garantie.<br />Presentez ce code a l'entree du parking.</div>
            <div className="rv-conf-code">{confirmCode}</div>
            <div className="rv-conf-card">
              <div className="rv-conf-row"><span className="rv-conf-lbl">Parking</span><span className="rv-conf-val">Maarif Centre</span></div>
              <div className="rv-conf-row"><span className="rv-conf-lbl">Place attribuee</span><span className="rv-conf-val">{assignedPlace}</span></div>
              <div className="rv-conf-row"><span className="rv-conf-lbl">Date</span><span className="rv-conf-val">{selectedDate.getDate()} {MONTHS[selectedDate.getMonth()]} {selectedDate.getFullYear()}</span></div>
              <div className="rv-conf-row"><span className="rv-conf-lbl">Heure</span><span className="rv-conf-val">{arrivalTime}</span></div>
              <div className="rv-conf-row"><span className="rv-conf-lbl">Duree</span><span className="rv-conf-val">{durationDisplay}</span></div>
              <div className="rv-conf-row"><span className="rv-conf-lbl">Total paye</span><span className="rv-conf-val" style={{ color: '#1D9E75' }}>{price.total} MAD</span></div>
            </div>
            <div className="rv-conf-actions">
              <button className="rv-conf-btn">QR Code</button>
              <button className="rv-conf-btn-ghost">Calendrier</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Main form ── */
  return (
    <div className="rv-root">

        {/* ── Desktop breadcrumb ── */}
      <div className="rv-bc-wrap rv-desktop-only">
        <div className="rv-breadcrumb">
          <span className="rv-bc-link" onClick={() => navigate(-1)}>Accueil</span>
          <span className="rv-bc-sep">&rsaquo;</span>
          <span className="rv-bc-link" onClick={() => navigate(-1)}>Parkings</span>
          <span className="rv-bc-sep">&rsaquo;</span>
          <span className="rv-bc-link" onClick={() => navigate(-1)}>Maarif Centre</span>
          <span className="rv-bc-sep">&rsaquo;</span>
          <span className="rv-bc-current">Reservation</span>
        </div>
      </div>
      
      {/* ── Header ── */}
      <div className="rv-header">
        <div className="rv-header-inner">
          <div className="rv-header-back" onClick={() => navigate(-1)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 13L5 8l5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div>
            <div className="rv-header-title">Réserver une place</div>
            <div className="rv-header-sub">Parking Maarif Centre · 15 Rue Abou Inane, Casablanca</div>
          </div>
        </div>
      </div>

      

      {/* ── Body : main + sidebar ── */}
      <div className="rv-body">
        <div className="rv-main">

          {/* Parking info card (mobile) */}
          <div className="rv-section rv-mobile-only">
            <div className="rv-park-card">
              <div className="rv-park-thumb"><span>P</span></div>
              <div>
                <div className="rv-park-name">Parking Maarif Centre</div>
                <div className="rv-park-addr">15 Rue Abou Inane, Casablanca</div>
                <div className="rv-park-badge">
                  <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill="#1D9E75" /></svg>
                  18 places libres sur 30
                </div>
              </div>
            </div>
          </div>

          {/* Future banner */}
          <div className="rv-section rv-future-banner">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
              <rect width="30" height="30" rx="8" fill="rgba(24,95,165,.12)" />
              <rect x="6" y="8" width="18" height="16" rx="2" stroke="#185FA5" strokeWidth="1.2" />
              <path d="M10 6v2M20 6v2M6 13h18" stroke="#185FA5" strokeWidth="1.1" strokeLinecap="round" />
              <circle cx="11" cy="18" r="1.1" fill="#1D9E75" />
              <circle cx="15" cy="18" r="1.1" fill="#1D9E75" />
              <circle cx="19" cy="18" r="1.1" fill="#94a3b8" />
            </svg>
            <div>
              <div className="rv-future-title">Reservation jusqu'a 7 jours a l'avance</div>
              <div className="rv-future-text">Place garantie et bloquée dés confirmation. Qu'est ce que vous attendez ?</div>
            </div>
          </div>

          {/* Step 1: Date */}
          <div className="rv-section rv-card">
            <div className="rv-sec-title">
              <span className="rv-step-num">1</span>
              Choisir la date
            </div>
            <div className="rv-date-tabs">
              {dates.map((d) => (
                <div
                  key={d.index}
                  className={`rv-dtab${d.index === selectedDateIdx ? ' rv-dtab--sel' : ''}${d.isToday ? ' rv-dtab--today' : ''}`}
                  onClick={() => setSelectedDateIdx(d.index)}
                >
                  <div className="rv-dtab-num">{d.date.getDate()}</div>
                  <div className="rv-dtab-day">{d.isToday ? 'Auj.' : DAYS[d.date.getDay()]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Arrival time + Duration */}
          <div className="rv-section rv-card">
            <div className="rv-sec-title">
              <span className="rv-step-num">2</span>
              Heure d'arrivée & durée
            </div>

            <div className="rv-input-group">
                <label className="rv-label">HEURE D'ARRIVÉE</label>
                <div className="rv-time-input-wrap">
                    {/* Icône SVG simplifiée de l'horloge */}
                    <svg className="rv-time-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <input
                    type="text"
                    className={`rv-input rv-time-input${timeStatus ? (timeStatus.ok ? ' rv-input--ok' : ' rv-input--err') : ''}`}
                    placeholder="Ex: 10:00"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    maxLength={5}
                    />
                </div>
            </div>
            {timeStatus && (
              <div className={`rv-time-msg${timeStatus.ok ? ' rv-time-msg--ok' : ' rv-time-msg--err'}`}>
                {timeStatus.ok && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="5" stroke="#1D9E75" strokeWidth="1" />
                    <path d="M3.5 6l2 2 3-3" stroke="#1D9E75" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                )}
                {!timeStatus.ok && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="5" stroke="#E24B4A" strokeWidth="1" />
                    <path d="M6 3.5v3M6 8.5v.01" stroke="#E24B4A" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                )}
                <span>{timeStatus.msg}</span>
              </div>
            )}

            <label className="rv-label" style={{ marginTop: 16 , marginBottom:16}}>DUREE DE STATIONNEMENT</label>
            <div className="rv-dur-row">
              {DURATION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={`rv-dur-btn${selectedDuration === opt.value && !customDuration ? ' rv-dur-btn--sel' : ''}`}
                  onClick={() => handleDurationSelect(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="rv-custom-dur">
              <span className="rv-custom-label">Duree personnalisee :</span>
              <input
                type="number"
                min="1"
                max="24"
                className="rv-custom-input"
                value={customDuration}
                onChange={(e) => handleCustomDuration(e.target.value)}
                placeholder={selectedDuration.toString()}
              />
              <span className="rv-custom-label">heure(s)</span>
            </div>

            {/* Monthly subscription CTA */}
            <div className="rv-monthly-cta">
              <div className="rv-monthly-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="3" width="12" height="10" rx="2" stroke="#185FA5" strokeWidth="1.2" />
                  <path d="M2 6.5h12" stroke="#185FA5" strokeWidth="1" />
                  <rect x="4" y="8.5" width="3" height="2" rx=".5" fill="#185FA5" opacity=".5" />
                </svg>
              </div>
              <div className="rv-monthly-text">
                <div className="rv-monthly-title">Abonnement mensuel</div>
                <div className="rv-monthly-sub">Choisissez votre place fixe a 800 MAD/mois</div>
              </div>
              <svg className="rv-monthly-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="#185FA5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>


          {/* Promo code (mobile + desktop main) */}
          <div className="rv-section rv-card rv-promo-section">
            <div className="rv-sec-title">
              <span className="rv-step-num">3</span>
              Code promo & coupon
            </div>
            <div className="rv-promo-wrap">
              <div className="rv-promo-header" onClick={() => setPromoOpen(!promoOpen)}>
                <div className="rv-promo-icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1" y="4" width="12" height="7" rx="1.5" stroke="#1D9E75" strokeWidth="1.1" />
                    <path d="M4.5 4V3a2.5 2.5 0 015 0v1" stroke="#1D9E75" strokeWidth="1.1" />
                    <path d="M4 7.5h2M8 7.5h2M4 9.5h6" stroke="#1D9E75" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="rv-promo-lbl">Avez-vous un code promo ?</span>
                <svg className={`rv-promo-arr${promoOpen ? ' rv-promo-arr--open' : ''}`} width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1.5l5 5 5-5" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              {promoOpen && (
                <div className="rv-promo-body">
                  <div className="rv-promo-input-row">
                    <input
                      className="rv-promo-input"
                      type="text"
                      placeholder="Ex: SMART20, POLO15..."
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                    />
                    <button className="rv-promo-apply" onClick={handleApplyPromo}>Appliquer</button>
                  </div>
                  {promoMsg.text && (
                    <div className={`rv-promo-msg rv-promo-msg--${promoMsg.type}`}>{promoMsg.text}</div>
                  )}
                  <div className="rv-promo-suggestions">
                    <span className="rv-promo-tag rv-promo-tag--green" onClick={() => handleFillPromo('SMART20')}>SMART20 · -20%</span>
                    <span className="rv-promo-tag rv-promo-tag--green" onClick={() => handleFillPromo('POLO15')}>POLO15 · -15%</span>
                    <span className="rv-promo-tag rv-promo-tag--amber" onClick={() => handleFillPromo('BIENVENUE')}>BIENVENUE · -25%</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Price summary (mobile only) */}
          <div className="rv-section rv-card rv-mobile-only">
            <div className="rv-price-summary">
              <div className="rv-ps-row"><span className="rv-ps-lbl">Tarif de base</span><span className="rv-ps-val">{price.base} MAD</span></div>
              <div className="rv-ps-row"><span className="rv-ps-lbl">Duree</span><span className="rv-ps-val">{durationDisplay}</span></div>
              {price.disc > 0 && (
                <div className="rv-ps-row"><span className="rv-ps-lbl rv-ps-promo">Reduction ({promoCode})</span><span className="rv-ps-val rv-ps-promo">-{price.disc} MAD</span></div>
              )}
              <div className="rv-ps-row"><span className="rv-ps-lbl">Frais de service</span><span className="rv-ps-val">2 MAD</span></div>
              <div className="rv-ps-divider"></div>
              <div className="rv-ps-row"><span className="rv-ps-total-lbl">Total estime</span><span className="rv-ps-total-val">{price.total} MAD</span></div>
              <div className="rv-ps-note">Paiement final selon duree reelle de stationnement</div>
            </div>
          </div>

          {/* Payment (mobile only) */}
          <div className="rv-section rv-card rv-mobile-only">
            <div className="rv-sec-title" style={{ marginBottom: 10 }}>Moyen de paiement</div>
            <div className="rv-pay-methods">
              <div className={`rv-pm${payMethod === 'app' ? ' rv-pm--sel' : ''}`} onClick={() => setPayMethod('app')}>
                <div className="rv-pm-icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="2" y="1" width="10" height="12" rx="2" stroke={payMethod === 'app' ? 'white' : '#185FA5'} strokeWidth="1.1" />
                    <circle cx="7" cy="10" r="1" fill={payMethod === 'app' ? 'white' : '#185FA5'} />
                    <rect x="4.5" y="3.5" width="5" height="1.5" rx=".5" fill={payMethod === 'app' ? 'white' : '#185FA5'} opacity=".6" />
                  </svg>
                </div>
                <div className="rv-pm-lbl">App Wallet</div>
              </div>
              <div className={`rv-pm${payMethod === 'cmi' ? ' rv-pm--sel' : ''}`} onClick={() => setPayMethod('cmi')}>
                <div className="rv-pm-icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1" y="3" width="12" height="8" rx="1.5" stroke={payMethod === 'cmi' ? 'white' : '#185FA5'} strokeWidth="1.1" />
                    <rect x="1" y="5.5" width="12" height="2" fill={payMethod === 'cmi' ? 'white' : '#185FA5'} opacity=".3" />
                    <rect x="3" y="8" width="4" height="1.5" rx=".4" fill={payMethod === 'cmi' ? 'white' : '#185FA5'} opacity=".5" />
                  </svg>
                </div>
                <div className="rv-pm-lbl">Carte CMI</div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Sidebar (desktop) ── */}
<aside className="rv-sidebar">
  
  {/* Summary card */}
  <div className="rv-sum-card">
    <div className="rv-sum-title">Récapitulatif</div>
    
    {/* 1. Bloc Info Parking */}
    <div className="rv-sum-park">
      <div className="rv-sum-thumb">P</div>
      <div>
        <div className="rv-sum-park-name">Maarif Centre</div>
        <div className="rv-sum-park-addr">Maarif, Casablanca</div>
      </div>
    </div>

    {/* 2. Bloc Détails Temps */}
    <div className="rv-sum-section">
      <div className="rv-sum-row"><span className="rv-sum-lbl">Date</span><span className="rv-sum-val">{dateDisplay}</span></div>
      <div className="rv-sum-row"><span className="rv-sum-lbl">Heure</span><span className="rv-sum-val">{arrivalTime || '—'}</span></div>
      <div className="rv-sum-row"><span className="rv-sum-lbl">Durée</span><span className="rv-sum-val">{durationDisplay}</span></div>
    </div>

    <div className="rv-sum-divider"></div>

    {/* 3. Bloc Tarification */}
    <div className="rv-sum-section">
      <div className="rv-sum-row">
        <span className="rv-sum-lbl">Tarif de base</span>
        <span className="rv-sum-val">{price.base} MAD</span>
      </div>
      
      {promoCode && (
        <div className="rv-sum-promo-row">
          <div className="rv-sum-promo-badge">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#1D9E75" strokeWidth=".9" /><path d="M3.5 6l2 2 3-3" stroke="#1D9E75" strokeWidth=".9" strokeLinecap="round" /></svg>
            <span>Code {promoCode} (-{promoDiscount}%)</span>
          </div>
          <span className="rv-sum-val" style={{ color: '#1D9E75' }}>-{price.disc} MAD</span>
        </div>
      )}

      <div className="rv-sum-row">
        <span className="rv-sum-lbl">Frais de service</span>
        <span className="rv-sum-val">2 MAD</span>
      </div>
    </div>

    <div className="rv-sum-divider"></div>

    {/* 4. Bloc Total */}
    <div className="rv-sum-total-row">
      <span className="rv-sum-total-lbl">Total estimé</span>
      <span className="rv-sum-total-val">{price.total} MAD</span>
    </div>
    <div className="rv-sum-note">Selon durée réelle de stationnement</div>
  </div>

  {/* Payment Section */}
  <div className="rv-sum-card">
    <div className="rv-sum-title">Moyen de paiement</div>
    <div className="rv-pay-methods rv-pay-methods--desktop">
      <div className={`rv-pm${payMethod === 'app' ? ' rv-pm--sel' : ''}`} onClick={() => setPayMethod('app')}>
        <div className="rv-pm-icon">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="2" y="1" width="10" height="12" rx="2" stroke="currentColor" strokeWidth="1.1" />
            <circle cx="7" cy="10" r="1" fill="currentColor" />
          </svg>
        </div>
        <div className="rv-pm-lbl">App Wallet</div>
      </div>

      <div className={`rv-pm${payMethod === 'cmi' ? ' rv-pm--sel' : ''}`} onClick={() => setPayMethod('cmi')}>
        <div className="rv-pm-icon">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
            <path d="M1 6h12" stroke="currentColor" strokeWidth="1.1" opacity=".3" />
          </svg>
        </div>
        <div className="rv-pm-lbl">Carte CMI</div>
      </div>
    </div>
  </div>

  <button className="rv-confirm-btn" disabled={!canConfirm} onClick={handleConfirm}>
    {processing ? 'Traitement...' : 'Confirmer & payer'}
  </button>
</aside>
      </div>

      {/* ── Mobile bottom bar ── */}
      <div className="rv-spacer rv-mobile-only"></div>
      <div className="rv-reserve-bar rv-mobile-only">
        <div className="rv-bar-total">
          <span className="rv-bar-price">{price.total} MAD</span>
          <span className="rv-bar-sub">Total estime</span>
        </div>
        <button
          className="rv-bar-btn"
          disabled={!canConfirm}
          onClick={handleConfirm}
        >
          {processing ? 'Traitement...' : 'Confirmer & payer'}
        </button>
      </div>

    </div>
  );
};

export default ReservationPage;
