import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar.jsx";
import {
	getClientBundle,
	updateClientProfile,
	uploadDocument,
	createDossier,
	createTypeDemande,
	getUserId,
} from "../services/client.service.jsx";
import { useToast } from "../../commun/Toast.jsx";

// ─── Icons ────────────────────────────────────────────────────────────────────
const PrintIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
		<polyline points="6,9 6,2 18,2 18,9" />
		<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
		<rect x="6" y="14" width="12" height="8" />
	</svg>
);
const EditIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
		<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
		<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
	</svg>
);
const PlusIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
		<line x1="12" y1="5" x2="12" y2="19" />
		<line x1="5" y1="12" x2="19" y2="12" />
	</svg>
);
const FileIcon = () => (
	<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
		<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
		<polyline points="14,2 14,8 20,8" />
	</svg>
);
const DlIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
		<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
		<polyline points="7,10 12,15 17,10" />
		<line x1="12" y1="15" x2="12" y2="3" />
	</svg>
);
const CheckIcon = () => (
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
		<polyline points="20,6 9,17 4,12" />
	</svg>
);
const HelpIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
		<circle cx="12" cy="12" r="10" />
		<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
		<line x1="12" y1="17" x2="12.01" y2="17" />
	</svg>
);

// ─── Calcul dynamique du statut ───────────────────────────────────────────────
function computeCaseStatus(demandes = [], documents = []) {
	const hasDemande = demandes.length > 0;
	const hasDocuments = documents.length > 0;

	const demandeStatuts = demandes.map(d => (d.Statut || "").toLowerCase());
	const hasDecision = demandeStatuts.some(s =>
		s.includes("approuvé") || s.includes("refusé") || s.includes("décision") || s.includes("accepté")
	);

	let currentStep = 0;
	if (hasDocuments || hasDemande) currentStep = 1;
	if (hasDemande && hasDocuments) currentStep = 2;
	if (hasDecision) currentStep = 3;

	const pct = Math.round((currentStep / 3) * 100);

	return { pct, hasDecision };
}

