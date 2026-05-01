import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

const EyeIcon = ({ open }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </>
    )}
  </svg>
)

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
)

export default function Inscription() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', password: '', confirm: '', terms: false })
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [focused, setFocused] = useState(null)

  const rules = {
    length: form.password.length >= 8,
    upper: /[A-Z]/.test(form.password),
    number: /[0-9]/.test(form.password),
  }

  const validate = () => {
    const e = {}
    if (!form.prenom.trim()) e.prenom = 'Champ requis'
    if (!form.nom.trim()) e.nom = 'Champ requis'
    if (!form.email.includes('@')) e.email = 'Email invalide'
    if (!rules.length || !rules.upper || !rules.number) e.password = 'Mot de passe trop faible'
    if (form.password !== form.confirm) e.confirm = 'Les mots de passe ne correspondent pas'
    if (!form.terms) e.terms = 'Vous devez accepter les conditions'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validate()
    setErrors(e2)
    if (Object.keys(e2).length === 0) setSubmitted(true)
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  if (submitted) {
    return (
      <div className="page">
        <div className="card success-card">
          <div className="success-icon">✦</div>
          <h2 className="success-title">Bienvenue, {form.prenom} !</h2>
          <p className="success-text">
            Votre compte a été créé avec succès. Un email de confirmation a été envoyé à <strong>{form.email}</strong>.
          </p>
          <button className="btn" onClick={() => { setSubmitted(false); setForm({ prenom: '', nom: '', email: '', password: '', confirm: '', terms: false }) }}>
            Retour
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="card">
        <div className="header">
          <div className="logo">✦</div>
          <h1 className="title">Créer un compte</h1>
          <p className="subtitle">Rejoignez-nous dès aujourd'hui</p>
        </div>

        <form onSubmit={handleSubmit} className="form" noValidate>
          <div className="row">
            <Field label="Prénom" id="prenom" value={form.prenom} error={errors.prenom}
              focused={focused === 'prenom'}
              onChange={v => handleChange('prenom', v)}
              onFocus={() => setFocused('prenom')}
              onBlur={() => setFocused(null)}
              placeholder="Marie" />
            <Field label="Nom" id="nom" value={form.nom} error={errors.nom}
              focused={focused === 'nom'}
              onChange={v => handleChange('nom', v)}
              onFocus={() => setFocused('nom')}
              onBlur={() => setFocused(null)}
              placeholder="Dupont" />
          </div>

          <Field label="Adresse email" id="email" type="email" value={form.email} error={errors.email}
            focused={focused === 'email'}
            onChange={v => handleChange('email', v)}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            placeholder="marie@exemple.com" />

          <div className="field-wrap">
            <label className="label" htmlFor="password">Mot de passe</label>
            <div className={`input-wrap ${focused === 'password' ? 'is-focused' : ''} ${errors.password ? 'is-error' : ''}`}>
              <input
                id="password"
                type={showPwd ? 'text' : 'password'}
                className="input"
                value={form.password}
                placeholder="••••••••"
                onChange={e => handleChange('password', e.target.value)}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
              />
              <button type="button" className="eye-btn" onClick={() => setShowPwd(p => !p)}>
                <EyeIcon open={showPwd} />
              </button>
            </div>
            {form.password && (
              <div className="rules">
                {[['length', '8 caractères min.'], ['upper', '1 majuscule'], ['number', '1 chiffre']].map(([k, label]) => (
                  <span key={k} className={`rule ${rules[k] ? 'ok' : ''}`}>
                    <span className="rule-icon">{rules[k] ? <CheckIcon /> : '○'}</span> {label}
                  </span>
                ))}
              </div>
            )}
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="field-wrap">
            <label className="label" htmlFor="confirm">Confirmer le mot de passe</label>
            <div className={`input-wrap ${focused === 'confirm' ? 'is-focused' : ''} ${errors.confirm ? 'is-error' : ''}`}>
              <input
                id="confirm"
                type={showConfirm ? 'text' : 'password'}
                className="input"
                value={form.confirm}
                placeholder="••••••••"
                onChange={e => handleChange('confirm', e.target.value)}
                onFocus={() => setFocused('confirm')}
                onBlur={() => setFocused(null)}
              />
              <button type="button" className="eye-btn" onClick={() => setShowConfirm(p => !p)}>
                <EyeIcon open={showConfirm} />
              </button>
            </div>
            {errors.confirm && <span className="error">{errors.confirm}</span>}
          </div>

          <div className="checkbox-wrap">
            <label className={`checkbox-label ${errors.terms ? 'is-error' : ''}`}>
              <input type="checkbox" checked={form.terms} onChange={e => handleChange('terms', e.target.checked)} className="checkbox-input" />
              <span className="checkbox-custom">{form.terms && <CheckIcon />}</span>
              <span className="checkbox-text">J'accepte les <a href="#" className="link">conditions d'utilisation</a> et la <a href="#" className="link">politique de confidentialité</a></span>
            </label>
            {errors.terms && <span className="error">{errors.terms}</span>}
          </div>

          <button type="submit" className="btn btn-full">
            Créer mon compte
          </button>

          <p className="login-link">
            Déjà inscrit ? <a href="#" className="link">Se connecter</a>
            {' · '}
            <span className="link" style={{cursor:'pointer'}} onClick={() => navigate('/admin')}>
              Accès Admin
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

function Field({ label, id, type = 'text', value, error, focused, onChange, onFocus, onBlur, placeholder }) {
  return (
    <div className="field-wrap">
      <label className="label" htmlFor={id}>{label}</label>
      <div className={`input-wrap ${focused ? 'is-focused' : ''} ${error ? 'is-error' : ''}`}>
        <input
          id={id}
          type={type}
          className="input"
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  )
}