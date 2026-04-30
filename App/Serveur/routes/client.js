// routes/clientRoutes.js
import { Router } from "express";
import {
	getAllClients,
	getClientById,
	updateClient,
	deleteClient,
} from "../controller/Client.js";
import { verifyClientOwnership ,verifyToken, verifyRole, verifyEmploye, verifyClientOwnsDossier } from "../api/authentification/middleware.js";

const router = Router();

// Liste complète – employés seulement
router.get("/", verifyEmploye, getAllClients);

// Un client peut consulter son propre profil ; un employé peut voir n'importe lequel
router.get("/:id", verifyClientOwnsDossier, getClientById);

// Modification du profil – client ou employé
router.put("/update/:id", verifyClientOwnsDossier, updateClient);

// Suppression – employés seulement
router.delete("/delete/:id", verifyEmploye, deleteClient);

export default router;
