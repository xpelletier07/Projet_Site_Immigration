import express from "express";
import cors from "cors";
import { db , initializeDatabase } from "./db/db.js";

// Import des routes (contrôleurs)
import authRoutes from "./routes/auth.js";
import clientRoutes from "./routes/client.js";
import utilisateurRoutes from "./routes/utilisateur.js";
import dossierRoutes from "./routes/dossier.js";
import noteRoutes from "./routes/note.js";
import factureRoutes from "./routes/facture.js";
import documentRoutes from "./routes/document.js";
import typeDemandeRoutes from "./routes/type_demande.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware globaux
app.use(cors());
app.use(express.json());

// ─── Montage des routes ───────────────────────────────────────────────────────
// Pour ajouter un nouveau micro-service : importer sa route et l'ajouter ici
app.use("/auth", authRoutes);
app.use("/clients", clientRoutes);
app.use("/utilisateurs", utilisateurRoutes);
app.use("/dossiers", dossierRoutes);
app.use("/notes", noteRoutes);
app.use("/factures", factureRoutes);
app.use("/documents", documentRoutes);
app.use("/type-demandes", typeDemandeRoutes);

// Route de base
app.get("/", (req, res) => {
	res.json({ message: "API Immigration - Opérationnelle" });
});

// Initialiser du serveur
initializeDatabase().then(() => {
	app.listen(PORT, () => {
		console.log(`Serveur démarré sur le port ${PORT}`);
	});
});

export default app;
