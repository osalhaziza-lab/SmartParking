import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUpPage.css';
import logoApp from '../assets/logo.png';

/* ── Sous-composants Banner (identiques à AuthPage) ── */
const StatItem = ({ value, label }) => (
  <div className="stat">
    <span className="stat__value">{value}</span>
    <span className="stat__label">{label}</span>
  </div>
);

const ParkingSpot = ({ count, label, variant }) => (
  <div className={`spot spot--${variant}`}>
    <span className="spot__count">{count}</span>
    <span className="spot__label">{label}</span>
  </div>
);

/* ── Barre de progression ── */
const STEPS = ['Profil', 'Sécurité', 'Vérif.'];

const StepBar = ({ current }) => (
  <div className="stepbar">
    <div className="stepbar__dots">
      {STEPS.map((_, i) => {
        const n = i + 1;
        const state = n < current ? 'done' : n === current ? 'active' : 'idle';
        return (
          <React.Fragment key={n}>
            <div className={`stepbar__dot stepbar__dot--${state}`}>
              {state === 'done'
                ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6l2.5 2.5L9.5 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                : n}
            </div>
            {n < 3 && <div className={`stepbar__line${n < current ? ' stepbar__line--done' : ''}`} />}
          </React.Fragment>
        );
      })}
    </div>
    <div className="stepbar__labels">
      {STEPS.map((lbl, i) => {
        const n = i + 1;
        const state = n < current ? 'done' : n === current ? 'active' : 'idle';
        return (
          <span key={n} className={`stepbar__lbl stepbar__lbl--${state}`}>{lbl}</span>
        );
      })}
    </div>
  </div>
);

