import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { isLoggedIn, getUserType } from "../commun/commun.jsx";
import SuiviUtilisateurPage from "../Utilisateur/pages/SuiviUtilisateur.jsx";
import DashboardUtilisateurPage from "../Utilisateur/pages/DashboardUtilisateur.jsx";
import ClientsUtilisateurPage from "../Utilisateur/pages/ClientsUtilisateur.jsx";

export default function UtilisateurRouter() {
	if (!isLoggedIn()) return <Navigate to="/login" replace />;

	const userType = getUserType();
	if (userType !== "utilisateur" && userType !== "admin") {
		return <Navigate to="/client/dashboard" replace />;
	}

	return (
		<Routes>
			<Route index element={<Navigate to="dashboard" replace />} />
			<Route path="dashboard" element={<DashboardUtilisateurPage />} />
			<Route path="suivi" element={<SuiviUtilisateurPage />} />
			<Route path="clients" element={<ClientsUtilisateurPage />} />
			<Route path="*" element={<Navigate to="dashboard" replace />} />
		</Routes>
	);
}
