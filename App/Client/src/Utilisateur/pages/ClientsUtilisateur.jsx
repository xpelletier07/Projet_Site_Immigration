import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { style } from "../components/GestionsClients/Gestion.css.js";
import { Footer } from "../components/Footer.jsx";
import { apiFetch } from "../../commun/commun.jsx";
import { ModifierClientModal} from "../components/GestionsClients/ModifierClientModal.jsx";

export default function GestionsClients() {
	const navigate = useNavigate();

	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState("Tous les statuts");
	const [typeFilter, setTypeFilter] = useState("Tous les types");
	const [clients, setClients] = useState([]);
	const [isClick, setIsClick] = useState(0);
	const [showModal, setShowModal] = useState(false);
	//const [NewClientModal, setNewClientModal] = useState(false);
	const [selectedClientId, setSelectedClientId] = useState(null);

	const nbpages = Math.ceil(clients.length / 10);
	const editButtonRef = useRef(null);
	//const newClientButtonRef = useRef(null);

	function Filtrer_wrap() {
		const k = isClick * 10;
		return clients.slice(k, k + 10);
	}

	function numerotation() {
		if (clients.length > 0) {
			const p = [];
			for (let i = 0; i < nbpages; i++) {
				if (i == isClick) {
					p.push({
						index: i,
						clic: "pagination-link is-current",
					});
				} else {
					p.push({
						index: i,
						clic: "pagination-link",
					});
				}
			}
			return p;
		}
		return [];
	}

	useEffect(() => {
		if (showModal) {
			document.documentElement.classList.add("is-clipped");
		} else {
			document.documentElement.classList.remove("is-clipped");
		}

		return () => {
			document.documentElement.classList.remove("is-clipped");
		};
	}, [showModal]);

	useEffect(() => {
		if (isClick >= nbpages) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setIsClick(0);
		}
	}, [nbpages, isClick]);

	async function handleDelete(id_dossier) {
		if (window.confirm("Êtes-vous sûr de vouloir supprimer ce dossier ?")) {
			await apiFetch(`/dossiers/delete/${id_dossier}`, {
				method: "DELETE",
			}).then(() => {
				setClients(
					clients.filter((c) => c.dossier.id_dossier !== id_dossier),
				);
			});
		}
	}

	useEffect(() => {
		async function fetchClients() {
			try {
				const listdossier = await apiFetch("/dossiers");

				const contenu = await Promise.all(
					listdossier.map(async (e) => {
						try {
							const detailsfordossier = await apiFetch(
								`/dossiers/${e.id_dossier}`,
							);

							return {
								dossier: e,
								details: detailsfordossier,
							};
						} catch (err) {
							console.error(
								`Erreur dossier ${e.id_dossier}`,
								err,
							);

							return null;
						}
					}),
				);

				/*const contenuValide = contenu.filter(
					(c) => c && c.dossier && c.dossier.nom && c.dossier.prenom,
				);*/

				const contenufiltré = contenu.filter((c) => {
					const matchNom = c.dossier.nom
						.toLowerCase()
						.includes(search.toLowerCase());
					const matchDossier = c.dossier.id_dossier
						.toString()
						.includes(search.toLowerCase());
					const matchStatus =
						statusFilter === "Tous les statuts" ||
						c?.details?.factures[0]?.statut === statusFilter ||
						false;
					const matchType =
						typeFilter === "Tous les types" ||
						c?.details?.typeDemandes[0]?.Type_Demande ===
						typeFilter ||
						false;

					return (
						(matchNom || matchDossier) && matchStatus && matchType
					);
				});

				setClients(contenufiltré);
			} catch (err) {
				console.error(
					"Erreur lors de la récupération des clients :",
					err,
				);
			}
		}

		fetchClients();
	}, [search, statusFilter, typeFilter, isClick, clients]);

	const TYPE_OPTIONS = [
		"Tous les types",
		"Études & Recherche",
		"Regroupement familial",
		"Travail Temporaire",
		"Résidence permanente",
	];

	const STATUT = [
		"Tous les statuts",
		"en attente",
		"en cours",
		"approuvé",
		"action Requise",
	];

	return (
		<>
			<style>{style}</style>


			<div
				style={{
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
				}}
			>
				{/* Main */}
				<main
					style={{
						flexGrow: 1,
						maxWidth: 1400,
						margin: "0 auto",
						width: "100%",
						padding: "3rem 1.5rem",
					}}
				>
					{/* Page Header
                MODIFIÉ : ajout du bouton "Nouveau Client" à droite du titre (flex row) */}
					<div
						style={{
							marginBottom: "2.5rem",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "flex-start",
							flexWrap: "wrap",
							gap: "1rem",
						}}
					>
						<div>
							<h1
								style={{
									fontSize: "3rem",
									fontWeight: 800,
									letterSpacing: "-0.04em",
									color: "var(--on-surface)",
									marginBottom: "0.75rem",
									fontFamily: "'Public Sans', sans-serif",
								}}
							>
								Gestion des Dossiers Clients
							</h1>
							<p
								style={{
									color: "var(--secondary)",
									fontSize: "1.1rem",
									maxWidth: 600,
									lineHeight: 1.6,
								}}
							>
								Accédez au registre complet des dossiers
								d'immigration. Gérez les priorités, surveillez
								l'activité récente et assurez le suivi des
								engagements souverains.
							</p>
						</div>
						{/* AJOUTÉ : bouton Nouveau Client
						<button className="btn-new-client"
							ref={newClientButtonRef}
							onClick={() => setNewClientModal(true)}
						>
							+ Nouveau Client
						</button>
						*/}
					</div>

					{/* Filter Panel */}
					<div className="sl-filter-panel">
						<div className="columns is-vcentered is-variable is-3">
							<div className="column">
								<span className="sl-filter-label">
									Recherche de Dossier
								</span>
								<div className="container">
									<input
										className="input"
										type="text"
										placeholder="Rechercher par nom ou numéro de dossier..."
										value={search}
										onChange={(e) =>
											setSearch(e.target.value)
										}
										style={{ paddingLeft: "2.75rem" }}
									/>
								</div>
							</div>

							{/* AJOUTÉ : filtre Type de demande */}
							<div
								className="column is-narrow"
								style={{ minWidth: 200 }}
							>
								<span className="sl-filter-label">
									Type de demande
								</span>
								<div className="select">
									<select
										value={typeFilter}
										onChange={(e) =>
											setTypeFilter(e.target.value)
										}
									>
										{/* Tous les types de demande ici */}
										{TYPE_OPTIONS.map((t) => (
											<option key={t}>{t}</option>
										))}
									</select>
								</div>
							</div>

							<div
								className="column is-narrow"
								style={{ minWidth: 200 }}
							>
								<span className="sl-filter-label">Statut</span>
								<div className="select">
									<select
										value={statusFilter}
										onChange={(e) =>
											setStatusFilter(e.target.value)
										}
									>
										{STATUT.map((s) => (
											<option key={s}>{s}</option>
										))}
									</select>
								</div>
							</div>

							{/*<div
								className="column is-narrow"
								style={{ paddingTop: "1.6rem" }}
							>
								<button className="sl-btn-filter">
									<span style={{ fontSize: "1.1rem" }}>
										☰
									</span>
									Filtrer
								</button>
							</div>
							*/}
						</div>
					</div>

					{/* Ledger*/}
					<div style={{ marginTop: "2rem" }}>
						{/* Header row*/}
						<div className="ledger-header">
							<div>Identité du Client</div>
							<div>N° de Dossier</div>
							<div className="col-status">Statut</div>
							<div className="col-actions">Actions</div>
						</div>

						{/* Client rows */}
						{Filtrer_wrap().map((client) => {
							const tagClass =
								client?.details?.factures[0]?.statut ===
									"en cours"
									? "en-cours"
									: client?.details?.document
										? "action"
										: client?.details?.factures[0]
											?.statut === "en attente"
											? "attente"
											: "approuve";

							return (
								<div
									key={client.dossier.id_dossier}
									className="ledger-row"
								>
									{" "}
									{/* Identity */}
									<div
										style={{
											display: "flex",
											alignItems: "center",
											gap: "1rem",
										}}
									>
										<div
											className="sl-avatar"
											style={{
												background: "blue",
												color: "white",
											}}
										>
											{client.dossier.nom.charAt(0) +
												client.dossier.prenom.charAt(0)}
										</div>
										<div>
											<div className="client-name">
												{client.dossier.nom}{" "}
												{client.dossier.prenom}
											</div>
										</div>
									</div>
									{/* Dossier */}
									<div className="dossier-num">
										#{client.dossier.id_dossier}
									</div>
									{/* Status */}
									<div className="col-status">
										<span className={`sl-tag ${tagClass}`}>
											{client?.details?.factures[0]
												?.statut || "Action Requise"}
										</span>
									</div>
									{/* Actions */}
									{/* MODIFIÉ : ajout du bouton supprimer (btn-delete) entre btn-edit et btn-voir */}
									<div className="col-actions">
										<button
											ref={editButtonRef}
											className="btn-edit"
											title="Modifier"
											onClick={() => {
												setSelectedClientId(
													client.dossier.id_client,
												);
												setShowModal(true);
											}}
										>
											✏️
										</button>
										<button
											className="btn-delete"
											title="Supprimer"
											onClick={() =>
												handleDelete(
													client.dossier.id_dossier,
												)
											}
										>
											🗑️
										</button>
										<button
											className="btn-voir"
											onClick={() =>
												navigate(
													`/utilisateur/dossier/${client.dossier.id_dossier}`,
												)
											}
										>
											Voir Dossier
										</button>
									</div>
								</div>
							);
						})}

						{Filtrer_wrap().length === 0 && (
							<div
								style={{
									textAlign: "center",
									padding: "3rem",
									color: "var(--secondary)",
								}}
							>
								Aucun client trouvé.
							</div>
						)}
					</div>

					{/* Pagination */}
					<div className="pagination-area">
						<span className="pagination-info">
							Affichage de 10 sur {clients.length} dossiers de clients.
						</span>
						<nav
							className="pagination"
							role="navigation"
							aria-label="pagination"
							style={{ display: "flex", gap: "0.5rem" }}
						>
							<ul className="pagination-list">
								<button
									className="pag-btn arrow"
									disabled={isClick === 0}
									onClick={() => {
										setIsClick(isClick - 1);
									}}
								>
									‹
								</button>

								{numerotation().map((num) => (
									<li key={num.index}>
										<button
											onClick={() => {
												setIsClick(num.index);
											}}
											className={num.clic}
										>
											{num.index + 1}
										</button>
									</li>
								))}
								<button
									className="pag-btn arrow"
									disabled={isClick === nbpages - 1}
									onClick={() => {
										setIsClick(isClick + 1);
									}}
								>
									›
								</button>
							</ul>
						</nav>
					</div>
				</main>
				{showModal && (
					<ModifierClientModal
						idClient={selectedClientId}
						onClose={() => {
							setShowModal(false);
							setSelectedClientId(null);

							if (editButtonRef.current) {
								editButtonRef.current.focus();
							}
						}}
					/>
				)}
				<Footer />
			</div>
		</>
	);
}
