import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../Auth/login.jsx";
import Inscription from "../Auth/Inscription.jsx"

import ClientDashboardRouter from "./Client.router.jsx";
import AdminDashboardRouter from "./Admin.router.jsx";
import UtilisateurRouter from "./Utilisateur.router.jsx";
import { isLoggedIn, getUserType } from "../commun/commun.jsx";
import HomePublic from "../commun/HomePublic/HomePublic.jsx";

function HomeRedirect() {
	if (!isLoggedIn()) return <HomePublic />;

	const type = getUserType();
	if (type === "client") return <Navigate to="/client/dashboard" replace />;
	if (type === "utilisateur") {
		return <Navigate to="/utilisateur/suivi" replace />;
	}
	if (type === "admin") {
		return <Navigate to="/admin/dashboardAdmin" replace />;
	}

	return <Navigate to="/login" replace />;
}


export default function GlobalRouter() {
	return (
		<Routes>
			<Route path="/" element={<HomeRedirect />} />
			<Route path="/home" element={<HomePublic />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<Inscription />} />
			<Route path="/client/*" element={<ClientDashboardRouter />} />
			<Route path="/utilisateur/*" element={<UtilisateurRouter />} />

			<Route path="/admin/*" element={<AdminDashboardRouter />} />

			<Route path="*" element={<div>Page not found</div>} />
		</Routes>
	);
}