// ─── Modal : modifier le profil ───────────────────────────────────────────────
function EditProfileModal({ client, onClose, onSaved }) {
	const toast = useToast();
	const [form, setForm] = useState({
		nom: client.nom || "",
		prenom: client.prenom || "",
		courriel: client.courriel || "",
		telephone: client.telephone || "",
	});
	const [loading, setLoading] = useState(false);

	const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

	async function handleSave() {
		setLoading(true);
		try {
			await updateClientProfile(client.id_client, form);
			toast("Profil mis à jour !", "success");
			onSaved(form);
		} catch {
			toast("Erreur lors de la mise à jour.", "error");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="app-modal-overlay" onClick={onClose}>
			<div className="app-modal" onClick={e => e.stopPropagation()}>
				<div className="app-modal-header">
					<span className="app-modal-title">Modifier le profil</span>
					<button className="app-modal-close" onClick={onClose}>✕</button>
				</div>
				<div className="app-modal-body">
					<div className="form-grid-2">
						<div className="form-group">
							<label className="form-label">Prénom</label>
							<input className="form-input" value={form.prenom} onChange={set("prenom")} />
						</div>
						<div className="form-group">
							<label className="form-label">Nom</label>
							<input className="form-input" value={form.nom} onChange={set("nom")} />
						</div>
					</div>
					<div className="form-group">
						<label className="form-label">Courriel</label>
						<input className="form-input" type="email" value={form.courriel} onChange={set("courriel")} />
					</div>
					<div className="form-group">
						<label className="form-label">Téléphone</label>
						<input className="form-input" value={form.telephone} onChange={set("telephone")} />
					</div>
				</div>
				<div className="app-modal-footer">
					<button className="btn btn-outline" onClick={onClose}>Annuler</button>
					<button className="btn btn-primary" onClick={handleSave} disabled={loading}>
						{loading ? "Sauvegarde..." : "Sauvegarder"}
					</button>
				</div>
			</div>
		</div>
	);
}

// ─── Modal : nouvelle demande dans dossier existant ───────────────────────────
function NewDemandeModal({ dossierId, onClose, onCreated }) {
	const toast = useToast();
	const [type, setType] = useState("Résidence permanente");
	const [loading, setLoading] = useState(false);

	const types = [
		"Résidence permanente", "Permis de travail", "Permis d'études",
		"Visa de visiteur", "Citoyenneté", "Regroupement familial",
	];

	async function handleCreate() {
		if (!dossierId) { toast("Aucun dossier actif.", "error"); return; }
		setLoading(true);
		try {
			await createTypeDemande(dossierId, type);
			toast(`Demande "${type}" soumise !`, "success");
			onCreated();
		} catch {
			toast("Erreur lors de la création.", "error");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="app-modal-overlay" onClick={onClose}>
			<div className="app-modal" onClick={e => e.stopPropagation()}>
				<div className="app-modal-header">
					<span className="app-modal-title">Nouvelle demande d'immigration</span>
					<button className="app-modal-close" onClick={onClose}>✕</button>
				</div>
				<div className="app-modal-body">
					<div className="form-group">
						<label className="form-label">Type de demande</label>
						<select className="form-input" value={type} onChange={e => setType(e.target.value)}>
							{types.map(t => <option key={t} value={t}>{t}</option>)}
						</select>
					</div>
					<div className="info-box">
						ℹ️ Un agent vous sera assigné sous 24-48 heures ouvrables.
					</div>
				</div>
				<div className="app-modal-footer">
					<button className="btn btn-outline" onClick={onClose}>Annuler</button>
					<button className="btn btn-primary" onClick={handleCreate} disabled={loading}>
						{loading ? "Envoi..." : "Soumettre"}
					</button>
				</div>
			</div>
		</div>
	);
}

// ─── Modal : créer premier dossier ────────────────────────────────────────────
function NewDossierModal({ onClose, onCreated }) {
	const toast = useToast();
	const [loading, setLoading] = useState(false);

	async function handleCreate() {
		setLoading(true);
		try {
			await createDossier(getUserId());
			toast("Dossier créé avec succès !", "success");
			onCreated();
		} catch {
			toast("Erreur lors de la création.", "error");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="app-modal-overlay" onClick={onClose}>
			<div className="app-modal" onClick={e => e.stopPropagation()}>
				<div className="app-modal-header">
					<span className="app-modal-title">Créer mon dossier</span>
					<button className="app-modal-close" onClick={onClose}>✕</button>
				</div>
				<div className="app-modal-body">
					<p style={{ marginBottom: "12px" }}>
						Vous n'avez pas encore de dossier actif. Cliquez sur <strong>Créer</strong> pour ouvrir votre dossier d'immigration.
					</p>
					<div className="info-box">ℹ️ Un agent vous sera assigné sous 24-48 heures ouvrables.</div>
				</div>
				<div className="app-modal-footer">
					<button className="btn btn-outline" onClick={onClose}>Annuler</button>
					<button className="btn btn-primary" onClick={handleCreate} disabled={loading}>
						{loading ? "Création..." : "Créer le dossier"}
					</button>
				</div>
			</div>
		</div>
	);
}

// ─── Main My Case Page ────────────────────────────────────────────────────────
export default function MyCasePage() {
	const toast = useToast();
	const fileInputRef = useRef();

	const [bundle, setBundle] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showEdit, setShowEdit] = useState(false);
	const [showNewDemande, setShowNewDemande] = useState(false);
	const [showNewDossier, setShowNewDossier] = useState(false);
	const [uploading, setUploading] = useState(false);

	useEffect(() => { refresh(); }, []);

	async function refresh() {
		try {
			setBundle(await getClientBundle());
		} catch {
			toast("Impossible de charger vos données.", "error");
		} finally {
			setLoading(false);
		}
	}

	async function handleFileUpload(e) {
		const file = e.target.files?.[0];
		if (!file || !bundle?.dossier) return;
		e.target.value = "";
		setUploading(true);
		try {
			await uploadDocument(file, bundle.dossier.id_dossier);
			toast("Document ajouté !", "success");
			await refresh();
		} catch {
			toast("Erreur upload.", "error");
		} finally {
			setUploading(false);
		}
	}

	function handleProfileSaved(updates) {
		setBundle(b => ({ ...b, client: { ...b.client, ...updates } }));
		setShowEdit(false);
	}

	if (loading) {
		return (
			<div className="app-shell">
				<div className="loading-screen"><div className="spinner" /></div>
			</div>
		);
	}

	// ─── Aucun dossier ────────────────────────────────────────────────────────
	if (!bundle?.hasDossier) {
		return (
			<>
				<div className="app-shell">
					<div className="page-body">
						<Sidebar onNewCase={() => setShowNewDossier(true)} />
						<main className="main-content">
							<div className="empty-state">
								<div className="empty-icon" style={{ fontSize: "2.5rem" }}>📋</div>
								<h1 className="empty-title">Aucun dossier actif</h1>
								<p className="empty-sub">Vous n'avez pas encore de dossier d'immigration en cours.</p>
								<button
									className="btn btn-primary"
									style={{ padding: "14px 28px" }}
									onClick={() => setShowNewDossier(true)}
								>
									+ Créer mon dossier
								</button>
							</div>
						</main>
					</div>
				</div>
				{showNewDossier && (
					<NewDossierModal
						onClose={() => setShowNewDossier(false)}
						onCreated={() => { setShowNewDossier(false); refresh(); }}
					/>
				)}
			</>
		);
	}

	const { client, dossier, documents = [], demandes = [] } = bundle;
	const dossierId = dossier.id_dossier;
	const { pct, hasDecision } = computeCaseStatus(demandes, documents);

	// Checklist dynamique
	const checklist = [
		{ label: "Soumission reçue", done: true },
		{ label: "Documents soumis", done: documents.length > 0 },
		{ label: "Demande soumise", done: demandes.length > 0 },
		{ label: "Décision finale", done: hasDecision },
	];

	return (
		<>
			<div className="app-shell">
				<div className="page-body">
					<Sidebar onNewCase={() => setShowNewDemande(true)} />

					<main className="main-content">
						{/* Header */}
						<div style={{ marginBottom: "28px" }}>
							<div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "6px" }}>
								IMMIGRATION &amp; CITOYENNETÉ
							</div>
							<div className="flex justify-between items-center" style={{ gap: "16px", flexWrap: "wrap" }}>
								<div>
									<h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "2.2rem", lineHeight: 1.1 }}>
										Gestion de mon dossier
									</h1>
									<p style={{ color: "var(--muted)", marginTop: "6px", fontSize: "0.9rem" }}>
										Consultez l'état d'avancement de votre demande, gérez vos documents et mettez à jour vos informations.
									</p>
								</div>
								<div className="flex gap-2">
									<button className="btn btn-outline" onClick={() => window.print()}>
										<PrintIcon /> Imprimer
									</button>
									<button className="btn btn-outline" onClick={() => setShowNewDemande(true)}>
										<PlusIcon /> Nouvelle demande
									</button>
									<button className="btn btn-primary" onClick={() => setShowEdit(true)}>
										<EditIcon /> Modifier le profil
									</button>
								</div>
							</div>
						</div>

						<div className="grid-col-7-5">
							{/* LEFT */}
							<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

								{/* Infos personnelles */}
								<div className="card p-6">
									<div className="flex justify-between items-center mb-4">
										<h3 style={{ fontWeight: 600, fontSize: "1rem" }}>Informations personnelles</h3>
										<button className="btn btn-outline btn-sm" onClick={() => setShowEdit(true)}>
											<EditIcon /> Modifier
										</button>
									</div>
									<div className="form-grid-2" style={{ gap: "20px" }}>
										{[
											["NOM COMPLET", `${client.prenom} ${client.nom}`],
											["IDENTIFIANT (UCI)", `CLI-${client.id_client}`],
											["EMAIL", client.courriel],
											["TÉLÉPHONE", client.telephone || "Non renseigné"],
										].map(([label, val]) => (
											<div key={label}>
												<div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "4px" }}>
													{label}
												</div>
												<div style={{ fontWeight: 500, fontSize: "0.9rem" }}>{val}</div>
											</div>
										))}
									</div>
								</div>

								{/* Documents */}
								<div className="card" style={{ overflow: "hidden" }}>
									<div className="section-header">
										<span className="section-title"><FileIcon /> Documents soumis</span>
										<div className="flex gap-2 items-center">
											<span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
												{documents.length} document{documents.length !== 1 ? "s" : ""}
											</span>
											<button
												className="btn btn-outline btn-sm"
												onClick={() => fileInputRef.current?.click()}
												disabled={uploading}
											>
												<PlusIcon /> {uploading ? "..." : "Ajouter"}
											</button>
											<input ref={fileInputRef} type="file" hidden onChange={handleFileUpload} />
										</div>
									</div>
									{documents.length === 0 ? (
										<div style={{ padding: "28px", textAlign: "center", color: "var(--muted)", fontSize: "0.875rem" }}>
											Aucun document soumis.
										</div>
									) : (
										documents.map(doc => (
											<div key={doc.id_document} className="doc-item">
												<div className="doc-item-left">
													<div className="doc-icon"><FileIcon /></div>
													<div>
														<div className="doc-name">{doc.nom_document}</div>
														<div className="doc-date">{doc.type_document}</div>
													</div>
												</div>
												<div className="flex gap-2 items-center">
													<span className="badge badge-success"><CheckIcon /> Vérifié</span>
													<a
														href={`http://localhost:3000/documents/${doc.id_document}/telecharger`}
														target="_blank"
														rel="noreferrer"
														className="btn btn-outline btn-sm btn-icon"
													>
														<DlIcon />
													</a>
												</div>
											</div>
										))
									)}
								</div>

								{/* Demandes actives */}
								{demandes.length > 0 && (
									<div className="card" style={{ overflow: "hidden" }}>
										<div className="section-header">
											<span className="section-title">Demandes d'immigration</span>
											<button className="btn btn-outline btn-sm" onClick={() => setShowNewDemande(true)}>
												<PlusIcon /> Ajouter
											</button>
										</div>
										{demandes.map(d => (
											<div key={d.id_demande} className="doc-item">
												<div className="doc-item-left">
													<div className="doc-icon">📋</div>
													<div>
														<div className="doc-name">{d.Type_Demande}</div>
														<div className="doc-date">Demande #{d.id_demande}{d.Description ? ` — ${d.Description}` : ""}</div>
													</div>
												</div>
												<span className={`badge ${hasDecision ? "badge-success" : "badge-warning"}`}>
													{d.Statut || "En attente"}
												</span>
											</div>
										))}
									</div>
								)}

								{demandes.length === 0 && (
									<div className="card p-5" style={{ textAlign: "center" }}>
										<p style={{ color: "var(--muted)", fontSize: "0.875rem", marginBottom: "12px" }}>
											Aucune demande soumise pour ce dossier.
										</p>
										<button className="btn btn-primary" onClick={() => setShowNewDemande(true)}>
											<PlusIcon /> Soumettre une demande
										</button>
									</div>
								)}
							</div>

							{/* RIGHT */}
							<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

								{/* Statut global dynamique */}
								<div className="card-navy" style={{ padding: "24px", borderRadius: "20px" }}>
									<h3 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "16px" }}>Statut Global</h3>
									<div className="flex justify-between" style={{ marginBottom: "6px" }}>
										<span style={{ fontSize: "0.85rem", opacity: 0.8 }}>Progression du dossier</span>
										<span style={{ fontWeight: 700 }}>{pct}%</span>
									</div>
									<div className="progress-track" style={{ marginBottom: "20px" }}>
										<div className="progress-fill-bar" style={{ width: `${pct}%` }} />
									</div>
									<div className="status-checklist">
										{checklist.map(({ label, done }) => (
											<div key={label} className="status-item">
												<span className={done ? "status-dot-done" : "status-dot-pending"} style={{ fontSize: "1.1rem" }}>
													{done ? "✓" : "○"}
												</span>
												<span style={{ opacity: done ? 1 : 0.6 }}>{label}</span>
											</div>
										))}
									</div>
								</div>

								{/* Journal dynamique */}
								<div className="card p-5">
									<h3 style={{ fontWeight: 600, fontSize: "1rem", marginBottom: "16px" }}>Journal d'activité</h3>
									{demandes.length === 0 && documents.length === 0 ? (
										<p style={{ color: "var(--muted)", fontSize: "0.875rem" }}>Aucune activité pour l'instant.</p>
									) : (
										<div className="activity-log">
											{demandes.map((d, i) => (
												<div key={`d-${d.id_demande}`} className="activity-item">
													<div style={{ width: "32px", height: "32px", background: i === 0 ? "var(--blue)" : "var(--accent)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", flexShrink: 0 }}>
														📋
													</div>
													<div>
														<div className="activity-date">Demande #{d.id_demande}</div>
														<div className="activity-title">{d.Type_Demande}</div>
														<div className="activity-desc">Statut : {d.Statut || "En attente"}</div>
													</div>
												</div>
											))}
											{documents.length > 0 && (
												<div className="activity-item">
													<div style={{ width: "32px", height: "32px", background: "var(--accent)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", flexShrink: 0 }}>📄</div>
													<div>
														<div className="activity-date">Documents</div>
														<div className="activity-title">{documents.length} document{documents.length > 1 ? "s" : ""} soumis</div>
														<div className="activity-desc">En attente de vérification</div>
													</div>
												</div>
											)}
										</div>
									)}
								</div>

								{/* Aide */}
								<div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "14px", padding: "20px" }}>
									<div className="flex gap-2 items-center" style={{ marginBottom: "8px", fontWeight: 600, color: "#92400e" }}>
										<HelpIcon /> Besoin d'aide ?
									</div>
									<p style={{ fontSize: "0.82rem", color: "#92400e", lineHeight: 1.6 }}>
										Si vous constatez une erreur, contactez le centre de soutien légal avant toute modification.
									</p>
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>

			{showEdit && (
				<EditProfileModal
					client={client}
					onClose={() => setShowEdit(false)}
					onSaved={handleProfileSaved}
				/>
			)}
			{showNewDemande && (
				<NewDemandeModal
					dossierId={dossierId}
					onClose={() => setShowNewDemande(false)}
					onCreated={() => { setShowNewDemande(false); refresh(); }}
				/>
			)}
			{showNewDossier && (
				<NewDossierModal
					onClose={() => setShowNewDossier(false)}
					onCreated={() => { setShowNewDossier(false); refresh(); }}
				/>
			)}
		</>
	);
}