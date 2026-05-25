import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { style } from "../components/Details.css.js";
import { apiFetch } from "../../commun/commun.jsx";

const STATUS_OPTIONS = ["En cours d'examen", "Documents manquants", "En attente de paiement", "Approuvé", "Rejeté"];

export function DetailsDossier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("En cours d'examen");
  const [dossier, setDossier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dossierDetails, setDossierDetails] = useState(null);
  const [clientDetails, setClientDetails] = useState(null);

  useEffect(() => {
    async function fetchDossierDetails() {
      try {
        const detailsfordossier = await apiFetch(`/dossiers/${id}`)
        const detailsforclient = await apiFetch(`/clients/${detailsfordossier.id_client}`)

        setClientDetails(detailsforclient);
        setDossierDetails(detailsfordossier);
      } catch (err) {
        console.error(`Erreur lors de la récupération des détails pour le dossier ${id}`, err);
      }
    }

    fetchDossierDetails();
  }, [id]);

  const client = dossier?.client ?? dossier?.clients ?? null;
  const dossierId = dossier?.dossier?.id_dossier ?? id;
  const documents = dossier?.documents ?? [];
  const factures = dossier?.factures ?? [];
  const notes = dossier?.notes ?? [];

  // Construction d'une timeline basée sur les données réelles
  const TIMELINE = [
    {
      label: "Dossier reçu",
      sub: dossier?.dossier?.date_creation
        ? new Date(dossier.dossier.date_creation).toLocaleDateString("fr-CA")
        : "—",
      done: true,
    },
    { label: "Examen préliminaire", sub: "En cours de vérification", done: documents.length > 0 },
    { label: "Vérification biométrique", sub: "Attendu dans les 5 jours", done: false },
    { label: "Décision finale", sub: "En attente des étapes précédentes", done: status === "approuvé" },
  ];

  if (loading) {
    return (
      <main style={{ padding: "4rem", textAlign: "center", color: "#515f74" }}>
        Chargement du dossier…
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: "4rem", textAlign: "center", color: "#ba1a1a" }}>
        Erreur : {error}
        <br />
        <button onClick={() => navigate(-1)} style={{ marginTop: "1rem", cursor: "pointer" }}>
          ← Retour
        </button>
      </main>
    );
  }

  return (
    <>
      <style>{style}</style>

      <main style={{ padding: "2rem", maxWidth: 1300, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div className="sl-breadcrumb">
              <span style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>← Retour</span>
              <span className="sep">/</span>
              <span>Dossier #{dossierId}</span>
            </div>
            <h1 className="page-title">
              Aperçu du dossier : {client ? `${client.nom ?? ""} ${client.prenom ?? ""}` : `#${dossierId}`}
            </h1>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button className="btn-export">Exporter le dossier</button>
            <button className="btn-update-status">Mettre à jour le statut</button>
          </div>
        </div>

        {/* ── Bento grid: 2 colonnes ── */}
        <div className="columns is-variable is-5" style={{ alignItems: "flex-start" }}>

          {/* ── LEFT COLUMN ── */}
          <div className="column is-8">

            {/* Client Information */}
            <div className="sl-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <span className="sl-card-title">Informations du client</span>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--outline)", fontSize: "1.2rem" }} title="Modifier">✏️</button>
              </div>

              <div className="columns is-multiline">
                {[
                  { label: "Nom complet", value: client ? `${client.nom ?? ""} ${client.prenom ?? ""}` : "—" },
                  { label: "Adresse courriel", value: client?.courriel ?? "—" },
                  { label: "Numéro de téléphone", value: client?.telephone ?? "—" },
                ].map(({ label, value }) => (
                  <div className="column is-one-third" key={label}>
                    <span className="info-label">{label}</span>
                    <span className="info-value">{value}</span>
                  </div>
                ))}
              </div>

              <hr className="info-divider" />

              <div className="columns is-multiline">
                <div className="column is-one-third">
                  <span className="info-label">Type de demande</span>
                  <span className="badge-type">{dossier?.type_demande?.Type_Demande ?? dossier?.demandes?.[0]?.Type_Demande ?? "—"}</span>
                </div>
                <div className="column is-one-third">
                  <span className="info-label">Date de soumission</span>
                  <span className="info-value">
                    {dossier?.dossier?.date_creation
                      ? new Date(dossier.dossier.date_creation).toLocaleDateString("fr-CA")
                      : "—"}
                  </span>
                </div>
                <div className="column is-one-third">
                  <span className="info-label">Niveau de priorité</span>
                  <span className="priority-high">⚡ {dossier?.dossier?.priorite ?? "Normal"}</span>
                </div>
              </div>
            </div>

            {/* Verification Documents */}
            <div className="sl-card-gray">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <span className="sl-card-title">Documents de vérification</span>
                <button className="btn-upload">⬆ Téléverser un document</button>
              </div>

              {documents.length === 0 ? (
                <p style={{ color: "var(--outline)", fontSize: "0.9rem" }}>Aucun document attaché.</p>
              ) : (
                documents.map((doc) => (
                  <div className="doc-item" key={doc.id_document ?? doc.nom_fichier}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div className="doc-icon">📄</div>
                      <div>
                        <div className="doc-name">{doc.nom_fichier ?? doc.nom ?? "Document"}</div>
                        <div className="doc-meta">{doc.date_telechargement
                          ? new Date(doc.date_telechargement).toLocaleDateString("fr-CA")
                          : ""}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.25rem" }}>
                      <button className="btn-doc-action" title="Télécharger">⬇️</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Case Notes */}
            <div className="sl-card-bordered">
              <span className="sl-card-title" style={{ display: "block", marginBottom: "1rem" }}>Notes du dossier</span>

              {notes.length === 0 ? (
                <p style={{ color: "var(--outline)", fontSize: "0.9rem", marginBottom: "1rem" }}>Aucune note pour ce dossier.</p>
              ) : (
                notes.map((n, i) => (
                  <div className="note-bubble" key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <span className="note-officer">{n.auteur ?? "Officier"}</span>
                      <span className="note-date">{n.date ? new Date(n.date).toLocaleDateString("fr-CA") : ""}</span>
                    </div>
                    <p className="note-text">{n.contenu ?? n.note}</p>
                  </div>
                ))
              )}

              <div style={{ position: "relative" }}>
                <textarea
                  className="note-textarea"
                  placeholder="Ajouter une nouvelle note à ce dossier..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <div style={{ position: "absolute", bottom: "0.75rem", right: "0.75rem" }}>
                  <button className="btn-post-note">Publier la note</button>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="column is-4">

            {/* Case Actions */}
            <div className="actions-sidebar">
              <div className="actions-title">⚡ Actions du dossier</div>
              <button className="btn-action-white">💳 Générer une facture</button>
              <button className="btn-action-ghost">✉️ Demander des informations</button>
              <button className="btn-action-ghost">🕐 Planifier un entretien</button>
              <button className="btn-action-danger">🗑️ Supprimer le dossier</button>

              <hr className="status-divider" />
              <span className="status-label">Modifier le statut du dossier</span>
              <select
                className="status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            {/* Application Progress */}
            <div className="progress-card">
              <div className="progress-title">Progression de la demande</div>

              {TIMELINE.map((step, i) => (
                <div className="timeline-item" key={step.label}>
                  <div className="timeline-dot-col">
                    <div className={`timeline-dot ${step.done ? "done" : "pending"}`} />
                    {i < TIMELINE.length - 1 && (
                      <div className={`timeline-line ${step.done ? "done" : "pending"}`} />
                    )}
                  </div>
                  <div style={{ paddingBottom: i < TIMELINE.length - 1 ? "1.5rem" : 0 }}>
                    <p className={step.done ? "timeline-step-title-done" : "timeline-step-title-pending"}>
                      {step.label}
                    </p>
                    <p className={step.done ? "timeline-step-date-done" : "timeline-step-date-pending"}>
                      {step.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Factures */}
            {factures.length > 0 && (
              <div className="regulatory-card">
                <div className="regulatory-header">
                  <span style={{ fontSize: "1.1rem" }}>💳</span>
                  <span className="regulatory-title">Factures</span>
                </div>
                {factures.map((f, i) => (
                  <p key={i} className="regulatory-text">
                    #{f.id_facture} — {f.montant ?? "—"} $ — <em>{f.statut ?? "—"}</em>
                  </p>
                ))}
              </div>
            )}

            {/* Regulatory Context */}
            <div className="regulatory-card">
              <div className="regulatory-header">
                <span style={{ fontSize: "1.1rem" }}>⚖️</span>
                <span className="regulatory-title">Contexte réglementaire</span>
              </div>
              <p className="regulatory-text">
                Les demandes de travailleurs qualifiés en vertu de l'article 4.2 nécessitent une
                preuve valide de compétence linguistique et une offre d'emploi certifiée sur le territoire souverain.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}