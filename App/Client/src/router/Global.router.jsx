import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "../Auth/login.jsx";
import Inscription from "../Auth/Inscription.jsx"
import Dashboard from "../Dashboard.jsx";

import ClientDashboardRouter from "./Client.router";

export default function GlobalRouter() {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<Inscription />} />
			<Route path="/client/*" element={<ClientDashboardRouter />} />
			<Route path="/dashboard" element={<Dashboard />} /> 

			<Route path="*" element={<div>Page not found</div>} />
		</Routes>
	);
}
