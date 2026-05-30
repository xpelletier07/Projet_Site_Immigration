import {verifyRole , verifyAdmin} from "../api/authentification/middleware.js" 
import { inscrireUtilisateur, updateAdmin, deleteAdmin, getAllAdmins } from "../controller/administrateur.js"
import express from "express" 

const route = express.Router()

// Routes pour la modification des données d'un administrateur
route.put("/update/:id" ,verifyAdmin, updateAdmin)

// Route pour obtenir tous les administrateurs
route.get("/", verifyAdmin, getAllAdmins)

// Route pour supprimer un administrateur
// Route pour supprimer un administrateur
route.delete("/delete/:id", verifyAdmin, deleteAdmin)


export default route;

