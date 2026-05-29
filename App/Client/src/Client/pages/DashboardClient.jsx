import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar.jsx";
import {
	getClientBundle,
	uploadDocument,
	createDossier,
	createTypeDemande,
	getUserId,
} from "../services/client.service.jsx";
import { useToast } from "../../commun/Toast.jsx";

// ─── Icons ────────────────────────────────────────────────────────────────────
const FileIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
	>
		<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
		<polyline points="14,2 14,8 20,8" />
	</svg>
);
const AlertIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
	>
		<circle cx="12" cy="12" r="10" />
		<line x1="12" y1="8" x2="12" y2="12" />
		<line x1="12" y1="16" x2="12.01" y2="16" />
	</svg>
);
const SendIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
	>
		<line x1="22" y1="2" x2="11" y2="13" />
		<polygon points="22,2 15,22 11,13 2,9" />
	</svg>
);
const CheckIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.5"
	>
		<polyline points="20,6 9,17 4,12" />
	</svg>
);
const MsgIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
	>
		<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
	</svg>
);

// ─── Calcul dynamique du statut ───────────────────────────────────────────────
function computeCaseStatus(demandes = [], documents = []) {
	const hasDemande = demandes.length > 0;
	const hasDocuments = documents.length > 0;

	const demandeStatuts = demandes.map((d) => (d.Statut || "").toLowerCase());
	const hasInterview = demandeStatuts.some(
		(s) =>
			s.includes("entretien") ||
			s.includes("interview") ||
			s.includes("convoqué"),
	);
	const hasDecision = demandeStatuts.some(
		(s) =>
			s.includes("approuvé") ||
			s.includes("refusé") ||
			s.includes("décision") ||
			s.includes("accepté") ||
			s.includes("approuve") ||
			s.includes("refuse"),
	);

	let currentStep = 0;
	if (hasDocuments || hasDemande) currentStep = 1;
	if (hasDemande && hasDocuments) currentStep = 2;
	if (hasInterview) currentStep = 2;
	if (hasDecision) currentStep = 3;

	const pct = Math.round((currentStep / 3) * 100);

	const statusLabel = hasDecision
		? demandeStatuts.find(
				(s) => s.includes("approuvé") || s.includes("accepté") || s.includes("approuve"),
			)
			? "Approuvé"
			: "Décision rendue"
		: hasInterview
			? "Entretien planifié"
			: hasDemande && hasDocuments
				? "Documents soumis"
				: hasDemande
					? "Sous examen"
					: hasDocuments
						? "Documents en attente"
						: "En attente";

	return { currentStep, pct, statusLabel };
}

// ─── Roadmap ──────────────────────────────────────────────────────────────────
const STEPS = [
	{ label: "Dossier ouvert", icon: "📁" },
	{ label: "Documents / Demande", icon: "📄" },
	{ label: "En révision", icon: "🔍" },
	{ label: "Décision finale", icon: "⚖️" },
];

