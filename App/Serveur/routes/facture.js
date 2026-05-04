// routes/factureRoutes.js
import { Router } from "express";
import {
	getFacturesByDossier,
	getFactureById,
	createFacture,
	updateFacture,
	deleteFacture,
} from "../controller/facture.js";
import { verifyToken, verifyRole, verifyEmploye, verifyClientHasAccessToDossier }
 from "../api/authentification/middleware.js";

const router = Router();

// Clients et employés peuvent consulter les factures
router.get("/dossier/:idDossier", verifyClientHasAccessToDossier, getFacturesByDossier);
router.get("/:id", verifyClientHasAccessToDossier, getFactureById);

// Seuls les employés créent, modifient, suppriment
router.post("/", verifyEmploye, createFacture);
router.put("/update/:id", verifyEmploye, updateFacture);
router.delete("/delete/:id", verifyEmploye, deleteFacture);

export default router;
