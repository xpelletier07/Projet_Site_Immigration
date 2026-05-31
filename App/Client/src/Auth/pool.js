//Client

await fetch(`http://localhost:3000/auth/login`, {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify({
		courriel: "alice.tremblay@exemple.com",
		MDP: "MotDePasse123!",
	}),
})
	.then((res) => res.json())
	.then((data) => {
		sessionStorage.setItem("token", data.token);
		sessionStorage.setItem("userId", data.id);
		sessionStorage.setItem("type", data.type);
	})
	.catch((err) => console.error(err));

// Utilisateur
await fetch(`http://localhost:3000/auth/login`, {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify({
		courriel: "marc.bouchard@cabinet.com",
		MDP: "MotDePasse456!",
	}),
})
	.then((res) => res.json())
	.then((data) => {
		sessionStorage.setItem("token", data.token);
		sessionStorage.setItem("userId", data.id);
		sessionStorage.setItem("type", data.type);
	})
	.catch((err) => console.error(err));

// Create dossier
await fetch(`http://localhost:3000/dossiers/create`, {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		Authorization: "Bearer " + sessionStorage.getItem("token"),
	},
	body: JSON.stringify({
		id_client: sessionStorage.getItem("userId"),
	}),
})
	.then((res) => res.json())
	.then((data) => {
		console.log("Dossier créé:", data);
	})
	.catch((err) => console.error(err));
