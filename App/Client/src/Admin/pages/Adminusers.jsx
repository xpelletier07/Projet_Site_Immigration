import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from "../../Client/services/client.service.jsx"
import "../../assets/css/AdminUsers.css";

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)
const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11,4H4a2,2,0,0,0-2,2V18a2,2,0,0,0,2,2H16a2,2,0,0,0,2-2V11"/>
    <path d="M18.5,2.5a2.121,2.121,0,0,1,3,3L12,15l-4,1,1-4Z"/>
  </svg>
)
const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14H6L5,6"/>
    <path d="M10,11v6"/><path d="M14,11v6"/><path d="M9,6V4h6v2"/>
  </svg>
)
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
)

const ROLES = ['tous', 'client', 'utilisateur', 'admin']

const roleStyle = {
  client:      { bg: '#dcfce7', color: '#16a34a' },
  utilisateur: { bg: '#e0f2fe', color: '#0369a1' },
  admin:       { bg: '#f3e8ff', color: '#7c3aed' },
}

const initials = (nom, prenom) =>
  `${(prenom || '')[0] || ''}${(nom || '')[0] || ''}`.toUpperCase()

const avatarColor = { client: '#16a34a', utilisateur: '#0369a1', admin: '#7c3aed' }

export default function AdminUsers() {
  const navigate = useNavigate()

  const [users, setUsers]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [filterRole, setFilter] = useState('tous')
  const [modal, setModal]       = useState(null)
  const [formData, setFormData] = useState({})
  const [formError, setFormError] = useState('')
  const [saving, setSaving]     = useState(false)
  const [toast, setToast]       = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Chargement de tous les utilisateurs 
  const loadUsers = async () => {
    setLoading(true)
    try {
       console.log('Token:', sessionStorage.getItem('token'))
        console.log('Type:', sessionStorage.getItem('type'))

      const [clients, utilisateurs, admins] = await Promise.all([
        apiFetch('/clients'),
        apiFetch('/utilisateurs'),
        apiFetch('/administrateurs').catch(() => []),
      ])
        console.log('clients:', clients)
        console.log('utilisateurs:', utilisateurs)
        console.log('admins:', admins)

      const all = [
        ...(Array.isArray(clients)      ? clients.map(u => ({ ...u, role: 'client', id: u.id_client }))           : []),
        ...(Array.isArray(utilisateurs) ? utilisateurs.map(u => ({ ...u, role: 'utilisateur', id: u.id_utilisateur })) : []),
        ...(Array.isArray(admins)       ? admins.map(u => ({ ...u, role: 'admin', id: u.id_admin }))               : []),
      ]
      setUsers(all)
    } catch (err) {
      console.error('Erreur chargement utilisateurs:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadUsers() }, [])

  // Filtrage 
  const filtered = users.filter(u => {
    const matchSearch = `${u.prenom} ${u.nom} ${u.courriel}`.toLowerCase().includes(search.toLowerCase())
    const matchRole   = filterRole === 'tous' || u.role === filterRole
    return matchSearch && matchRole
  })

  // Modifier 
  const openEdit = (user) => {
    setFormData({ ...user })
    setFormError('')
    setModal({ mode: 'edit', user })
  }

  // Supprimer
  const openDelete = (user) => setModal({ mode: 'delete', user })

  const closeModal = () => { setModal(null); setFormError('') }

  const handleSave = async () => {
    if (!formData.nom?.trim() || !formData.prenom?.trim() || !formData.courriel?.trim()) {
      setFormError('Tous les champs sont obligatoires.')
      return
    }
    setSaving(true)
    try {
      const { role, id } = modal.user
      const payload = {
        nom:       formData.nom.trim(),
        prenom:    formData.prenom.trim(),
        courriel:  formData.courriel.trim(),
        telephone: formData.telephone || '',
      }

      if (role === 'client') {
        await apiFetch(`/clients/update/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
      } else if (role === 'utilisateur') {
        await apiFetch(`/utilisateurs/update/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
      } else {
        await apiFetch(`/administrateurs/update/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
      }

      showToast('Utilisateur modifié avec succès')
      closeModal()
      loadUsers()
    } catch (err) {
      setFormError(err.message || 'Erreur lors de la modification.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    setSaving(true)
    try {
      const { role, id } = modal.user
      if (role === 'client') {
        await apiFetch(`/clients/delete/${id}`, { method: 'DELETE' })
      } else if (role === 'utilisateur') {
        await apiFetch(`/utilisateurs/delete/${id}`, { method: 'DELETE' })
      } else {
        await apiFetch(`/administrateurs/delete/${id}`, { method: 'DELETE' })
      }
      showToast('Utilisateur supprimé', 'error')
      closeModal()
      loadUsers()
    } catch (err) {
      showToast(err.message || 'Erreur lors de la suppression', 'error')
      closeModal()
    } finally {
      setSaving(false)
    }
  }

  // Ajouter un utilisateur (client ou employé)
  const openAdd = () => {
    setFormData({ prenom: '', nom: '', courriel: '', telephone: '', MDP: '', role: 'client' })
    setFormError('')
    setModal({ mode: 'add' })
  }

  const handleAdd = async () => {
    if (!formData.nom?.trim() || !formData.prenom?.trim() || !formData.courriel?.trim() || !formData.MDP?.trim()) {
      setFormError('Tous les champs sont obligatoires.')
      return
    }
    setSaving(true)
    try {
      const payload = {
        nom:       formData.nom.trim(),
        prenom:    formData.prenom.trim(),
        courriel:  formData.courriel.trim(),
        telephone: formData.telephone || '',
        MDP:       formData.MDP,
      }
      const route = formData.role === 'utilisateur'
        ? '/auth/create/Utilisateur'
        : '/auth/create/Client'

      await apiFetch(route, { method: 'POST', body: JSON.stringify(payload) })
      showToast('Utilisateur ajouté avec succès')
      closeModal()
      loadUsers()
    } catch (err) {
      setFormError(err.message || 'Erreur lors de la création.')
    } finally {
      setSaving(false)
    }
  }

  const stats = {
    total:       users.length,
    clients:     users.filter(u => u.role === 'client').length,
    utilisateurs:users.filter(u => u.role === 'utilisateur').length,
    admins:      users.filter(u => u.role === 'admin').length,
  }

  return (
    <div className="au-page">
      <main className="au-main">

        {/* Header */}
        <div className="au-header">
          <div>
            <button className="au-back-btn" onClick={() => navigate('/dashboard')}>
              <ArrowIcon /> Retour au dashboard
            </button>
            <h1 className="au-title">Gestion des utilisateurs</h1>
            <p className="au-subtitle">Gérez les clients, employés et administrateurs</p>
          </div>
          <button className="au-add-btn" onClick={openAdd}>
            <PlusIcon /> Ajouter un utilisateur
          </button>
        </div>

        {/* Stats rapides */}
        <div className="au-stats">
          {[
            { label: 'Total',        val: stats.total,        color: '#1b2f4e' },
            { label: 'Clients',      val: stats.clients,      color: '#16a34a' },
            { label: 'Employés',     val: stats.utilisateurs, color: '#0369a1' },
            { label: 'Admins',       val: stats.admins,       color: '#7c3aed' },
          ].map(s => (
            <div key={s.label} className="au-stat-card">
              <div className="au-stat-val" style={{ color: s.color }}>{s.val}</div>
              <div className="au-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filtres */}
        <div className="au-filters">
          <div className="au-search-wrap">
            <SearchIcon />
            <input
              className="au-search"
              placeholder="Rechercher par nom, prénom ou courriel..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="au-select" value={filterRole} onChange={e => setFilter(e.target.value)}>
            {ROLES.map(r => (
              <option key={r} value={r}>
                {r === 'tous' ? 'Tous les rôles' : r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Tableau */}
        <div className="au-table-wrap">
          <table className="au-table">
            <thead>
              <tr>
                <th>Utilisateur</th>
                <th>Courriel</th>
                <th>Téléphone</th>
                <th>Rôle</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="au-empty">Chargement...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="5" className="au-empty">Aucun utilisateur trouvé</td></tr>
              ) : filtered.map((user, i) => (
                <tr key={`${user.role}-${user.id}`} className="au-row" style={{ animationDelay: `${i * 0.03}s` }}>
                  <td>
                    <div className="au-user-cell">
                      <div className="au-avatar" style={{ background: avatarColor[user.role] }}>
                        {initials(user.nom, user.prenom)}
                      </div>
                      <span className="au-nom">{user.prenom} {user.nom}</span>
                    </div>
                  </td>
                  <td className="au-muted">{user.courriel}</td>
                  <td className="au-muted">{user.telephone || '—'}</td>
                  <td>
                    <span className="au-badge" style={roleStyle[user.role]}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <div className="au-actions">
                      <button className="au-btn-icon au-btn-edit" onClick={() => openEdit(user)} title="Modifier">
                        <EditIcon />
                      </button>
                      <button className="au-btn-icon au-btn-del" onClick={() => openDelete(user)} title="Supprimer">
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="au-table-footer">
            {filtered.length} utilisateur{filtered.length !== 1 ? 's' : ''} affiché{filtered.length !== 1 ? 's' : ''}
          </div>
        </div>
      </main>

      {/* ── Modal modifier / ajouter ── */}
      {modal && modal.mode !== 'delete' && (
        <div className="au-overlay" onClick={closeModal}>
          <div className="au-modal" onClick={e => e.stopPropagation()}>
            <div className="au-modal-header">
              <h2>{modal.mode === 'add' ? 'Ajouter un utilisateur' : 'Modifier l\'utilisateur'}</h2>
              <button className="au-modal-close" onClick={closeModal}><CloseIcon /></button>
            </div>
            <div className="au-modal-body">
              {formError && <div className="au-form-error">{formError}</div>}
              <div className="au-form-row">
                <div className="au-form-field">
                  <label>Prénom</label>
                  <input value={formData.prenom || ''} onChange={e => setFormData(p => ({ ...p, prenom: e.target.value }))} placeholder="Jean" disabled={saving} />
                </div>
                <div className="au-form-field">
                  <label>Nom</label>
                  <input value={formData.nom || ''} onChange={e => setFormData(p => ({ ...p, nom: e.target.value }))} placeholder="Dupont" disabled={saving} />
                </div>
              </div>
              <div className="au-form-field">
                <label>Courriel</label>
                <input type="email" value={formData.courriel || ''} onChange={e => setFormData(p => ({ ...p, courriel: e.target.value }))} placeholder="jean.dupont@exemple.com" disabled={saving} />
              </div>
              <div className="au-form-field">
                <label>Téléphone</label>
                <input type="tel" value={formData.telephone || ''} onChange={e => setFormData(p => ({ ...p, telephone: e.target.value }))} placeholder="514 123 4567" disabled={saving} />
              </div>
              {modal.mode === 'add' && (
                <>
                  <div className="au-form-field">
                    <label>Mot de passe</label>
                    <input type="password" value={formData.MDP || ''} onChange={e => setFormData(p => ({ ...p, MDP: e.target.value }))} placeholder="••••••••" disabled={saving} />
                  </div>
                  <div className="au-form-field">
                    <label>Rôle</label>
                    <select value={formData.role || 'client'} onChange={e => setFormData(p => ({ ...p, role: e.target.value }))} disabled={saving}>
                      <option value="client">Client</option>
                      <option value="utilisateur">Employé (Utilisateur)</option>
                    </select>
                  </div>
                </>
              )}
            </div>
            <div className="au-modal-footer">
              <button className="au-btn-secondary" onClick={closeModal} disabled={saving}>Annuler</button>
              <button className="au-btn-primary" onClick={modal.mode === 'add' ? handleAdd : handleSave} disabled={saving}>
                {saving ? 'En cours...' : modal.mode === 'add' ? 'Ajouter' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal suppression                  */}
      {modal && modal.mode === 'delete' && (
        <div className="au-overlay" onClick={closeModal}>
          <div className="au-modal" onClick={e => e.stopPropagation()}>
            <div className="au-modal-header">
              <h2>Confirmer la suppression</h2>
              <button className="au-modal-close" onClick={closeModal}><CloseIcon /></button>
            </div>
            <div className="au-modal-body">
              <p className="au-delete-text">
                Êtes-vous sûr de vouloir supprimer <strong>{modal.user.prenom} {modal.user.nom}</strong> ?
                Cette action est irréversible.
              </p>
            </div>
            <div className="au-modal-footer">
              <button className="au-btn-secondary" onClick={closeModal} disabled={saving}>Annuler</button>
              <button className="au-btn-danger" onClick={handleDelete} disabled={saving}>
                {saving ? 'Suppression...' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && <div className={`au-toast ${toast.type}`}>{toast.msg}</div>}
    </div>
  )
}