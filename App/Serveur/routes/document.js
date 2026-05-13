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
	verifyToken,
	verifyRole,
	verifyEmploye,
	verifyClientOrEmploye,
	verifyClientHasAccessToDossier,
} from "../api/authentification/middleware.js";

// Stockage en mémoire — le Buffer est passé directement à SQLite
const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
});

const router = Router();

// Lister les documents d'un dossier (sans le binaire)
router.get("/dossier/:idDossier", verifyClientHasAccessToDossier, getDocumentsByDossier);

// Métadonnées d'un document
router.get("/:id/info", verifyClientHasAccessToDossier, getDocumentById);

// Télécharger le fichier brut
router.get("/:id/telecharger", verifyClientHasAccessToDossier, downloadDocument);

// Upload d'un nouveau document (multipart/form-data, champ "file")
router.post("/", verifyClientHasAccessToDossier, upload.single("file"), addDocument);

// Suppression — employés seulement
router.delete("/delete/:id", verifyEmploye, deleteDocument);

export default router;
