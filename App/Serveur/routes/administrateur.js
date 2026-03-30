import db from "../db/db.js"
import {createAccount} from "../api/auth.js"
import {VerifyRole} from "../api/authentification/middleware.js"
import { deleteAdminById, updateAdmin, inscrireUtilisateur } from "../api/administrateur.js" 
import {inscrireClient, deleteClient} from "../api/Client.js"
import {createDossier, deleteDossier} from "../api/dossier.js"
import {addDocument, deleteDocument} from "../api/document.js"

import express from "express"

const route = express.Router()
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Routes pour la modification des données d'un administrateur
route.put("/administrateur/:id" ,VerifyRole("admin"), updateadmin())

/**************
// Routes POST

***************/

// Route pour inscrire unc client
route.post('/api/inscriptions/client', createAccount);

// Route pour connecter un utilisateur
route.post("/api/login/admin", login);

// Route pour inscrire un utilisateur
route.post('/api/inscriptions/utilisateur', inscrireUtilisateur);

// Route pour créer un dossier
route.post('/api/dossiers', createDossier);

// Route pour ajouter un document à un dossier
route.post('/api/documents', addDocument);


/*********************
 * 
 * Routes DELETE
 * 
 *********************/
// Route pour supprimer un administrateur
route.delete("/administrateur/:id", VerifyRole("admin"), deleteAdminById)

//Route pour supprimer un client
route.delete("/client/:id", VerifyRole("admin"), deleteClient)

//Route pour supprimer un dossier
route.delete("/dossier/:id", VerifyRole("admin"), deleteDossier)

//Route pour supprimer un document
route.delete("/document/:id", VerifyRole("admin"), deleteDocument)


/********************
 * 
 * Routes GET
 * 
 ********************/




export default route;

