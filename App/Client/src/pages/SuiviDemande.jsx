import { useState, useEffect } from 'react'
import '../styles/SuiviDemande.css'

export default function SuiviDemande() {
  const [dossiers, setDossiers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedDossier, setSelectedDossier] = useState(null)

  useEffect(() => {
    fetchDossiers()
  }, [])

  const fetchDossiers = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await fetch('/api/dossier', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok) throw new Error('Erreur lors de la récupération des dossiers')
      const data = await response.json()
      setDossiers(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (dossierId, newStatus) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/dossier/${dossierId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })
      if (!response.ok) throw new Error('Erreur lors de la mise à jour')
      fetchDossiers()
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <div className="loading">Chargement...</div>
  if (error) return <div className="error">Erreur: {error}</div>

  return (
    <div className="suivi-demande">
      <h2>Suivi de mes demandes</h2>
      
      <div className="dossiers-list">
        {dossiers.length === 0 ? (
          <p>Aucun dossier trouvé</p>
        ) : (
          dossiers.map(dossier => (
            <div 
              key={dossier.id} 
              className={`dossier-card ${selectedDossier?.id === dossier.id ? 'selected' : ''}`}
              onClick={() => setSelectedDossier(dossier)}
            >
              <div className="dossier-header">
                <h3>Dossier #{dossier.id}</h3>
                <span className={`status ${dossier.status?.toLowerCase() || 'pending'}`}>
                  {dossier.status || 'En attente'}
                </span>
              </div>
              <p className="dossier-type">Type: {dossier.type}</p>
              <p className="dossier-date">
                Créé le: {new Date(dossier.createdAt).toLocaleDateString('fr-CA')}
              </p>
            </div>
          ))
        )}
      </div>

      {selectedDossier && (
        <div className="dossier-detail">
          <h3>Détails du Dossier</h3>
          <div className="detail-content">
            <p><strong>Numéro:</strong> {selectedDossier.id}</p>
            <p><strong>Type:</strong> {selectedDossier.type}</p>
            <p><strong>Status:</strong> {selectedDossier.status || 'En attente'}</p>
            <p><strong>Créé le:</strong> {new Date(selectedDossier.createdAt).toLocaleDateString('fr-CA')}</p>
            <p><strong>Dernière modification:</strong> {new Date(selectedDossier.updatedAt).toLocaleDateString('fr-CA')}</p>
            
            {selectedDossier.notes && (
              <div className="notes-section">
                <h4>Notes</h4>
                <p>{selectedDossier.notes}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
