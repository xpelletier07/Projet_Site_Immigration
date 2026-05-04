import React from "react";
import { Routes, Route } from "react-router-dom";

import DashboardClient from "./DashboardClient.jsx";
import Messages from "./pages/Messages.jsx";
import Files from "./pages/Files.jsx";

export default function ClientDashboardRouter() {
	return (
		<Routes>
			<Route path="/client/dashboard" element={<DashboardClient />} />
			<Route path="/client/messages" element={<Messages />} />
			<Route path="/client/files" element={<Files />} />
		</Routes>
	);
}