import React from "react";
import { Link } from "react-router-dom";

export default function HomePublic() {
	return (
		<div className="app-shell">
			<main className="main-content" style={{ margin: "0 auto", width: "100%", maxWidth: "1200px" }}>
				<section className="card" style={{ padding: "28px", marginTop: "20px" }}>
					<p className="breadcrumb" style={{ marginBottom: "12px" }}>
						Portail public <span className="breadcrumb-sep">›</span>
						<span>Accueil</span>
					</p>
					<h1 className="page-title" style={{ marginBottom: "8px" }}>
						Bienvenue sur ImmiPortail
					</h1>
					<p className="page-subtitle" style={{ maxWidth: "760px", marginBottom: "18px" }}>
						Ce portail vous permet de suivre votre dossier d'immigration, gerer vos
						documents et communiquer avec les services concernes.
					</p>
					<div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
						<Link to="/login" className="btn btn-primary">Se connecter</Link>
						<Link to="/register" className="btn btn-outline">Creer un compte</Link>
					</div>
				</section>

				<section
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
						gap: "14px",
						marginTop: "14px",
					}}
				>
					<div className="card" style={{ padding: "16px" }}>
						<h3 style={{ fontWeight: 700, marginBottom: "6px" }}>Suivi des demandes</h3>
						<p style={{ color: "var(--muted)", fontSize: "0.92rem" }}>
							Consultez l'etat de vos demandes en temps reel.
						</p>
					</div>
					<div className="card" style={{ padding: "16px" }}>
						<h3 style={{ fontWeight: 700, marginBottom: "6px" }}>Gestion de documents</h3>
						<p style={{ color: "var(--muted)", fontSize: "0.92rem" }}>
							Televersez, mettez a jour et telechargez vos documents officiels.
						</p>
					</div>
					<div className="card" style={{ padding: "16px" }}>
						<h3 style={{ fontWeight: 700, marginBottom: "6px" }}>Espace securise</h3>
						<p style={{ color: "var(--muted)", fontSize: "0.92rem" }}>
							Acces reserve selon votre role: client, utilisateur ou admin.
						</p>
					</div>
				</section>
			</main>
		</div>
	);
}
