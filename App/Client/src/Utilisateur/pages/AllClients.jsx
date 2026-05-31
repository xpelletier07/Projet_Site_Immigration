import { useEffect, useRef, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { style } from "../components/GestionsClients/Gestion.css.js";
import { Footer } from "../components/Footer.jsx";
import { apiFetch } from "../../commun/commun.jsx";
import { ModifierClientModal} from "../components/GestionsClients/ModifierClientModal.jsx";
import { AjouterClientModal } from "../components/GestionsClients/AjouterClientModal.jsx";

export default function AllClients() {
	const [search, setSearch] = useState("");
	const [clients, setClients] = useState([]);
	const [isClick, setIsClick] = useState(0);
	const [showModal1, setShowModal1] = useState(false);
	const [NewClientModal1, setNewClientModal1] = useState(false);
	const [selectedClientId, setSelectedClientId] = useState(null);

	const nbpages = Math.ceil(clients.length / 10);
	const editButtonRef = useRef(null);
	const newClientButtonRef = useRef(null);

	function Filtrer_wrap() {
		const k = isClick * 10;
		return clients.slice(k, k + 10);
	}

	async function créerDossier(id_client) {
		try {
			await apiFetch(`/dossiers/create/`, {
				method: "POST",
				body: JSON.stringify({ id_client }),
			});
			alert("Dossier créé avec succès !");
		} catch (err) {
			console.error(err);
			// apiFetch throws with server response text in err.message
			alert(`Erreur lors de la création du dossier : ${err.message || err}`);
		}
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
		if (showModal1 || NewClientModal1) {
			document.documentElement.classList.add("is-clipped");
		} else {
			document.documentElement.classList.remove("is-clipped");
		}

		return () => {
			document.documentElement.classList.remove("is-clipped");
		};
	}, [showModal1, NewClientModal1]);

	useEffect(() => {
		if (isClick >= nbpages) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setIsClick(0);
		}
	}, [nbpages, isClick]);

	async function handleDelete(id_client) {
		if (window.confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
			await apiFetch(`/clients/delete/${id_client}`, {
				method: "DELETE",
			}).then(() => {
				setClients(
					clients.filter((c) => c.client.id_client !== id_client),
				);
			});
		}
	}

	useEffect(() => {
    async function fetchClients() {
        try {
            const res = await apiFetch("/clients");

            const data = Array.isArray(res) ? res : [res];

            const contenuFiltre = data.filter((c) =>
                c.nom.toLowerCase().includes(search.toLowerCase())
            );

            setClients(contenuFiltre);
        } catch (err) {
            console.error(err);
        }
    }

    fetchClients();
}, [search]);


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
								Gestion des Clients
							</h1>
							<p
								style={{
									color: "var(--secondary)",
									fontSize: "1.1rem",
									maxWidth: 600,
									lineHeight: 1.6,
								}}
							>
								Accédez à la liste complète de vos clients,
                                créez de nouveaux dossiers et modifiez leurs informations.
							</p>
						</div>
						{/* AJOUTÉ : bouton Nouveau Client */}
						<button className="btn-new-client"
							ref={newClientButtonRef}
							onClick={() => setNewClientModal1(true)}
						>
							+ Nouveau Client
						</button>
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
										placeholder="Rechercher par nom de client"
										value={search}
										onChange={(e) =>
											setSearch(e.target.value)
										}
										style={{ paddingLeft: "2.75rem" }}
									/>
								</div>
							</div>
                        </div>
					</div>

					{/* Ledger*/}
					<div style={{ marginTop: "2rem" }}>
						{/* Header row*/}
						<div className="ledger-header">
							<div>Identité du Client</div>
							<div>Téléphone</div>
                            <div>Courriel</div>
                            <div>Date de Création</div>
							<div className="col-actions">Actions</div>
						</div>

						{/* Client rows */}
						{Filtrer_wrap().map((client) => {
							return (
								<div
									key={client.id_client}
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
											{client.nom.charAt(0) +
												client.prenom.charAt(0)}
										</div>
										<div>
											<div className="client-name">
												{client.nom} {client.prenom}
											</div>
										</div>
									</div>
                                    {/* Téléphone */}
                                    <div className="dossier-num">
										{client.telephone}
									</div>
									{/* Courriel */}
									<div className="dossier-num">
										{client.courriel}
									</div>
									{/* Date de Création */}
									<div className="col-date">
										{client.date_creation}
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
													client.id_client,
												);
												setShowModal1(true);
											}}
										>
											✏️
										</button>
										<button
											className="btn-delete"
											title="Supprimer"
											onClick={() =>
												handleDelete(
													client.id_client,
												)
											}
										>
											🗑️
										</button>
										<button
											className="btn-voir"
                                            title="Créer Dossier"
											onClick={() => créerDossier(client.id_client)}
										>
											Créer Dossier
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
							Affichage de {clients.length <= 10 ? clients.length : 10} sur {clients.length} clients
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
				{showModal1 && (
					<ModifierClientModal
						idClient={selectedClientId}
						onClose={() => {
							setShowModal1(false);
							setSelectedClientId(null);

							if (editButtonRef.current) {
								editButtonRef.current.focus();
							}
						}}
					/>
				)}
				{NewClientModal1 && (
					<AjouterClientModal
						onClose={() => {
							setNewClientModal1(false); 
							if (newClientButtonRef.current) {
								newClientButtonRef.current.focus();
							}
						}}
					/>
				)}
				<Footer />
			</div>
		</>
	);
}
