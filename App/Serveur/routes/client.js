// routes/clientRoutes.js
import { Router } from "express";
import {
	getAllClients,
	getClientById,
	updateClient,
	deleteClient,
} from "../controller/Client.js";
import { verifyToken, verifyRole, verifyEmploye, verifyClientHasAccessToDossier, verifyClientOwnsProfile } from "../api/authentification/middleware.js";

const router = Router();

// Liste complète – employés seulement
router.get("/", verifyEmploye, getAllClients);

// Un client peut consulter son propre profil ; un employé peut voir n'importe lequel
router.get("/:id", verifyClientOwnsProfile, getClientById);

// Modification du profil – client ou employé
router.put("/update/:id", verifyClientOwnsProfile, updateClient);

// Suppression – employés seulement
router.delete("/delete/:id", verifyEmploye, deleteClient);

export default router;
