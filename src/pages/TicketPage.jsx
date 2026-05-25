import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TicketPage.css';

/* ─── Données simulées ──────────────────────────────────────── */
const TICKET = {
  parking:    'Parking Maarif Centre',
  address:    '15 Rue Abou Inane, Maarif, Casablanca',
  place:      'B-12',
  level:      'Niveau 1',
  pin:        '4 8 2 7',
  date:       'Lun 12 Mai 2025',
  arrival:    '10h00',
  duration:   '2h',
  departure:  '12h00',
  total:      '16 MAD',
  code:       'SP-4471',
};

/* ─── QR Code SVG généré ────────────────────────────────────── */
const QRCode = ({ size = 160 }) => {
  // Matrice 21×21 simplifiée — motif représentatif
  const cells = [
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,0],
    [1,0,0,0,0,0,1,0,0,1,0,1,1,0,0,0,0,0,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,1,0],
    [1,0,1,1,1,0,1,0,0,1,1,1,1,0,1,1,1,0,1,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,0,1,0,1,1,1,0,1,1,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,0],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,1,0],
    [1,1,0,1,1,0,1,1,0,0,1,1,1,1,0,1,0,1,1,0,1],
    [0,1,1,0,0,1,0,1,1,0,1,0,0,1,1,0,1,0,0,1,0],
    [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,0,0,1],
    [0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,0,1,1,0,1,1],
    [1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,0,0],
    [0,0,0,0,0,0,0,0,1,0,0,1,0,1,1,0,0,1,0,1,0],
    [1,1,1,1,1,1,1,0,0,1,1,0,1,0,1,0,1,1,0,0,1],
    [1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,1,0,0,1,1,0],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,1,1,0,1,0,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,0,0,0,1,0,1,1,1,0],
    [1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,0,1,0,0,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,1,0,1,1,1,0,1,1,0,0],
    [1,1,1,1,1,1,1,0,1,0,0,1,1,0,0,0,1,1,0,1,1],
  ];
  const cell = size / 21;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} shapeRendering="crispEdges">
      <rect width={size} height={size} fill="white"/>
      {cells.map((row, r) =>
        row.map((v, c) =>
          v ? <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill="#042C53"/> : null
        )
      )}
    </svg>
  );
};

/* ─── Icônes ─────────────────────────────────────────────────── */
const IconSMS = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="1.5" y="3" width="15" height="11" rx="2" stroke="#185FA5" strokeWidth="1.2"/>
    <circle cx="14" cy="2.5" r="3" fill="#E24B4A"/>
    <text x="14" y="4.5" textAnchor="middle" fontSize="4" fill="white" fontFamily="sans-serif" fontWeight="700">!</text>
    <path d="M5 8h8M5 11h5" stroke="#185FA5" strokeWidth="1" strokeLinecap="round" opacity=".5"/>
  </svg>
);

const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="1.5" y="3.5" width="15" height="11" rx="2" stroke="#185FA5" strokeWidth="1.2"/>
    <path d="M1.5 6l7 5 7-5" stroke="#185FA5" strokeWidth="1.2"/>
  </svg>
);

const IconDownload = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 3v7M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 13h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const IconPrint = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="3" y="1.5" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M3 8.5H2a1 1 0 00-1 1v3a1 1 0 001 1h12a1 1 0 001-1v-3a1 1 0 00-1-1h-1" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="4" y="10.5" width="8" height="4" rx=".5" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="12.5" cy="10" r=".8" fill="currentColor"/>
  </svg>
);

const IconShare = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 2l6 14-6-3.5L3 16 9 2z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" fill="none"/>
  </svg>
);

const IconNFC = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M8 14c0-3.3 2.7-6 6-6" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M5 14c0-5 4-9 9-9" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity=".6"/>
    <path d="M2 14c0-6.6 5.4-12 12-12" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity=".3"/>
    <circle cx="14" cy="14" r="2" fill="white"/>
  </svg>
);

const IconBack = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 13L5 8l5-5" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Composant : Infos ticket ───────────────────────────────── */
const TicketInfoRow = ({ label, value, highlight }) => (
  <div className="tk-info-row">
    <span className="tk-info-label">{label}</span>
    <span className={`tk-info-value${highlight ? ' tk-info-value--green' : ''}`}>{value}</span>
  </div>
);

