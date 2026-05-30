import { React, useState, useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isLoggedIn, logout, getUserType } from "../commun/commun.jsx";

export default function Menu() {
	const navigate = useNavigate();
	const [type, setType] = useState(getUserType());
	const [loggedIn, setLoggedIn] = useState(isLoggedIn());

	useEffect(() => {
		function syncAuth() {
			setType(getUserType());
			setLoggedIn(isLoggedIn());
		}
		window.addEventListener("storage", syncAuth);
		const interval = setInterval(syncAuth, 300);
		return () => {
			window.removeEventListener("storage", syncAuth);
			clearInterval(interval);
		};
	}, []);

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
			{ to: "/client/documents", label: "Documents" },
			{ to: "/client/files", label: "Mes demandes" },
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
			{ to: "/admin/utilisateurs", label: "Gérer les Utilisateurs" },
			{ to: "/utilisateur/clients", label: "Gérer les Clients" },
			{ to: "/utilisateur/suivi", label: "Suivi des demandes" },
			{ to: "/utilisateur/dashboard", label: "Aperçu Utilisateur" },
			
		);
	}

	return (
		<header className="top-nav">
			<NavLink to="/" className="brand-btn">
				<span className="brand">ImmiPortail</span>
			</NavLink>

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
