// routes/dossierRoutes.js
import { Router } from "express";
import {
	getAllDossiers,
	getDossierById,
	getDossiersByClient,
	createDossier,
	deleteDossier,
} from "../controller/dossier.js";
import { verifyToken, verifyRole, verifyEmploye, verifyClientHasAccessToDossier }
	from "../api/authentification/middleware.js";

const router = Router();

// Employés seulement – liste complète
router.get("/", verifyEmploye, getAllDossiers);

// Client ou employé – dossiers d'un client spécifique
router.get("/client/:idClient" /*, verifyClientHasAccessToDossier*/, getDossiersByClient);

// Client ou employé – détail d'un dossier
router.get("/:id", verifyClientHasAccessToDossier, getDossierById);

// Employés seulement – création et suppression
router.post("/create", verifyToken, createDossier);
router.delete("/delete/:id", verifyEmploye, deleteDossier);

export default router;
