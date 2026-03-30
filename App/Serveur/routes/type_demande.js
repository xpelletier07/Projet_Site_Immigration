// routes/typeDemandeRoutes.js
import { Router } from "express";
import {
	getTypeDemandesByDossier,
	getTypeDemandeById,
	createTypeDemande,
	updateTypeDemande,
	deleteTypeDemande,
} from "../controller/Type_demande.js";

const router = Router();

router.get("/dossier/:idDossier", getTypeDemandesByDossier); // GET    /type-demandes/dossier/:idDossier
router.get("/:id", getTypeDemandeById); // GET    /type-demandes/:id
router.post("/", createTypeDemande); // POST   /type-demandes
router.put("/:id", updateTypeDemande); // PUT    /type-demandes/:id
router.delete("/:id", deleteTypeDemande); // DELETE /type-demandes/:id

export default router;
