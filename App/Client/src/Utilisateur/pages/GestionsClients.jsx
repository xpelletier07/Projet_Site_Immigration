import { useState } from "react";
import { style } from "../components/Gestion.css";

export function GestionsClients() {
  const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Tous les statuts");
    const [typeFilter, setTypeFilter]   = useState("Tous les types"); // AJOUTÉ
   // const [clients, setClients]         = useState(CLIENTS_INIT);    // AJOUTÉ pour le delete
    /* 
    #=============================================
    # Récupérer tous les clients filtrés selon 
    # le status, le nom ou numero de dossier
    #=============================================
  
    const filtered = clients.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "Tous les statuts" || c.status === statusFilter;
      return matchSearch && matchStatus;
    });
    */
  
    const TYPE_OPTIONS = [
  "Tous les types",
  "Travailleur qualifié",
  "Regroupement familial",
  "Études",
  "Résidence permanente",
];

    return (
      <>
        <style>{style}</style>
  
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          {/* Main */}
          <main style={{ flexGrow: 1, maxWidth: 1400, margin: "0 auto", width: "100%", padding: "3rem 1.5rem" }}>
  
            {/* Page Header
                MODIFIÉ : ajout du bouton "Nouveau Client" à droite du titre (flex row) */}
            <div style={{ marginBottom: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h1 style={{ fontSize: "3rem", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--on-surface)", marginBottom: "0.75rem", fontFamily: "'Public Sans', sans-serif" }}>
                  Gestion des Clients
                </h1>
                <p style={{ color: "var(--secondary)", fontSize: "1.1rem", maxWidth: 600, lineHeight: 1.6 }}>
                  Accédez au registre complet des dossiers d'immigration. Gérez les priorités, surveillez l'activité récente et assurez le suivi des engagements souverains.
                </p>
              </div>
              {/* AJOUTÉ : bouton Nouveau Client */}
              <button className="btn-new-client">
                + Nouveau Client
              </button>
            </div>
  
            {/* Filter Panel */}
            <div className="sl-filter-panel">
              <div className="columns is-vcentered is-variable is-3">
                <div className="column">
                  <span className="sl-filter-label">Recherche de Dossier</span>
                  <div className="search-icon-wrap">
                    <label className="search-icon material-symbols-outlined" style={{ fontFamily: "'Material Symbols Outlined'" }}>
                      search
                    </label>
                    <input
                      className="input sl-input"
                      type="text"
                      placeholder="Rechercher par nom ou numéro de dossier..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{ paddingLeft: "2.75rem" }}
                    />
                  </div>
                </div>
  
                {/* AJOUTÉ : filtre Type de demande */}
                <div className="column is-narrow" style={{ minWidth: 200 }}>
                  <span className="sl-filter-label">Type de demande</span>
                  <div className="select sl-select is-fullwidth">
                    <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                      {/* Tous les types de demande ici */}
                      {TYPE_OPTIONS.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
  
                <div className="column is-narrow" style={{ minWidth: 200 }}>
                  <span className="sl-filter-label">Statut</span>
                  <div className="select sl-select is-fullwidth">
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                      {["Tous les statuts", "En attente", "En cours", "Approuvé", "Action Requise"].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
  
                <div className="column is-narrow" style={{ paddingTop: "1.6rem" }}>
                  <button className="sl-btn-filter">
                    <span style={{ fontSize: "1.1rem" }}>☰</span>
                    Filtrer
                  </button>
                </div>
              </div>
            </div>
  
            {/* ## Ledger
            <div style={{ marginTop: "2rem" }}>
              ## Header row
              <div className="ledger-header">
                <div>Identité du Client</div>
                <div>N° de Dossier</div>
                <div className="col-status">Statut</div>
                <div>Dernière Activité</div>
                <div className="col-actions">Actions</div>
              </div>
  
              ## Client rows
              {filtered.map((client) => {
                const tagClass =
                  client.status === "En cours" ? "en-cours"
                  : client.status === "Action Requise" ? "action"
                  : client.status === "En attente" ? "attente"
                  : "approuve";
  
                return (
                  <div key={client.id} className="ledger-row">
                    ## Identity
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div
                        className="sl-avatar"
                        style={{ background: client.avatarClass.bg, color: client.avatarClass.color }}
                      >
                        {client.initials}
                      </div>
                      <div>
                        <div className="client-name">{client.name}</div>
                        <div className="client-email">{client.email}</div>
                      </div>
                    </div>
  
                    ## Dossier
                    <div className="dossier-num">#{client.id}</div>
  
                    ## Status
                    <div className="col-status">
                      <span className={`sl-tag ${tagClass}`}>{client.status}</span>
                    </div>
  
                    ## Last activity
                    <div className="last-activity">{client.lastActivity}</div>
  
                    ## Actions
                    ## MODIFIÉ : ajout du bouton supprimer (btn-delete) entre btn-edit et btn-voir
                    <div className="col-actions">
                      <button className="btn-edit" title="Modifier">✏️</button>
                      <button
                        className="btn-delete"
                        title="Supprimer"
                        onClick={() => handleDelete(client.id)}
                      >🗑️</button>
                      <button className="btn-voir">Voir Dossier</button>
                    </div>
                  </div>
                );
              })}
  
              {filtered.length === 0 && (
                <div style={{ textAlign: "center", padding: "3rem", color: "var(--secondary)" }}>
                  Aucun client trouvé.
                </div>
              )}
            </div>
            */}
  
            {/* Pagination */}
            <div className="pagination-area">
              <span className="pagination-info">Affichage de 1-4 sur 1,248 clients</span>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button className="pag-btn arrow">‹</button>
                {/*
                <button className="pag-btn is-current">1</button>
                <button className="pag-btn">2</button>
                <button className="pag-btn">3</button>
                */}
                <button className="pag-btn arrow">›</button>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }
