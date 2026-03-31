// routes/factureRoutes.js
import { Router } from "express";
import {
	getFacturesByDossier,
	getFactureById,
	createFacture,
	updateFacture,
	deleteFacture,
} from "../controller/facture.js";
import { verifyToken, verifyRole } from "../api/authentification/middleware.js";

const router = Router();

// Clients et employés peuvent consulter les factures
router.get("/dossier/:idDossier", verifyToken, getFacturesByDossier);
router.get("/:id", verifyToken, getFactureById);

// Seuls les employés créent, modifient, suppriment
router.post("/", verifyRole("utilisateur"), createFacture);
router.put("/update/:id", verifyRole("utilisateur"), updateFacture);
router.delete("/delete/:id", verifyRole("utilisateur"), deleteFacture);

export default router;
