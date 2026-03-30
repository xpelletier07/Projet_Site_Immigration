import { db } from "../db.js";

export const getDocumentsByDossier = async (req, res) => {
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

export const getDocumentById = async (req, res) => {
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
export const downloadDocument = async (req, res) => {
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
export const addDocument = async (req, res) => {
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

export const deleteDocument = async (req, res) => {
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

export const updatedocument = async (req, res) => {
	try {
		const fichier = req.file;
		const id_document = req.params.id;
		const { id_dossier, type_document, nom_document } = req.body;

		if (!id_document) {
			return res
				.status(400)
				.json({ error: "L'ID du document est requis." });
		}

		if (!id_dossier) {
			return res
				.status(400)
				.json({ error: "L'ID du dossier est requis." });
		}

		const dossierExiste = await db("dossier").where({ id_dossier }).first();
		if (!dossierExiste) {
			return res
				.status(404)
				.json({ error: "Dossier introuvable ou non existant" });
		}

		const data = {
			nom_document: nom_document,
			type_document: type_document,
			id_dossier: id_dossier,
		};

		if (fichier) {
			data.nom_document = fichier.originalname;
			data.type_document = fichier.mimetype;
			data.contenu = fichier.buffer;
		}

		await db("documents")
			.where({ id_document })
			.update(data)
			.then(() => {
				res.status(200).json({
					message: "Document mis à jour avec succès.",
				});
			});

		res.json({ message: "Document enregistré" });
	} catch (error) {
		console.error("Erreur lors de la mise à jour du document:", error);
		res.status(500).json({
			error: "Une erreur est survenue lors de la mise à jour du document.",
		});
	}
};
