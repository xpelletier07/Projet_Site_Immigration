import React, { useState, useRef, useEffect } from "react";
import { createDossier, deleteDossier, getUserId } from "../services/client.service.jsx";
import { useToast } from "../../commun/Toast.jsx";

const PlusIcon = () => (
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
		<line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
	</svg>
);
const ChevronIcon = () => (
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
		<polyline points="6,9 12,15 18,9" />
	</svg>
);
const TrashIcon = () => (
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
		<polyline points="3,6 5,6 21,6" />
		<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
	</svg>
);
const FolderIcon = () => (
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
		<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
	</svg>
);

// Modal de confirmation de suppression avec frappe "delete"
function DeleteConfirmModal({ dossier, onClose, onDeleted }) {
	const toast = useToast();
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const inputRef = useRef();

	useEffect(() => {
		setTimeout(() => inputRef.current?.focus(), 50);
	}, []);

	async function handleDelete() {
		if (input.toLowerCase() !== "delete") return;
		setLoading(true);
		try {
			await deleteDossier(dossier.id_dossier);
			toast(`Dossier #${dossier.id_dossier} supprimé.`, "success");
			onDeleted(dossier.id_dossier);
		} catch {
			toast("Erreur lors de la suppression.", "error");
		} finally {
			setLoading(false);
		}
	}

	const confirmed = input.toLowerCase() === "delete";

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "460px" }}>
				<div className="modal-header" style={{ background: "var(--danger)" }}>
					<span className="modal-title">Supprimer le dossier #{dossier.id_dossier}</span>
					<button className="modal-close" onClick={onClose}>✕</button>
				</div>
				<div className="modal-body">
					<p style={{ marginBottom: "12px", fontSize: "0.9rem" }}>
						Cette action est <strong>irréversible</strong>. Tous les documents,
						factures et demandes liés à ce dossier seront supprimés.
					</p>
					<div
						style={{
							background: "var(--danger-bg)",
							border: "1px solid var(--danger)",
							borderRadius: "8px",
							padding: "10px 14px",
							fontSize: "0.82rem",
							color: "var(--danger)",
							marginBottom: "16px",
						}}
					>
						Dossier #{dossier.id_dossier} — toutes ses données seront perdues.
					</div>
					<div className="form-group" style={{ marginBottom: 0 }}>
						<label className="form-label">
							Pour confirmer, tapez <strong>delete</strong> ci-dessous
						</label>
						<input
							ref={inputRef}
							className="form-input"
							placeholder="delete"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && confirmed && handleDelete()}
							style={{
								borderColor: confirmed ? "var(--danger)" : undefined,
								fontFamily: "monospace",
							}}
						/>
					</div>
				</div>
				<div className="modal-footer">
					<button className="btn btn-outline" onClick={onClose}>Annuler</button>
					<button
						className="btn"
						style={{
							background: confirmed ? "var(--danger)" : "var(--border)",
							color: confirmed ? "white" : "var(--muted)",
							cursor: confirmed ? "pointer" : "not-allowed",
							transition: "background 0.2s, color 0.2s",
						}}
						onClick={handleDelete}
						disabled={!confirmed || loading}
					>
						{loading ? "Suppression..." : "Supprimer définitivement"}
					</button>
				</div>
			</div>
		</div>
	);
}

