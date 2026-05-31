import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../commun/commun.jsx";

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
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [filtreStatut, setFiltreStatut] = useState("Tous");
	const [items, setItems] = useState([]);

	useEffect(() => {
		loadDemandesWithClients()
			.then((demandes) => {
				setItems(demandes);
			})
			.catch((err) => setError(err.message || "Erreur de chargement."))
			.finally(() => setLoading(false));
	}, []);

	const filtered = useMemo(() => {
		if (filtreStatut === "Tous") return items;
		return items.filter((item) => item.Statut === filtreStatut);
	}, [items, filtreStatut]);

	const demandesNonApprouvees = useMemo(
		() => filtered.filter((item) => item.Statut !== "Approuve"),
		[filtered],
	);

	const demandesApprouvees = useMemo(
		() => filtered.filter((item) => item.Statut === "Approuve"),
		[filtered],
	);

	function getStatutBadgeStyle(statut) {
		switch (statut) {
			case "Approuve":
				return { background: "#d8f3dc", color: "#1b5e20", border: "1px solid #95d5b2" };
			case "Refuse":
				return { background: "#ffe3e3", color: "#9b2226", border: "1px solid #ffb3b3" };
			case "En traitement":
				return { background: "#fff3cd", color: "#7a5c00", border: "1px solid #ffe08a" };
			default:
				return { background: "#eef2ff", color: "#334155", border: "1px solid #cbd5e1" };
		}
	}

	function buildAssigneeName(item) {
		const fullName = `${item.utilisateur_prenom || ""} ${item.utilisateur_nom || ""}`.trim();
		return fullName || "Non attribue";
	}

	function renderTableRows(itemsToRender) {
		return itemsToRender.map((item) => {
			const fullName = `${item.dossier.prenom || ""} ${item.dossier.nom || ""}`.trim();

			return (
				<tr
					key={item.id_demande}
					onClick={() => navigate(`/utilisateur/suivi/${item.id_demande}`)}
					style={{
						cursor: "pointer",
					}}
				>
					<td>#{item.id_demande}</td>
					<td>{fullName || "Client"}</td>
					<td>#{item.id_dossier}</td>
					<td>{item.Description || "-"}</td>
					<td>{buildAssigneeName(item)}</td>
					<td>
						<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
							<span
								style={{
									...getStatutBadgeStyle(item.Statut || "En attente"),
									padding: "4px 8px",
									borderRadius: "999px",
									fontSize: "12px",
									fontWeight: 700,
								}}
							>
								{item.Statut || "En attente"}
							</span>
							<span style={{ color: "#64748b", fontSize: "12px" }}>Cliquer pour gerer</span>
						</div>
					</td>
				</tr>
			);
		});
	}

	return (
		<div className="app-shell">
			<div className="page-body" style={{ margin: "auto" }}>
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
								Suivi des demandes
							</h1>
							<p className="page-subtitle" style={{ marginBottom: 0 }}>
								Consultez les demandes en cours avec leur description, puis ouvrez une demande pour la gerer dans sa page dediee.
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
						<>
							<div className="card" style={{ overflowX: "auto", marginBottom: "16px" }}>
								<div style={{ padding: "16px 16px 0" }}>
									<h2 className="page-subtitle" style={{ marginBottom: "10px", fontWeight: 700 }}>
										Demandes en cours
									</h2>
								</div>
								{demandesNonApprouvees.length === 0 ? (
									<div style={{ padding: "0 16px 16px" }}>Aucune demande en cours.</div>
								) : (
									<table className="table is-fullwidth is-hoverable" style={{ marginBottom: 0 }}>
										<thead>
											<tr>
												<th>Demande</th>
												<th>Client</th>
												<th>Dossier</th>
												<th>Description de la demande</th>
												<th>Gestionnaire</th>
												<th>Statut</th>
											</tr>
										</thead>
										<tbody>{renderTableRows(demandesNonApprouvees)}</tbody>
									</table>
								)}
							</div>

							<div
								className="card"
								style={{
									overflowX: "auto",
									border: "1px solid #b7e4c7",
									background: "linear-gradient(180deg, #f3fff6 0%, #ffffff 100%)",
								}}
							>
								<div style={{ padding: "16px 16px 0" }}>
									<h2
										className="page-subtitle"
										style={{ marginBottom: "6px", fontWeight: 700, color: "#1f7a3d" }}
									>
										Demandes deja approuvees
									</h2>
									<p style={{ marginBottom: "10px", color: "#2d6a4f" }}>
										Section archivee pour limiter la pollution de la liste principale.
									</p>
								</div>
								{demandesApprouvees.length === 0 ? (
									<div style={{ padding: "0 16px 16px" }}>Aucune demande approuvee pour ce filtre.</div>
								) : (
									<table className="table is-fullwidth is-hoverable" style={{ marginBottom: 0 }}>
										<thead>
											<tr>
												<th>Demande</th>
												<th>Client</th>
												<th>Dossier</th>
												<th>Description de la demande</th>
												<th>Gestionnaire</th>
												<th>Statut</th>
											</tr>
										</thead>
										<tbody>{renderTableRows(demandesApprouvees)}</tbody>
									</table>
								)}
							</div>
						</>
					)}
				</main>
			</div>
		</div>
	);
}
