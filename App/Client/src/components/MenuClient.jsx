import { useState } from 'react'
import '../styles/MenuClient.css'

export default function MenuClient() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userRole')
    sessionStorage.removeItem('userEmail')
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <nav className="menu-client">
      <div className="menu-header">
        <h1 className="logo">Immigration Portal</h1>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      <ul className={`menu-items ${isOpen ? 'open' : ''}`}>
        <li>
          <a href="/client/dashboard">Tableau de bord</a>
        </li>
        <li>
          <a href="/client/dossier">Mon Dossier</a>
        </li>
        <li>
          <a href="/client/changement-status">Demande de Changement de Status</a>
        </li>
        <li>
          <a href="/client/documents">Mes Documents</a>
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