function Roadmap({ currentStep }) {
	const pct = (currentStep / (STEPS.length - 1)) * 100;
	return (
		<div className="card roadmap-card">
			<div className="roadmap-header">
				<span className="roadmap-title">Suivi des demandes</span>
				<span className="roadmap-phase-badge">
					PHASE {currentStep + 1} SUR {STEPS.length}
				</span>
			</div>
			<div className="roadmap-steps" style={{ padding: "0 20px" }}>
				<div className="roadmap-line">
					<div
						className="roadmap-line-fill"
						style={{ width: `${pct}%` }}
					/>
				</div>
				{STEPS.map((step, i) => {
					const state =
						i < currentStep
							? "done"
							: i === currentStep
								? "current"
								: "pending";
					return (
						<div key={i} className={`roadmap-step ${state}`}>
							<div className="roadmap-icon">
								{state === "done" ? <CheckIcon /> : step.icon}
							</div>
							<span className="roadmap-step-label">
								{step.label}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}

// ─── Modal : nouvelle type_demande dans dossier existant ──────────────────────
function NewDemandeModal({ dossierId, onClose, onCreated }) {
	const [type, setType] = useState("Résidence permanente");
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	const types = [
		"Résidence permanente",
		"Permis de travail",
		"Permis d'études",
		"Visa de visiteur",
		"Citoyenneté",
		"Regroupement familial",
	];

	async function handleCreate() {
		if (!dossierId) {
			toast("Aucun dossier actif.", "error");
			return;
		}
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
			<div className="app-modal" onClick={(e) => e.stopPropagation()}>
				<div className="app-modal-header">
					<span className="app-modal-title">
						Nouvelle demande d'immigration
					</span>
					<button className="app-modal-close" onClick={onClose}>
						✕
					</button>
				</div>
				<div className="app-modal-body">
					<div className="form-group">
						<label className="form-label">Type de demande</label>
						<select
							className="form-input"
							value={type}
							onChange={(e) => setType(e.target.value)}
						>
							{types.map((t) => (
								<option key={t} value={t}>
									{t}
								</option>
							))}
						</select>
					</div>
					<div className="info-box">
						ℹ️ Un agent vous sera assigné sous 24-48 heures
						ouvrables.
					</div>
				</div>
				<div className="app-modal-footer">
					<button className="btn btn-outline" onClick={onClose}>
						Annuler
					</button>
					<button
						className="btn btn-primary"
						onClick={handleCreate}
						disabled={loading}
					>
						{loading ? "Envoi..." : "Soumettre"}
					</button>
				</div>
			</div>
		</div>
	);
}

// ─── Modal : créer le premier dossier ────────────────────────────────────────
function NewDossierModal({ onClose, onCreated }) {
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	async function handleCreate() {
		setLoading(true);
		try {
			await createDossier(getUserId());
			toast("Dossier créé avec succès !", "success");
			onCreated();
		} catch {
			toast("Erreur lors de la création du dossier.", "error");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="app-modal-overlay" onClick={onClose}>
			<div className="app-modal" onClick={(e) => e.stopPropagation()}>
				<div className="app-modal-header">
					<span className="app-modal-title">Créer mon dossier</span>
					<button className="app-modal-close" onClick={onClose}>
						✕
					</button>
				</div>
				<div className="app-modal-body">
					<p style={{ marginBottom: "12px" }}>
						Vous n'avez pas encore de dossier actif. Cliquez sur{" "}
						<strong>Créer</strong> pour ouvrir votre dossier
						d'immigration.
					</p>
					<div className="info-box">
						ℹ️ Un agent vous sera assigné sous 24-48 heures
						ouvrables.
					</div>
				</div>
				<div className="app-modal-footer">
					<button className="btn btn-outline" onClick={onClose}>
						Annuler
					</button>
					<button
						className="btn btn-primary"
						onClick={handleCreate}
						disabled={loading}
					>
						{loading ? "Création..." : "Créer le dossier"}
					</button>
				</div>
			</div>
		</div>
	);
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function DashboardClient() {
	const navigate = useNavigate();
	const toast = useToast();
	const fileInputRef = useRef();

	const [bundle, setBundle] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showNewDemande, setShowNewDemande] = useState(false);
	const [showNewDossier, setShowNewDossier] = useState(false);
	const [message, setMessage] = useState("");
	const [uploading, setUploading] = useState(false);

	useEffect(() => {
		refresh();
	}, []);

	async function refresh() {
		try {
			setBundle(await getClientBundle());
		} catch {
			toast("Impossible de charger votre dossier.", "error");
		} finally {
			setLoading(false);
		}
	}

	async function handleUpload(e) {
		const file = e.target.files?.[0];
		if (!file || !bundle?.dossier) return;
		e.target.value = "";
		setUploading(true);
		try {
			await uploadDocument(file, bundle.dossier.id_dossier);
			toast("Document téléversé !", "success");
			await refresh();
		} catch {
			toast("Erreur lors du téléversement.", "error");
		} finally {
			setUploading(false);
		}
	}

	function handleSendMessage() {
		if (!message.trim()) return;
		toast("Message envoyé à votre agent.", "success");
		setMessage("");
	}

	if (loading) {
		return (
			<div className="app-shell">
				<div className="loading-screen">
					<div className="spinner" />
					<p style={{ color: "var(--muted)" }}>
						Chargement sécurisé du portail...
					</p>
				</div>
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
								<div
									className="empty-icon"
									style={{ fontSize: "2.5rem" }}
								>
									📁
								</div>
								<h1 className="empty-title">
									Bienvenue dans votre espace client
								</h1>
								<p className="empty-sub">
									Aucun dossier actif. Commencez votre demande
									d'immigration dès maintenant.
								</p>
								<button
									className="btn btn-primary"
									style={{
										padding: "14px 28px",
										fontSize: "1rem",
									}}
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
						onCreated={() => {
							setShowNewDossier(false);
							refresh();
						}}
					/>
				)}
			</>
		);
	}

	const { dossier, documents = [], demandes = [] } = bundle;
	const dossierId = dossier.id_dossier;
	const { currentStep, pct, statusLabel } = computeCaseStatus(
		demandes,
		documents,
	);

	const checklist = [
		{ label: "Dossier ouvert", done: true },
		{ label: "Documents soumis", done: documents.length > 0 },
		{ label: "Demande soumise", done: demandes.length > 0 },
		{
			label: "Décision finale",
			done: demandes.some((d) =>
				["approuvé", "refusé", "accepté", "décision"].some((k) =>
					(d.Statut || "").toLowerCase().includes(k),
				),
			),
		},
	];


	return (
		<>
			<div className="app-shell">
				<div className="page-body">
					<Sidebar onNewCase={() => setShowNewDemande(true)} />

					<main className="main-content">
						<div className="breadcrumb">
							Portail Client{" "}
							<span className="breadcrumb-sep">›</span>
							<span>Dossier #{dossierId}</span>
						</div>

						<div className="page-header flex justify-between items-center">
							<div>
								<h1 className="page-title">
    Dossier #{dossierId}:{" "}
    <span className="status-inline">{statusLabel}</span>
</h1>

{/* Types de demandes actives */}
{demandes.length > 0 && (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
        {demandes.map(d => (
            <span key={d.id_demande} style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                borderRadius: "999px",
                fontSize: "0.78rem",
                fontWeight: 600,
                background: "var(--accent)",
                color: "var(--blue)",
                border: "1px solid var(--blue-light)",
            }}>
                {d.Type_Demande}
                <span style={{
                    padding: "1px 7px",
                    borderRadius: "999px",
                    fontSize: "0.68rem",
                    background: "var(--navy)",
                    color: "white",
                }}>
                    {d.Statut || "En attente"}
                </span>
            </span>
        ))}
    </div>
)}

<p className="page-subtitle" style={{ marginTop: "6px" }}>
    Votre dossier est en cours de traitement. Suivez son avancement ci-dessous.
</p>
							</div>
							<button
								className="btn btn-primary"
								style={{
									padding: "12px 20px",
									flexShrink: 0,
									marginLeft: "20px",
								}}
								onClick={() => setShowNewDemande(true)}
							>
								+ Nouvelle demande
							</button>
						</div>

						<Roadmap currentStep={currentStep} />

						<div className="grid-col-7-5">
							{/* LEFT : Documents */}
							<div
								className="card"
								style={{ overflow: "hidden" }}
							>
								<div className="section-header">
									<span className="section-title">
										<FileIcon /> Documents (
										{documents.length})
									</span>
									<button
										className="btn btn-outline btn-sm"
										onClick={() =>
											navigate("/client/documents")
										}
									>
										Voir tout
									</button>
								</div>

								{documents.length === 0 ? (
									<div
										style={{
											padding: "32px 24px",
											textAlign: "center",
											color: "var(--muted)",
											fontSize: "0.875rem",
										}}
									>
										Aucun document soumis pour l'instant.
									</div>
								) : (
									documents.slice(0, 4).map((doc) => (
										<div
											key={doc.id_document}
											className="doc-item"
										>
											<div className="doc-item-left">
												<div className="doc-icon">
													<FileIcon />
												</div>
												<div>
													<div className="doc-name">
														{doc.nom_document}
													</div>
													<div className="doc-date">
														{doc.type_document}
													</div>
												</div>
											</div>
											<span className="badge badge-success">
												✓ Soumis
											</span>
										</div>
									))
								)}

								<div className="doc-item-missing">
									<div className="doc-item-left">
										<div className="doc-icon missing">
											<AlertIcon />
										</div>
										<div>
											<div
												className="doc-name"
												style={{
													color: "var(--danger)",
												}}
											>
												Ajouter un document
											</div>
											<div
												className="doc-date"
												style={{
													color: "var(--danger)",
												}}
											>
												Cliquez pour uploader
											</div>
										</div>
									</div>
									<button
										className="btn btn-sm"
										style={{
											background: "var(--blue)",
											color: "white",
											fontSize: "0.75rem",
										}}
										onClick={() =>
											fileInputRef.current?.click()
										}
										disabled={uploading}
									>
										{uploading ? "Envoi..." : "UPLOAD"}
									</button>
								</div>
								<input
									ref={fileInputRef}
									type="file"
									hidden
									onChange={handleUpload}
								/>
							</div>

							{/* RIGHT */}
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "20px",
								}}
							>
								{/* Statut global */}
								<div
									className="card-navy"
									style={{
										padding: "24px",
										borderRadius: "20px",
									}}
								>
									<h3
										style={{
											fontWeight: 700,
											fontSize: "1.1rem",
											marginBottom: "16px",
										}}
									>
										Statut Global
									</h3>
									<div
										className="flex justify-between"
										style={{ marginBottom: "6px" }}
									>
										<span
											style={{
												fontSize: "0.85rem",
												opacity: 0.8,
											}}
										>
											Progression
										</span>
										<span style={{ fontWeight: 700 }}>
											{pct}%
										</span>
									</div>
									<div
										className="progress-track"
										style={{ marginBottom: "20px" }}
									>
										<div
											className="progress-fill-bar"
											style={{ width: `${pct}%` }}
										/>
									</div>

									<div className="status-checklist">
										{checklist.map(({ label, done }) => (
											<div
												key={label}
												className="status-item"
											>
												<span
													className={
														done
															? "status-dot-done"
															: "status-dot-pending"
													}
													style={{
														fontSize: "1.1rem",
													}}
												>
													{done ? "✓" : "○"}
												</span>
												<span
													style={{
														opacity: done ? 1 : 0.6,
													}}
												>
													{label}
												</span>
											</div>
										))}
									</div>

									{demandes.length > 0 ? (
										<div
											style={{
												marginTop: "16px",
												borderTop:
													"1px solid rgba(255,255,255,0.15)",
												paddingTop: "14px",
											}}
										>
											<div
												style={{
													fontSize: "0.72rem",
													fontWeight: 700,
													letterSpacing: "0.08em",
													textTransform: "uppercase",
													opacity: 0.6,
													marginBottom: "8px",
												}}
											>
												Demandes actives
											</div>
											{demandes.map((d) => (
												<div
													key={d.id_demande}
													style={{
														display: "flex",
														justifyContent:
															"space-between",
														alignItems: "center",
														marginBottom: "6px",
													}}
												>
													<span
														style={{
															fontSize: "0.82rem",
															opacity: 0.9,
														}}
													>
														{d.Type_Demande}
													</span>
													<span
														style={{
															fontSize: "0.68rem",
															fontWeight: 700,
															padding: "2px 8px",
															borderRadius:
																"999px",
															background:
																"rgba(255,255,255,0.15)",
															color: "white",
														}}
													>
														{d.Statut ||
															"En attente"}
													</span>
												</div>
											))}
										</div>
									) : (
										<button
											className="btn"
											style={{
												marginTop: "16px",
												width: "100%",
												background:
													"rgba(255,255,255,0.15)",
												color: "white",
												justifyContent: "center",
											}}
											onClick={() =>
												setShowNewDemande(true)
											}
										>
											+ Soumettre une demande
											d'immigration
										</button>
									)}
								</div>

								{/* Journal d'activité */}
								<div className="card p-5">
									<h3
										style={{
											fontWeight: 600,
											fontSize: "1rem",
											marginBottom: "16px",
										}}
									>
										Journal d'activité
									</h3>
									{demandes.length === 0 &&
									documents.length === 0 ? (
										<p
											style={{
												color: "var(--muted)",
												fontSize: "0.875rem",
											}}
										>
											Aucune activité pour l'instant.
										</p>
									) : (
										<div className="activity-log">
											{demandes.map((d, i) => (
												<div
													key={`d-${d.id_demande}`}
													className="activity-item"
												>
													<div
														style={{
															width: "32px",
															height: "32px",
															background:
																i === 0
																	? "var(--blue)"
																	: "var(--accent)",
															borderRadius: "50%",
															display: "flex",
															alignItems:
																"center",
															justifyContent:
																"center",
															fontSize: "0.85rem",
															flexShrink: 0,
														}}
													>
														📋
													</div>
													<div>
														<div className="activity-date">
															Demande #
															{d.id_demande}
														</div>
														<div className="activity-title">
															{d.Type_Demande}
														</div>
														<div className="activity-desc">
															Statut :{" "}
															{d.Statut ||
																"En attente"}
															{d.Description
																? ` — ${d.Description}`
																: ""}
														</div>
													</div>
												</div>
											))}
											{documents.length > 0 && (
												<div className="activity-item">
													<div
														style={{
															width: "32px",
															height: "32px",
															background:
																"var(--accent)",
															borderRadius: "50%",
															display: "flex",
															alignItems:
																"center",
															justifyContent:
																"center",
															fontSize: "0.85rem",
															flexShrink: 0,
														}}
													>
														📄
													</div>
													<div>
														<div className="activity-date">
															Documents
														</div>
														<div className="activity-title">
															{documents.length}{" "}
															document
															{documents.length >
															1
																? "s"
																: ""}{" "}
															soumis
														</div>
														<div className="activity-desc">
															En attente de
															vérification par un
															agent
														</div>
													</div>
												</div>
											)}
										</div>
									)}
								</div>

								{/* Communication */}
								<div
									className="card comm-card"
									style={{ overflow: "hidden" }}
								>
									<div className="comm-header">
										<MsgIcon />
										<span className="comm-title">
											Communication avec l'agent
										</span>
									</div>
									<div className="comm-messages">
										<div className="comm-msg">
											<div className="comm-msg-meta">
												SYSTÈME &nbsp;&nbsp; Automatique
											</div>
											Votre dossier est en cours de
											traitement. Un agent vous contactera
											prochainement.
										</div>
									</div>
									<div className="comm-input-row">
										<input
											className="comm-input"
											placeholder="Écrire un message..."
											value={message}
											onChange={(e) =>
												setMessage(e.target.value)
											}
											onKeyDown={(e) =>
												e.key === "Enter" &&
												handleSendMessage()
											}
										/>
										<button
											className="btn-send"
											onClick={handleSendMessage}
										>
											<SendIcon />
										</button>
									</div>
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
			{showNewDemande && (
				<NewDemandeModal
					dossierId={dossierId}
					onClose={() => setShowNewDemande(false)}
					onCreated={() => {
						setShowNewDemande(false);
						refresh();
					}}
				/>
			)}
			{showNewDossier && (
				<NewDossierModal
					onClose={() => setShowNewDossier(false)}
					onCreated={() => {
						setShowNewDossier(false);
						refresh();
					}}
				/>
			)}
		</>
	);
}
