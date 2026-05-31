import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../commun/commun.jsx";

export default function DashBordUtilisateur() {
	const navigate = useNavigate();
	const [dossiers, setDossiers] = useState([]);
	const [activities, setActivities] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const list = await apiFetch("/dossiers");

				const contenu = await Promise.all(
					list.map(async (e) => {
						try {
							const details = await apiFetch(`/dossiers/${e.id_dossier}`);
							return { dossier: e, details };
						} catch {
							return null;
						}
					})
				);

				const valid = contenu.filter(Boolean);
				setDossiers(valid);

				setActivities(
					valid
						.slice(-5)
						.reverse()
						.map((d) => ({
							title: `Dossier #${d.dossier.id_dossier}`,
							desc: `${d.dossier.nom ?? ""} ${d.dossier.prenom ?? ""}`,
							time: d.dossier.created_at
								? new Date(d.dossier.created_at).toLocaleDateString("fr-CA")
								: "—",
						}))
				);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, []);

	const enAttente = dossiers.filter(
		(d) =>
			!d?.details?.factures?.[0]?.statut ||
			d?.details?.factures?.[0]?.statut === "en attente"
	).length;

	const approuves = dossiers.filter(
		(d) => d?.details?.factures?.[0]?.statut === "approuvé"
	).length;

	const boxStyle = { background: "#fff", boxShadow: "none", border: "1px solid #e0e0e0" };

	return (
		<>
		<div className="is-flex" style={{ background: "#fff" }}>

			<div className="section" style={{ flex: 1 }}>
				<div className="container is-fluid">

					{/* ── Breadcrumb ── */}
					<nav className="breadcrumb mb-2" aria-label="breadcrumbs">
						<ul>
							<li><a className="has-text-black">Portail Employé</a></li>
							<li className="is-active"><a>Dashboard</a></li>
						</ul>
					</nav>
 
					{/* ── Titre ── */}
					<h1 className="title is-3 mb-1 has-text-black">Dashboard Employé</h1>
					<p className="subtitle is-6 mb-5 has-text-black">
						Bonjour. Voici le suivi des dossiers en cours.
					</p>

					{/* ── Stats ── */}
					<div className="columns mb-5">
						{[
							{ label: "Dossiers actifs", value: dossiers.length },
							{ label: "En attente",      value: enAttente },
							{ label: "Approuvés",       value: approuves },
						].map(({ label, value }) => (
							<div className="column" key={label}>
								<div className="box has-text-centered" style={boxStyle}>
									<p className="heading has-text-black">{label}</p>
									<p className="title is-2 has-text-black">{value}</p>
								</div>
							</div>
						))}
					</div>

					{/* ── Contenu principal ── */}
					<div className="columns is-variable is-5" style={{ alignItems: "flex-start" }}>

						{/* ── Colonne gauche : tableau ── */}
						<div className="column is-8">
							<div className="box" style={boxStyle}>

								<div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
									<h2 className="title is-5 mb-0 has-text-black">Dossiers récents</h2>
									<button
										className="button is-small"
										onClick={() => navigate("/utilisateur/clients")}
									>
										Voir tous
									</button>
								</div>

								{loading ? (
									<progress className="progress is-small" max="100">
										Chargement…
									</progress>
								) : (
									<div className="table container">
										<table className="table is-fullwidth is-hoverableis-striped has-background-white">
											<thead>
												<tr>
													<th className="has-text-black">Client</th>
													<th className="has-text-black">Dossier</th>
													<th className="has-text-black">Type de demande</th>
													<th className="has-text-black">Statut</th>
												</tr>
											</thead>
											<tbody>
												{dossiers.length === 0 ? (
													<tr>
														<td colSpan={5} className="has-text-centered py-5 has-text-black">
															Aucun dossier trouvé.
														</td>
													</tr>
												) : (
													dossiers.map((d) => {
														const statut = d?.details?.factures?.[0]?.statut;
														return (
															<tr
																key={d.dossier.id_dossier}
																style={{ cursor: "pointer" }}
																onClick={() => navigate(`/utilisateur/dossier/${d.dossier.id_dossier}`)}
															>
																<td className="has-text-weight-bold">
																	<strong className="has-text-black">
																		{d.dossier.nom} {d.dossier.prenom}
																	</strong>
																</td>
																<td className="has-text-black">
																	#{d.dossier.id_dossier}
																</td>
																<td className="has-text-black">
																	{d?.details?.typeDemandes?.[0]?.Type_Demande ?? (
																		<span>—</span>
																	)}
																</td>
																<td className="has-text-black">
																	<span className="tag is-light is-small">
																		{statut ?? "En cours"}
																	</span>
																</td>
																<td>›</td>
															</tr>
														);
													})
												)}
											</tbody>
										</table>
									</div>
								)}
							</div>
						</div>

						{/* ── Colonne droite ── */}
						<div className="column is-4">

							{/* Activité récente */}
							<div className="box mb-4" style={boxStyle}>
								<h2 className="title is-5 mb-4 has-text-black">Activité récente</h2>
								{activities.length === 0 ? (
									<p className="has-text-grey is-size-6">Aucune activité.</p>
								) : (
									activities.map((a, i) => (
										<div key={i}>
											<p className="has-text-weight-bold is-size-6 mb-1">
												{a.title}
											</p>
											<p className="has-text-grey is-size-7 mb-1">{a.desc}</p>
											<p className="has-text-grey-light is-size-7">{a.time}</p>
											{i < activities.length - 1 && <hr className="my-3" />}
										</div>
									))
								)}
							</div>

							{/* Actions rapides
							<div className="box mb-4" style={boxStyle}>
								<h2 className="title is-5 mb-4 has-text-black">Actions rapides</h2>
								<button
									className="button is-fullwidth mb-2"
									onClick={() => navigate("/utilisateur/clients")}
								>
									Gérer les clients
								</button>
								<button
									className="button is-fullwidth"
									onClick={() => navigate("/utilisateur/clients")}
								>
									Nouveau dossier
								</button>
							</div>
							*/}
							
							{/* Note juridique */}
							<div className="box" style={boxStyle}>
								<p className="has-text-weight-bold mb-2 has-text-black">
									Mise à jour juridique
								</p>
								<p className="has-text-grey is-size-7">
									Les nouvelles réglementations sur les visas 2024 sont en vigueur.
									Consultez le guide mis à jour pour assurer la conformité des dossiers.
								</p>
								<button className="button is-small is-fullwidth mt-3 is-info">
									Lire le guide
								</button>
							</div>

						</div>
					</div>

				</div>
			</div>
		</div>
		</>
	);
}