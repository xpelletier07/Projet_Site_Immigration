import { useState } from 'react'
import '../styles/MenuClient.css'

export default function MenuClient() {
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [isOpen, setIsOpen] = useState(true)

  const handleLogout = () => {
<<<<<<< Updated upstream
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userRole')
    sessionStorage.removeItem('userEmail')
=======
>>>>>>> Stashed changes
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
    window.location.href = '/login'
  }

  return (
    <div className="client-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Portail Immigration</h2>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <h3 className="nav-title">PORTAIL CLIENT</h3>
            <ul className="nav-items">
              <li>
                <button 
                  className={`nav-link ${activeMenu === 'dashboard' ? 'active' : ''}`}
                  onClick={() => setActiveMenu('dashboard')}
                >
                  <span className="nav-icon">📊</span>
                  <span className="nav-text">Tableau de bord</span>
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${activeMenu === 'files' ? 'active' : ''}`}
                  onClick={() => setActiveMenu('files')}
                >
                  <span className="nav-icon">📁</span>
                  <span className="nav-text">Mes Dossiers</span>
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${activeMenu === 'documents' ? 'active' : ''}`}
                  onClick={() => setActiveMenu('documents')}
                >
                  <span className="nav-icon">📄</span>
                  <span className="nav-text">Documents</span>
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${activeMenu === 'suivi' ? 'active' : ''}`}
                  onClick={() => setActiveMenu('suivi')}
                >
                  <span className="nav-icon">📍</span>
                  <span className="nav-text">Suivi de Demande</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="topbar">
          <div className="topbar-brand">
            <h1>The Sovereign Ledger</h1>
            <p>IMMIGRATION SERVICES</p>
          </div>
          <div className="topbar-actions">
            <button className="topbar-btn">Messages</button>
            <button className="topbar-btn">Bibliothèque</button>
            <button className="topbar-btn">⚙️</button>
            <button className="topbar-btn">❓</button>
          </div>
        </header>

        {/* Content Area */}
        <div className="content-area">
          {activeMenu === 'dashboard' && (
            <div className="dashboard-view">
              <div className="page-header">
                <h2>Dossier id_123: Sous examen</h2>
                <p>Votre demande est actuellement traitée par nos services. Veuillez trouver ci-dessous le suivi en temps réel de votre dossier.</p>
                <button className="btn-primary">+ Nouvelle Demande</button>
              </div>

              <div className="roadmap-section">
                <h3>Feuille de Route de Progression</h3>
                <p className="phase-label">PHASE 2 SUR 4</p>
                <div className="roadmap">
                  <div className="roadmap-step completed">
                    <div className="step-icon">✓</div>
                    <p>Demande soumise</p>
                  </div>
                  <div className="roadmap-step active">
                    <div className="step-icon">📋</div>
                    <p>Documents vérifiés</p>
                  </div>
                  <div className="roadmap-step">
                    <div className="step-icon">👤</div>
                    <p>Entrevue</p>
                  </div>
                  <div className="roadmap-step">
                    <div className="step-icon">⚖️</div>
                    <p>Décision finale</p>
                  </div>
                </div>
              </div>

              <div className="two-column">
                <div className="ledger-section">
                  <h3>Registre de Documentation</h3>
                  <a href="#" className="view-all">Voir tout</a>
                  <div className="doc-list">
                    <div className="doc-item">
                      <span className="doc-icon">📄</span>
                      <div>
                        <p className="doc-name">Passport_Final_Copy.pdf</p>
                        <p className="doc-date">Téléchargé le 12 déc 2023</p>
                      </div>
                      <span className="status-badge verified">Vérifié</span>
                    </div>
                    <div className="doc-item">
                      <span className="doc-icon">📄</span>
                      <div>
                        <p className="doc-name">Proof_of_Residence.pdf</p>
                        <p className="doc-date">Téléchargé le 10 déc 2023</p>
                      </div>
                      <span className="status-badge verified">Vérifié</span>
                    </div>
                    <div className="doc-item alert">
                      <span className="doc-icon">⚠️</span>
                      <div>
                        <p className="doc-name">Medical Certificate</p>
                        <p className="doc-date">Missing Required</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="communication-section">
                  <h3>Communication avec l'agent</h3>
                  <div className="message-box">
                    <p className="sender">DE L'AGENT M. MILLER</p>
                    <p className="timestamp">Il y a 2 heures</p>
                    <p className="message">Nous avons bien reçu votre acte de naissance. Pouvez-vous nous envoyer une copie certifiée pour confirmation...</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeMenu === 'files' && (
            <div className="files-view">
              <h2>Mes Dossiers</h2>
              <div className="files-list">
                <div className="file-card">
                  <h3>Dossier #123</h3>
                  <p className="file-type">Résidence Permanente</p>
                  <p className="file-status">Statut: <strong>En cours d'examen</strong></p>
                  <p className="file-date">Créé le: 15 Mars 2026</p>
                </div>
                <div className="file-card">
                  <h3>Dossier #124</h3>
                  <p className="file-type">Permis de Travail</p>
                  <p className="file-status">Statut: <strong>Approuvé</strong></p>
                  <p className="file-date">Créé le: 10 Février 2026</p>
                </div>
              </div>
            </div>
          )}
          
          {activeMenu === 'documents' && (
            <div className="documents-view">
              <h2>Documents</h2>
              <div className="upload-section">
                <div className="upload-area">
                  <p>📁 Glissez-déposez vos documents ici</p>
                </div>
              </div>
              <div className="documents-list">
                <h3>Mes Documents</h3>
                <div className="doc-entry">
                  <span>📄 Passport_Scan_2024.pdf</span>
                  <span className="badge">Validé</span>
                </div>
                <div className="doc-entry">
                  <span>📄 Preuve_de_fonds.pdf</span>
                  <span className="badge pending">En attente</span>
                </div>
                <div className="doc-entry">
                  <span>📄 Examen_Medical.pdf</span>
                  <span className="badge">Validé</span>
                </div>
              </div>
            </div>
          )}
          
          {activeMenu === 'suivi' && (
            <div className="suivi-view">
              <h2>Suivi de Ma Demande</h2>
              <div className="suivi-card">
                <h3>État actuel: <span className="status-label">En cours d'examen</span></h3>
                <p>Votre demande est actuellement examinée par notre équipe.</p>
                <div className="timeline">
                  <div className="timeline-item completed">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <p className="timeline-title">Demande soumise</p>
                      <p className="timeline-date">15 Mars 2026</p>
                    </div>
                  </div>
                  <div className="timeline-item active">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <p className="timeline-title">Documents vérifiés</p>
                      <p className="timeline-date">En cours...</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <p className="timeline-title">Entrevue prévue</p>
                      <p className="timeline-date">À déterminer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
