import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)
const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)
const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const RoleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/>
    <path d="M18 14l2 2 4-4"/>
  </svg>
)
const DownloadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)
const LogIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="9" y1="21" x2="9" y2="9"/>
  </svg>
)
const AlertIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
)
const RefreshIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
)
const BuildingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M9 21V9"/>
  </svg>
)

const logs = [
  { icon: <ShieldIcon />, type: 'info', title: 'Authentification Multi-facteurs', desc: "Nouvel employé enregistré via l'ID national.", time: '10:45' },
  { icon: <AlertIcon />, type: 'warning', title: 'Avertissement de Quota', desc: 'Le stockage des documents atteint 85% de sa capacité.', time: '09:12' },
  { icon: <RefreshIcon />, type: 'update', title: 'Mise à jour du Système', desc: 'Version 4.2.1 déployée avec succès sur le cluster de production.', time: 'Hier' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  return (
    <div className="db-page">
      {/* Navbar */}
      <nav className="db-nav">
        <div className="db-nav-left">
          <div className="db-brand">
            <BuildingIcon />
            <span>The Sovereign Ledger</span>
          </div>
          <div className="db-nav-links">
            <a href="#" className="db-nav-link">Home</a>
            <a href="#" className="db-nav-link db-nav-active">Dashboard</a>
            <a href="#" className="db-nav-link">My Case</a>
            <a href="#" className="db-nav-link">Management</a>
          </div>
        </div>
        <div className="db-nav-right">
          <div className="db-search-wrap">
            <SearchIcon />
            <input
              className="db-search"
              placeholder="Rechercher..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="db-signout" onClick={() => navigate('/')}>Sign Out</button>
        </div>
      </nav>

      {/* Main */}
      <main className="db-main">
        {/* Page title */}
        <div className="db-title-wrap">
          <h1 className="db-title">Tableau de bord Administrateur</h1>
          <p className="db-subtitle">Vue d'ensemble de la santé du système et gestion des utilisateurs.</p>
        </div>

        {/* Grid */}
        <div className="db-grid">

          {/* Left col */}
          <div className="db-col-left">

            {/* System health card */}
            <div className="db-card db-health-card">
              <div className="db-health-header">
                <div className="db-health-title-wrap">
                  <ShieldIcon />
                  <div>
                    <div className="db-card-title">Santé du système</div>
                    <div className="db-card-sub">Actualisé il y a 2 minutes</div>
                  </div>
                </div>
                <span className="db-badge-op">● OPÉRATIONNEL</span>
              </div>
              <div className="db-metrics">
                <div className="db-metric">
                  <div className="db-metric-label">SERVEUR CENTRAL</div>
                  <div className="db-metric-value">99.9%</div>
                  <div className="db-metric-bar"><div className="db-metric-fill" style={{width:'99.9%'}}></div></div>
                </div>
                <div className="db-metric">
                  <div className="db-metric-label">BASE DE DONNÉES</div>
                  <div className="db-metric-value">12ms</div>
                  <div className="db-metric-bar"><div className="db-metric-fill db-metric-fill-green" style={{width:'30%'}}></div></div>
                </div>
                <div className="db-metric">
                  <div className="db-metric-label">CHARGE API</div>
                  <div className="db-metric-value">24%</div>
                  <div className="db-metric-bar"><div className="db-metric-fill db-metric-fill-yellow" style={{width:'24%'}}></div></div>
                </div>
              </div>
            </div>

            {/* Logs card */}
            <div className="db-card db-logs-card">
              <div className="db-logs-header">
                <div className="db-logs-title">
                  <LogIcon />
                  <span>Journaux système récents</span>
                </div>
                <a href="#" className="db-voir-tout">Voir tout →</a>
              </div>
              <div className="db-logs">
                {logs.map((log, i) => (
                  <div key={i} className={`db-log db-log-${log.type}`}>
                    <div className={`db-log-icon db-log-icon-${log.type}`}>{log.icon}</div>
                    <div className="db-log-content">
                      <div className="db-log-title">{log.title}</div>
                      <div className="db-log-desc">{log.desc}</div>
                    </div>
                    <div className="db-log-time">{log.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right col */}
          <div className="db-col-right">

            {/* Users card */}
            <div className="db-card db-users-card">
              <div className="db-card-title">Utilisateurs totaux</div>
              <div className="db-users-count">14,284</div>
              <div className="db-users-sub">Actifs ce mois-ci</div>
              <div className="db-user-stat">
                <div className="db-user-stat-header">
                  <span>Clients (Demandeurs)</span>
                  <span className="db-user-stat-num">13,102</span>
                </div>
                <div className="db-stat-bar"><div className="db-stat-fill" style={{width:'92%'}}></div></div>
              </div>
              <div className="db-user-stat">
                <div className="db-user-stat-header">
                  <span>Employés (Agents)</span>
                  <span className="db-user-stat-num">1,182</span>
                </div>
                <div className="db-stat-bar"><div className="db-stat-fill" style={{width:'8%'}}></div></div>
              </div>
            </div>

            {/* Actions card */}
            <div className="db-card db-actions-card">
              <div className="db-actions-title">Actions de Gestion</div>
              <button className="db-action-btn" onClick={() => navigate('/admin')}>
                <span>Gérer les Utilisateurs</span>
                <UsersIcon />
              </button>
              <button className="db-action-btn">
                <span>Permissions de Rôle</span>
                <RoleIcon />
              </button>
              <button className="db-action-btn">
                <span>Exporter Rapports</span>
                <DownloadIcon />
              </button>
            </div>

            {/* Quote card */}
            <div className="db-card db-quote-card">
              <div className="db-quote-overlay">
                <p className="db-quote-text">
                  <em>La sécurité des données est le pilier de notre souveraineté numérique.</em>
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="db-footer">
        <div class="db-footer-left">
          <div className="db-footer-brand">The Sovereign Ledger</div>
          <div className="db-footer-copy">© 2024 The Sovereign Ledger. An official government digital service. Tous droits réservés. L'accès non autorisé est strictement interdit.</div>
        </div>
        <div className="db-footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Legal Notice</a>
          <a href="#">Accessibility</a>
          <a href="#" className="db-footer-contact">Contact Support</a>
        </div>
      </footer>
    </div>
  )
}