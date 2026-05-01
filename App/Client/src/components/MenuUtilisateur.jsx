import { useState } from 'react'
import '../styles/MenuUtilisateur.css'

export default function MenuUtilisateur() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    // Logique de déconnexion
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <nav className="menu-utilisateur">
      <div className="menu-header">
        <h1 className="logo">Immigration Portal - Utilisateur</h1>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      <ul className={`menu-items ${isOpen ? 'open' : ''}`}>
        <li>
          <a href="/utilisateur/dashboard">Tableau de bord</a>
        </li>
        <li>
          <a href="/utilisateur/clients">Gestion des Clients</a>
        </li>
        <li>
          <a href="/utilisateur/dossiers">Gestion des Dossiers</a>
        </li>
        <li>
          <a href="/utilisateur/suivi">Suivi des Demandes</a>
        </li>
        <li>
          <a href="/utilisateur/documents">Gestion des Documents</a>
        </li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>
            Déconnexion
          </button>
        </li>
      </ul>
    </nav>
  )
}
