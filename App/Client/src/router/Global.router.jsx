import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "../Auth/login.jsx";

import ClientDashboardRouter from "./Client.router";

export default function GlobalRouter() {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<div>Register page (not implemented)</div>} />
			<Route path="/client/*" element={<ClientDashboardRouter />} />

			<Route path="*" element={<div>Page not found</div>} />
		</Routes>
	);
}
