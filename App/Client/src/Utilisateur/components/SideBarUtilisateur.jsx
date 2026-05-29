import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserType, logout } from "../../commun/commun.jsx";

const DashIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
	>
		<rect x="3" y="3" width="7" height="7" />
		<rect x="14" y="3" width="7" height="7" />
		<rect x="14" y="14" width="7" height="7" />
		<rect x="3" y="14" width="7" height="7" />
	</svg>
);

const FollowIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
	>
		<path d="M9 11l3 3L22 4" />
		<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
	</svg>
);

const ClientsIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
	>
		<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
		<circle cx="9" cy="7" r="4" />
		<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
		<path d="M16 3.13a4 4 0 0 1 0 7.75" />
	</svg>
);

const LogoutIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
	>
		<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
		<polyline points="16,17 21,12 16,7" />
		<line x1="21" y1="12" x2="9" y2="12" />
	</svg>
);

const AdminIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
	>
		<rect x="3" y="3" width="7" height="7" />
		<rect x="14" y="3" width="7" height="7" />
		<rect x="14" y="14" width="7" height="7" />
		<rect x="3" y="14" width="7" height="7" />
	</svg>
);

export default function SideBarUtilisateur() {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const userType = getUserType();

	const links = [
		{ path: "/utilisateur/dashboard", label: "Dashboard", Icon: DashIcon },
		{ path: "/utilisateur/suivi", label: "Suivi des demandes", Icon: FollowIcon },
		{ path: "/utilisateur/clients", label: "Clients", Icon: ClientsIcon },
	];

	if (userType === "admin") {
		links.push({
			path: "/admin/dashboardAdmin",
			label: "Dashboard Admin",
			Icon: AdminIcon,
		});
	}

	function handleLogout() {
		logout();
		navigate("/login");
	}

	return (
		<aside className="sidebar">
			<div className="sidebar-brand">
				<div className="sidebar-logo">👤</div>
				<div>
					<div className="sidebar-brand-title">Portail Employe</div>
					<div className="sidebar-brand-text">SUIVI DES DOSSIERS</div>
				</div>
			</div>

			<div className="sidebar-label">Utilisateur</div>

			{links.map(({ path, label, Icon }) => (
				<button
					key={path}
					className={`sidebar-link${pathname === path ? " active" : ""}`}
					onClick={() => navigate(path)}
				>
					<Icon /> {label}
				</button>
			))}

			<div className="sidebar-bottom" style={{ marginTop: "auto" }}>
				<button
					className="sidebar-link"
					style={{ color: "#f87171" }}
					onClick={handleLogout}
				>
					<LogoutIcon /> Logout
				</button>
			</div>
		</aside>
	);
}
