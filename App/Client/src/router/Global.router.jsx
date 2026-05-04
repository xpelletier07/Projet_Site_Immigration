import React from "react";
import { Routes, Route } from "react-router-dom";

import ClientDashboardRouter from "./Client.router";

export default function GlobalRouter() {
	return (
		<Routes>

			<Route path="/client/*" element={<ClientDashboardRouter />} />

			<Route path="*" element={<div>Page not found</div>} />
		</Routes>
	);
}
