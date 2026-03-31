import {db} from("../db/db.js")
import {verifyRole} from("../api/authentification/middleware.js")
import { inscrireUtilisateur, updateAdmin, deleteAdminById} from "../controller/administrateur.js"
import express from("express")

const route = express.Router()

// Routes pour la modification des données d'un administrateur
route.put("/update/:id" ,verifyRole("admin"), updateAdmin())

// Route pour supprimer un administrateur
route.delete("/delete/:id", verifyRole("admin"), deleteAdminById)


export default route;

