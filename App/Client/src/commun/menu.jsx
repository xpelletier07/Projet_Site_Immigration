import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isLoggedIn, logout, getUserType } from "../commun/commun.jsx";

export default function Menu() {
	const navigate = useNavigate();
	const type = getUserType();
	const loggedIn = isLoggedIn();

	function handleLogout() {
		logout();
		navigate("/login");
	}

	const links = [];

	if (!loggedIn) {
		links.push(
			{ to: "/", label: "Accueil" },
			{ to: "/login", label: "Connexion" },
			{ to: "/register", label: "Inscription" },
		);
	} else if (type === "client") {
		links.push(
			{ to: "/client/dashboard", label: "Tableau de bord" },
			{ to: "/client/my-case", label: "Mon dossier" },
			{ to: "/client/files", label: "Mes demandes" },
			{ to: "/client/documents", label: "Documents" },
		);
	} else if (type === "utilisateur") {
		links.push(
			{ to: "/utilisateur/dashboard", label: "Dashboard" },
			{ to: "/utilisateur/suivi", label: "Suivi des demandes" },
			{ to: "/utilisateur/clients", label: "Clients" },
		);
	} else if (type === "admin") {
		links.push(
			{ to: "/admin/dashboardAdmin", label: "Dashboard Admin" },
			{ to: "/utilisateur/dashboard", label: "Dashboard Utilisateur" },
			{ to: "/utilisateur/suivi", label: "Suivi des demandes" },
			{ to: "/utilisateur/clients", label: "Clients" },
		);
	}

	return (
		<header className="top-nav">
			<span className="brand">ImmiPortail</span>

			<nav>
				{links.map((link) => (
					<NavLink
						key={link.to}
						to={link.to}
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						{link.label}
					</NavLink>
				))}
			</nav>

			<div className="nav-right">
				{loggedIn ? (
					<>
						<div className="nav-avatar">
							{type === "client"
								? "C"
								: type === "admin"
									? "A"
									: "U"}
						</div>
						<button className="sign-out-btn" onClick={handleLogout}>
							Se déconnecter
						</button>
					</>
				) : (
					<NavLink
						to="/login"
						className="sign-out-btn"
						style={{ color: "white", textDecoration: "none" }}
					>
						Se connecter
					</NavLink>
				)}
			</div>
		</header>
	);
}
