// routes/documentRoutes.js
import { Router } from "express";
import multer from "multer";
import {
	getDocumentsByDossier,
	getDocumentById,
	downloadDocument,
	addDocument,
	deleteDocument,
} from "../controller/document.js";
import {
	verifyClientOwnership,
	verifyToken,
	verifyRole,
	verifyEmploye,
	verifyClientOrEmploye,
	verifyClientOwnsDossier,
} from "../api/authentification/middleware.js";

// Stockage en mémoire — le Buffer est passé directement à SQLite
const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
});

const router = Router();

// Lister les documents d'un dossier (sans le binaire)
router.get("/dossier/:idDossier", verifyClientOwnsDossier, getDocumentsByDossier);

// Métadonnées d'un document
router.get("/:id/info", verifyClientOwnsDossier, getDocumentById);

// Télécharger le fichier brut
router.get("/:id/telecharger", verifyClientOwnsDossier, downloadDocument);

// Upload d'un nouveau document (multipart/form-data, champ "fichier")
router.post("/", verifyClientOwnsDossier, upload.single("fichier"), addDocument);

// Suppression — employés seulement
router.delete("/delete/:id", verifyEmploye, deleteDocument);

export default router;
