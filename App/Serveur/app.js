import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { db, initializeDatabase } from "./db/db.js";

// Pour obtenir __dirname avec ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import des routes (contrôleurs)
import adminRoutes from "./routes/administrateur.js";
import authRoutes from "./routes/auth.js";
import clientRoutes from "./routes/client.js";
import utilisateurRoutes from "./routes/utilisateur.js";
import dossierRoutes from "./routes/dossier.js";
import noteRoutes from "./routes/note.js";
import factureRoutes from "./routes/facture.js";
import documentRoutes from "./routes/document.js";
import typeDemandeRoutes from "./routes/type_demande.js";
import swaggerRouter from "./documentation/Swagger/swagger.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware globaux
app.use(cors());
app.use(express.json());

// AJOUTER CETTE LIGNE : Servir les fichiers statiques du client
app.use(express.static(path.join(__dirname, "../Client/dist")));

// ─── Montage des routes ──────────────────────────────────────────────────────
app.use("/doc", swaggerRouter);
app.use("/auth", authRoutes);
app.use("/clients", clientRoutes);
app.use("/utilisateurs", utilisateurRoutes);
app.use("/dossiers", dossierRoutes);
app.use("/notes", noteRoutes);
app.use("/factures", factureRoutes);
app.use("/documents", documentRoutes);
app.use("/type-demandes", typeDemandeRoutes);
app.use("/administrateurs", adminRoutes);

// Route de base
app.get("/api", (req, res) => {
	res.json({ message: "API Immigration - Opérationnelle" });
});

// AJOUTER CES LIGNES : Fallback pour React Router (SPA)
app.all("/{*splat}", (req, res) => {
	res.status(404).json({
		error: "Route introuvable",
	});
});
// Initialiser du serveur
initializeDatabase().then(() => {
	app.listen(PORT, () => {
		console.log(`Serveur démarré sur le port ${PORT}`);
	});
});

export default app;