/* ─── Page principale ────────────────────────────────────────── */
const TicketPage = () => {
  const navigate   = useNavigate();
  const [tab, setTab]     = useState('qr');   // 'qr' | 'pin' | 'nfc'
  const [smsVal, setSms]  = useState('');
  const [mailVal, setMail] = useState('');
  const [smsSent, setSmsSent]   = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const [nfcActive, setNfc]     = useState(false);

  // Pulse NFC
  useEffect(() => {
    if (tab === 'nfc') {
      const t = setTimeout(() => setNfc(true), 400);
      return () => clearTimeout(t);
    } else {
      setNfc(false);
    }
  }, [tab]);

  const sendSms  = () => { if (smsVal)  { setSmsSent(true);  setTimeout(() => setSmsSent(false),  2500); } };
  const sendMail = () => { if (mailVal) { setMailSent(true); setTimeout(() => setMailSent(false), 2500); } };

  /* ── Rendu du panneau central selon l'onglet ── */
  const renderTabContent = () => {
    if (tab === 'qr') return (
      <div className="tk-qr-wrap">
        <div className="tk-qr-box">
          <QRCode size={180} />
        </div>
        <p className="tk-qr-hint">Scannez à l'entrée du parking</p>
      </div>
    );

    if (tab === 'pin') return (
      <div className="tk-pin-wrap">
        <p className="tk-pin-label">Code PIN d'accès</p>
        <div className="tk-pin-display">
          {TICKET.pin.split(' ').map((d, i) => (
            <div key={i} className="tk-pin-digit">{d}</div>
          ))}
        </div>
        <p className="tk-pin-hint">Saisissez ce code sur le clavier de la borne</p>
        <div className="tk-pin-info">
          <div className="tk-pin-info-row"><span>Validité</span><span>{TICKET.date} · jusqu'à {TICKET.departure}</span></div>
          <div className="tk-pin-info-row"><span>Place</span><span>{TICKET.level} · Place {TICKET.place}</span></div>
        </div>
      </div>
    );

    if (tab === 'nfc') return (
      <div className="tk-nfc-wrap">
        <div className={`tk-nfc-ring${nfcActive ? ' tk-nfc-ring--active' : ''}`}>
          <div className="tk-nfc-circle">
            <IconNFC />
          </div>
        </div>
        <p className="tk-nfc-label">Approchez le téléphone de la borne</p>
        <p className="tk-nfc-sub">Maintenez votre appareil à 2–4 cm du lecteur NFC</p>
        <div className={`tk-nfc-status${nfcActive ? ' tk-nfc-status--ready' : ''}`}>
          <span className="tk-nfc-dot" />
          {nfcActive ? 'NFC prêt · En attente de la borne' : 'Activation NFC...'}
        </div>
      </div>
    );
  };

  return (
    <div className="tk-root">

      {/* ══ DESKTOP ══ */}
      <div className="tk-desktop tk-desktop-only">

        {/* Header */}
        <div className="tk-desktop-header">
          <button className="tk-back-btn" onClick={() => navigate(-1)}>
            <IconBack />
            Retour au parking
          </button>
          <div className="tk-desktop-header__title">
            <div className="tk-desktop-header__logo">
              MC
            </div>
            <div>
              <p className="tk-desktop-header__name">{TICKET.parking}</p>
              <p className="tk-desktop-header__addr">{TICKET.address}</p>
            </div>
          </div>
          <div className="tk-desktop-header__code">
            <span className="tk-desktop-header__code-label">Réservation</span>
            <span className="tk-desktop-header__code-val">{TICKET.code}</span>
          </div>
        </div>

        {/* Corps 2 colonnes */}
        <div className="tk-desktop-body">

          {/* Colonne gauche */}
          <div className="tk-desktop-left">

            {/* Résumé de la réservation */}
            <div className="tk-card">
              <h2 className="tk-card__title">Récapitulatif de la réservation</h2>
              <div className="tk-summary-grid">
                <TicketInfoRow label="Parking"    value={TICKET.parking} />
                <TicketInfoRow label="Date"       value={TICKET.date} />
                <TicketInfoRow label="Arrivée"    value={TICKET.arrival} />
                <TicketInfoRow label="Départ"     value={TICKET.departure} />
                <TicketInfoRow label="Durée"      value={TICKET.duration} />
                <TicketInfoRow label="Niveau"     value={TICKET.level} />
                <TicketInfoRow label="Place"      value={TICKET.place} />
                <TicketInfoRow label="Total payé" value={TICKET.total} highlight />
              </div>
            </div>

            {/* Envoi sur mobile */}
            <div className="tk-card">
              <h2 className="tk-card__title">Emportez votre ticket sur votre mobile</h2>
              <p className="tk-card__sub">Recevez votre QR code directement sur votre téléphone</p>

              <div className="tk-send-field">
                <div className="tk-send-input-wrap">
                  <div className="tk-send-icon"><IconSMS /></div>
                  <input
                    className="tk-send-input"
                    type="tel"
                    placeholder="+212 6xx xxx xxx"
                    value={smsVal}
                    onChange={e => setSms(e.target.value)}
                  />
                  <button className={`tk-send-btn${smsSent ? ' tk-send-btn--sent' : ''}`} onClick={sendSms}>
                    {smsSent ? '✓ Envoyé' : 'Envoyer'}
                  </button>
                </div>
              </div>

              <div className="tk-send-field">
                <div className="tk-send-input-wrap">
                  <div className="tk-send-icon"><IconMail /></div>
                  <input
                    className="tk-send-input"
                    type="email"
                    placeholder="votre@email.com"
                    value={mailVal}
                    onChange={e => setMail(e.target.value)}
                  />
                  <button className={`tk-send-btn${mailSent ? ' tk-send-btn--sent' : ''}`} onClick={sendMail}>
                    {mailSent ? '✓ Envoyé' : 'Envoyer'}
                  </button>
                </div>
              </div>

              <div className="tk-divider" />

              <div className="tk-action-row">
                <button className="tk-action-btn">
                  <IconDownload /> Télécharger le ticket PDF
                </button>
                <button className="tk-action-btn">
                  <IconPrint /> Imprimer
                </button>
              </div>
            </div>

          </div>

          {/* Colonne droite */}
          <div className="tk-desktop-right">

            {/* QR Code */}
            <div className="tk-card tk-card--qr">
              <div className="tk-card__title-row">
                <h2 className="tk-card__title">Code d'accès</h2>
                <span className="tk-card__badge">
                  <span className="tk-card__badge-dot" />
                  Valide
                </span>
              </div>
              <div className="tk-qr-box tk-qr-box--desktop">
                <QRCode size={200} />
              </div>
              <p className="tk-qr-code-val">{TICKET.code}</p>
              <p className="tk-qr-hint tk-qr-hint--desktop">Scannez à l'entrée du parking</p>

              <div className="tk-code-info">
                <div className="tk-code-info-row">
                  <span className="tk-code-info-label">PIN</span>
                  <span className="tk-code-info-value tk-pin-mono">{TICKET.pin}</span>
                </div>
                <div className="tk-code-info-row">
                  <span className="tk-code-info-label">Niveau / Place</span>
                  <span className="tk-code-info-value">{TICKET.level} · {TICKET.place}</span>
                </div>
                <div className="tk-code-info-row">
                  <span className="tk-code-info-label">Validité</span>
                  <span className="tk-code-info-value">{TICKET.date} · {TICKET.arrival}–{TICKET.departure}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ══ MOBILE ══ */}
      <div className="tk-mobile tk-mobile-only">

        {/* Header */}
        <div className="tk-mobile-header">
          <button className="tk-mobile-back" onClick={() => navigate(-1)}>
            <IconBack />
          </button>
          <div className="tk-mobile-header__info">
            <p className="tk-mobile-header__name">{TICKET.parking}</p>
            <p className="tk-mobile-header__code">{TICKET.code}</p>
          </div>
          <div className={`tk-mobile-badge${true ? ' tk-mobile-badge--valid' : ''}`}>Valide</div>
        </div>

        {/* Hero QR / récap */}
        <div className="tk-mobile-hero">
          <div className="tk-mobile-recap">
            <div className="tk-mobile-recap__item">
              <span className="tk-mobile-recap__label">Place</span>
              <span className="tk-mobile-recap__val">{TICKET.place}</span>
            </div>
            <div className="tk-mobile-recap__sep" />
            <div className="tk-mobile-recap__item">
              <span className="tk-mobile-recap__label">Niveau</span>
              <span className="tk-mobile-recap__val">{TICKET.level.replace('Niveau ', '')}</span>
            </div>
            <div className="tk-mobile-recap__sep" />
            <div className="tk-mobile-recap__item">
              <span className="tk-mobile-recap__label">Durée</span>
              <span className="tk-mobile-recap__val">{TICKET.duration}</span>
            </div>
            <div className="tk-mobile-recap__sep" />
            <div className="tk-mobile-recap__item">
              <span className="tk-mobile-recap__label">Départ</span>
              <span className="tk-mobile-recap__val">{TICKET.departure}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tk-mobile-tabs">
          {[
            { key: 'qr',  label: 'Code QR' },
            { key: 'pin', label: 'PIN' },
            { key: 'nfc', label: 'NFC' },
          ].map(t => (
            <button
              key={t.key}
              className={`tk-mobile-tab${tab === t.key ? ' tk-mobile-tab--active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Contenu de l'onglet */}
        <div className="tk-mobile-tab-content">
          {renderTabContent()}
        </div>

        {/* Actions bas */}
        <div className="tk-mobile-actions">
          <button className="tk-mobile-action-btn tk-mobile-action-btn--primary">
            <IconShare />
            <span>Itinéraire</span>
          </button>
          <button className="tk-mobile-action-btn tk-mobile-action-btn--secondary">
            <IconDownload />
            <span>Télécharger</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default TicketPage;