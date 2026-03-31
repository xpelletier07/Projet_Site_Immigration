// routes/noteRoutes.js
import { Router } from "express";
import {
	getNotesByDossier,
	getNoteById,
	createNote,
	updateNote,
	deleteNote,
} from "../controller/note.js";
import { verifyRole } from "../api/authentification/middleware.js";

const router = Router();

// Notes – réservées aux employés (internes)
router.get("/dossier/:idDossier", verifyRole("utilisateur"), getNotesByDossier);
router.get("/:id", verifyRole("utilisateur"), getNoteById);
router.post("/", verifyRole("utilisateur"), createNote);
router.put("/update/:id", verifyRole("utilisateur"), updateNote);
router.delete("/delete/:id", verifyRole("utilisateur"), deleteNote);

export default router;
