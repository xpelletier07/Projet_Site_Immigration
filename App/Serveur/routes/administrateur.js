import {db} from("../db/db.js")
import {verifyRole} from("../api/authentification/middleware.js")
import { inscrireUtilisateur, updateAdmin, deleteAdminById} from "../controller/administrateur.js"
import express from("express")

const route = express.Router()

// Routes pour la modification des données d'un administrateur
route.put("/administrateur/:id" ,verifyRole("admin"), updateAdmin())

// Route pour inscrire un nouvel administrateur
route.post("/administrateur", verifyRole("admin"), inscrireUtilisateur)

// Route pour supprimer un administrateur
route.delete("/administrateur/:id", verifyRole("admin"), deleteAdminById)


export default route;

