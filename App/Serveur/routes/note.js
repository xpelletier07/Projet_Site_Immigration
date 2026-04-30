// routes/noteRoutes.js
import { Router } from "express";
import {
	getNotesByDossier,
	getNoteById,
	createNote,
	updateNote,
	deleteNote,
} from "../controller/note.js";
import { verifyRole, verifyEmploye } from "../api/authentification/middleware.js";

const router = Router();

// Notes – réservées aux employés (internes)
router.get("/dossier/:idDossier", verifyEmploye, getNotesByDossier);
router.get("/:id", verifyEmploye, getNoteById);
router.post("/", verifyEmploye, createNote);
router.put("/update/:id", verifyEmploye, updateNote);
router.delete("/delete/:id", verifyEmploye, deleteNote);

export default router;
