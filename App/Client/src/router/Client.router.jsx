import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { getClientBundle } from "../Client/services/client.service.jsx";

import DashboardClient from "../Client/pages/DashboardClient.jsx";
import DashboardClientEmpty from "../Client/pages/DashboardClientEmpty.jsx";
import Documents from "../Client/pages/Documents_Page.jsx";
import Files from "../Client/pages/Files_Page.jsx";
import MyCasePage from "../Client/pages/MyCaseClient.jsx";

export default function ClientDashboardRouter() {
	const [bundle, setBundle] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		getClientBundle()
			.then(setBundle)
			.catch(() => setError(true))
			.finally(() => setLoading(false));
	}, []);

	if (loading)
		return (
			<div className="p-10 text-xl">
				Chargement sécurisé du portail...
			</div>
		);
	if (error)
		return (
			<div className="p-10 text-red-600">
				Impossible de charger votre dossier.
			</div>
		);

	return bundle.hasDossier ? (
		<Routes>
			{/* /client/ → /client/dashboard */}
			<Route index element={<Navigate to="dashboard" replace />} />

			<Route
				path="dashboard"
				element={<DashboardClient bundle={bundle} />}
			/>
			<Route path="documents" element={<Documents bundle={bundle} />} />
			<Route path="files" element={<Files bundle={bundle} />} />
			<Route path="my-case" element={<MyCasePage bundle={bundle} />} />

			{/* 404 dans l'espace client */}
			{/*<Route path="*" element={<Navigate to="dashboard" replace />} />*/}
		</Routes>
	) : (
		<DashboardClientEmpty />
	);
}