// Composant principal sélecteur de dossier
export default function DossierSelector({ dossiers, currentDossier, onSelect, onRefresh }) {
	const toast = useToast();
	const [open, setOpen] = useState(false);
	const [creating, setCreating] = useState(false);
	const [toDelete, setToDelete] = useState(null);
	const dropRef = useRef();

	// Fermer le dropdown si clic extérieur
	useEffect(() => {
		function handleClickOutside(e) {
			if (dropRef.current && !dropRef.current.contains(e.target)) {
				setOpen(false);
			}
		}
		if (open) document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [open]);

	async function handleCreate() {
		setCreating(true);
		try {
			const newDossier = await createDossier(getUserId());
			toast(`Dossier #${newDossier.id_dossier} créé !`, "success");
			setOpen(false);
			await onRefresh(newDossier.id_dossier);
		} catch {
			toast("Erreur lors de la création.", "error");
		} finally {
			setCreating(false);
		}
	}

	async function handleDeleted(deletedId) {
		setToDelete(null);
		setOpen(false);
		// Si on supprime le dossier actif, basculer vers le premier restant
		const remaining = dossiers.filter((d) => d.id_dossier !== deletedId);
		await onRefresh(remaining[0]?.id_dossier ?? null);
	}

	return (
		<>
			<div ref={dropRef} style={{ position: "relative", display: "inline-block" }}>
				{/* Trigger button */}
				<button
					onClick={() => setOpen((o) => !o)}
					style={{
						display: "flex",
						alignItems: "center",
						gap: "8px",
						padding: "8px 14px",
						background: "var(--surface)",
						border: "1px solid var(--border)",
						borderRadius: "10px",
						cursor: "pointer",
						fontFamily: "inherit",
						fontSize: "0.875rem",
						fontWeight: 500,
						color: "var(--text)",
						transition: "border-color 0.15s, box-shadow 0.15s",
						boxShadow: open ? "0 0 0 3px rgba(26,86,219,0.1)" : undefined,
						borderColor: open ? "var(--blue)" : undefined,
						whiteSpace: "nowrap",
					}}
				>
					<FolderIcon />
					Dossier #{currentDossier?.id_dossier ?? "—"}
					{dossiers.length > 1 && (
						<span
							style={{
								background: "var(--accent)",
								color: "var(--blue)",
								borderRadius: "999px",
								fontSize: "0.7rem",
								fontWeight: 700,
								padding: "1px 7px",
							}}
						>
							{dossiers.length}
						</span>
					)}
					<span style={{ opacity: 0.5, marginLeft: "2px" }}>
						<ChevronIcon />
					</span>
				</button>

				{/* Dropdown */}
				{open && (
					<div
						style={{
							position: "absolute",
							top: "calc(100% + 6px)",
							left: 0,
							minWidth: "260px",
							background: "var(--surface)",
							border: "1px solid var(--border)",
							borderRadius: "12px",
							boxShadow: "var(--shadow-lg)",
							zIndex: 300,
							overflow: "hidden",
						}}
					>
						{/* Header */}
						<div
							style={{
								padding: "10px 14px",
								fontSize: "0.7rem",
								fontWeight: 700,
								letterSpacing: "0.08em",
								textTransform: "uppercase",
								color: "var(--muted)",
								borderBottom: "1px solid var(--border)",
							}}
						>
							Mes dossiers ({dossiers.length})
						</div>

						{/* Liste des dossiers */}
						<div style={{ maxHeight: "240px", overflowY: "auto" }}>
							{dossiers.map((d) => {
								const isActive = d.id_dossier === currentDossier?.id_dossier;
								return (
									<div
										key={d.id_dossier}
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											padding: "10px 14px",
											cursor: "pointer",
											background: isActive ? "var(--accent)" : "transparent",
											transition: "background 0.1s",
											borderBottom: "1px solid var(--border)",
										}}
										onMouseEnter={(e) => {
											if (!isActive) e.currentTarget.style.background = "var(--surface-2)";
										}}
										onMouseLeave={(e) => {
											if (!isActive) e.currentTarget.style.background = "transparent";
										}}
									>
										<button
											onClick={() => {
												onSelect(d.id_dossier);
												setOpen(false);
											}}
											style={{
												background: "none",
												border: "none",
												cursor: "pointer",
												display: "flex",
												alignItems: "center",
												gap: "8px",
												flex: 1,
												textAlign: "left",
												fontFamily: "inherit",
												fontSize: "0.875rem",
												color: isActive ? "var(--blue)" : "var(--text)",
												fontWeight: isActive ? 600 : 400,
												padding: 0,
											}}
										>
											<FolderIcon />
											Dossier #{d.id_dossier}
											{isActive && (
												<span
													style={{
														fontSize: "0.65rem",
														background: "var(--blue)",
														color: "white",
														borderRadius: "999px",
														padding: "1px 7px",
														fontWeight: 700,
													}}
												>
													Actif
												</span>
											)}
										</button>

										{/* Bouton supprimer — désactivé si c'est le seul dossier */}
										<button
											onClick={(e) => {
												e.stopPropagation();
												if (dossiers.length === 1) {
													toast("Vous ne pouvez pas supprimer votre seul dossier.", "error");
													return;
												}
												setToDelete(d);
												setOpen(false);
											}}
											title={dossiers.length === 1 ? "Impossible — dossier unique" : "Supprimer"}
											style={{
												background: "none",
												border: "none",
												cursor: dossiers.length === 1 ? "not-allowed" : "pointer",
												color: dossiers.length === 1 ? "var(--border)" : "var(--muted)",
												padding: "4px",
												borderRadius: "6px",
												display: "flex",
												alignItems: "center",
												transition: "color 0.15s, background 0.15s",
												flexShrink: 0,
											}}
											onMouseEnter={(e) => {
												if (dossiers.length > 1) {
													e.currentTarget.style.color = "var(--danger)";
													e.currentTarget.style.background = "var(--danger-bg)";
												}
											}}
											onMouseLeave={(e) => {
												e.currentTarget.style.color = dossiers.length === 1 ? "var(--border)" : "var(--muted)";
												e.currentTarget.style.background = "none";
											}}
										>
											<TrashIcon />
										</button>
									</div>
								);
							})}
						</div>

						{/* Bouton nouveau dossier */}
						<button
							onClick={handleCreate}
							disabled={creating}
							style={{
								width: "100%",
								display: "flex",
								alignItems: "center",
								gap: "8px",
								padding: "11px 14px",
								background: "none",
								border: "none",
								borderTop: "1px solid var(--border)",
								cursor: creating ? "not-allowed" : "pointer",
								fontFamily: "inherit",
								fontSize: "0.875rem",
								fontWeight: 600,
								color: "var(--blue)",
								transition: "background 0.1s",
							}}
							onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; }}
							onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
						>
							<PlusIcon />
							{creating ? "Création..." : "Nouveau dossier"}
						</button>
					</div>
				)}
			</div>

			{/* Modal suppression */}
			{toDelete && (
				<DeleteConfirmModal
					dossier={toDelete}
					onClose={() => setToDelete(null)}
					onDeleted={handleDeleted}
				/>
			)}
		</>
	);
}