/* ── Icônes SVG inline ── */
const IconUser = () => (
  <svg className="field__icon" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="4.5" r="2.5" stroke="#042C53" strokeWidth="1.2" />
    <path d="M1.5 12c0-2 2.5-3.5 5.5-3.5s5.5 1.5 5.5 3.5" stroke="#042C53" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const IconMail = () => (
  <svg className="field__icon" viewBox="0 0 14 14" fill="none">
    <rect x="1" y="2.5" width="12" height="9" rx="1.5" stroke="#042C53" strokeWidth="1.2" />
    <path d="M1 4.5l6 4 6-4" stroke="#042C53" strokeWidth="1.2" />
  </svg>
);

const IconPhone = () => (
  <svg className="field__icon" viewBox="0 0 14 14" fill="none">
    <rect x="3" y="1" width="8" height="12" rx="1.5" stroke="#042C53" strokeWidth="1.2" />
    <circle cx="7" cy="10.5" r=".7" fill="#042C53" />
  </svg>
);

const IconLock = () => (
  <svg className="field__icon" viewBox="0 0 14 14" fill="none">
    <rect x="2.5" y="6" width="9" height="6.5" rx="1.2" stroke="#042C53" strokeWidth="1.2" />
    <path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke="#042C53" strokeWidth="1.2" />
  </svg>
);

const IconEye = () => (
  <svg viewBox="0 0 14 14" fill="none" width="14" height="14">
    <ellipse cx="7" cy="7" rx="5.5" ry="3.5" stroke="#042C53" strokeWidth="1.2" />
    <circle cx="7" cy="7" r="1.5" stroke="#042C53" strokeWidth="1.2" />
  </svg>
);

const IconCheck = () => (
  <svg className="field__check" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="6" fill="#1D9E75" />
    <path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Champ générique ── */
const Field = ({ label, icon, error, hint, valid, children }) => (
  <div className="su-field">
    <label className="su-label">{label}</label>
    <div className="su-input-wrap">
      {icon}
      {children}
      {valid && <IconCheck />}
    </div>
    {error && <p className="su-error">{error}</p>}
    {hint && !error && <p className="su-hint">{hint}</p>}
  </div>
);

/* ══════════════════════════════════════════
   Étape 1 — Profil
══════════════════════════════════════════ */
const Step1 = ({ data, onChange, onNext }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (data.prenom.length < 2) e.prenom = 'Minimum 2 caractères';
    if (data.nom.length < 2)    e.nom    = 'Minimum 2 caractères';
    if (!data.email.includes('@') || !data.email.includes('.')) e.email = 'Email invalide';
    if (data.tel.replace(/\s/g, '').length < 9) e.tel = 'Numéro invalide';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const isValid = (field) => {
    if (!data[field]) return false;
    if (field === 'prenom' || field === 'nom') return data[field].length >= 2;
    if (field === 'email') return data.email.includes('@') && data.email.includes('.');
    if (field === 'tel') return data.tel.replace(/\s/g, '').length >= 9;
    return false;
  };

  return (
    <>
      <h3 className="su-card__title">Vos informations</h3>
      <p className="su-card__sub">Étape 1 sur 3 — Identité</p>

      <div className="su-row2">
        <Field label="Prénom" icon={<IconUser />} error={errors.prenom} valid={isValid('prenom')}>
          <input
            className={`su-input${errors.prenom ? ' su-input--error' : isValid('prenom') ? ' su-input--valid' : ''}`}
            type="text" placeholder="Yassine"
            value={data.prenom}
            onChange={e => { onChange('prenom', e.target.value); setErrors(p => ({ ...p, prenom: '' })); }}
          />
        </Field>
        <Field label="Nom" icon={<IconUser />} error={errors.nom} valid={isValid('nom')}>
          <input
            className={`su-input${errors.nom ? ' su-input--error' : isValid('nom') ? ' su-input--valid' : ''}`}
            type="text" placeholder="El Mansouri"
            value={data.nom}
            onChange={e => { onChange('nom', e.target.value); setErrors(p => ({ ...p, nom: '' })); }}
          />
        </Field>
      </div>

      <Field label="Email" icon={<IconMail />} error={errors.email} valid={isValid('email')}>
        <input
          className={`su-input${errors.email ? ' su-input--error' : isValid('email') ? ' su-input--valid' : ''}`}
          type="email" placeholder="yassine@email.com"
          value={data.email}
          onChange={e => { onChange('email', e.target.value); setErrors(p => ({ ...p, email: '' })); }}
        />
      </Field>

      <Field label="Téléphone" icon={<IconPhone />} error={errors.tel} hint="Utilisé pour la vérification OTP" valid={isValid('tel')}>
        <input
          className={`su-input${errors.tel ? ' su-input--error' : isValid('tel') ? ' su-input--valid' : ''}`}
          type="tel" placeholder="+212 6xx xxx xxx"
          value={data.tel}
          onChange={e => { onChange('tel', e.target.value); setErrors(p => ({ ...p, tel: '' })); }}
        />
      </Field>

      <button className="su-btn" onClick={() => validate() && onNext()}>Continuer</button>
    </>
  );
};

/* ══════════════════════════════════════════
   Étape 2 — Sécurité
══════════════════════════════════════════ */
const STRENGTH_CONFIG = [
  { label: 'Entrez un mot de passe', color: '#94a3b8' },
  { label: 'Faible',    color: '#E24B4A' },
  { label: 'Moyen',     color: '#EF9F27' },
  { label: 'Fort',      color: '#185FA5' },
  { label: 'Très fort', color: '#1D9E75' },
];

const getStrength = (pw) => {
  let s = 0;
  if (pw.length >= 8)          s++;
  if (/[A-Z]/.test(pw))        s++;
  if (/[0-9]/.test(pw))        s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
};

const Step2 = ({ data, onChange, onNext, onBack }) => {
  const [showPw, setShowPw]   = useState(false);
  const [agreed, setAgreed]   = useState(false);
  const [errors, setErrors]   = useState({});
  const strength = getStrength(data.password);
  const cfg = STRENGTH_CONFIG[data.password ? strength : 0];

  const validate = () => {
    const e = {};
    if (data.password.length < 8)         e.password = 'Minimum 8 caractères';
    if (data.password !== data.password2)  e.password2 = 'Les mots de passe ne correspondent pas';
    if (!agreed)                           e.agree = 'Veuillez accepter les conditions';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <>
      <h3 className="su-card__title">Sécurité du compte</h3>
      <p className="su-card__sub">Étape 2 sur 3 — Mot de passe</p>

      <Field label="Mot de passe" icon={<IconLock />} error={errors.password}>
        <input
          className={`su-input su-input--pw${errors.password ? ' su-input--error' : ''}`}
          type={showPw ? 'text' : 'password'}
          placeholder="Minimum 8 caractères"
          value={data.password}
          onChange={e => { onChange('password', e.target.value); setErrors(p => ({ ...p, password: '' })); }}
        />
        <button type="button" className="su-eye" onClick={() => setShowPw(p => !p)} aria-label="Afficher le mot de passe">
          <IconEye />
        </button>
      </Field>

      {data.password && (
        <div className="su-strength">
          <div className="su-strength__bars">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="su-strength__bar"
                style={{ background: i <= strength ? cfg.color : '#e2e8f0' }} />
            ))}
          </div>
          <p className="su-strength__label" style={{ color: cfg.color }}>{cfg.label}</p>
        </div>
      )}

      <Field label="Confirmer le mot de passe" icon={<IconLock />} error={errors.password2}
        valid={data.password2 && data.password === data.password2}>
        <input
          className={`su-input${errors.password2 ? ' su-input--error' : data.password2 && data.password === data.password2 ? ' su-input--valid' : ''}`}
          type="password" placeholder="Répétez le mot de passe"
          value={data.password2}
          onChange={e => { onChange('password2', e.target.value); setErrors(p => ({ ...p, password2: '' })); }}
        />
      </Field>

      <div className="su-agree" onClick={() => { setAgreed(p => !p); setErrors(p => ({ ...p, agree: '' })); }}>
        <div className={`su-agree__box${agreed ? ' su-agree__box--on' : ''}`}>
          {agreed && (
            <svg width="10" height="10" viewBox="0 0 10 10">
              <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
          )}
        </div>
        <span>J'accepte les <span className="su-agree__link">conditions d'utilisation</span> et la politique de confidentialité de SmartParking</span>
      </div>
      {errors.agree && <p className="su-error">{errors.agree}</p>}

      <button className="su-btn" onClick={() => validate() && onNext()}>Continuer</button>
      <button className="su-btn-back" onClick={onBack}>Retour</button>
    </>
  );
};

