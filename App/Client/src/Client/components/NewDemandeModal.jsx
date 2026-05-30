import React, { useEffect, useState } from "react";
import {
	createTypeDemande,
	getClientBundle,
} from "../services/client.service.jsx";
import { useToast } from "../../commun/Toast.jsx";

export default function NewDemandeModal({
	onClose,
	onCreated,
}) {
	const [dossierId, setDossierId] = useState(null);
	const [type, setType] = useState("Résidence permanente");
	const [loading, setLoading] = useState(false);

	const toast = useToast();

	useEffect(() => {
		async function loadDossier() {
			try {
				const bundle = await getClientBundle();

				if (bundle?.dossier?.id_dossier) {
					setDossierId(bundle.dossier.id_dossier);
				}
			} catch (error) {
				console.error(error);
			}
		}

		loadDossier();
	}, []);

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

			if (onCreated) {
				onCreated();
			}
		} catch (error) {
			console.error(error);
			toast("Erreur lors de la création de la demande.", "error");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div
			className="app-modal-overlay"
			onClick={onClose}
		>
			<div
				className="app-modal"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="app-modal-header">
					<span className="app-modal-title">
						Nouvelle demande d'immigration
					</span>

					<button
						className="app-modal-close"
						onClick={onClose}
					>
						✕
					</button>
				</div>

				<div className="app-modal-body">
					<div className="form-group">
						<label className="form-label">
							Type de demande
						</label>

						<select
							className="form-input"
							value={type}
							onChange={(e) =>
								setType(e.target.value)
							}
						>
							{types.map((t) => (
								<option key={t} value={t}>
									{t}
								</option>
							))}
						</select>
					</div>

					<div className="info-box">
						ℹ️ Un agent vous sera assigné sous
						24-48 heures ouvrables.
					</div>
				</div>

				<div className="app-modal-footer">
					<button
						className="btn btn-outline"
						onClick={onClose}
					>
						Annuler
					</button>

					<button
						className="btn btn-primary"
						onClick={handleCreate}
						disabled={loading}
					>
						{loading
							? "Envoi..."
							: "Soumettre"}
					</button>
				</div>
			</div>
		</div>
	);
}