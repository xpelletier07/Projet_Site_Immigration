// Champs réels : description, montant, date_emission, date_echeance, statut, id_dossier
import { db } from "../db.js";

// GET /factures/dossier/:idDossier
export const getFacturesByDossier = async (req, res) => {
	try {
		const factures = await db("facture").where({
			id_dossier: req.params.idDossier,
		});
		res.json(factures);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// GET /factures/:id
export const getFactureById = async (req, res) => {
	try {
		const facture = await db("facture")
			.where({ id_facture: req.params.id })
			.first();
		if (!facture)
			return res.status(404).json({ error: "Facture introuvable." });
		res.json(facture);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// POST /factures
export const createFacture = async (req, res) => {
	const {
		id_dossier,
		description,
		montant,
		date_emission,
		date_echeance,
		statut,
	} = req.body;
	if (
		!id_dossier ||
		!description ||
		!montant ||
		!date_emission ||
		!date_echeance ||
		!statut
	)
		return res
			.status(400)
			.json({
				error: "Tous les champs sont requis : id_dossier, description, montant, date_emission, date_echeance, statut.",
			});

	try {
		const [id_facture] = await db("facture").insert({
			id_dossier,
			description,
			montant,
			date_emission,
			date_echeance,
			statut,
		});
		res.status(201).json({ id_facture });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// PUT /factures/:id
export const updateFacture = async (req, res) => {
	const { description, montant, date_emission, date_echeance, statut } =
		req.body;
	try {
		const updated = await db("facture")
			.where({ id_facture: req.params.id })
			.update({
				description,
				montant,
				date_emission,
				date_echeance,
				statut,
			});
		if (!updated)
			return res.status(404).json({ error: "Facture introuvable." });
		res.json({ message: "Facture mise à jour." });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// DELETE /factures/:id
export const deleteFacture = async (req, res) => {
	try {
		const deleted = await db("facture")
			.where({ id_facture: req.params.id })
			.delete();
		if (!deleted)
			return res.status(404).json({ error: "Facture introuvable." });
		res.json({ message: "Facture supprimée." });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

