// routes/dossierRoutes.js
import { Router } from "express";
import {
	getAllDossiers,
	getDossierById,
	getDossiersByClient,
	createDossier,
	deleteDossier,
} from "../controller/dossier.js";
import { verifyClientOwnership ,verifyToken, verifyRole }
 from "../api/authentification/middleware.js";

const router = Router();

// Employés seulement – liste complète
router.get("/", verifyRole("utilisateur"), getAllDossiers);

// Client ou employé – dossiers d'un client spécifique
router.get("/client/:idClient", verifyClientOwnership("dossier"), getDossiersByClient);

// Client ou employé – détail d'un dossier
router.get("/:id", verifyClientOwnership("dossier"), getDossierById);

// Employés seulement – création et suppression
router.post("/create", verifyRole("utilisateur"), createDossier);
router.delete("/delete/:id", verifyRole("utilisateur"), deleteDossier);

export default router;
