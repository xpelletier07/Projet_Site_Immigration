import { apiFetch, getUserId, getToken, API_URL } from "../../commun/commun.jsx";

export { apiFetch, getUserId, getToken, API_URL };

export async function getClientBundle(selectedDossierId = null) {
	const idClient = getUserId();
	if (!idClient) throw new Error("Non authentifié");

	const dossiers = await apiFetch(`/dossiers/client/${idClient}`);

	if (!Array.isArray(dossiers) || dossiers.length === 0) {
		const client = await apiFetch(`/clients/${idClient}`);
		return { hasDossier: false, client, dossiers: [] };
	}

	// Utiliser le dossier sélectionné, sinon le premier
	const dossier =
		selectedDossierId
			? dossiers.find((d) => d.id_dossier === selectedDossierId) ?? dossiers[0]
			: dossiers[0];

	const [client, documents, demandes, factures] = await Promise.all([
		apiFetch(`/clients/${idClient}`),
		apiFetch(`/documents/dossier/${dossier.id_dossier}`),
		apiFetch(`/type-demandes/dossier/${dossier.id_dossier}`),
		apiFetch(`/factures/dossier/${dossier.id_dossier}`),
	]);

	return {
		hasDossier: true,
		client,
		dossier,
		dossiers, // tous les dossiers du client
		documents,
		demandes,
		factures,
	};
}

export async function updateClientProfile(id, data) {
	return apiFetch(`/clients/update/${id}`, {
		method: "PUT",
		body: JSON.stringify(data),
	});
}

export async function createDossier(id_client) {
	return apiFetch(`/dossiers/create`, {
		method: "POST",
		body: JSON.stringify({ id_client }),
	});
}

export async function deleteDossier(id_dossier) {
	return apiFetch(`/dossiers/delete/${id_dossier}`, { method: "DELETE" });
}

export async function uploadDocument(file, id_dossier) {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("id_dossier", id_dossier);

	const response = await fetch(`${API_URL}/documents`, {
		method: "POST",
		headers: { Authorization: `Bearer ${getToken()}` },
		body: formData,
	});

	if (!response.ok) throw new Error("Upload impossible");
	return response.json();
}

export async function deleteDocument(id_document) {
	return apiFetch(`/documents/delete/${id_document}`, { method: "DELETE" });
}

export async function downloadDocument(id_document) {
	const response = await fetch(
		`${API_URL}/documents/${id_document}/telecharger`,
		{
			headers: { Authorization: `Bearer ${getToken()}` },
		},
	);
	if (!response.ok) throw new Error("Téléchargement impossible");
	return response;
}

export async function createTypeDemande(id_dossier, Type_Demande) {
	return apiFetch(`/type-demandes`, {
		method: "POST",
		body: JSON.stringify({ id_dossier, Type_Demande }),
	});
}

export async function loginUser(courriel, MDP) {
	const response = await fetch(`${API_URL}/auth/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ courriel, MDP }),
	});

	if (!response.ok) {
		const data = await response.json().catch(() => ({}));
		throw new Error(data.message || "Identifiants invalides");
	}

	const data = await response.json();
	sessionStorage.setItem("token", data.token);
	sessionStorage.setItem("userId", data.id);
	sessionStorage.setItem("type", data.type);
	return data;
}

export async function registerClient(payload) {
	return apiFetch(`/auth/createClient`, {
		method: "POST",
		body: JSON.stringify(payload),
	});
}