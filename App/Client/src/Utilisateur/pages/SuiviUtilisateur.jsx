import React, { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../commun/commun.jsx";
import SideBarUtilisateur from "../components/SideBarUtilisateur.jsx";

const STATUTS = ["En attente", "En traitement", "Approuve", "Refuse"];

async function loadDemandesWithClients() {
	const dossiers = await apiFetch("/dossiers");

	const demandesParDossier = await Promise.all(
		dossiers.map(async (dossier) => {
			const demandes = await apiFetch(`/type-demandes/dossier/${dossier.id_dossier}`);
			return demandes.map((demande) => ({
				...demande,
				dossier,
			}));
		}),
	);

	return demandesParDossier.flat();
}

export default function SuiviUtilisateurPage() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [savingId, setSavingId] = useState(null);
	const [filtreStatut, setFiltreStatut] = useState("Tous");
	const [items, setItems] = useState([]);

	useEffect(() => {
		loadDemandesWithClients()
			.then(setItems)
			.catch((err) => setError(err.message || "Erreur de chargement."))
			.finally(() => setLoading(false));
	}, []);

	const filtered = useMemo(() => {
		if (filtreStatut === "Tous") return items;
		return items.filter((item) => item.Statut === filtreStatut);
	}, [items, filtreStatut]);

	async function handleChangeStatut(item, statut) {
		setSavingId(item.id_demande);
		setError("");
		try {
			await apiFetch(`/type-demandes/update/${item.id_demande}`, {
				method: "PUT",
				body: JSON.stringify({
					Type_Demande: item.Type_Demande,
					Description: item.Description || "",
					Statut: statut,
				}),
			});

			setItems((prev) =>
				prev.map((current) =>
					current.id_demande === item.id_demande
						? { ...current, Statut: statut }
						: current,
				),
			);
		} catch (err) {
			setError(err.message || "Impossible de mettre a jour le statut.");
		} finally {
			setSavingId(null);
		}
	}

	return (
		<div className="app-shell">
			<div className="page-body">
				<SideBarUtilisateur />
				<main className="main-content" style={{ maxWidth: "1400px" }}>
					<div className="breadcrumb">
						Portail Utilisateur <span className="breadcrumb-sep">›</span>
						<span>Suivi des demandes</span>
					</div>

					<div className="card" style={{ padding: "20px", marginBottom: "18px" }}>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							gap: "12px",
							flexWrap: "wrap",
						}}
					>
						<div>
							<h1 className="page-title" style={{ marginBottom: "2px" }}>
								Suivi de la demande
							</h1>
							<p className="page-subtitle" style={{ marginBottom: 0 }}>
								Consultez toutes les demandes clients et mettez a jour leur statut.
							</p>
						</div>

						<div>
							<label className="form-label" style={{ marginBottom: "6px" }}>
								Filtrer par statut
							</label>
							<select
								className="form-input"
								value={filtreStatut}
								onChange={(e) => setFiltreStatut(e.target.value)}
								style={{ minWidth: "220px" }}
							>
								<option value="Tous">Tous</option>
								{STATUTS.map((s) => (
									<option key={s} value={s}>
										{s}
									</option>
								))}
							</select>
						</div>
					</div>
					</div>

					{error && (
						<div className="card" style={{ padding: "14px", color: "var(--danger)", marginBottom: "12px" }}>
							{error}
						</div>
					)}

					{loading ? (
						<div className="card" style={{ padding: "20px" }}>
							Chargement des demandes...
						</div>
					) : filtered.length === 0 ? (
						<div className="card" style={{ padding: "20px" }}>
							Aucune demande pour le filtre selectionne.
						</div>
					) : (
						<div className="card" style={{ overflowX: "auto" }}>
							<table className="table is-fullwidth is-hoverable" style={{ marginBottom: 0 }}>
							<thead>
								<tr>
									<th>Demande</th>
									<th>Client</th>
									<th>Dossier</th>
									<th>Description</th>
									<th>Statut</th>
								</tr>
							</thead>
							<tbody>
								{filtered.map((item) => {
									const fullName = `${item.dossier.prenom || ""} ${item.dossier.nom || ""}`.trim();
									return (
										<tr key={item.id_demande}>
											<td>#{item.id_demande}</td>
											<td>{fullName || "Client"}</td>
											<td>#{item.id_dossier}</td>
											<td>{item.Description || "-"}</td>
											<td>
												<select
													className="form-input"
													value={item.Statut || "En attente"}
													onChange={(e) => handleChangeStatut(item, e.target.value)}
													disabled={savingId === item.id_demande}
												>
													{STATUTS.map((s) => (
														<option key={s} value={s}>
															{s}
														</option>
													))}
												</select>
											</td>
										</tr>
									);
								})}
							</tbody>
							</table>
						</div>
					)}
				</main>
			</div>
		</div>
	);
}
