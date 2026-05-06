
import { useState } from "react";
import { style } from "../components/Details.css";

// Créer une fonction pour générer la time line selon un client
const TIMELINE = [
    { label: "Dossier reçu", sub: "24 oct. 2023", done: true },
    { label: "Examen préliminaire", sub: "Complété le 26 oct. 2023", done: true },
    { label: "Vérification biométrique", sub: "Attendu dans les 5 jours", done: false },
    { label: "Décision finale", sub: "En attente des étapes précédentes", done: false },
];

const STATUS_OPTIONS = ["En cours d'examen", "Documents manquants", "En attente de paiement", "Approuvé", "Rejeté"];

export default function DossierDetail() {
    const [note, setNote] = useState("");
    const [status, setStatus] = useState("En cours d'examen");

    return (
        <>
            <style>{style}</style>

            <main style={{ padding: "2rem", maxWidth: 1300, margin: "0 auto" }}>

                {/* ── Header ── */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                        <div className="sl-breadcrumb">
                            <span>Dossier</span>
                            <span className="sep">/</span>
                            <span>{/*CLIENT.dossierId*/}</span>
                        </div>
                        <h1 className="page-title">Aperçu du dossier : {/*CLIENT.name*/}</h1>
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
                                {/*[
                  { label: "Nom complet",        value: CLIENT.name  },
                  { label: "Adresse courriel",   value: CLIENT.email },
                  { label: "Numéro de téléphone",value: CLIENT.phone },
                ].map(({ label, value }) => (
                  <div className="column is-one-third" key={label}>
                    <span className="info-label">{label}</span>
                    <span className="info-value">{value}</span>
                  </div>
                ))*/}
                            </div>

                            <hr className="info-divider" />

                            <div className="columns is-multiline">
                                <div className="column is-one-third">
                                    <span className="info-label">Type de demande</span>
                                    <span className="badge-type">TypeDemande : {/*CLIENT.type*/}</span>
                                </div>
                                <div className="column is-one-third">
                                    <span className="info-label">Date de soumission</span>
                                    <span className="info-value">{/*CLIENT.submitted*/}</span>
                                </div>
                                <div className="column is-one-third">
                                    <span className="info-label">Niveau de priorité</span>
                                    <span className="priority-high">⚡ {/*CLIENT.priority*/}</span>
                                </div>
                            </div>
                        </div>

                        {/* Verification Documents */}
                        <div className="sl-card-gray">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                                <span className="sl-card-title">Documents de vérification</span>
                                <button className="btn-upload">⬆ Téléverser un document</button>
                            </div>

                            {/*DOCUMENTS.map((doc) => (
                <div className="doc-item" key={doc.name}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div className="doc-icon">{doc.icon}</div>
                    <div>
                      <div className="doc-name">{doc.name}</div>
                      <div className="doc-meta">{doc.meta}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.25rem" }}>
                    <button className="btn-doc-action" title="Voir">👁️</button>
                    <button className="btn-doc-action" title="Télécharger">⬇️</button>
                  </div>
                </div>
              ))*/}
                        </div>

                        {/* Case Notes */}
                        <div className="sl-card-bordered">
                            <span className="sl-card-title" style={{ display: "block", marginBottom: "1rem" }}>Notes du dossier</span>

                            <div className="note-bubble">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                    <span className="note-officer">Officier Marcus Vane</span>
                                    <span className="note-date">26 oct., 14h32</span>
                                </div>
                                <p className="note-text">
                                    Documents d'identité vérifiés dans la base de données principale.
                                    Autorisé pour l'examen secondaire. Le demandeur a fourni une preuve de
                                    résidence supplémentaire qui a été jointe au dossier.
                                </p>
                            </div>

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
