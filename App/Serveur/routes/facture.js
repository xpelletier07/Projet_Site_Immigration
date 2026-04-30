// routes/factureRoutes.js
import { Router } from "express";
import {
	getFacturesByDossier,
	getFactureById,
	createFacture,
	updateFacture,
	deleteFacture,
} from "../controller/facture.js";
import { verifyClientOwnership ,verifyToken, verifyRole, verifyEmploye, verifyClientOwnsDossier }
 from "../api/authentification/middleware.js";

const router = Router();

// Clients et employés peuvent consulter les factures
router.get("/dossier/:idDossier", verifyClientOwnsDossier, getFacturesByDossier);
router.get("/:id", verifyClientOwnsDossier, getFactureById);

// Seuls les employés créent, modifient, suppriment
router.post("/", verifyEmploye, createFacture);
router.put("/update/:id", verifyEmploye, updateFacture);
router.delete("/delete/:id", verifyEmploye, deleteFacture);

export default router;
