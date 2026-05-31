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
	verifyEmploye,
	verifyClientHasAccessToDossier,
} from "../api/authentification/middleware.js";

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

// Upload — multer EN PREMIER pour parser le multipart avant le middleware d'auth
// verifyToken valide le JWT, puis le controller vérifie l'accès au dossier
router.post(
	"/",
	verifyToken,
	upload.single("file"),
	verifyClientHasAccessToDossier,
	addDocument,
);

// Suppression — client propriétaire ou employé/admin
router.delete("/delete/:id", verifyClientHasAccessToDossier, deleteDocument);

export default router;