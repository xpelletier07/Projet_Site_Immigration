//import { getClientDossier } from "../services/utilisateur.service";

export function DossierTable({ dossiers }) {

  return (
    <div className="section-card">
      <div className="section-header">
        <h2>Dossiers clients actifs</h2>
      </div>
      <table className="dossier-table">
        <thead>
          <tr>
            <th>ID Dossier</th>
            <th>Nom du client</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {/* Vérifie si dossiers est un tableau avant de mapper */}
          {Array.isArray(dossiers) && dossiers.length > 0 ? (
            dossiers.map((d) => (
              <tr key={d.dossier.id_dossier}>
                <td className="id-cell">{d.dossier.id_dossier}</td>

                <td>
                  <div className="client-cell">
                    <div
                      className="avatar-sm"
                      style={{
                        background: "blue",
                        color: "white",
                      }}
                    >
                      {/* Initiales du client */}
                      {d.dossier.nom.charAt(0) + d.dossier.prenom.charAt(0)}
                    </div>

                    <span style={{ fontWeight: 600 }}>
                      {`${d.dossier.nom} ${d.dossier.prenom}`}
                    </span>
                  </div>
                </td>

                <td>
                  {/* Affiche le statut du dossier ou un statut par défaut */}
                  {d.details?.factures[0]?.statut || "Statut inconnu"}
                </td>

                <td>
                  <span className="action-dots">⋮</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Aucun dossier trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}