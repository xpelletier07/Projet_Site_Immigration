import React, { useEffect, useState, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { getClientBundle } from "../Client/services/client.service.jsx";
import { isLoggedIn } from "../commun/commun.jsx";

import DashboardClient from "../Client/pages/DashboardClient.jsx";
import DashboardClientEmpty from "../Client/pages/DashboardClientEmpty.jsx";
import Documents from "../Client/pages/Documents_Page.jsx";
import Files from "../Client/pages/Files_Page.jsx";
import MyCasePage from "../Client/pages/MyCaseClient.jsx";

export default function ClientDashboardRouter() {
	const [bundle, setBundle] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	// ID du dossier actuellement sélectionné (null = premier par défaut)
	const [selectedDossierId, setSelectedDossierId] = useState(null);

	const loadBundle = useCallback(
		async (dossierId = selectedDossierId) => {
			if (!isLoggedIn()) {
				setError(true);
				setLoading(false);
				return;
			}
			try {
				const b = await getClientBundle(dossierId);
				setBundle(b);
				// Synchroniser l'ID sélectionné avec le dossier réellement chargé
				if (b.hasDossier) setSelectedDossierId(b.dossier.id_dossier);
			} catch {
				setError(true);
			} finally {
				setLoading(false);
			}
		},
		[selectedDossierId],
	);

	useEffect(() => {
		loadBundle(null); // premier chargement → premier dossier
	}, []);

	// Appelé par DossierSelector quand l'utilisateur change de dossier
	async function handleSelectDossier(dossierId) {
		setSelectedDossierId(dossierId);
		setLoading(true);
		await loadBundle(dossierId);
	}

	// Appelé après création ou suppression d'un dossier
	async function handleRefresh(newDossierId = null) {
		setLoading(true);
		await loadBundle(newDossierId ?? selectedDossierId);
	}

	if (loading)
		return (
			<div className="loading-screen">
				<div className="spinner" />
			</div>
		);

	if (!isLoggedIn()) return <Navigate to="/login" replace />;

	if (error)
		return (
			<div className="p-10" style={{ color: "var(--danger)" }}>
				Impossible de charger votre dossier.
			</div>
		);

	if (!bundle?.hasDossier) return <DashboardClientEmpty />;

	// Props communes à toutes les pages
	const sharedProps = {
		bundle,
		onSelectDossier: handleSelectDossier,
		onRefresh: handleRefresh,
	};

	return (
		<Routes>
			<Route index element={<Navigate to="dashboard" replace />} />
			<Route path="dashboard" element={<DashboardClient {...sharedProps} />} />
			<Route path="documents" element={<Documents {...sharedProps} />} />
			<Route path="files" element={<Files {...sharedProps} />} />
			<Route path="my-case" element={<MyCasePage {...sharedProps} />} />
			<Route path="*" element={<Navigate to="dashboard" replace />} />
		</Routes>
	);
}