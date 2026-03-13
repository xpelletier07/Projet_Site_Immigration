const app = require("express");
const port = 3000
import {db, initializeDatabase} from "./db/db.js"

app.use(express.json());
app.use(express.static(__dirname + "/../Client"));
app.use(express.urlencoded({ extended: true }));

// Importer les routes
const {route: administrateurRoutes} = require("./api/administrateur.js");

// Utiliser les routes
app.use("/api", administrateurRoutes);

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
