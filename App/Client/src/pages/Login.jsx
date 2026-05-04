import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function Login({ onSetRole }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!email || !password) {
        setError('Veuillez remplir tous les champs')
        return
      }

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          courriel: email,
          MDP: password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data?.message || 'Email ou mot de passe incorrect')
        return
      }

      if (!data?.token || !data?.type) {
        setError('Réponse d’authentification invalide')
        return
      }

      sessionStorage.setItem('token', data.token)
      sessionStorage.setItem('userRole', data.type)
      sessionStorage.setItem('userEmail', email)

      localStorage.removeItem('token')

      onSetRole(data.type)
      navigate('/')
    } catch (err) {
      setError('Une erreur s\'est produite lors de la connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h1>Immigration Portal</h1>
            <p>Connexion à votre compte</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Adresse Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@example.com"
                className="form-input"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
                disabled={loading}
              />
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          <div className="login-footer">
            <p>Vous n'avez pas de compte? <a href="#signup">S'inscrire</a></p>
            <p><a href="#forgot">Mot de passe oublié?</a></p>
          </div>

          {/* Comptes de démonstration */}
          <div className="demo-accounts">
            <h3>Comptes de Test</h3>
            <div className="account">
              <p><strong>Client:</strong></p>
              <p>Email: client@example.com</p>
              <p>Mot de passe: client123</p>
            </div>
            <div className="account">
              <p><strong>Utilisateur (Employé):</strong></p>
              <p>Email: user@example.com</p>
              <p>Mot de passe: user123</p>
            </div>
            <div className="account">
              <p><strong>Admin:</strong></p>
              <p>Email: admin@example.com</p>
              <p>Mot de passe: admin123</p>
            </div>
          </div>
        </div>

        <div className="login-background">
          <div className="background-content">
            <h2>Bienvenue</h2>
            <p>Gérez vos documents d'immigration en toute sécurité</p>
          </div>
        </div>
      </div>
    </div>
  )
}
