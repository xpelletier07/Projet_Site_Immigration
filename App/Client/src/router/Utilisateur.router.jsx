import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { isLoggedIn, getUserType } from "../commun/commun.jsx";

import DashBordUtilisateur from "../Utilisateur/pages/DashboardUtilisateur.jsx";
import SuiviUtilisateurPage from "../Utilisateur/pages/SuiviUtilisateur.jsx";
import GestionDemandeUtilisateurPage from "../Utilisateur/pages/GestionDemandeUtilisateur.jsx";
import ClientsUtilisateurPage from "../Utilisateur/pages/ClientsUtilisateur.jsx";
import DetailsDossier from "../Utilisateur/pages/DetailsDossier.jsx";

export default function UtilisateurRouter() {
	if (!isLoggedIn()) return <Navigate to="/login" replace />;

	const userType = getUserType();
	if (userType !== "utilisateur" && userType !== "admin") {
		return <Navigate to="/client/dashboard" replace />;
	}

	return (
		<Routes>
			<Route index element={<Navigate to="dashboard" replace />} />
			<Route path="dashboard" element={<DashBordUtilisateur />} />
			<Route path="suivi" element={<SuiviUtilisateurPage />} />
			<Route path="suivi/:idDemande" element={<GestionDemandeUtilisateurPage />} />
			<Route path="clients" element={<ClientsUtilisateurPage />} />
			<Route path="dossier/:idDossier" element={<DetailsDossier />} />
			{/* <Route path="documents" element={<DocumentsUtilisateurPage />} /> */}
			<Route path="*" element={<Navigate to="dashboard" replace />} />
		</Routes>
	);
}
