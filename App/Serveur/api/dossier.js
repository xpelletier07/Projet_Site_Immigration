const { db } = require("../db.js");

// GET /dossiers
const getAllDossiers = async (req, res) => {
	try {
		const dossiers = await db("dossier")
			.join("client", "dossier.id_client", "client.id_client")
			.select(
				"dossier.id_dossier",
				"dossier.id_client",
				"client.nom",
				"client.prenom",
			);
		res.json(dossiers);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// GET /dossiers/:id — dossier complet avec toutes ses relations
const getDossierById = async (req, res) => {
	const id = req.params.id;
	try {
		const dossier = await db("dossier").where({ id_dossier: id }).first();
		if (!dossier)
			return res.status(404).json({ error: "Dossier introuvable." });

		const [notes, factures, documents, typeDemandes] = await Promise.all([
			db("note").where({ id_dossier: id }),
			db("facture").where({ id_dossier: id }),
			db("documents")
				.select(
					"id_document",
					"nom_document",
					"type_document",
					"id_dossier",
				)
				.where({ id_dossier: id }),
			db("type_demande").where({ id_dossier: id }),
		]);

		res.json({ ...dossier, notes, factures, documents, typeDemandes });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// GET /dossiers/client/:idClient
const getDossiersByClient = async (req, res) => {
	try {
		const dossiers = await db("dossier").where({
			id_client: req.params.idClient,
		});
		res.json(dossiers);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// POST /dossiers
const createDossier = async (req, res) => {
	const { id_client } = req.body;
	if (!id_client)
		return res.status(400).json({ error: "id_client est requis." });

	try {
		const [id_dossier] = await db("dossier").insert({ id_client });
		res.status(201).json({ id_dossier });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// DELETE /dossiers/:id
const deleteDossier = async (req, res) => {
	try {
		const deleted = await db("dossier")
			.where({ id_dossier: req.params.id })
			.delete();
		if (!deleted)
			return res.status(404).json({ error: "Dossier introuvable." });
		res.json({ message: "Dossier supprimé." });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
    getAllDossiers,
    getDossierById, 
    getDossiersByClient,
    createDossier,
    deleteDossier
};