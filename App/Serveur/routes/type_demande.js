// routes/typeDemandeRoutes.js
import { Router } from "express";
import {
	getTypeDemandesByDossier,
	getTypeDemandeById,
	createTypeDemande,
	updateTypeDemande,
	deleteTypeDemande,
} from "../controller/Type_demande.js";
import { verifyRole, verifyClientHasAccessToDossier } from "../api/authentification/middleware.js";

const router = Router();

router.get("/dossier/:idDossier", verifyClientHasAccessToDossier, getTypeDemandesByDossier); // GET    /type-demandes/dossier/:idDossier
router.get("/:id", verifyClientHasAccessToDossier, getTypeDemandeById); // GET    /type-demandes/:id
router.post("/", verifyClientHasAccessToDossier, createTypeDemande); // POST   /type-demandes
router.put("/update/:id", verifyClientHasAccessToDossier, updateTypeDemande); // PUT    /type-demandes/:id
router.delete("/delete/:id", verifyClientHasAccessToDossier, deleteTypeDemande); // DELETE /type-demandes/:id

export default router;
