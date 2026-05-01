import { useState } from 'react'
import '../styles/DemandChangementStatus.css'

export default function DemandChangementStatus() {
  const [formData, setFormData] = useState({
    currentStatus: 'Résident temporaire (Classe de visa 0-1)',
    desiredStatus: '',
    legalName: '',
    dateOfBirth: '',
    reasonForChange: '',
    justification: ''
  })

  const [currentStep, setCurrentStep] = useState(2)
  const totalSteps = 4

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="demand-status-container">
      <div className="page-header">
        <h1>Demande de Changement de Statut</h1>
        <p>Formulaire officiel pour modifier le statut de résidence ou de travail d'un profil client existant dans le système.</p>
      </div>

      <div className="content-wrapper">
        <div className="main-content">
          {/* Step Indicator */}
          <div className="step-indicator">
            <span className="step-label">ÉTAPE {currentStep} SUR {totalSteps}: {
              currentStep === 1 ? 'INFORMATIONS ACTUELLES' :
              currentStep === 2 ? 'STATUT DÉSIRÉ' :
              currentStep === 3 ? 'DOCUMENTS JUSTIFICATIFS' :
              'EXAMEN & SOUMISSION'
            }</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
            </div>
          </div>

          {/* Current Status Section */}
          <div className="form-section">
            <h2>1. Informations de Statut Actuel</h2>
            <div className="status-box">
              <div className="status-item">
                <label>INFORMATIONS ACTUELLES</label>
                <p className="status-value">Résident temporaire (Classe de visa 0-1)</p>
              </div>
              <div className="status-item">
                <label>DATE D'EXPIRATION</label>
                <p className="status-value">15 avril 2024</p>
              </div>
            </div>
          </div>

          {/* Request Details Section */}
          <div className="form-section">
            <h2>2. Détails de la Demande</h2>
            
            <div className="form-group">
              <label htmlFor="desiredStatus">Sélectionnez un statut dans le registre:</label>
              <select 
                id="desiredStatus"
                name="desiredStatus"
                value={formData.desiredStatus}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Choisir un statut...</option>
                <option value="permanent-resident">Résident permanent</option>
                <option value="work-permit">Permis de travail</option>
                <option value="study-permit">Permis d'études</option>
                <option value="visitor-record">Dossier de visiteur</option>
              </select>
              <small>Les détails refléteront le statut sélectionné selon les critères d'admissibilité actuels.</small>
            </div>

            <div className="form-group">
              <label htmlFor="reasonForChange">Détails et Raisons du Changement</label>
              <textarea
                id="reasonForChange"
                name="reasonForChange"
                value={formData.reasonForChange}
                onChange={handleChange}
                placeholder="Fournissez une justification complète pour cette demande..."
                className="form-textarea"
                rows="5"
              ></textarea>
            </div>
          </div>

          {/* Supporting Evidence Section */}
          <div className="form-section">
            <h2>3. Documents Justificatifs</h2>
            <div className="upload-area">
              <div className="upload-icon">📎</div>
              <p>Glissez-déposez vos documents ici ou <button className="link-btn">cliquez pour parcourir</button></p>
              <small>Formats acceptés: PDF, JPG, PNG, DOC (Maximum 5MB chacun)</small>
            </div>
            <div className="documents-list">
              <p className="no-documents">Aucun document téléchargé pour le moment</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="form-actions">
            <button 
              className="btn btn-secondary"
              onClick={handlePrevStep}
              disabled={currentStep === 1}
            >
              ← Précédent
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleNextStep}
              disabled={currentStep === totalSteps}
            >
              Suivant →
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Legal Directory */}
          <div className="sidebar-card legal-directory">
            <div className="card-header">
              <span className="card-icon">⚖️</span>
              <h3>RÉPERTOIRE JURIDIQUE</h3>
            </div>
            <div className="card-body">
              <p>L'Article 2.8 du Code de l'immigration stipule que le changement de statut peut être déposé conformément à la section 10 de la législation établie.</p>
              <a href="#" className="read-more-btn">Lire la Conformité Réglementaire Complète</a>
            </div>
          </div>

          {/* Review Checklist */}
          <div className="sidebar-card review-checklist">
            <h3>Liste de Vérification</h3>
            <div className="checklist">
              <div className="checklist-item">
                <input type="checkbox" id="check1" />
                <label htmlFor="check1">Vérifier que le passeport a 6 mois de validité restante</label>
              </div>
              <div className="checklist-item">
                <input type="checkbox" id="check2" />
                <label htmlFor="check2">Vérifier les critères d'admissibilité pour le nouveau statut</label>
              </div>
              <div className="checklist-item">
                <input type="checkbox" id="check3" />
                <label htmlFor="check3">S'assurer que tous les documents requis sont numérisés et téléchargés</label>
              </div>
              <div className="checklist-item">
                <input type="checkbox" id="check4" />
                <label htmlFor="check4">Vérifier l'exactitude de toutes les informations personnelles</label>
              </div>
            </div>
          </div>

          {/* Information Box */}
          <div className="sidebar-card info-box">
            <div className="video-placeholder">
              <span className="play-icon">▶</span>
              <p>Découvrez Comment Cela Fonctionne</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