/* ══════════════════════════════════════════
   Étape 3 — OTP
══════════════════════════════════════════ */
const OTP_LENGTH = 6;

const Step3 = ({ tel, onSuccess, onBack }) => {
  const [method, setMethod]     = useState('sms');
  const [otp, setOtp]           = useState(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer]       = useState(60);
  const [canResend, setResend]  = useState(false);
  const [attempts, setAttempts] = useState(3);
  const [error, setError]       = useState('');
  const inputsRef               = useRef([]);
  const intervalRef             = useRef(null);

  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    setTimer(60); setResend(false);
    intervalRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) { clearInterval(intervalRef.current); setResend(true); return 0; }
        return t - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => { startTimer(); return () => clearInterval(intervalRef.current); }, [startTimer]);

  const handleOtp = (e, idx) => {
    const val = e.target.value.replace(/\D/g, '').slice(-1);
    const next = [...otp]; next[idx] = val;
    setOtp(next); setError('');
    if (val && idx < OTP_LENGTH - 1) inputsRef.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) inputsRef.current[idx - 1]?.focus();
  };

  const verify = () => {
    if (otp.join('').length < OTP_LENGTH) { setError('Entrez les 6 chiffres du code'); return; }
    // Simulation : tout code complet est accepté
    // Appel de la redirection directe vers la page d'accueil
    onSuccess();
  };

  const resend = () => {
    setOtp(Array(OTP_LENGTH).fill(''));
    setAttempts(3);
    setError('');
    startTimer();
    inputsRef.current[0]?.focus();
  };

  const circumference = 2 * Math.PI * 26;
  const offset = (circumference * (1 - timer / 60)).toFixed(2);

  return (
    <>
      <h3 className="su-card__title">Vérification SMS</h3>
      <p className="su-card__sub">Étape 3 sur 3 — Code OTP</p>

      <p className="su-otp-method-title">Méthode de réception</p>
      <div className="su-methods">
        {['sms', 'email'].map(m => (
          <button key={m} type="button"
            className={`su-method${method === m ? ' su-method--active' : ''}`}
            onClick={() => setMethod(m)}>
            {m === 'sms'
              ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="3" y="1" width="8" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="7" cy="10.5" r=".7" fill="currentColor" />
                </svg>
              : <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="2.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M1 4.5l6 4 6-4" stroke="currentColor" strokeWidth="1.2" />
                </svg>}
            <span>{m === 'sms' ? 'SMS' : 'Email'}</span>
          </button>
        ))}
      </div>

      <div className="su-otp-row">
        {otp.map((v, i) => (
          <input key={i}
            ref={el => inputsRef.current[i] = el}
            className={`su-otp-input${v ? ' su-otp-input--filled' : ''}`}
            maxLength={1} type="tel" inputMode="numeric"
            value={v}
            onChange={e => handleOtp(e, i)}
            onKeyDown={e => handleKeyDown(e, i)}
          />
        ))}
      </div>
      {error && <p className="su-error su-error--center">{error}</p>}

      {/* Timer circulaire */}
      <div className="su-timer">
        <svg className="su-timer__svg" viewBox="0 0 64 64">
          <circle className="su-timer__bg" cx="32" cy="32" r="26" />
          <circle className="su-timer__arc" cx="32" cy="32" r="26"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ stroke: timer <= 10 ? '#E24B4A' : '#185FA5' }} />
        </svg>
        <span className="su-timer__num" style={{ color: timer <= 10 ? '#E24B4A' : '#042C53' }}>{timer}</span>
      </div>

      <div className="su-resend">
        <span className="su-resend__lbl">Code non reçu ?</span>
        <button type="button"
          className={`su-resend__btn${canResend ? ' su-resend__btn--active' : ''}`}
          onClick={canResend ? resend : undefined}
          disabled={!canResend}>
          Renvoyer le code
        </button>
      </div>

      <p className="su-attempts-lbl">Tentatives restantes</p>
      <div className="su-attempts">
        {[0, 1, 2].map(i => (
          <div key={i} className={`su-attempt${i >= attempts ? ' su-attempt--used' : ''}`} />
        ))}
      </div>

      <button className="su-btn" onClick={verify} disabled={otp.join('').length < OTP_LENGTH}>
        Vérifier le code
      </button>
      <button className="su-btn-back" onClick={onBack}>Retour</button>
    </>
  );
};

