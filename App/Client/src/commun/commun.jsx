export const API_URL = "http://localhost:3000";

export function getToken() {
	return sessionStorage.getItem("token");
}

export function getUserId() {
	return sessionStorage.getItem("userId");
}

export function getUserType() {
	return sessionStorage.getItem("type");
}

export function isClient() {
	return getUserType() === "client";
}

export function isUtilisateur() {
	return getUserType() === "utilisateur";
}

export function isLoggedIn() {
	return !!getToken();
}

export function logout() {
	sessionStorage.removeItem("token");
	sessionStorage.removeItem("userId");
	sessionStorage.removeItem("type");
}

export async function apiFetch(path, options = {}) {
	const token = getToken();
	const response = await fetch(`${API_URL}${path}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...(options.headers || {}),
		},
	});

	if (!response.ok) {
		const text = await response.text();
		throw new Error(text || `HTTP ${response.status}`);
	}

	const contentType = response.headers.get("content-type");
	if (contentType && contentType.includes("application/json")) {
		return response.json();
	}
	return response.text();
}
