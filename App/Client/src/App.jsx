import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "./common/Toast.jsx";
import { RequireClient } from "./components/ProtectedRoute.jsx";

import LoginPage from "./Auth/login.jsx";
//import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardClient from "./Client/pages/DashboardClient.jsx";
import MyCasePage from "./Client/pages/MyCaseClient.jsx";
import DocumentsPage from "./Client/pages/DocumentsPage.jsx";
import FilesPage from "./Client/pages/FilesPage.jsx";

import "./assets/global.css";

export default function App() {
	return (
		<BrowserRouter>
			<ToastProvider>
				<Routes>
					{/* Public */}
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />

					{/* Client protected */}
					<Route
						path="/client/dashboard"
						element={
							<RequireClient>
								<DashboardClient />
							</RequireClient>
						}
					/>
					<Route
						path="/client/my-case"
						element={
							<RequireClient>
								<MyCasePage />
							</RequireClient>
						}
					/>
					<Route
						path="/client/documents"
						element={
							<RequireClient>
								<DocumentsPage />
							</RequireClient>
						}
					/>
					<Route
						path="/client/files"
						element={
							<RequireClient>
								<FilesPage />
							</RequireClient>
						}
					/>

					{/* Fallback */}
					<Route
						path="/"
						element={<Navigate to="/login" replace />}
					/>
					<Route
						path="*"
						element={<Navigate to="/login" replace />}
					/>
				</Routes>
			</ToastProvider>
		</BrowserRouter>
	);
}
