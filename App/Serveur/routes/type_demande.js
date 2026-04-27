// routes/typeDemandeRoutes.js
import { Router } from "express";
import {
	getTypeDemandesByDossier,
	getTypeDemandeById,
	createTypeDemande,
	updateTypeDemande,
	deleteTypeDemande,
} from "../controller/Type_demande.js";
import { verifyRole, verifyClientOwnership } from "../api/authentification/middleware.js";

const router = Router();

router.get("/dossier/:idDossier", verifyClientOwnership("type_demande"), getTypeDemandesByDossier); // GET    /type-demandes/dossier/:idDossier
router.get("/:id", verifyClientOwnership("type_demande"), getTypeDemandeById); // GET    /type-demandes/:id
router.post("/", verifyClientOwnership("type_demande"), createTypeDemande); // POST   /type-demandes
router.put("/update/:id", verifyClientOwnership("type_demande"), updateTypeDemande); // PUT    /type-demandes/:id
router.delete("/delete/:id", verifyClientOwnership("type_demande"), deleteTypeDemande); // DELETE /type-demandes/:id

export default router;
