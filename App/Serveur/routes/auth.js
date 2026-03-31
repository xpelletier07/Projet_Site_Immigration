import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from "../db/db.js";

import {  createAccount, login } from '../controller/auth.js';
import { isValidEmail, normalizeType } from '../api/authentification/authUtils.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const ALLOWED_TYPES = new Set(["client", "utilisateur"]);

// Route pour créer un compte (client ou utilisateur)
router.post("/create/:type", async (req, res) => createAccount(req, res));

// Routes pour créer spécifiquement un client
router.post("/createClient", async (req, res) => createAccount(req, res, "client"));

// Route pour créer spécifiquement un utilisateur
router.post("/createUtilisateur", async (req, res) => createAccount(req, res, "admin"));

// Route pour se connecter
router.post("/login", async(req,res) => login(req, res));

/*
router.delete("/delete", async (req, res) => {
	const type = normalizeType(req.body.type);
	const id = req.body.id;
	const courriel = req.body.courriel;

	if (!ALLOWED_TYPES.has(type)) {
		return res.status(400).json({ message: "Type invalide. Utiliser client ou utilisateur." });
	}

	if (!id && !courriel) {
		return res.status(400).json({ message: "Fournir id ou courriel pour supprimer le compte." });
	}

	try {
		const idField = type === "client" ? "id_client" : "id_utilisateur";
		const query = db(type);

		if (id) {
			query.where({ [idField]: id });
		} else {
			query.where({ courriel });
		}

		const deletedCount = await query.del();

		if (!deletedCount) {
			return res.status(404).json({ message: "Compte introuvable." });
		}

		return res.status(200).json({ message: "Compte supprime avec succes." });
	} catch (error) {
		console.error("Erreur delete auth:", error);
		return res.status(500).json({ message: "Erreur interne du serveur." });
	}
});
*/

export default router;