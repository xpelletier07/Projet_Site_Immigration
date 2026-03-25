const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../db/db.js");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const ALLOWED_TYPES = new Set(["client", "utilisateur"]);

function normalizeType(value) {
	if (!value) return null;
	return String(value).trim().toLowerCase();
}

function isValidEmail(courriel) {
	return typeof courriel === "string" && /.+@.+\..+/.test(courriel);
}

async function createAccount(req, res, forcedType) {
	const type = normalizeType(forcedType || req.params.type);
	const { nom, prenom, courriel, telephone, MDP } = req.body;

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
			nom,
			prenom,
			courriel,
			telephone: parseInt(telephone, 10),
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

router.post("/create/:type", async (req, res) => createAccount(req, res));
router.post("/createClient", async (req, res) => createAccount(req, res, "client"));
router.post("/createUtilisateur", async (req, res) => createAccount(req, res, "utilisateur"));

router.post("/login", async (req, res) => {
	const { courriel, MDP } = req.body;
	const requestedType = normalizeType(req.body.type);

	if (!courriel || !MDP) {
		return res.status(400).json({ message: "Courriel et mot de passe sont obligatoires." });
	}

	if (!isValidEmail(courriel)) {
		return res.status(400).json({ message: "Courriel invalide." });
	}

	const lookupTypes = requestedType && ALLOWED_TYPES.has(requestedType)
		? [requestedType]
		: ["utilisateur", "client"];

	try {
		for (const type of lookupTypes) {
			const account = await db(type).where({ courriel }).first();
			if (!account) continue;

			const isPasswordValid = await bcrypt.compare(MDP, account.MDP);
			if (!isPasswordValid) {
				return res.status(401).json({ message: "Identifiants invalides." });
			}

			const idField = type === "client" ? "id_client" : "id_utilisateur";
			const token = jwt.sign(
				{ id: account[idField], type, courriel: account.courriel },
				JWT_SECRET,
				{ expiresIn: "24h" }
			);

			return res.status(200).json({
				message: "Connexion reussie.",
				token,
				type,
				id: account[idField],
			});
		}

		return res.status(401).json({ message: "Identifiants invalides." });
	} catch (error) {
		console.error("Erreur login auth:", error);
		return res.status(500).json({ message: "Erreur interne du serveur." });
	}
});

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

module.exports = router;
