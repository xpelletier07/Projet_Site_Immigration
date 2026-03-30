// routes/factureRoutes.js
import { Router } from "express";
import {
	getFacturesByDossier,
	getFactureById,
	createFacture,
	updateFacture,
	deleteFacture,
} from "../controller/facture.js";
import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";

const router = Router();

// Clients et employés peuvent consulter les factures
router.get("/dossier/:idDossier", verifyToken, getFacturesByDossier);
router.get("/:id", verifyToken, getFactureById);

// Seuls les employés créent, modifient, suppriment
router.post("/", verifyRole("utilisateur"), createFacture);
router.put("/:id", verifyRole("utilisateur"), updateFacture);
router.delete("/:id", verifyRole("utilisateur"), deleteFacture);

export default router;
