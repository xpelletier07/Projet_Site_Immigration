import { db } from "../db/db.js";

export const getNotesByDossier = async (req, res) => {
	try {
		const notes = await db("note").where({
			id_dossier: req.params.idDossier,
		});
		res.json(notes);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// GET /notes/:id
export const getNoteById = async (req, res) => {
	try {
		const note = await db("note").where({ id_note: req.params.id }).first();
		if (!note) return res.status(404).json({ error: "Note introuvable." });
		res.json(note);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// POST /notes
export const createNote = async (req, res) => {
	const { id_dossier, note } = req.body;
	if (!id_dossier || !note)
		return res
			.status(400)
			.json({ error: "id_dossier et note sont requis." });

	try {
		const [id_note] = await db("note").insert({ id_dossier, note });
		res.status(201).json({ id_note });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// PUT /notes/:id
export const updateNote = async (req, res) => {
	const { note } = req.body;
	try {
		const updated = await db("note")
			.where({ id_note: req.params.id })
			.update({ note });
		if (!updated)
			return res.status(404).json({ error: "Note introuvable." });
		res.json({ message: "Note mise à jour." });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// DELETE /notes/:id
export const deleteNote = async (req, res) => {
	try {
		const deleted = await db("note")
			.where({ id_note: req.params.id })
			.delete();
		if (!deleted)
			return res.status(404).json({ error: "Note introuvable." });
		res.json({ message: "Note supprimée." });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
