import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NewDemandeModal from "./NewDemandeModal.jsx";

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

const FilesIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
	>
		<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
	</svg>
);

const DocsIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
	>
		<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
		<polyline points="14,2 14,8 20,8" />
		<line x1="16" y1="13" x2="8" y2="13" />
		<line x1="16" y1="17" x2="8" y2="17" />
	</svg>
);

const CaseIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
	>
		<path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
		<path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
	</svg>
);

const SettingsIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
	>
		<circle cx="12" cy="12" r="3" />
		<path d="M19.07 4.93a10 10 0 0 0-14.14 0M4.93 19.07a10 10 0 0 0 14.14 0" />
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

const PlusIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.5"
	>
		<line x1="12" y1="5" x2="12" y2="19" />
		<line x1="5" y1="12" x2="19" y2="12" />
	</svg>
);

export default function Sidebar({ onNewCase }) {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [showNewDemande, setShowNewDemande] = useState(false);

	const links = [
		{ path: "/client/dashboard", label: "Dashboard", Icon: DashIcon },
		{ path: "/client/my-case", label: "Mon Dossier", Icon: CaseIcon },
		{ path: "/client/documents", label: "Documents", Icon: DocsIcon },
		{ path: "/client/files", label: "Fichiers", Icon: FilesIcon },
	];

	function handleLogout() {
		sessionStorage.clear();
		navigate("/login");
	}

	return (
		<>
			<aside className="sidebar">
				<div className="sidebar-brand">
					<div className="sidebar-logo">🏛️</div>
					<div>
						<div className="sidebar-brand-title">
							Official Portal
						</div>
						<div className="sidebar-brand-text">
							IMMIGRATION SERVICES
						</div>
					</div>
				</div>

				<div className="sidebar-label">Portal</div>

				{links.map(({ path, label, Icon }) => (
					<button
						key={path}
						className={`sidebar-link${pathname === path ? " active" : ""}`}
						onClick={() => navigate(path)}
					>
						<Icon /> {label}
					</button>
				))}

				<button
					className="sidebar-new-case mt-4"
					onClick={() => setShowNewDemande(true)}
				>
					<PlusIcon /> Nouvelle demande
				</button>

				<div className="sidebar-bottom">
					<button
						className="sidebar-link"
						onClick={() => navigate("/client/settings")}
					>
						<SettingsIcon /> Paramètres
					</button>
					<button
						className="sidebar-link"
						style={{ color: "#f87171" }}
						onClick={handleLogout}
					>
						<LogoutIcon /> Se déconnecter
					</button>
				</div>
			</aside>
			{showNewDemande && (
				<NewDemandeModal
					onClose={() => setShowNewDemande(false)}
					onCreated={() => {
						setShowNewDemande(false);
					}}
				/>
			)}
		</>
	);
}
