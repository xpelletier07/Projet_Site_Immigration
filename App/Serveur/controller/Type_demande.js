import { db } from "../db/db.js";

// GET /type-demandes/dossier/:idDossier
export const getTypeDemandesByDossier = async (req, res) => {
	try {
		const types = await db("type_demande as td")
			.leftJoin("utilisateur as u", "td.id_utilisateur", "u.id_utilisateur")
			.select(
				"td.*",
				"u.nom as utilisateur_nom",
				"u.prenom as utilisateur_prenom",
			)
			.where({
				"td.id_dossier": req.params.idDossier,
			});
		res.json(types);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// GET /type-demandes/:id
export const getTypeDemandeById = async (req, res) => {
	try {
		const type = await db("type_demande")
			.where({ id_demande: req.params.id })
			.first();
		if (!type)
			return res
				.status(404)
				.json({ error: "Type de demande introuvable." });
		res.json(type);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// POST /type-demandes
export const createTypeDemande = async (req, res) => {
	const { id_dossier, Type_Demande, id_utilisateur } = req.body;
	if (!id_dossier || !Type_Demande)
		return res
			.status(400)
			.json({ error: "id_dossier et Type_Demande sont requis." });

	try {
		const [id_demande] = await db("type_demande").insert({
			id_dossier,
			Type_Demande,
			Description: req.body.Description || "",
			Statut: req.body.Statut || "En attente",
			id_utilisateur: id_utilisateur || null,
		});
		res.status(201).json({ id_demande });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// PUT /type-demandes/:id
export const updateTypeDemande = async (req, res) => {
	const { Type_Demande, Description, Statut, id_utilisateur } = req.body;
	try {
		const payload = { Type_Demande, Description, Statut };
		if (Object.prototype.hasOwnProperty.call(req.body, "id_utilisateur")) {
			payload.id_utilisateur = id_utilisateur || null;
		}

		const updated = await db("type_demande")
			.where({ id_demande: req.params.id })
			.update(payload);
		if (!updated)
			return res
				.status(404)
				.json({ error: "Type de demande introuvable." });
		res.json({ message: "Type de demande mis à jour." });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// DELETE /type-demandes/:id
export const deleteTypeDemande = async (req, res) => {
	try {
		const deleted = await db("type_demande")
			.where({ id_demande: req.params.id })
			.delete();
		if (!deleted)
			return res
				.status(404)
				.json({ error: "Type de demande introuvable." });
		res.json({ message: "Type de demande supprimé." });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
