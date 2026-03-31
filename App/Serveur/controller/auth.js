import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db/db.js";
import { isValidEmail, normalizeType } from "../api/authentification/authUtils.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const ALLOWED_TYPES = new Set(["client", "utilisateur"]);



export const createAccount = async (req, res, forcedType) => {
	const type = normalizeType(forcedType || req.params.type);
	const { nom, prenom, courriel, telephone, MDP } = req.body || {};

	if (!ALLOWED_TYPES.has(type)) {
		return res.status(400).json({ message: "Type invalide. Utiliser client ou utilisateur." });
	}

	if (!nom || !prenom || !courriel || !telephone || !MDP) {
		return res.status(400).json({ message: "Tous les champs sont obligatoires." });
	}

	if (!isValidEmail(courriel)) {
		return res.status(400).json({ message: "Courriel invalide." });
	}

	try {
		const existing = await db(type).where({ courriel }).first();
		if (existing) {
			return res.status(409).json({ message: `Un ${type} existe deja avec ce courriel.` });
		}

		const hashedPassword = await bcrypt.hash(MDP, 10);
		const idColumn = type === "client" ? "id_client" : "id_utilisateur";

		const insertPayload = {
			nom: nom.trim(),
			prenom: prenom.trim(),
			courriel: courriel.trim(),
			telephone: telephone.trim(),
			MDP: hashedPassword,
		};

		const [newId] = await db(type).insert(insertPayload);

		return res.status(201).json({
			message: `${type} cree avec succes.`,
			[idColumn]: newId,
		});
	} catch (error) {
		console.error("Erreur create auth:", error);
		return res.status(500).json({ message: "Erreur interne du serveur." });
	}
}


