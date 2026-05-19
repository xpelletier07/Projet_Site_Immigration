import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "../Auth/login.jsx";
import Inscription from "../Auth/Inscription.jsx"

import ClientDashboardRouter from "./Client.router.jsx";
import AdminDashboardRouter from "./Admin.router.jsx";


export default function GlobalRouter() {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<Inscription />} />
			<Route path="/client/*" element={<ClientDashboardRouter />} />

			<Route path="/admin/*" element={<AdminDashboardRouter />} />

			<Route path="*" element={<div>Page not found</div>} />
		</Routes>
	);
}
