import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../../commun/commun.jsx";

const STATUTS = ["En attente", "En traitement", "Approuve", "Refuse"];
const STATUTS_FACTURE = ["A payer", "Payee", "En retard"];

export default function GestionDemandeUtilisateurPage() {
	const { idDemande } = useParams();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [savingStatut, setSavingStatut] = useState(false);
	const [savingAssignation, setSavingAssignation] = useState(false);
	const [savingFacture, setSavingFacture] = useState(false);

	const [demande, setDemande] = useState(null);
	const [dossier, setDossier] = useState(null);
	const [utilisateurs, setUtilisateurs] = useState([]);
	const [selectedUtilisateurId, setSelectedUtilisateurId] = useState("");
	const [selectedStatut, setSelectedStatut] = useState("En attente");
	const [factureForm, setFactureForm] = useState({
		description: "",
		montant: "",
		date_echeance: "",
		statut: "A payer",
	});

	const assigneeName = useMemo(() => {
		if (!demande?.id_utilisateur) return "Non attribue";
		const user = utilisateurs.find(
			(item) => String(item.id_utilisateur) === String(demande.id_utilisateur),
		);
		if (!user) return `#${demande.id_utilisateur}`;
		return `${user.prenom || ""} ${user.nom || ""}`.trim() || `#${demande.id_utilisateur}`;
	}, [demande, utilisateurs]);

	function getDefaultDueDate() {
		const dueDate = new Date();
		dueDate.setDate(dueDate.getDate() + 30);
		return dueDate.toISOString().slice(0, 10);
	}

	useEffect(() => {
		let mounted = true;

		async function loadData() {
			setLoading(true);
			setError("");
			setSuccess("");
			try {
				const [currentDemande, dossiers, users] = await Promise.all([
					apiFetch(`/type-demandes/${idDemande}`),
					apiFetch("/dossiers"),
					apiFetch("/utilisateurs/assignables"),
				]);

				if (!mounted) return;

				const linkedDossier = (Array.isArray(dossiers) ? dossiers : []).find(
					(item) => Number(item.id_dossier) === Number(currentDemande.id_dossier),
				);

				setDemande(currentDemande);
				setDossier(linkedDossier || null);
				setUtilisateurs(Array.isArray(users) ? users : []);
				setSelectedUtilisateurId(
					currentDemande.id_utilisateur ? String(currentDemande.id_utilisateur) : "",
				);
				setSelectedStatut(currentDemande.Statut || "En attente");
				setFactureForm({
					description:
						`Facture pour demande #${currentDemande.id_demande} - ${currentDemande.Type_Demande || "Service immigration"}`,
					montant: "",
					date_echeance: getDefaultDueDate(),
					statut: "A payer",
				});
			} catch (err) {
				if (mounted) setError(err.message || "Erreur de chargement.");
			} finally {
				if (mounted) setLoading(false);
			}
		}

		loadData();
		return () => {
			mounted = false;
		};
	}, [idDemande]);

	async function handleUpdateStatut() {
		if (!demande) return;
		setSavingStatut(true);
		setError("");
		setSuccess("");
		try {
			await apiFetch(`/type-demandes/update/${demande.id_demande}`, {
				method: "PUT",
				body: JSON.stringify({
					Type_Demande: demande.Type_Demande,
					Description: demande.Description || "",
					Statut: selectedStatut,
					id_utilisateur: demande.id_utilisateur || null,
				}),
			});
			setDemande((prev) => ({ ...prev, Statut: selectedStatut }));
			setSuccess("Statut de la demande mis a jour.");
		} catch (err) {
			setError(err.message || "Impossible de mettre a jour le statut.");
		} finally {
			setSavingStatut(false);
		}
	}

	async function handleAssignUtilisateur() {
		if (!demande || !selectedUtilisateurId) {
			setError("Selectionnez un utilisateur a attribuer.");
			return;
		}

		setSavingAssignation(true);
		setError("");
		setSuccess("");
		try {
			await apiFetch(`/type-demandes/update/${demande.id_demande}`, {
				method: "PUT",
				body: JSON.stringify({
					Type_Demande: demande.Type_Demande,
					Description: demande.Description || "",
					Statut: demande.Statut || "En attente",
					id_utilisateur: Number(selectedUtilisateurId),
				}),
			});
			setDemande((prev) => ({ ...prev, id_utilisateur: Number(selectedUtilisateurId) }));
			setSuccess("Gestionnaire attribue a la demande.");
		} catch (err) {
			setError(err.message || "Impossible d'attribuer l'utilisateur.");
		} finally {
			setSavingAssignation(false);
		}
	}

	async function handleCreateFacture() {
		if (!demande) return;

		const montantValue = Number(factureForm.montant);
		if (
			!factureForm.description ||
			!factureForm.date_echeance ||
			!factureForm.statut ||
			!montantValue
		) {
			setError("Remplissez tous les champs facture (description, montant, echeance, statut).");
			return;
		}

		setSavingFacture(true);
		setError("");
		setSuccess("");
		try {
			const today = new Date().toISOString().slice(0, 10);
			await apiFetch("/factures", {
				method: "POST",
				body: JSON.stringify({
					id_dossier: demande.id_dossier,
					description: factureForm.description,
					montant: montantValue,
					date_emission: today,
					date_echeance: factureForm.date_echeance,
					statut: factureForm.statut,
				}),
			});
			setFactureForm((prev) => ({ ...prev, montant: "" }));
			setSuccess("Facture creee avec succes.");
		} catch (err) {
			setError(err.message || "Impossible de creer la facture.");
		} finally {
			setSavingFacture(false);
		}
	}

	return (
		<div className="app-shell">
			<div className="page-body">
				<main className="main-content" style={{ margin: "auto", maxWidth: "1100px" }}>
					<div className="breadcrumb">
						Portail Utilisateur <span className="breadcrumb-sep">›</span>
						<span onClick={() => navigate("/utilisateur/suivi")} style={{ cursor: "pointer" }}>
							Suivi des demandes
						</span>
						<span className="breadcrumb-sep">›</span>
						<span>Gestion de la demande</span>
					</div>

					<div className="card" style={{ padding: "20px", marginBottom: "14px" }}>
						<button
							type="button"
							className="button"
							onClick={() => navigate("/utilisateur/suivi")}
							style={{ marginBottom: "10px" }}
						>
							Retour a la liste
						</button>
						<h1 className="page-title" style={{ marginBottom: "6px" }}>
							Gestion de la demande #{idDemande}
						</h1>
						<p className="page-subtitle" style={{ marginBottom: 0 }}>
							Attribuez un gestionnaire, mettez a jour le statut et creez la facture depuis cette page.
						</p>
					</div>

					{error && (
						<div className="card" style={{ padding: "12px", marginBottom: "12px", color: "var(--danger)" }}>
							{error}
						</div>
					)}

					{success && (
						<div className="card" style={{ padding: "12px", marginBottom: "12px", color: "#1f7a3d" }}>
							{success}
						</div>
					)}

					{loading ? (
						<div className="card" style={{ padding: "20px" }}>Chargement...</div>
					) : !demande ? (
						<div className="card" style={{ padding: "20px" }}>Demande introuvable.</div>
					) : (
						<>
							<div className="card" style={{ padding: "16px", marginBottom: "14px" }}>
								<h2 className="page-subtitle" style={{ fontWeight: 700, marginBottom: "10px" }}>
									Details
								</h2>
								<p><strong>Type:</strong> {demande.Type_Demande || "-"}</p>
								<p><strong>Description:</strong> {demande.Description || "-"}</p>
								<p><strong>Dossier:</strong> #{demande.id_dossier}</p>
								<p><strong>Client:</strong> {dossier ? `${dossier.prenom || ""} ${dossier.nom || ""}`.trim() || "Client" : "Client"}</p>
								<p><strong>Gestionnaire actuel:</strong> {assigneeName}</p>
							</div>

							<div
								style={{
									display: "grid",
									gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
									gap: "14px",
								}}
							>
								<div className="card" style={{ padding: "14px" }}>
									<h3 style={{ marginBottom: "10px", fontWeight: 700 }}>Mettre a jour le statut</h3>
									<select
										className="form-input"
										value={selectedStatut}
										onChange={(event) => setSelectedStatut(event.target.value)}
									>
										{STATUTS.map((s) => (
											<option key={s} value={s}>
												{s}
											</option>
										))}
									</select>
									<button
										type="button"
										className="button is-link"
										style={{ marginTop: "10px" }}
										onClick={handleUpdateStatut}
										disabled={savingStatut}
									>
										{savingStatut ? "Mise a jour..." : "Mettre a jour"}
									</button>
								</div>

								<div className="card" style={{ padding: "14px" }}>
									<h3 style={{ marginBottom: "10px", fontWeight: 700 }}>Attribuer un gestionnaire</h3>
									<select
										className="form-input"
										value={selectedUtilisateurId}
										onChange={(event) => setSelectedUtilisateurId(event.target.value)}
									>
										<option value="">Selectionner...</option>
										{utilisateurs.map((user) => (
											<option key={user.id_utilisateur} value={user.id_utilisateur}>
												{`${user.prenom || ""} ${user.nom || ""}`.trim()}
											</option>
										))}
									</select>
									<button
										type="button"
										className="button is-info"
										style={{ marginTop: "10px" }}
										onClick={handleAssignUtilisateur}
										disabled={savingAssignation || !selectedUtilisateurId}
									>
										{savingAssignation ? "Attribution..." : "Attribuer"}
									</button>
								</div>

								<div className="card" style={{ padding: "14px" }}>
									<h3 style={{ marginBottom: "10px", fontWeight: 700 }}>Creer une facture</h3>
									<label className="form-label" style={{ marginBottom: "6px" }}>Description</label>
									<input
										className="form-input"
										value={factureForm.description}
										onChange={(event) =>
											setFactureForm((prev) => ({ ...prev, description: event.target.value }))
										}
									/>

									<label className="form-label" style={{ margin: "10px 0 6px" }}>Montant</label>
									<input
										type="number"
										min="0"
										step="0.01"
										className="form-input"
										value={factureForm.montant}
										onChange={(event) =>
											setFactureForm((prev) => ({ ...prev, montant: event.target.value }))
										}
									/>

									<label className="form-label" style={{ margin: "10px 0 6px" }}>Date d'echeance</label>
									<input
										type="date"
										className="form-input"
										value={factureForm.date_echeance}
										onChange={(event) =>
											setFactureForm((prev) => ({ ...prev, date_echeance: event.target.value }))
										}
									/>

									<label className="form-label" style={{ margin: "10px 0 6px" }}>Statut facture</label>
									<select
										className="form-input"
										value={factureForm.statut}
										onChange={(event) =>
											setFactureForm((prev) => ({ ...prev, statut: event.target.value }))
										}
									>
										{STATUTS_FACTURE.map((statut) => (
											<option key={statut} value={statut}>
												{statut}
											</option>
										))}
									</select>

									<button
										type="button"
										className="button is-success"
										style={{ marginTop: "10px" }}
										onClick={handleCreateFacture}
										disabled={savingFacture}
									>
										{savingFacture ? "Creation..." : "Creer la facture"}
									</button>
								</div>
							</div>
						</>
					)}
				</main>
			</div>
		</div>
	);
}
