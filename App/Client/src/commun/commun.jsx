export const API_URL = "http://localhost:3000";

export function getToken() {
	return localStorage.getItem("token");
}

export function getUserId() {
    return localStorage.getItem("userId");
}