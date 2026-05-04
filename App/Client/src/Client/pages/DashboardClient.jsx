import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Menu from "../../commun/menu.jsx";
import {
	getClientBundle,
	uploadDocument,
	createDossier,
	getUserId,
} from "../services/client.service.jsx";
import { useToast } from "../Toast.jsx";


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

const UploadIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
	>
		<polyline points="16,16 12,12 8,16" />
		<line x1="12" y1="12" x2="12" y2="21" />
		<path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
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

// ─── Roadmap steps ────────────────────────────────────────────────────────────
const STEPS = [
	{ label: "Application Submitted", icon: "✓" },
	{ label: "Documents Verified", icon: "⊡" },
	{ label: "Interview", icon: "👥" },
	{ label: "Final Decision", icon: "⚙" },
];

// ─── Progress bar ─────────────────────────────────────────────────────────────
function Roadmap({ currentStep = 1 }) {
	const pct = (currentStep / (STEPS.length - 1)) * 100;
	return (
		<div className="card roadmap-card">
			<div className="roadmap-header">
				<span className="roadmap-title">Progress Roadmap</span>
				<span className="roadmap-phase-badge">
					PHASE {currentStep + 1} OF {STEPS.length}
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

// ─── Modal nouvelle demande ────────────────────────────────────────────────────
function NewCaseModal({ onClose, onCreated }) {
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
		setLoading(true);
		try {
			const idClient = getUserId();
			const dossier = await createDossier(idClient);
			toast("Dossier créé avec succès !", "success");
			onCreated(dossier, type);
		} catch (err) {
			toast("Erreur lors de la création du dossier.", "error");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<div className="modal-header">
					<span className="modal-title">
						Nouvelle demande d'immigration
					</span>
					<button className="modal-close" onClick={onClose}>
						✕
					</button>
				</div>
				<div className="modal-body">
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
						ouvrables après la soumission.
					</div>
				</div>
				<div className="modal-footer">
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

// ─── Main Dashboard ────────────────────────────────────────────────────────────
export default function DashboardClient() {
	const navigate = useNavigate();
	const toast = useToast();
	const fileInputRef = useRef();

	const [bundle, setBundle] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showNewCase, setShowNewCase] = useState(false);
	const [message, setMessage] = useState("");
	const [uploading, setUploading] = useState(false);

	useEffect(() => {
		getClientBundle()
			.then(setBundle)
			.catch(() => toast("Impossible de charger votre dossier.", "error"))
			.finally(() => setLoading(false));
	}, []);

	async function handleUpload(e) {
		const file = e.target.files?.[0];
		if (!file || !bundle?.dossier) return;
		setUploading(true);
		try {
			await uploadDocument(file, bundle.dossier.id_dossier);
			toast("Document téléversé avec succès !", "success");
			const refreshed = await getClientBundle();
			setBundle(refreshed);
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

	function handleNewCaseCreated(dossier, type) {
		setShowNewCase(false);
		getClientBundle()
			.then(setBundle)
			.catch(() => {});
	}

	if (loading) {
		return (
			<div className="app-shell">
				<Menu />
				<div className="loading-screen">
					<div className="spinner" />
					<p style={{ color: "var(--muted)" }}>
						Chargement sécurisé du portail...
					</p>
				</div>
			</div>
		);
	}

	// ─── Empty state ─────────────────────────────────────────────────────────────
	if (!bundle?.hasDossier) {
		return (
			<div className="app-shell">
				<Menu />
				<div className="page-body">
					<Sidebar onNewCase={() => setShowNewCase(true)} />
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
								Aucune demande active n'est enregistrée pour le
								moment. Commencez votre demande d'immigration
								dès maintenant.
							</p>
							<button
								className="btn btn-primary"
								style={{
									padding: "14px 28px",
									fontSize: "1rem",
								}}
								onClick={() => setShowNewCase(true)}
							>
								+ Commencer une nouvelle demande
							</button>
						</div>
					</main>
				</div>
				{showNewCase && (
					<NewCaseModal
						onClose={() => setShowNewCase(false)}
						onCreated={handleNewCaseCreated}
					/>
				)}
			</div>
		);
	}

	const { client, dossier, documents = [], demandes = [] } = bundle;
	const dossierId = dossier.id_dossier;

	return (
		<div className="app-shell">
			<Menu />
			<div className="page-body">
				<Sidebar onNewCase={() => setShowNewCase(true)} />

				<main className="main-content">
					{/* Breadcrumb */}
					<div className="breadcrumb">
						Portail Client <span className="breadcrumb-sep">›</span>
						<span>Dossier id_{dossierId}</span>
					</div>

					{/* Header */}
					<div className="page-header flex justify-between items-center">
						<div>
							<h1 className="page-title">
								Dossier id_{dossierId}:{" "}
								<span className="status-inline">
									Sous examen
								</span>
							</h1>
							<p className="page-subtitle">
								Votre demande est actuellement traitée par nos
								services. Veuillez trouver ci-dessous le suivi
								en temps réel de votre dossier.
							</p>
						</div>
						<button
							className="btn btn-primary"
							style={{
								padding: "12px 20px",
								flexShrink: 0,
								marginLeft: "20px",
							}}
							onClick={() => setShowNewCase(true)}
						>
							↔ New Request
						</button>
					</div>

					{/* Roadmap */}
					<Roadmap currentStep={1} />

					{/* Content grid */}
					<div className="grid-col-7-5">
						{/* LEFT: Documentation Ledger */}
						<div className="card" style={{ overflow: "hidden" }}>
							<div className="section-header">
								<span className="section-title">
									<FileIcon /> Documentation Ledger
								</span>
								<button
									className="btn btn-outline btn-sm"
									onClick={() =>
										navigate("/client/documents")
									}
								>
									View All
								</button>
							</div>

							{documents.length === 0 && (
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
							)}

							{documents.slice(0, 4).map((doc) => (
								<div key={doc.id_document} className="doc-item">
									<div className="doc-item-left">
										<div className="doc-icon">
											<FileIcon />
										</div>
										<div>
											<div className="doc-name">
												{doc.nom_document}
											</div>
											<div className="doc-date">
												Uploaded
											</div>
										</div>
									</div>
									<span className="badge badge-success">
										✓ Verified
									</span>
								</div>
							))}

							{/* Missing document example */}
							<div className="doc-item-missing">
								<div className="doc-item-left">
									<div className="doc-icon missing">
										<AlertIcon />
									</div>
									<div>
										<div
											className="doc-name"
											style={{ color: "var(--danger)" }}
										>
											Medical Certificate 2024
										</div>
										<div
											className="doc-date"
											style={{ color: "var(--danger)" }}
										>
											Missing Requirement
										</div>
									</div>
								</div>
								<button
									className="btn btn-sm"
									style={{
										background: "var(--danger)",
										color: "white",
										fontSize: "0.75rem",
									}}
									onClick={() =>
										fileInputRef.current?.click()
									}
									disabled={uploading}
								>
									{uploading ? "..." : "UPLOAD NOW"}
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
							{/* Officer Communication */}
							<div
								className="card comm-card"
								style={{ overflow: "hidden" }}
							>
								<div className="comm-header">
									<MsgIcon />
									<span className="comm-title">
										Officer Communication
									</span>
								</div>

								<div className="comm-messages">
									<div className="comm-msg">
										<div className="comm-msg-meta">
											FROM: OFFICER H. MILLER &nbsp;&nbsp;
											2 hours ago
										</div>
										"Nous avons bien reçu votre acte de
										naissance. Veuillez noter que
										l'entretien final sera planifié après
										validation du certificat médical
										manquant."
									</div>
								</div>

								<div className="comm-input-row">
									<input
										className="comm-input"
										placeholder="Type a response..."
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

							{/* Legal Context */}
							<div className="card" style={{ padding: "20px" }}>
								<div
									style={{
										fontSize: "0.7rem",
										fontWeight: 700,
										letterSpacing: "0.1em",
										textTransform: "uppercase",
										color: "var(--muted)",
										marginBottom: "10px",
									}}
								>
									LEGAL CONTEXT
								</div>
								<p className="legal-box" style={{ margin: 0 }}>
									"All documents submitted must be
									authenticated. Processing times may vary by
									region but generally take between 6-8
									weeks."
								</p>
							</div>
						</div>
					</div>
				</main>
			</div>

			{showNewCase && (
				<NewCaseModal
					onClose={() => setShowNewCase(false)}
					onCreated={handleNewCaseCreated}
				/>
			)}
		</div>
	);
}
