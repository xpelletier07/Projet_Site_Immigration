import React, { useEffect, useMemo, useState } from "react";
import SideBarUtilisateur from "../components/SideBarUtilisateur.jsx";
import { apiFetch } from "../../commun/commun.jsx";

export default function ClientsUtilisateurPage() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [query, setQuery] = useState("");
	const [clients, setClients] = useState([]);

	useEffect(() => {
		apiFetch("/clients")
			.then((data) => setClients(Array.isArray(data) ? data : []))
			.catch((err) => setError(err.message || "Erreur de chargement."))
			.finally(() => setLoading(false));
	}, []);

	const filtered = useMemo(() => {
		if (!query.trim()) return clients;
		const q = query.toLowerCase();
		return clients.filter((c) => {
			const fullName = `${c.prenom || ""} ${c.nom || ""}`.toLowerCase();
			return fullName.includes(q) || (c.courriel || "").toLowerCase().includes(q);
		});
	}, [clients, query]);

	return (
		<div className="app-shell">
			<div className="page-body">
				<SideBarUtilisateur />
				<main className="main-content" style={{ maxWidth: "1400px" }}>
					<div className="breadcrumb">
						Portail Utilisateur <span className="breadcrumb-sep">›</span>
						<span>Clients</span>
					</div>

					<div className="card" style={{ padding: "20px", marginBottom: "14px" }}>
						<h1 className="page-title" style={{ marginBottom: "4px" }}>Gestion des clients</h1>
						<p className="page-subtitle" style={{ marginBottom: "14px" }}>
							Recherchez et consultez les informations des clients.
						</p>

						<input
							className="form-input"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Rechercher par nom ou courriel..."
							style={{ maxWidth: "420px" }}
						/>
					</div>

					{error && (
						<div className="card" style={{ padding: "14px", color: "var(--danger)", marginBottom: "12px" }}>
							{error}
						</div>
					)}

					{loading ? (
						<div className="card" style={{ padding: "20px" }}>Chargement des clients...</div>
					) : (
						<div className="card" style={{ overflowX: "auto" }}>
							<table className="table is-fullwidth is-hoverable" style={{ marginBottom: 0 }}>
								<thead>
									<tr>
										<th>ID</th>
										<th>Nom complet</th>
										<th>Courriel</th>
										<th>Telephone</th>
									</tr>
								</thead>
								<tbody>
									{filtered.map((c) => (
										<tr key={c.id_client}>
											<td>#{c.id_client}</td>
											<td>{`${c.prenom || ""} ${c.nom || ""}`.trim()}</td>
											<td>{c.courriel || "-"}</td>
											<td>{c.telephone || "-"}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</main>
			</div>
		</div>
	);
}
