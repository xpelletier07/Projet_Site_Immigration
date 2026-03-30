// routes/utilisateurRoutes.js
import { Router } from "express";
import {
	getAllUtilisateurs,
	getUtilisateurById,
	updateUtilisateur,
	deleteUtilisateur,
} from "../controller/Utilisateur.js";
import { verifyRole } from "../api/authentification/middleware.js";

const router = Router();

// Gestion des employés – réservée aux employés authentifiés (idéalement admin)
router.get("/", verifyRole("utilisateur"), getAllUtilisateurs);
router.get("/:id", verifyRole("utilisateur"), getUtilisateurById);
router.put("/:id", verifyRole("utilisateur"), updateUtilisateur);
router.delete("/:id", verifyRole("utilisateur"), deleteUtilisateur);

export default router;
