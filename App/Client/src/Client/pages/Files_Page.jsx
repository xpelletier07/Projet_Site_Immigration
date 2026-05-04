import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import TopNav from "../../commun/menu.jsx";
import { getClientBundle, createDossier } from "../services/client.service.jsx";
import { useToast } from "../../commun/Toast.jsx";

const FolderIcon = () => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
	>
		<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
	</svg>
);
const InvIcon = () => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
	>
		<rect x="1" y="4" width="22" height="16" rx="2" />
		<line x1="1" y1="10" x2="23" y2="10" />
	</svg>
);

export default function FilesPage() {
	const toast = useToast();
	const [bundle, setBundle] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getClientBundle()
			.then(setBundle)
			.catch(() => toast("Erreur de chargement.", "error"))
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return (
			<div className="app-shell">
				<TopNav />
				<div className="loading-screen">
					<div className="spinner" />
				</div>
			</div>
		);
	}

	const {
		hasDossier,
		dossier,
		demandes = [],
		factures = [],
		documents = [],
		client,
	} = bundle || {};

	return (
		<div className="app-shell">
			<TopNav />
			<div className="page-body">
				<Sidebar onNewCase={() => {}} />

				<main className="main-content">
					<div className="breadcrumb">
						Portail Client <span className="breadcrumb-sep">›</span>
						<span>Mes dossiers</span>
					</div>

					<h1
						style={{
							fontFamily: "'DM Serif Display',serif",
							fontSize: "1.8rem",
							marginBottom: "6px",
						}}
					>
						Mes Dossiers &amp; Demandes
					</h1>
					<p
						style={{
							color: "var(--muted)",
							fontSize: "0.9rem",
							marginBottom: "28px",
						}}
					>
						Vue d'ensemble de vos demandes d'immigration et
						factures.
					</p>

					{!hasDossier ? (
						<div className="empty-state">
							<div
								className="empty-icon"
								style={{ fontSize: "2.5rem" }}
							>
								📁
							</div>
							<h2 className="empty-title">Aucun dossier</h2>
							<p className="empty-sub">
								Commencez votre processus d'immigration en
								créant votre premier dossier.
							</p>
						</div>
					) : (
						<>
							{/* Dossier info */}
							<div className="card p-5 mb-4">
								<div className="flex gap-3 items-center">
									<div
										style={{
											width: "44px",
											height: "44px",
											background: "var(--accent)",
											borderRadius: "10px",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											color: "var(--blue)",
										}}
									>
										<FolderIcon />
									</div>
									<div>
										<div
											style={{
												fontWeight: 700,
												fontSize: "1rem",
											}}
										>
											Dossier #{dossier.id_dossier}
										</div>
										<div
											style={{
												fontSize: "0.8rem",
												color: "var(--muted)",
											}}
										>
											Client #{client.id_client} ·{" "}
											{client.prenom} {client.nom}
										</div>
									</div>
									<span
										className="badge badge-info"
										style={{ marginLeft: "auto" }}
									>
										En cours
									</span>
								</div>

								<div
									style={{
										display: "grid",
										gridTemplateColumns: "repeat(3,1fr)",
										gap: "12px",
										marginTop: "20px",
									}}
								>
									{[
										["Documents", documents.length],
										["Demandes", demandes.length],
										["Factures", factures.length],
									].map(([label, val]) => (
										<div
											key={label}
											style={{
												background: "var(--surface-2)",
												borderRadius: "10px",
												padding: "14px",
												textAlign: "center",
											}}
										>
											<div
												style={{
													fontFamily:
														"'DM Serif Display',serif",
													fontSize: "1.6rem",
													color: "var(--navy)",
												}}
											>
												{val}
											</div>
											<div
												style={{
													fontSize: "0.75rem",
													color: "var(--muted)",
												}}
											>
												{label}
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Demandes */}
							{demandes.length > 0 && (
								<div
									className="card mb-4"
									style={{ overflow: "hidden" }}
								>
									<div className="section-header">
										<span className="section-title">
											Types de demandes
										</span>
									</div>
									{demandes.map((d) => (
										<div
											key={d.id_demande}
											className="doc-item"
										>
											<div className="doc-item-left">
												<div className="doc-icon">
													<FolderIcon />
												</div>
												<div>
													<div className="doc-name">
														{d.Type_Demande}
													</div>
													<div className="doc-date">
														Demande #{d.id_demande}
													</div>
												</div>
											</div>
											<span className="badge badge-info">
												Actif
											</span>
										</div>
									))}
								</div>
							)}

							{/* Factures */}
							<div
								className="card"
								style={{ overflow: "hidden" }}
							>
								<div className="section-header">
									<span className="section-title">
										<InvIcon /> Factures
									</span>
								</div>

								{factures.length === 0 ? (
									<div
										style={{
											padding: "32px",
											textAlign: "center",
											color: "var(--muted)",
											fontSize: "0.875rem",
										}}
									>
										Aucune facture pour l'instant.
									</div>
								) : (
									factures.map((f) => (
										<div
											key={f.id_facture}
											className="doc-item"
										>
											<div className="doc-item-left">
												<div className="doc-icon">
													<InvIcon />
												</div>
												<div>
													<div className="doc-name">
														{f.description}
													</div>
													<div className="doc-date">
														Émise le{" "}
														{f.date_emission} ·
														Échéance{" "}
														{f.date_echeance}
													</div>
												</div>
											</div>
											<div className="flex gap-2 items-center">
												<span
													style={{
														fontWeight: 700,
														fontSize: "0.95rem",
													}}
												>
													{f.montant} $
												</span>
												<span
													className={`badge ${f.statut === "payé" ? "badge-success" : "badge-warning"}`}
												>
													{f.statut}
												</span>
											</div>
										</div>
									))
								)}
							</div>
						</>
					)}
				</main>
			</div>
		</div>
	);
}
