// routes/dossierRoutes.js
import { Router } from "express";
import {
	getAllDossiers,
	getDossierById,
	getDossiersByClient,
	createDossier,
	deleteDossier,
} from "../controller/dossier.js";
import { verifyClientOwnership ,verifyToken, verifyRole, verifyEmploye, verifyClientOwnsDossier }
 from "../api/authentification/middleware.js";

const router = Router();

// Employés seulement – liste complète
router.get("/", verifyEmploye, getAllDossiers);

// Client ou employé – dossiers d'un client spécifique
router.get("/client/:idClient", verifyClientOwnsDossier, getDossiersByClient);

// Client ou employé – détail d'un dossier
router.get("/:id", verifyClientOwnsDossier, getDossierById);

// Employés seulement – création et suppression
router.post("/create", verifyEmploye, createDossier);
router.delete("/delete/:id", verifyEmploye, deleteDossier);

export default router;
