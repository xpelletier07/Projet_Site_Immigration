// routes/typeDemandeRoutes.js
import { Router } from "express";
import {
	getTypeDemandesByDossier,
	getTypeDemandeById,
	createTypeDemande,
	updateTypeDemande,
	deleteTypeDemande,
} from "../controller/Type_demande.js";
import { verifyRole, verifyClientOwnership, verifyClientOwnsDossier } from "../api/authentification/middleware.js";

const router = Router();

router.get("/dossier/:idDossier", verifyClientOwnsDossier, getTypeDemandesByDossier); // GET    /type-demandes/dossier/:idDossier
router.get("/:id", verifyClientOwnsDossier, getTypeDemandeById); // GET    /type-demandes/:id
router.post("/", verifyClientOwnsDossier, createTypeDemande); // POST   /type-demandes
router.put("/update/:id", verifyClientOwnsDossier, updateTypeDemande); // PUT    /type-demandes/:id
router.delete("/delete/:id", verifyClientOwnsDossier, deleteTypeDemande); // DELETE /type-demandes/:id

export default router;
