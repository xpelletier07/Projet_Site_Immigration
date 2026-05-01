import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'

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
      // Simulation de vérification des credentials
      // En production, cela ferait un appel API
      if (!email || !password) {
        setError('Veuillez remplir tous les champs')
        setLoading(false)
        return
      }

      // Données de test pour la démonstration
      const testAccounts = {
        'client@example.com': { password: 'client123', role: 'client' },
        'user@example.com': { password: 'user123', role: 'utilisateur' },
        'admin@example.com': { password: 'admin123', role: 'admin' }
      }

      const account = testAccounts[email]
      
      if (account && account.password === password) {
        // Simulation d'un délai réseau
        setTimeout(() => {
          localStorage.setItem('userRole', account.role)
          localStorage.setItem('userEmail', email)
          localStorage.setItem('token', 'fake-jwt-token-' + Date.now())
          onSetRole(account.role)
          navigate('/')
        }, 500)
      } else {
        setError('Email ou mot de passe incorrect')
        setLoading(false)
      }
    } catch (err) {
      setError('Une erreur s\'est produite lors de la connexion')
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
