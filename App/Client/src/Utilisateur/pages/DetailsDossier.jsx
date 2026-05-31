
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../../commun/commun.jsx";
import { style } from "../components/DetailsDossiers/Details.css";

const STATUS_OPTIONS = ["En cours d'examen", "Documents manquants", "En attente de paiement", "Approuvé", "Rejeté"];

export default function DetailsDossier() {
    const [note, setNote] = useState("");
    const navigate = useNavigate();
    //const [status, setStatus] = useState("En cours d'examen");
    const { idDossier } = useParams();
    const [error, setError] = useState(null);
    const [dossierDetails, setDossierDetails] = useState(null);
    const [clientDetails, setClientDetails] = useState(null);
    const [notes, setNotes] = useState([]);
    const [factures, setFactures] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        async function fetchDossierDetails() {
            try {
                const detailsfordossier = await apiFetch(`/dossiers/${idDossier}`)
                const detailsforclient = await apiFetch(`/clients/${detailsfordossier.id_client}`)

                setClientDetails(detailsforclient);
                console.log("Détails du dossier récupérés :", detailsfordossier);
                setDossierDetails(detailsfordossier);
            } catch (err) {
                console.error(`Erreur lors de la récupération des détails pour le dossier ${idDossier}`, err);
                setError("Erreur lors de la récupération des détails du dossier.");
            }
        }

        async function fetchNotes() {
            try {
                const notesData = await apiFetch(`/notes/dossier/${idDossier}`);
                setNotes(notesData);
            }
            catch (err) {
                console.error(`Erreur lors de la récupération des notes pour le dossier ${idDossier}`, err);
            }
        }

        async function fetchFactures() {
            try {
                const facturesData = await apiFetch(`/factures/dossier/${idDossier}`);
                setFactures(facturesData);
            }
            catch (err) {
                console.error(`Erreur lors de la récupération des factures pour le dossier ${idDossier}`, err);
            }
        }

        async function fetchDocuments() {
            try {
                const documentsData = await apiFetch(`/documents/dossier/${idDossier}`);
                setDocuments(documentsData);
            }
            catch (err) {
                console.error(`Erreur lors de la récupération des documents pour le dossier ${idDossier}`, err);
            }
        }

        fetchDossierDetails();
        fetchNotes();
        fetchFactures();
        fetchDocuments();
    }, [idDossier, note, documents.length, factures.length]);

    async function handleDelete(id_dossier) {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce dossier ? Cette action est irréversible.")) {
            try {
                await apiFetch(`/dossiers/delete/${id_dossier}`, { method: "DELETE" });
                alert("Dossier supprimé avec succès.");
                navigate("/utilisateur/clients");
            } catch (err) {
                console.error(`Erreur lors de la suppression du dossier ${id_dossier}`, err);
                setError("Erreur lors de la suppression du dossier.");
            }
        }
    }

    async function générerNote() {
        try {
            if (!note.trim()) {
                alert("Le contenu de la note ne peut pas être vide.");
                return;
            }

            const nouvelleNote = {
                "id_dossier": idDossier,
                "note": note
            };

            await apiFetch("/notes", { method: "POST", body: JSON.stringify(nouvelleNote) });
            alert("Note ajoutée avec succès.");
            setNote("");
        }
        catch (err) {
            console.error(`Erreur lors de la création de la note pour le dossier ${idDossier}`, err);
            setError("Erreur lors de la création de la note.");
        }
    }
    async function générerFacture() {
        try {
            if (!dossierDetails?.typeDemandes[0]?.Type_Demande) {
                alert("Impossible de générer une facture : type de demande inconnu.");
                return;
            }

            const montant = dossierDetails?.typeDemandes[0]?.Type_Demande === "Residence Permanente" ?
                500 : // Montant fictif pour la résidence permanente 
                dossierDetails?.typeDemandes[0]?.Type_Demande === "Travail Temporaire" ?
                    300 : // Montant fictif pour le travail temporaire
                    dossierDetails?.typeDemandes[0]?.Type_Demande === "Études & Recherche" ?
                        200 : // Montant fictif pour les études et la recherche
            dossierDetails?.typeDemandes[0]?.Type_Demande === "Regroupement Familial"
                ? 400 // Montant fictif pour le regroupement familial
                : 0; // Montant par défaut

            const facture = {
                "id_dossier": idDossier,
                "description": dossierDetails?.typeDemandes[0]?.Type_Demande || "Demande inconnue",
                "montant": montant,
                "date_emission": new Date().toISOString().split("T")[0],
                "date_echeance": new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
                "statut": "en attente"
            }

            const existingFactures = await apiFetch(`/factures/dossier/${idDossier}`);
            if (existingFactures.length > 0) {
                if (window.confirm("Une facture existe déjà pour ce dossier. Voulez-vous la remplacer ?")) {
                    const factureExistante = existingFactures[0];
                    await apiFetch(`/factures/update/${factureExistante.id_facture}`, { method: "PUT", body: JSON.stringify(facture) });
                    alert("Facture mise à jour avec succès.");
                    setFactures("");
                }
            }
            else {
                await apiFetch("/factures", { method: "POST", body: JSON.stringify(facture) });
                alert("Facture générée avec succès.");
                setFactures("")
            }

        }
        catch (err) {
            console.error(`Erreur lors de la génération de la facture pour le dossier ${idDossier}`, err);
            setError("Erreur lors de la génération de la facture.");
        }
    }

    async function téléverserDocument() {
        try {
            if (!file) {
                alert("Veuillez sélectionner un fichier à téléverser.");
                return;
            }
            const formData = new FormData();
            formData.append("fichier", file);
            formData.append("id_dossier", dossierDetails?.id_dossier);

            const res = await apiFetch("/documents", {
                method: "POST",
                body: formData,
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                console.log(data.error || "Erreur lors du téléversement du document");
            }
        } catch (err) {
            console.error(`Erreur lors du téléversement du document pour le dossier ${idDossier}`, err);
            setError("Erreur lors du téléversement du document.");
        }
    }

    // Construction d'une timeline basée sur les données réelles
    const TIMELINE = [
        {
            label: "Dossier reçu",
            sub: dossierDetails?.date_creation
                ? new Date(dossierDetails.date_creation).toLocaleDateString("fr-CA")
                : "—",
            done: true,
        },
        { label: "Examen préliminaire", sub: "En cours de vérification", done: dossierDetails?.documents?.length > 0 },
        { label: "Décision finale", sub: "En attente des étapes précédentes", done: dossierDetails?.factures[0]?.statut === "approuvé" },
    ];

    if (!dossierDetails || !clientDetails) {
        return (
            <main style={{ padding: "4rem", textAlign: "center", color: "#515f74" }}>
                Chargement du dossier…
            </main>
        );
    }

    if (error) {
        alert(error);
        setError(null);
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
                            <span>Dossier #{dossierDetails?.id_dossier ?? "—"}</span>
                        </div>
                        <h1 className="page-title">
                            Aperçu du dossier : {clientDetails ? `${clientDetails.nom ?? ""} ${clientDetails.prenom ?? ""}` : `#${dossierDetails?.id_dossier ?? "—"}`}
                        </h1>
                    </div>
                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
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
                                    { label: "Nom complet", value: clientDetails ? `${clientDetails.nom ?? ""} ${clientDetails.prenom ?? ""}` : "—" },
                                    { label: "Adresse courriel", value: clientDetails?.courriel ?? "—" },
                                    { label: "Numéro de téléphone", value: clientDetails?.telephone ?? "—" },
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
                                    <span className="badge-type">{dossierDetails?.typeDemandes[0]?.Type_Demande ?? "—"}</span>
                                </div>
                                <div className="column is-one-third">
                                    <span className="info-label">Date de soumission</span>
                                    <span className="info-value">
                                        {dossierDetails?.date_creation
                                            ? new Date(dossierDetails.date_creation).toLocaleDateString("fr-CA")
                                            : "—"}
                                    </span>
                                </div>
                                <div className="column is-one-third">
                                    <span className="info-label">Niveau de priorité</span>
                                    <span className="priority-high">⚡ {dossierDetails?.dossier?.priorite ?? "Normal"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Verification Documents */}
                        <div className="sl-card-gray">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                                <span className="sl-card-title">Documents de vérification</span>
                                <label className="btn-upload">
                                    Téléverser le document
                                    <input type="file" id="fileInput"
                                        style={{ display: "none" }}
                                        onChange={(e) => setFile(e.target.files[0])} />
                                </label>
                                <button htmlFor="fileInput" className="btn-upload" onClick={téléverserDocument}>
                                    {file ? (
                                        <span style={{ fontSize: "1.2rem" }}>{file.name} ⬆️</span>
                                    ) : (
                                        <span style={{ fontSize: "1.2rem" }}>⬆️</span>
                                    )}
                                </button>
                            </div>

                            {dossierDetails?.documents?.length === 0 ? (
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
                                    <button className="btn-post-note" onClick={générerNote}>Publier la note</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT COLUMN ── */}
                    <div className="column is-4">

                        {/* Case Actions */}
                        <div className="actions-sidebar">
                            <div className="actions-title">⚡ Actions du dossier</div>
                            <button className="btn-action-white" onClick={générerFacture}>💳 Générer une facture</button>
                            {/* <button className="btn-action-ghost">🕐 Planifier un entretien</button> */}
                            <button className="btn-action-danger" onClick={() => handleDelete(dossierDetails?.id_dossier)}>
                                🗑️ Supprimer le dossier
                            </button>
                        {/*
                            <hr className="status-divider" />
                            <span className="status-label">Modifier le statut du dossier</span>
                            <select
                                className="status-select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                            </select>
                        */}
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
                                        #{f.id_facture}<br />
                                        Montant : {f.montant ?? "—"} $<br />
                                        Description : {f.description ?? "—"}<br />
                                        Statut : <em>{f.statut ?? "—"}</em><br />
                                        Date d'émission : {f.date_emission ? new Date(f.date_emission).toLocaleDateString("fr-CA") : "—"}<br />
                                        Date d'échéance : {f.date_echeance ? new Date(f.date_echeance).toLocaleDateString("fr-CA") : "—"}
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