// routes/clientRoutes.js
import { Router } from "express";
import {
	getAllClients,
	getClientById,
	updateClient,
	deleteClient,
} from "../controllers/clientController.js";
import { verifyToken, verifyRole } from "../api/authentification/middleware.js";

const router = Router();

// Liste complète – employés seulement
router.get("/", verifyRole("utilisateur"), getAllClients);

// Un client peut consulter son propre profil ; un employé peut voir n'importe lequel
router.get("/:id", verifyToken, getClientById);

// Modification du profil – client ou employé
router.put("/:id", verifyToken, updateClient);

// Suppression – employés seulement
router.delete("/:id", verifyRole("utilisateur"), deleteClient);

export default router;
