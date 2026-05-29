import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../../commun/commun.jsx'
import './DashboardAdmin.css'

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
const FolderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
)
const AlertIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
)
const InvoiceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
)

const StatCard = ({ label, value, loading, color = 'var(--blue)' }) => (
  <div className="db-stat-quick">
    <div className="db-stat-quick-value" style={{ color }}>{loading ? '...' : value}</div>
    <div className="db-stat-quick-label">{label}</div>
  </div>
)

export default function Dashboard() {
  const navigate = useNavigate()

  const [users, setUsers]       = useState({ clients: 0, utilisateurs: 0, total: 0 })
  const [dossiers, setDossiers] = useState({ total: 0 })
  const [factures, setFactures] = useState({ total: 0, enRetard: 0, payees: 0, enAttente: 0 })
  const [demandes, setDemandes] = useState({ parStatut: {} })
  const [alertes, setAlertes]   = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Utilisateurs
        const [clients, utilisateurs] = await Promise.all([
          apiFetch('/clients'),
          apiFetch('/utilisateurs'),
        ])
        const nbClients      = Array.isArray(clients)      ? clients.length      : 0
        const nbUtilisateurs = Array.isArray(utilisateurs) ? utilisateurs.length : 0
        setUsers({ clients: nbClients, utilisateurs: nbUtilisateurs, total: nbClients + nbUtilisateurs })

        // Dossiers
        const allDossiers = await apiFetch('/dossiers')
        const nbDossiers  = Array.isArray(allDossiers) ? allDossiers.length : 0
        setDossiers({ total: nbDossiers })

        // Factures + alertes retard
        const today = new Date()
        let totalFactures = 0, enRetard = 0, payees = 0, enAttente = 0
        const alertesRetard = []

        if (Array.isArray(allDossiers)) {
          await Promise.all(allDossiers.map(async (d) => {
            try {
              const facts = await apiFetch(`/factures/dossier/${d.id_dossier}`)
              if (!Array.isArray(facts)) return
              facts.forEach(f => {
                totalFactures++
                const statut = (f.statut || '').toLowerCase()
                if (statut === 'payé' || statut === 'paye') payees++
                else if (new Date(f.date_echeance) < today) {
                  enRetard++
                  alertesRetard.push({
                    id: f.id_facture,
                    desc: f.description,
                    echeance: f.date_echeance,
                    dossier: d.id_dossier,
                  })
                } else enAttente++
              })
            } catch (_) {}
          }))
        }
        setFactures({ total: totalFactures, enRetard, payees, enAttente })
        setAlertes(alertesRetard.slice(0, 4)) // max 4 alertes

        // Demandes par statut
        let parStatut = {}
        if (Array.isArray(allDossiers)) {
          await Promise.all(allDossiers.map(async (d) => {
            try {
              const dem = await apiFetch(`/type-demandes/dossier/${d.id_dossier}`)
              if (!Array.isArray(dem)) return
              dem.forEach(dm => {
                const s = dm.Statut || 'Inconnu'
                parStatut[s] = (parStatut[s] || 0) + 1
              })
            } catch (_) {}
          }))
        }
        setDemandes({ parStatut })

      } catch (err) {
        console.error('Erreur dashboard:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const pct = (val) => users.total > 0 ? Math.round((val / users.total) * 100) : 0

  return (
    <div className="db-page">
      <main className="db-main">

        <div className="db-title-wrap">
          <h1 className="db-title">Tableau de bord Administrateur</h1>
          <p className="db-subtitle">Vue d'ensemble et gestion des utilisateurs.</p>
        </div>

        {/* ── Ligne stats rapides ── */}
        <div className="db-quick-stats">
          <StatCard label="Utilisateurs" value={users.total.toLocaleString('fr-CA')} loading={loading} />
          <StatCard label="Clients" value={users.clients.toLocaleString('fr-CA')} loading={loading} color="#2d5a8e" />
          <StatCard label="Employés" value={users.utilisateurs.toLocaleString('fr-CA')} loading={loading} color="#0891b2" />
          <StatCard label="Dossiers" value={dossiers.total.toLocaleString('fr-CA')} loading={loading} color="#7c3aed" />
          <StatCard label="Factures totales" value={factures.total.toLocaleString('fr-CA')} loading={loading} color="#059669" />
          <StatCard label="Factures en retard" value={factures.enRetard.toLocaleString('fr-CA')} loading={loading} color="#dc2626" />
        </div>

        <div className="db-grid">

          {/* ── Col gauche ── */}
          <div className="db-col">

            {/* Utilisateurs */}
            <div className="db-card">
              <div className="db-card-header">
                <UsersIcon />
                <span className="db-card-title">Répartition des utilisateurs</span>
              </div>
              <div className="db-users-count">{loading ? '...' : users.total.toLocaleString('fr-CA')}</div>
              <div className="db-users-sub">Total des comptes actifs</div>
              {[
                { label: 'Clients (Demandeurs)', val: users.clients,      color: '#2d5a8e' },
                { label: 'Employés (Agents)',    val: users.utilisateurs,  color: '#0891b2' },
              ].map(({ label, val, color }) => (
                <div className="db-user-stat" key={label}>
                  <div className="db-user-stat-header">
                    <span>{label}</span>
                    <span className="db-user-stat-num">{loading ? '...' : val.toLocaleString('fr-CA')}</span>
                  </div>
                  <div className="db-stat-bar">
                    <div className="db-stat-fill" style={{ width: `${pct(val)}%`, background: color }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Factures */}
            <div className="db-card">
              <div className="db-card-header">
                <InvoiceIcon />
                <span className="db-card-title">État des factures</span>
              </div>
              <div className="db-factures-grid">
                {[
                  { label: 'Total',      val: factures.total,     color: 'var(--blue)' },
                  { label: 'Payées',     val: factures.payees,    color: '#16a34a' },
                  { label: 'En attente', val: factures.enAttente, color: '#d97706' },
                  { label: 'En retard',  val: factures.enRetard,  color: '#dc2626' },
                ].map(({ label, val, color }) => (
                  <div key={label} className="db-facture-item">
                    <div className="db-facture-val" style={{ color }}>{loading ? '...' : val}</div>
                    <div className="db-facture-label">{label}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── Col droite ── */}
          <div className="db-col">

            {/* Demandes par statut */}
            <div className="db-card">
              <div className="db-card-header">
                <FolderIcon />
                <span className="db-card-title">Demandes par statut</span>
              </div>
              {loading ? (
                <p className="db-loading-text">Chargement...</p>
              ) : Object.keys(demandes.parStatut).length === 0 ? (
                <p className="db-empty-text">Aucune demande enregistrée</p>
              ) : (
                <div className="db-demandes-list">
                  {Object.entries(demandes.parStatut).map(([statut, count]) => (
                    <div key={statut} className="db-demande-row">
                      <span className={`db-statut-badge db-statut-${statut.toLowerCase().replace(/\s/g,'-')}`}>
                        {statut}
                      </span>
                      <span className="db-demande-count">{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Alertes factures en retard */}
            {alertes.length > 0 && (
              <div className="db-card db-alertes-card">
                <div className="db-card-header">
                  <AlertIcon />
                  <span className="db-card-title">Factures en retard</span>
                  <span className="db-badge-danger">{factures.enRetard}</span>
                </div>
                <div className="db-alertes-list">
                  {alertes.map(a => (
                    <div key={a.id} className="db-alerte-row">
                      <div className="db-alerte-info">
                        <span className="db-alerte-desc">{a.desc}</span>
                        <span className="db-alerte-meta">Dossier #{a.dossier} · Échéance : {new Date(a.echeance).toLocaleDateString('fr-CA')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions de gestion */}
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
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}