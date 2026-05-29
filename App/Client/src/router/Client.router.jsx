import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { isLoggedIn } from "../commun/commun.jsx";

import DashboardClient from "../Client/pages/DashboardClient.jsx";
import Documents from "../Client/pages/Documents_Page.jsx";
import Files from "../Client/pages/Files_Page.jsx";
import MyCasePage from "../Client/pages/MyCaseClient.jsx";

export default function ClientDashboardRouter() {
	if (!isLoggedIn()) return <Navigate to="/login" replace />;

	return (
		<Routes>
			<Route index element={<Navigate to="dashboard" replace />} />
			<Route path="dashboard" element={<DashboardClient />} />
			<Route path="documents" element={<Documents />} />
			<Route path="files" element={<Files />} />
			<Route path="my-case" element={<MyCasePage />} />
			<Route path="*" element={<Navigate to="dashboard" replace />} />
		</Routes>
	);
}