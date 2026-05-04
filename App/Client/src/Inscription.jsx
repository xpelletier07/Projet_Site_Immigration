import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Inscription.css'

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)
const ScaleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v18M3 9l9-6 9 6M5 11l-2 6h18l-2-6"/>
  </svg>
)
const BuildingIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M9 21V9"/>
  </svg>
)
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)
const EyeIcon = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {open ? (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>) : (<><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>)}
  </svg>
)

export default function Inscription() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', tel: '', password: '', confirm: '', terms: false })
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field, value) => {
    setForm(p => ({ ...p, [field]: value }))
    if (errors[field]) setErrors(p => ({ ...p, [field]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.prenom.trim()) e.prenom = 'Requis'
    if (!form.nom.trim()) e.nom = 'Requis'
    if (!form.email.includes('@')) e.email = 'Email invalide'
    if (form.password.length < 8) e.password = 'Min. 8 caractères'
    if (form.password !== form.confirm) e.confirm = 'Non identiques'
    if (!form.terms) e.terms = 'Obligatoire'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validate()
    setErrors(e2)
    if (Object.keys(e2).length === 0) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="ins-page">
        <nav className="ins-nav">
          <div className="ins-brand"><BuildingIcon /><span>The Sovereign Ledger</span></div>
          <div className="ins-nav-right"><span className="ins-nav-text">Déjà inscrit ?</span><a href="#" className="ins-nav-link">Connexion</a></div>
        </nav>
        <div className="ins-success-wrap">
          <div className="ins-success">
            <div className="ins-success-icon">✓</div>
            <h2>Compte créé avec succès</h2>
            <p>Un email de vérification a été envoyé à <strong>{form.email}</strong>. Veuillez vérifier votre boîte de réception pour continuer.</p>
            <button className="ins-submit-btn" onClick={() => setSubmitted(false)}>Retour</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ins-page">
      {/* Nav */}
      <nav className="ins-nav">
        <div className="ins-brand"><BuildingIcon /><span>The Sovereign Ledger</span></div>
        <div className="ins-nav-right">
          <span className="ins-nav-text">Déjà inscrit ?</span>
          <a href="#" className="ins-nav-link">Connexion</a>
        </div>
      </nav>

      {/* Body */}
      <div className="ins-body">
        {/* Left panel */}
        <aside className="ins-left">
          <div className="ins-left-content">
            <p className="ins-left-label">Votre portail officiel.</p>
            <p className="ins-left-desc">
              Bienvenue sur le registre officiel. En créant un compte, vous entamez un processus sécurisé de gestion de votre dossier d'immigration. Chaque donnée est protégée par les protocoles de sécurité du Sovereign Ledger.
            </p>
            <div className="ins-features">
              <div className="ins-feature">
                <span className="ins-feature-icon"><ShieldIcon /></span>
                <div>
                  <div className="ins-feature-title">Sécurité de niveau souverain</div>
                  <div className="ins-feature-sub">Chiffrement de bout en bout pour tous les documents.</div>
                </div>
              </div>
              <div className="ins-feature">
                <span className="ins-feature-icon"><ScaleIcon /></span>
                <div>
                  <div className="ins-feature-title">Cadre Juridique</div>
                  <div className="ins-feature-sub">Conformité totale avec les lois sur la protection des données personnelles.</div>
                </div>
              </div>
            </div>
          </div>
          <div className="ins-left-img">
            <div className="ins-img-placeholder">
              <div className="ins-img-inner">
                <div className="ins-desk-svg">
                  <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="320" height="200" fill="#e8ecf0"/>
                    <rect x="80" y="40" width="160" height="110" rx="4" fill="#2c3e50"/>
                    <rect x="84" y="44" width="152" height="102" rx="2" fill="#1a252f"/>
                    <rect x="90" y="50" width="140" height="90" fill="#0d1b2a"/>
                    <rect x="95" y="55" width="60" height="4" rx="1" fill="#3a7bd5" opacity=".7"/>
                    <rect x="95" y="63" width="40" height="3" rx="1" fill="#4a5568" opacity=".5"/>
                    <rect x="95" y="70" width="130" height="2" rx="1" fill="#2d3748" opacity=".6"/>
                    <rect x="95" y="76" width="110" height="2" rx="1" fill="#2d3748" opacity=".5"/>
                    <rect x="95" y="82" width="120" height="2" rx="1" fill="#2d3748" opacity=".4"/>
                    <rect x="140" y="150" width="40" height="6" rx="1" fill="#b0bec5"/>
                    <rect x="60" y="156" width="200" height="6" rx="2" fill="#90a4ae"/>
                    <rect x="20" y="162" width="280" height="3" rx="1" fill="#78909c"/>
                    <circle cx="240" cy="140" r="20" fill="none" stroke="#b0bec5" strokeWidth="1.5"/>
                    <path d="M230 140h20M240 130v20" stroke="#b0bec5" strokeWidth="1.5"/>
                    <rect x="30" y="100" width="40" height="4" rx="1" fill="#b0bec5" opacity=".4"/>
                    <rect x="30" y="108" width="30" height="4" rx="1" fill="#b0bec5" opacity=".3"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right panel - form */}
        <main className="ins-right">
          {/* Steps */}
          <div className="ins-steps">
            <div className="ins-step ins-step-active">
              <span>Étape 1: Informations<br/>Personnelles</span>
            </div>
            <div className="ins-step ins-step-next">
              <span className="ins-step-label-sm">Prochaine étape:</span>
              <span>Vérification</span>
            </div>
          </div>

          <h2 className="ins-form-title">Création de compte</h2>
          <p className="ins-form-sub">Veuillez renseigner vos informations telles qu'elles apparaissent sur vos documents officiels.</p>

          <form onSubmit={handleSubmit} noValidate className="ins-form">
            {/* Prénom + Nom */}
            <div className="ins-row">
              <div className="ins-field">
                <label>Prénom</label>
                <input
                  className={errors.prenom ? 'error' : ''}
                  value={form.prenom}
                  onChange={e => handleChange('prenom', e.target.value)}
                  placeholder="James"
                />
                {errors.prenom && <span className="ins-err">{errors.prenom}</span>}
              </div>
              <div className="ins-field">
                <label>Nom de famille</label>
                <input
                  className={errors.nom ? 'error' : ''}
                  value={form.nom}
                  onChange={e => handleChange('nom', e.target.value)}
                  placeholder="Curt"
                />
                {errors.nom && <span className="ins-err">{errors.nom}</span>}
              </div>
            </div>

            {/* Email */}
            <div className="ins-field">
              <label>Adresse e-mail</label>
              <input
                type="email"
                className={errors.email ? 'error' : ''}
                value={form.email}
                onChange={e => handleChange('email', e.target.value)}
                placeholder="james.curt@example.com"
              />
              {errors.email && <span className="ins-err">{errors.email}</span>}
            </div>

            {/* Téléphone */}
            <div className="ins-field">
              <label>Téléphone</label>
              <div className="ins-tel-wrap">
                <span className="ins-tel-prefix">+1</span>
                <input
                  type="tel"
                  value={form.tel}
                  onChange={e => handleChange('tel', e.target.value)}
                  placeholder="..."
                />
              </div>
            </div>

            {/* Password + Confirm */}
            <div className="ins-row">
              <div className="ins-field">
                <label>Mot de passe</label>
                <div className="ins-pwd-wrap">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    className={errors.password ? 'error' : ''}
                    value={form.password}
                    onChange={e => handleChange('password', e.target.value)}
                  />
                  <button type="button" className="ins-eye" onClick={() => setShowPwd(p => !p)}>
                    <EyeIcon open={showPwd} />
                  </button>
                </div>
                {errors.password && <span className="ins-err">{errors.password}</span>}
              </div>
              <div className="ins-field">
                <label>Confirmation</label>
                <div className="ins-pwd-wrap">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    className={errors.confirm ? 'error' : ''}
                    value={form.confirm}
                    onChange={e => handleChange('confirm', e.target.value)}
                  />
                  <button type="button" className="ins-eye" onClick={() => setShowConfirm(p => !p)}>
                    <EyeIcon open={showConfirm} />
                  </button>
                </div>
                {errors.confirm && <span className="ins-err">{errors.confirm}</span>}
              </div>
            </div>

            {/* Terms */}
            <div className="ins-terms">
              <label className={`ins-terms-label ${errors.terms ? 'error' : ''}`}>
                <input type="checkbox" checked={form.terms} onChange={e => handleChange('terms', e.target.checked)} />
                <span>
                  En cochant cette case, je certifie que les informations fournies sont exactes. Je reconnais avoir pris connaissance de la <a href="#">Politique de Confidentialité</a> et des <a href="#">Conditions d'Utilisation</a> du Sovereign Ledger.
                </span>
              </label>
              {errors.terms && <span className="ins-err">{errors.terms}</span>}
            </div>

            <button type="submit" className="ins-submit-btn">
              Continuer l'inscription <ArrowIcon />
            </button>
          </form>
        </main>
      </div>

      {/* Footer */}
      <footer className="ins-footer">
        <div className="ins-footer-inner">
          <div className="ins-footer-brand">
            <div className="ins-footer-name">The Sovereign Ledger</div>
            <div className="ins-footer-copy">© 2024 The Sovereign Ledger. An official government digital service. Tous droits réservés.</div>
          </div>
          <div className="ins-footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Legal Notice</a>
            <a href="#">Accessibility</a>
            <a href="#" className="ins-footer-contact">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}