// routes/typeDemandeRoutes.js
import { Router } from "express";
import {
	getTypeDemandesByDossier,
	getTypeDemandeById,
	createTypeDemande,
	updateTypeDemande,
	deleteTypeDemande,
} from "../controller/Type_demande.js";
import {
	verifyToken,
	verifyClientHasAccessToDossier,
	verifyEmploye,
} from "../api/authentification/middleware.js";

const router = Router();

// GET — lecture par dossier ou par id
router.get("/dossier/:idDossier", verifyClientHasAccessToDossier, getTypeDemandesByDossier);
router.get("/:id", verifyToken, getTypeDemandeById);

// POST — client ou employé peut créer une demande
router.post("/", verifyToken, createTypeDemande);

// PUT / DELETE — employés seulement
router.put("/update/:id", verifyEmploye, updateTypeDemande);
router.delete("/delete/:id", verifyEmploye, deleteTypeDemande);

export default router;