/* ══════════════════════════════════════════
   Page principale
══════════════════════════════════════════ */
const SignUpPage = ({ onSuccess }) => {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    prenom: '', nom: '', email: '', tel: '',
    password: '', password2: '',
  });

  const update = (field, value) => setForm(p => ({ ...p, [field]: value }));

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1 data={form} onChange={update} onNext={() => setStep(2)} />;
      case 2: return <Step2 data={form} onChange={update} onNext={() => setStep(3)} onBack={() => setStep(1)} />;
      case 3: return <Step3 tel={form.tel} onSuccess={() => { onSuccess(); navigate('/home'); }} onBack={() => setStep(2)} />
      default: return null;
    }
  };

  const heroSub = [
    'Rejoignez SmartParking',
    'Choisissez un mot de passe sécurisé',
    'Confirmez votre numéro de téléphone'
  ][step - 1];

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
            <h1 className="banner__title">Stationnez<br />plus malin.</h1>
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
                {[40, 80].map(y => <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#185FA5" strokeWidth=".5" opacity=".25" />)}
                {[75, 150, 225].map(x => <line key={x} x1={x} y1="0" x2={x} y2="120" stroke="#185FA5" strokeWidth=".5" opacity=".25" />)}
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

      {/* ── Formulaire multi-étapes ── */}
      <main className="form-side">
        <div className="su-card">

          {/* Header hero */}
          <div className="su-hero">
            <div className="su-hero__logo">
              <img src={logoApp} alt="SmartParking" />
            </div>
            <h2 className="su-hero__title">Créer un compte</h2>
            {heroSub && <p className="su-hero__sub">{heroSub}</p>}
            <StepBar current={step} />
          </div>

          {/* Corps de l'étape */}
          <div className="su-body">
            {renderStep()}
          </div>

          {/* Lien retour connexion */}
          <p className="su-back-login">
            Déjà un compte ?{' '}
            <button type="button" className="su-back-login__link" onClick={() => navigate('/login')}>
              Se connecter
            </button>
          </p>

        </div>
      </main>

    </div>
  );
};

export default SignUpPage;