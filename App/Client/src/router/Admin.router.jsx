import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { isLoggedIn } from "../commun/commun.jsx";

import DashboardAdmin from "../Admin/pages/DashboardAdmin.jsx";


export default function AdminDashboardRouter() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (!isLoggedIn()) {
			setError(true);
		}
		setLoading(false);
	}, []);

	if (loading)
		return (
			<div className="p-10 text-xl">
				Chargement sécurisé du portail...
			</div>
		);

	if (!isLoggedIn()) return <Navigate to="/login" replace />;

	if (error)
		return (
			<div className="p-10 text-red-600">
				Impossible de cette page avec le compte connecté.
			</div>
		);

	return (
		<Routes>
			<Route index element={<Navigate to="dashboardAdmin" replace />} />

			<Route
				path="dashboardAdmin"
				element={<DashboardAdmin />}
			/>
			{/* Route additionnelle */}
                {/*<Route path="documents" element={<Documents bundle={bundle} />} />*/}
                {/*<Route path="files" element={<Files bundle={bundle} />} />*/}
                {/*<Route path="my-case" element={<MyCasePage bundle={bundle} />} />*/}

			{/* 404 dans l'espace admin */}
			<Route path="*" element={<Navigate to="dashboardAdmin" replace />} />
		</Routes>
	);
}
