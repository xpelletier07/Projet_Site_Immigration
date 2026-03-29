const { db } = require("../db.js");
const { updatedocument } = require("./UPDATE/updateDocument.js");

const getDocumentsByDossier = async (req, res) => {
	try {
		const docs = await db("documents")
			.select(
				"id_document",
				"nom_document",
				"type_document",
				"id_dossier",
			)
			.where({ id_dossier: req.params.idDossier });
		res.json(docs);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getDocumentById = async (req, res) => {
	try {
		const doc = await db("documents")
			.select(
				"id_document",
				"nom_document",
				"type_document",
				"id_dossier",
			)
			.where({ id_document: req.params.id })
			.first();
		if (!doc)
			return res.status(404).json({ error: "Document introuvable." });
		res.json(doc);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// GET /documents/:id/telecharger — retourne le fichier brut
const downloadDocument = async (req, res) => {
	try {
		const doc = await db("documents")
			.where({ id_document: req.params.id })
			.first();
		if (!doc)
			return res.status(404).json({ error: "Document introuvable." });

		res.setHeader("Content-Type", doc.type_document);
		res.setHeader(
			"Content-Disposition",
			`attachment; filename="${doc.nom_document}"`,
		);
		res.send(doc.contenu); 
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// POST /documents — upload via multer (req.file)
const addDocument = async (req, res) => {
	const { id_dossier } = req.body;
	if (!id_dossier || !req.file)
		return res
			.status(400)
			.json({ error: "id_dossier et fichier sont requis." });

	try {
		const [id_document] = await db("documents").insert({
			id_dossier,
			nom_document: req.file.originalname,
			type_document: req.file.mimetype,
			contenu: req.file.buffer, 
		});
		res.status(201).json({
			id_document,
			nom_document: req.file.originalname,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};


const deleteDocument = async (req, res) => {
	try {
		const deleted = await db("documents")
			.where({ id_document: req.params.id })
			.delete();
		if (!deleted)
			return res.status(404).json({ error: "Document introuvable." });
		res.json({ message: "Document supprimé." });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

modules.exports = {
    getDocumentsByDossier,
    getDocumentById,
    downloadDocument,
    addDocument,
    deleteDocument,
    updatedocument
};