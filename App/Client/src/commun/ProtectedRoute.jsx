import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn, getUserType } from "../common/api.js";

export function RequireAuth({ children }) {
	if (!isLoggedIn()) return <Navigate to="/login" replace />;
	return children;
}

export function RequireClient({ children }) {
	if (!isLoggedIn()) return <Navigate to="/login" replace />;
	if (getUserType() !== "client") return <Navigate to="/login" replace />;
	return children;
}

export function RequireEmployee({ children }) {
	if (!isLoggedIn()) return <Navigate to="/login" replace />;
	if (getUserType() !== "utilisateur" && getUserType() !== "admin") {
		return <Navigate to="/client/dashboard" replace />;
	}
	return children;
}
