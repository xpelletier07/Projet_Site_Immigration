import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Menu from "../../commun/menu.jsx";
import {
	getClientBundle,
	uploadDocument,
	deleteDocument,
	createDossier,
} from "../services/client.service.jsx";
import { useToast } from "../../commun/Toast.jsx";
import { getUserId, API_URL, getToken } from "../../commun/commun.jsx";

const FileIcon = () => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
	>
		<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
		<polyline points="14,2 14,8 20,8" />
	</svg>
);
const DlIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
	>
		<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
		<polyline points="7,10 12,15 17,10" />
		<line x1="12" y1="15" x2="12" y2="3" />
	</svg>
);
const TrashIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
	>
		<polyline points="3,6 5,6 21,6" />
		<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
	</svg>
);
const UploadIcon = () => (
	<svg
		width="24"
		height="24"
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
const PlusIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.5"
	>
		<line x1="12" y1="5" x2="12" y2="19" />
		<line x1="5" y1="12" x2="19" y2="12" />
	</svg>
);

export default function DocumentsPage() {
	const toast = useToast();
	const fileInputRef = useRef();
	const dropRef = useRef();

	const [bundle, setBundle] = useState(null);
	const [loading, setLoading] = useState(true);
	const [uploading, setUploading] = useState(false);
	const [dragging, setDragging] = useState(false);
	const [showNewCase, setShowNewCase] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(null);

	useEffect(() => {
		refresh();
	}, []);

	async function refresh() {
		setLoading(true);
		try {
			const b = await getClientBundle();
			setBundle(b);
		} catch {
			toast("Erreur de chargement.", "error");
		} finally {
			setLoading(false);
		}
	}

	async function handleFiles(files) {
		if (!bundle?.dossier) {
			toast("Aucun dossier actif.", "error");
			return;
		}
		setUploading(true);
		let ok = 0,
			fail = 0;
		for (const file of Array.from(files)) {
			try {
				await uploadDocument(file, bundle.dossier.id_dossier);
				ok++;
			} catch {
				fail++;
			}
		}
		if (ok)
			toast(
				`${ok} document${ok > 1 ? "s" : ""} téléversé${ok > 1 ? "s" : ""} !`,
				"success",
			);
		if (fail) toast(`${fail} échec${fail > 1 ? "s" : ""}.`, "error");
		setUploading(false);
		await refresh();
	}

	async function handleDelete(id) {
		try {
			await deleteDocument(id);
			toast("Document supprimé.", "success");
			setConfirmDelete(null);
			await refresh();
		} catch {
			toast("Erreur lors de la suppression.", "error");
		}
	}

	function onDrop(e) {
		e.preventDefault();
		setDragging(false);
		handleFiles(e.dataTransfer.files);
	}

	if (loading) {
		return (
			<div className="app-shell">
				<Menu />
				<div className="loading-screen">
					<div className="spinner" />
				</div>
			</div>
		);
	}

	const documents = bundle?.documents || [];
	const hasDossier = bundle?.hasDossier;

	return (
		<div className="app-shell">
			<Menu />
			<div className="page-body">
				<Sidebar onNewCase={() => setShowNewCase(true)} />

				<main className="main-content">
					{/* Header */}
					<div className="flex justify-between items-center mb-4">
						<div>
							<div className="breadcrumb">
								Portail Client{" "}
								<span className="breadcrumb-sep">›</span>
								<span>Documents</span>
							</div>
							<h1
								style={{
									fontFamily: "'DM Serif Display',serif",
									fontSize: "1.8rem",
								}}
							>
								Mes Documents
							</h1>
							<p
								style={{
									color: "var(--muted)",
									fontSize: "0.9rem",
									marginTop: "4px",
								}}
							>
								Gérez vos pièces justificatives pour votre
								demande d'immigration.
							</p>
						</div>
						{hasDossier && (
							<button
								className="btn btn-primary"
								onClick={() => fileInputRef.current?.click()}
								disabled={uploading}
							>
								<PlusIcon />{" "}
								{uploading
									? "Téléversement..."
									: "Ajouter un document"}
							</button>
						)}
						<input
							ref={fileInputRef}
							type="file"
							hidden
							multiple
							onChange={(e) => handleFiles(e.target.files)}
						/>
					</div>

					{/* Stats */}
					{hasDossier && (
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "repeat(3, 1fr)",
								gap: "16px",
								marginBottom: "24px",
							}}
						>
							{[
								["Total documents", documents.length],
								["Vérifiés", documents.length],
								["En attente", 0],
							].map(([label, val]) => (
								<div
									key={label}
									className="card"
									style={{
										padding: "20px",
										textAlign: "center",
									}}
								>
									<div
										style={{
											fontFamily:
												"'DM Serif Display',serif",
											fontSize: "2rem",
											color: "var(--navy)",
										}}
									>
										{val}
									</div>
									<div
										style={{
											fontSize: "0.75rem",
											color: "var(--muted)",
											marginTop: "4px",
										}}
									>
										{label}
									</div>
								</div>
							))}
						</div>
					)}

					{/* Upload zone */}
					{hasDossier && (
						<div
							ref={dropRef}
							className={`upload-area${dragging ? " dragging" : ""}`}
							style={{ marginBottom: "24px" }}
							onDragOver={(e) => {
								e.preventDefault();
								setDragging(true);
							}}
							onDragLeave={() => setDragging(false)}
							onDrop={onDrop}
							onClick={() => fileInputRef.current?.click()}
						>
							<div className="upload-icon">
								<UploadIcon />
							</div>
							<div className="upload-title">
								{dragging
									? "Déposez vos fichiers ici"
									: "Glissez-déposez vos fichiers"}
							</div>
							<div className="upload-sub">
								ou cliquez pour sélectionner • PDF, JPEG, PNG
								jusqu'à 10 MB
							</div>
						</div>
					)}

					{/* No dossier */}
					{!hasDossier && (
						<div className="empty-state">
							<div
								className="empty-icon"
								style={{ fontSize: "2.5rem" }}
							>
								📄
							</div>
							<h2 className="empty-title">Aucun dossier actif</h2>
							<p className="empty-sub">
								Vous devez d'abord créer un dossier pour
								téléverser des documents.
							</p>
							<button
								className="btn btn-primary"
								style={{ padding: "14px 28px" }}
								onClick={() => setShowNewCase(true)}
							>
								+ Créer un dossier
							</button>
						</div>
					)}

					{/* Document list */}
					{hasDossier && (
						<div className="card" style={{ overflow: "hidden" }}>
							<div className="section-header">
								<span className="section-title">
									<FileIcon /> Documents ({documents.length})
								</span>
							</div>

							{documents.length === 0 ? (
								<div
									style={{
										padding: "40px",
										textAlign: "center",
										color: "var(--muted)",
									}}
								>
									Aucun document soumis. Utilisez la zone
									ci-dessus pour téléverser vos documents.
								</div>
							) : (
								documents.map((doc) => (
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
										<div className="flex gap-2 items-center">
											<span className="badge badge-success">
												✓ Vérifié
											</span>
											<a
												className="btn btn-outline btn-sm btn-icon"
												href={`${API_URL}/documents/${doc.id_document}/telecharger`}
												target="_blank"
												rel="noreferrer"
												title="Télécharger"
											>
												<DlIcon />
											</a>
											<button
												className="btn btn-sm btn-icon"
												style={{
													background:
														"var(--danger-bg)",
													color: "var(--danger)",
													border: "none",
												}}
												onClick={() =>
													setConfirmDelete(doc)
												}
												title="Supprimer"
											>
												<TrashIcon />
											</button>
										</div>
									</div>
								))
							)}
						</div>
					)}
				</main>
			</div>

			{/* Confirm delete modal */}
			{confirmDelete && (
				<div
					className="modal-overlay"
					onClick={() => setConfirmDelete(null)}
				>
					<div className="modal" onClick={(e) => e.stopPropagation()}>
						<div
							className="modal-header"
							style={{ background: "var(--danger)" }}
						>
							<span className="modal-title">
								Confirmer la suppression
							</span>
							<button
								className="modal-close"
								onClick={() => setConfirmDelete(null)}
							>
								✕
							</button>
						</div>
						<div className="modal-body">
							<p>
								Voulez-vous vraiment supprimer{" "}
								<strong>{confirmDelete.nom_document}</strong> ?
							</p>
							<p
								style={{
									color: "var(--muted)",
									fontSize: "0.85rem",
									marginTop: "8px",
								}}
							>
								Cette action est irréversible.
							</p>
						</div>
						<div className="modal-footer">
							<button
								className="btn btn-outline"
								onClick={() => setConfirmDelete(null)}
							>
								Annuler
							</button>
							<button
								className="btn"
								style={{
									background: "var(--danger)",
									color: "white",
								}}
								onClick={() =>
									handleDelete(confirmDelete.id_document)
								}
							>
								Supprimer
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
