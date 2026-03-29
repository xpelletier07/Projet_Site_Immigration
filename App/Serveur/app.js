const express = require("express");
const app = express();
const port = 3000;
const { initializeDatabase } = require("./db/db.js");
// const authRouter = require("./api/auth.js");

app.use(express.json());
app.use(express.static(__dirname + "/../Client"));
app.use(express.urlencoded({ extended: true }));

// Importer les routes
const {route: administrateurRoutes} = require("./controller/administrateur.js");
const {route: utilisateurRoutes} = require("./controller/document.js");
const {route: documentRoutes} = require("./controller/document.js");

// Utiliser les routes
app.use("/api", administrateurRoutes);
app.use("/api", utilisateurRoutes);
app.use("/api", documentRoutes);
// app.use("/auth", authRouter);

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/../Client/index.html");
});

initializeDatabase()
	.then(() => {
		console.log("Base de données initialisée avec succès.");
		app.listen(port, () => {
			console.log("Server is running on port " + port );
		});
	})
	.catch((error) => {
		console.error("Erreur lors de l'initialisation de la base de données:", error);
	});
