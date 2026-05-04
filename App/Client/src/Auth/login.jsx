import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../Client/services/client.service.jsx";

export default function LoginPage() {
	const navigate = useNavigate();
	const [form, setForm] = useState({ courriel: "", MDP: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const data = await loginUser(form.courriel, form.MDP);
			if (data.type === "client") navigate("/client/dashboard");
			else navigate("/management");
		} catch (err) {
			setError(err.message || "Identifiants invalides.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div
			style={{
				minHeight: "100vh",
				background: "var(--navy)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "20px",
			}}
		>
			<div style={{ width: "100%", maxWidth: "420px" }}>
				{/* Logo */}
				<div style={{ textAlign: "center", marginBottom: "32px" }}>
					<div
						style={{
							width: "56px",
							height: "56px",
							background: "var(--blue)",
							borderRadius: "16px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: "1.8rem",
							margin: "0 auto 16px",
						}}
					>
						🏛️
					</div>
					<h1
						style={{
							fontFamily: "'DM Serif Display', serif",
							color: "white",
							fontSize: "1.6rem",
							marginBottom: "4px",
						}}
					>
						ImmiPortail
					</h1>
					<p
						style={{
							color: "rgba(255,255,255,0.5)",
							fontSize: "0.85rem",
						}}
					>
						Immigration &amp; Citoyenneté
					</p>
				</div>

				{/* Card */}
				<div className="card" style={{ padding: "32px" }}>
					<h2
						style={{
							fontWeight: 700,
							marginBottom: "4px",
							fontSize: "1.1rem",
						}}
					>
						Connexion
					</h2>
					<p
						style={{
							color: "var(--muted)",
							fontSize: "0.85rem",
							marginBottom: "24px",
						}}
					>
						Accédez à votre espace sécurisé
					</p>

					{error && (
						<div
							style={{
								background: "var(--danger-bg)",
								color: "var(--danger)",
								padding: "10px 14px",
								borderRadius: "8px",
								fontSize: "0.85rem",
								marginBottom: "16px",
							}}
						>
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label className="form-label">Courriel</label>
							<input
								className="form-input"
								type="email"
								placeholder="votre@courriel.com"
								value={form.courriel}
								onChange={(e) =>
									setForm((f) => ({
										...f,
										courriel: e.target.value,
									}))
								}
								required
							/>
						</div>

						<div className="form-group">
							<label className="form-label">Mot de passe</label>
							<input
								className="form-input"
								type="password"
								placeholder="••••••••"
								value={form.MDP}
								onChange={(e) =>
									setForm((f) => ({
										...f,
										MDP: e.target.value,
									}))
								}
								required
							/>
						</div>

						<button
							type="submit"
							className="btn btn-primary w-full"
							disabled={loading}
							style={{
								justifyContent: "center",
								marginTop: "8px",
								padding: "12px",
							}}
						>
							{loading ? "Connexion..." : "Se connecter"}
						</button>
					</form>

					<p
						style={{
							textAlign: "center",
							marginTop: "20px",
							fontSize: "0.85rem",
							color: "var(--muted)",
						}}
					>
						Pas encore de compte ?{" "}
						<Link
							to="/register"
							style={{
								color: "var(--blue)",
								fontWeight: 600,
								textDecoration: "none",
							}}
						>
							S'inscrire
						</Link>
					</p>
				</div>

				<p
					style={{
						color: "rgba(255,255,255,0.3)",
						fontSize: "0.75rem",
						textAlign: "center",
						marginTop: "20px",
					}}
				>
					© 2026 ImmiPortail. Le service gouvernementale d'immigration du Gouvernement du Québec.
				</p>

				<div
					className="demo-accounts"
					style={{ color: "white", textAlign: "center" }}
				>
					<br />
					<h3>Comptes de Test</h3>
					<hr />
					<li>
						<ul>
							<div className="account">
								<p>
									<strong>Client:</strong>
								</p>
								<p>Email: alice.tremblay@exemple.com</p>
								<p>Mot de passe: MotDePasse123!</p>
							</div>
						</ul>
						<hr />
						<ul>
							<div className="account">
								<p>
									<strong>Utilisateur (Employé):</strong>
								</p>
								<p>Email: marc.bouchard@cabinet.com</p>
								<p>Mot de passe: MotDePasse456!</p>
							</div>
						</ul>
						<hr />
						<ul>
							<div className="account">
								<p>
									<strong>Admin:</strong>
								</p>
								<p>Email: admin@cmaisonneuve.qc.ca</p>
								<p>Mot de passe: password</p>
							</div>
						</ul>
					</li>
				</div>
			</div>
		</div>
	);
}
