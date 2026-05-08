import { apiFetch, getUserId, getToken, API_URL } from "../../commun/commun.jsx";

export async function getClientBundle() {
	const idClient = getUserId();
	if (!idClient) throw new Error("Non authentifié");

	const dossiers = await apiFetch(`/dossiers/client/${idClient}`);

	if (!Array.isArray(dossiers) || dossiers.length === 0) {
		const client = await apiFetch(`/clients/${idClient}`);
		return { hasDossier: false, client };
	}

	const dossier = dossiers[0];

	const [client, documents, demandes, factures] = await Promise.all([
		apiFetch(`/clients/${idClient}`),
		apiFetch(`/documents/dossier/${dossier.id_dossier}`),
		apiFetch(`/type-demandes/dossier/${dossier.id_dossier}`),
		apiFetch(`/factures/dossier/${dossier.id_dossier}`),
	]);

	return { hasDossier: true, client, dossier, documents, demandes, factures };
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

export async function uploadDocument(file, id_dossier) {
	const formData = new FormData();
	formData.append("fichier", file);
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

// Recupère tous les dossierActifs
export async function getAllDossiersActifs(token) {
	const res = await fetch(`${API_URL}/dossiers`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			 Authorization: `Bearer ${token}`
		}
	})
	if (!res.ok) {
		const data = await res.json().catch(() => ({}));
		throw new Error(data.message || "Identifiants invalides");
	}

	const data = await res.json();

	const dossiersAvecDetails = await Promise.all(
		data.map(async (d) => {
			const dossier = await apiFetch(`/dossiers/${d.id_dossier}`, {method: "GET",
		headers: {
			"Content-Type": "application/json",
			 Authorization: `Bearer ${token}`
		}}
	);

			return {
				...d,
				details: dossier
			};
		})
	);

	const listactif = dossiersAvecDetails.filter(
		(d) => d.details?.factures?.[0]?.statut === "en attente"
	);

	const moy = listactif.length / data.length

	return moy;
}

export async function getClientDossier(token) {
  const res = await fetch(`${API_URL}/clients`, {method: "GET",
		headers: {
			"Content-Type": "application/json",
			 Authorization: `Bearer ${token}`
		}});

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));

    throw new Error(
      data.message || "Identifiants invalides"
    );
  }

  const data = await res.json();

  const resultats = await Promise.all(
    data.map(async (e) => {
      const dossier = await apiFetch(
        `/dossiers/client/${e.id_client}`
      );

      return {
        client: e,
        dossier,
      };
    })
  );

  const clientsSansDossier = resultats.filter(
    (r) =>
      !r.dossier ||
      r.dossier.length === 0
  );

  const clientsAvecDossier = resultats.filter(
    (r) =>
      r.dossier || r.dossier.length !== 0
  );
  
  const contenu = {a: clientsSansDossier.length, b: clientsAvecDossier.length, c : resultats.length}
  return contenu;
}