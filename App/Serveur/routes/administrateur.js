import {db} from("../db/db.js")
import {verifyRole} from("../api/authentification/middleware.js")
import {updateadmin} from("../api/PUT/index.js")

import express from("express")

const route = express.Router()
import multer from("multer");
import {inscrireClient, inscrireUtilisateur, creerDossier, ajouterDocument} from("../api/POST/post.js");

// Routes pour la modification des données d'un administrateur
route.put("/administrateur/:id" ,verifyRole("admin"), updateadmin())

/**************
// Routes POST

***************/

// Route pour inscrire unc client
route.post('/api/inscriptions/client',      inscrireClient);

// Route pour inscrire un utilisateur
route.post('/api/inscriptions/utilisateur', inscrireUtilisateur);

// Route pour créer un dossier
route.post('/api/dossiers',                 creerDossier);

// Route pour ajouter un document à un dossier
route.post('/api/documents',                ajouterDocument);

// 


module.exports = {route}

