import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, getUserType } from "../commun/commun.jsx";

export default function Menu() {
	const navigate = useNavigate();
	const type = getUserType();

	function handleLogout() {
		logout();
		navigate("/login");
	}

	return (
		<header className="top-nav">
			<span className="brand">ImmiPortail</span>

			<nav>
				<NavLink
					to="/client/dashboard"
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					Home
				</NavLink>
				<NavLink
					to="/client/dashboard"
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					Dashboard
				</NavLink>
				<NavLink
					to="/client/mycase"
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					My Case
				</NavLink>
				{type === "utilisateur" && (
					<NavLink
						to="/management"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						Management
					</NavLink>
				)}
			</nav>

			<div className="nav-right">
				<button className="nav-icon-btn" title="Recherche">
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<circle cx="11" cy="11" r="8" />
						<line x1="21" y1="21" x2="16.65" y2="16.65" />
					</svg>
				</button>
				<div className="nav-avatar">
					{getUserType() === "client" ? "C" : "U"}
				</div>
				<button className="sign-out-btn" onClick={handleLogout}>
					Sign Out
				</button>
			</div>
		</header>
	);
}
