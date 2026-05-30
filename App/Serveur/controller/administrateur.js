import bcrypt from "bcrypt";
import { db } from "../db/db.js";

// Colonnes sûres à renvoyer
const SAFE_COLS = [
  "id_admin",
  "nom",
  "prenom",
  "courriel",
  "telephone",
  "date_creation",
];

// GET /administrateurs
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await db("admin").select(SAFE_COLS);
    res.json(admins);
  } catch (err) {
    console.error("Erreur récupération admins:", err);
    res.status(500).json({ error: err.message });
  }
};

// POST /auth/create/Utilisateur (inscrire un employé/admin)
export const inscrireUtilisateur = async (req, res) => {
  const { nom, prenom, courriel, telephone, MDP } = req.body;
  if (!nom || !prenom || !courriel || !telephone || !MDP) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  try {
    const existant = await db("utilisateur").where({ courriel }).first();
    if (existant) return res.status(409).json({ error: "Un utilisateur existe déjà avec ce courriel." });

    const mdpHache = await bcrypt.hash(MDP, 10);
    const [id_utilisateur] = await db("utilisateur").insert({ nom, prenom, courriel, telephone, MDP: mdpHache });
    res.status(201).json({ message: "Utilisateur inscrit avec succès !", id_utilisateur });
  } catch (error) {
    console.error("Erreur lors de l'inscription de l'utilisateur :", error);
    res.status(500).json({ error: "Une erreur est survenue lors de l'inscription de l'utilisateur." });
  }
};

// PUT /administrateurs/update/:id
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, courriel, telephone, MDP } = req.body;
    if (!id || !nom || !prenom || !courriel || !telephone) {
      return res.status(400).json({ error: "Tous les champs sont requis (sauf MDP)." });
    }

    const data = { nom, prenom, courriel, telephone };
    if (MDP) data.MDP = MDP;

    const updated = await db("admin").where({ id_admin: id }).update(data);
    if (!updated) return res.status(404).json({ error: "Administrateur introuvable." });
    res.json({ message: "Administrateur mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'administrateur:", error);
    res.status(500).json({ error: "Une erreur est survenue lors de la mise à jour de l'administrateur." });
  }
};

// DELETE /administrateurs/delete/:id
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db("admin").where({ id_admin: id }).del();
    if (!deleted) return res.status(404).json({ error: "Administrateur introuvable." });
    res.json({ message: "Administrateur supprimé." });
  } catch (error) {
    console.error("Erreur suppression admin:", error);
    res.status(500).json({ error: error.message });
  }
};

