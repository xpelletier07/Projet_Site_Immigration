import { useState, useEffect } from 'react'
import '../styles/SuiviDemande.css'

export default function SuiviDemande() {
  const [dossiers, setDossiers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedDossier, setSelectedDossier] = useState(null)

  useEffect(() => {
    // Données de démonstration
    const mockDossiers = [
      {
        id: 1,
        type: 'Résidence permanente',
        status: 'En révision',
        createdAt: new Date('2026-03-15'),
        updatedAt: new Date('2026-04-20'),
        notes: 'Dossier actuellement en révision par l\'équipe.'
      },
      {
        id: 2,
        type: 'Visa de travail',
        status: 'Approuvé',
        createdAt: new Date('2026-02-10'),
        updatedAt: new Date('2026-04-15'),
        notes: 'Visa approuvé et valide jusqu\'au 15 février 2027.'
      }
    ]
    setDossiers(mockDossiers)
    setLoading(false)
  }, [])

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
                <span className={`status ${dossier.status?.toLowerCase().replace(/\s+/g, '-') || 'pending'}`}>
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
