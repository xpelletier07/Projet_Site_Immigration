import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'

export default function Home({ onSetRole }) {
  const navigate = useNavigate()

  const handleSelectRole = (role) => {
    localStorage.setItem('userRole', role)
    onSetRole(role)
    navigate(`/${role}/dashboard`)
  }

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Immigration Portal</h1>
        <p>Sélectionnez votre rôle pour continuer</p>
        
        <div className="role-selector">
          <button 
            className="role-btn client-btn"
            onClick={() => handleSelectRole('client')}
          >
            <span className="role-icon">👤</span>
            <span className="role-name">Client</span>
            <span className="role-desc">Gérer mon dossier et suivre ma demande</span>
          </button>
          
          <button 
            className="role-btn utilisateur-btn"
            onClick={() => handleSelectRole('utilisateur')}
          >
            <span className="role-icon">👨‍💼</span>
            <span className="role-name">Utilisateur (Employé)</span>
            <span className="role-desc">Gérer les clients et dossiers</span>
          </button>
        </div>
      </div>
    </div>
  )
}
