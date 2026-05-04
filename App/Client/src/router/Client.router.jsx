import React, { useEffect, useState } from "react";
import { getClientBundle } from "../Client/services/client.service.jsx";
import DashboardClient from "../Client/pages/DashboardClient.jsx";
import DashboardClientEmpty from "../Client/pages/DashboardClientEmpty.jsx";

export default function ClientDashboardRouter() {
	const [bundle, setBundle] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		getClientBundle()
			.then(setBundle)
			.catch(() => setError(true))
			.finally(() => setLoading(false));
	}, []);

	if (loading)
		return (
			<div className="p-10 text-xl">
				Chargement sécurisé du portail...
			</div>
		);
	if (error)
		return (
			<div className="p-10 text-red-600">
				Impossible de charger votre dossier.
			</div>
		);

	return bundle.hasDossier ? (
		<DashboardClient bundle={bundle} />
	) : (
		<DashboardClientEmpty />
	);
}
