import '../styles/DashboardClient.css'

export default function DashboardClient() {
  return (
    <div className="dashboard-client">
      <div className="dashboard-container">
        <div className="dashboard-left">
          <div className="dashboard-card welcome">
            <h2>Bienvenue</h2>
            <p>Vous avez une demande en cours. Veuillez conserver vos documents en sécurité. Vous en aurez besoin ultérieurement.</p>
          </div>

          <div className="dashboard-card status">
            <h3>État de votre demande</h3>
            <div className="status-info">
              <p>Votre dossier est en cours d'évaluation.</p>
              <p>Vous recevrez une notification dès que le dossier aura avancé.</p>
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: '65%' }}></div>
            </div>
            <div className="progress-label">
              <span>Évaluation</span>
              <span>65%</span>
            </div>
          </div>

          <div className="dashboard-card documents">
            <h3>Documents Récents</h3>
            <div className="document-item">
              <span className="document-icon">📄</span>
              <div>
                <p className="document-name">Passport_Scan.pdf</p>
                <p className="document-date">Créé le 15 avril 2026</p>
              </div>
            </div>
            <div className="document-item">
              <span className="document-icon">📄</span>
              <div>
                <p className="document-name">Formulaire_IMM0008.pdf</p>
                <p className="document-date">Créé le 12 avril 2026</p>
              </div>
            </div>
          </div>

          <div className="dashboard-card contact">
            <h3>Contactez Légal</h3>
            <p>Conformément à la section 27(1) de la Loi sur l'immigration et la protection des réfugiés, vous avez le droit de consulter votre dossier.</p>
            <button className="contact-btn">Demander accès</button>
          </div>
        </div>

        <div className="dashboard-right">
          <div className="dossier-management">
            <h2>Gestion de mon dossier</h2>
            
            <div className="section">
              <h3>Informations personnelles</h3>
              <div className="info-group">
                <label>Prénom</label>
                <p>Marc-Antoine</p>
              </div>
              <div className="info-group">
                <label>Nom de famille</label>
                <p>Dupont</p>
              </div>
              <div className="info-group">
                <label>Email</label>
                <p>m.a.dupont@example.com</p>
              </div>
              <div className="info-group">
                <label>Téléphone</label>
                <p>+33 6 12 34 56 78</p>
              </div>
              <div className="info-group">
                <label>Adresse</label>
                <p>1 Rue de la Paix, 75002 Paris, France</p>
              </div>
              <button className="edit-btn">Modifier</button>
            </div>

            <div className="section">
              <h3>Documents soumis</h3>
              <div className="document-list">
                <div className="document-row">
                  <span className="doc-icon">📋</span>
                  <span className="doc-name">Passport_Scan_2024.pdf</span>
                  <span className="doc-status success">✓ VALIDÉ</span>
                </div>
                <div className="document-row">
                  <span className="doc-icon">📋</span>
                  <span className="doc-name">Preuve_de_fonds.pdf</span>
                  <span className="doc-status pending">⏳ EN ATTENTE</span>
                </div>
                <div className="document-row">
                  <span className="doc-icon">📋</span>
                  <span className="doc-name">Examen_Medical_Dsunduk.pdf</span>
                  <span className="doc-status success">✓ VALIDÉ</span>
                </div>
              </div>
              <button className="add-doc-btn">+ Ajouter un document</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
