// routes/utilisateurRoutes.js
import { Router } from "express";
import {
	getAllUtilisateurs,
	getUtilisateurById,
	updateUtilisateur,
	deleteUtilisateur,
} from "../controller/Utilisateur.js";
//import { inscrireUtilisateur } from "../controller/administrateur.js";
import { verifyRole , verifyAdmin, verifyEmploye } from "../api/authentification/middleware.js";

const router = Router();

// Gestion des employés – réservée aux employés authentifiés (idéalement admin)
router.get("/assignables", verifyEmploye, getAllUtilisateurs);
router.get("/", verifyAdmin, getAllUtilisateurs);
router.get("/:id", verifyAdmin, getUtilisateurById);
router.put("/update/:id", verifyAdmin, updateUtilisateur);
router.delete("/delete/:id", verifyAdmin, deleteUtilisateur);
//router.post("/", verifyAdmin, inscrireUtilisateur)

export default router;
