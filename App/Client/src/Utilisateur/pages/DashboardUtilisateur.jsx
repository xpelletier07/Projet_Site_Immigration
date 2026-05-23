import React, { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../commun/commun.jsx";
import SideBarUtilisateur from "../components/SideBarUtilisateur.jsx";

function StatCard({ label, value, color = "var(--blue)" }) {
	return (
		<div className="card" style={{ padding: "16px" }}>
			<div style={{ color: "var(--muted)", fontSize: "0.86rem" }}>{label}</div>
			<div style={{ fontSize: "1.7rem", fontWeight: 700, color, lineHeight: 1.2 }}>{value}</div>
		</div>
	);
}

export default function DashboardUtilisateurPage() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [clients, setClients] = useState([]);
	const [dossiers, setDossiers] = useState([]);
	const [demandes, setDemandes] = useState([]);

	useEffect(() => {
		const load = async () => {
			try {
				const [clientsData, dossiersData] = await Promise.all([
					apiFetch("/clients"),
					apiFetch("/dossiers"),
				]);

				setClients(Array.isArray(clientsData) ? clientsData : []);
				setDossiers(Array.isArray(dossiersData) ? dossiersData : []);

				const demandesData = await Promise.all(
					(Array.isArray(dossiersData) ? dossiersData : []).map(async (dossier) => {
						const data = await apiFetch(`/type-demandes/dossier/${dossier.id_dossier}`);
						return Array.isArray(data) ? data : [];
					}),
				);
				setDemandes(demandesData.flat());
			} catch (err) {
				setError(err.message || "Erreur de chargement.");
			} finally {
				setLoading(false);
			}
		};

		load();
	}, []);

	const demandesParStatut = useMemo(() => {
		const base = { "En attente": 0, "En traitement": 0, Approuve: 0, Refuse: 0 };
		for (const item of demandes) {
			const key = item.Statut || "En attente";
			base[key] = (base[key] || 0) + 1;
		}
		return base;
	}, [demandes]);

	return (
		<div className="app-shell">
			<div className="page-body">
				<SideBarUtilisateur />
				<main className="main-content" style={{ maxWidth: "1400px" }}>
					<div className="breadcrumb">
						Portail Utilisateur <span className="breadcrumb-sep">›</span>
						<span>Dashboard</span>
					</div>

					<div className="card" style={{ padding: "20px", marginBottom: "18px" }}>
						<h1 className="page-title" style={{ marginBottom: "4px" }}>Tableau de bord utilisateur</h1>
						<p className="page-subtitle" style={{ marginBottom: 0 }}>
							Vue rapide des clients, dossiers et demandes en cours.
						</p>
					</div>

					{error && (
						<div className="card" style={{ padding: "14px", color: "var(--danger)", marginBottom: "12px" }}>
							{error}
						</div>
					)}

					{loading ? (
						<div className="card" style={{ padding: "20px" }}>Chargement du dashboard...</div>
					) : (
						<>
							<div
								style={{
									display: "grid",
									gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
									gap: "14px",
									marginBottom: "14px",
								}}
							>
								<StatCard label="Clients" value={clients.length} color="#2d5a8e" />
								<StatCard label="Dossiers" value={dossiers.length} color="#7c3aed" />
								<StatCard label="Demandes" value={demandes.length} color="#0f766e" />
							</div>

							<div className="card" style={{ padding: "18px" }}>
								<h2 style={{ fontWeight: 700, marginBottom: "12px" }}>Demandes par statut</h2>
								<div
									style={{
										display: "grid",
										gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
										gap: "10px",
									}}
								>
									{Object.entries(demandesParStatut).map(([label, value]) => (
										<div key={label} style={{ border: "1px solid var(--border)", borderRadius: "10px", padding: "12px" }}>
											<div style={{ color: "var(--muted)", fontSize: "0.84rem" }}>{label}</div>
											<div style={{ fontSize: "1.4rem", fontWeight: 700 }}>{value}</div>
										</div>
									))}
								</div>
							</div>
						</>
					)}
				</main>
			</div>
		</div>
	);
}
