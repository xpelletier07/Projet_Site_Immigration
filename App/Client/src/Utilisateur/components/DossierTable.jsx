export function DossierTable() {
  return (
    <div className="section-card">
      <div className="section-header">
        <h2>Dossiers clients actifs</h2>
        <a className="view-all">
          Voir tout <i className="fas fa-arrow-right" />
        </a>
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
          {/* Modèle de la table

          dossiers.map((d) => (
            <tr key={d.id}>
              <td className="id-cell">{d.id}</td>

              <td>
                <div className="client-cell">
                  <div
                    className="avatar-sm"
                    style={{
                      background: d.color,
                      color: d.text
                    }}
                  >
                    {d.initials}
                  </div>

                  <span style={{ fontWeight: 600 }}>
                    {d.name}
                  </span>
                </div>
              </td>

              <td>
                <StatusBadge status={d.status} />
              </td>

              <td>
                <span className="action-dots">⋮</span>
              </td>
            </tr>
          ))
          */}
        </tbody>
      </table>
    </div>
  );
}