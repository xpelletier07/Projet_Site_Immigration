// controllers/utilisateurController.js
import { db } from "../db/db.js";

const SAFE_COLS = [
	"id_utilisateur",
	"nom",
	"prenom",
	"courriel",
	"telephone",
	"date_creation",
];

// GET /utilisateurs
export const getAllUtilisateurs = async (req, res) => {
	try {
		const users = await db("utilisateur").select(SAFE_COLS);
		res.json(users);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// GET /utilisateurs/:id
export const getUtilisateurById = async (req, res) => {
	try {
		const user = await db("utilisateur")
			.select(SAFE_COLS)
			.where({ id_utilisateur: req.params.id })
			.first();
		if (!user)
			return res.status(404).json({ error: "Utilisateur introuvable." });
		res.json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// PUT /utilisateurs/:id
export const updateUtilisateur = async (req, res) => {
	const { nom, prenom, courriel, telephone } = req.body;
	try {
		const updated = await db("utilisateur")
			.where({ id_utilisateur: req.params.id })
			.update({ nom, prenom, courriel, telephone });
		if (!updated)
			return res.status(404).json({ error: "Utilisateur introuvable." });
		res.json({ message: "Utilisateur mis à jour." });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// DELETE /utilisateurs/:id
export const deleteUtilisateur = async (req, res) => {
	try {
		const deleted = await db("utilisateur")
			.where({ id_utilisateur: req.params.id })
			.delete();
		if (!deleted)
			return res.status(404).json({ error: "Utilisateur introuvable." });
		res.json({ message: "Utilisateur supprimé." });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
