const { db } = require("../db.js");

const SAFE_COLS = [
	"id_client",
	"nom",
	"prenom",
	"courriel",
	"telephone",
	"date_creation",
];

// GET /clients
const getAllClients = async (req, res) => {
	try {
		const clients = await db("client").select(SAFE_COLS);
		res.json(clients);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// GET /clients/:id
const getClientById = async (req, res) => {
	try {
		const client = await db("client")
			.select(SAFE_COLS)
			.where({ id_client: req.params.id })
			.first();
		if (!client)
			return res.status(404).json({ error: "Client introuvable." });
		res.json(client);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// PUT /clients/:id
const updateClient = async (req, res) => {
	const { nom, prenom, courriel, telephone } = req.body;
	try {
		const updated = await db("client")
			.where({ id_client: req.params.id })
			.update({ nom, prenom, courriel, telephone });
		if (!updated)
			return res.status(404).json({ error: "Client introuvable." });
		res.json({ message: "Client mis à jour." });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// DELETE /clients/:id
const deleteClient = async (req, res) => {
	try {
		const deleted = await db("client")
			.where({ id_client: req.params.id })
			.delete();
		if (!deleted)
			return res.status(404).json({ error: "Client introuvable." });
		res.json({ message: "Client supprimé." });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
    getAllClients,
    getClientById,
    updateClient,
    deleteClient
};