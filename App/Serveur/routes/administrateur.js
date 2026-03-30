const {db} = require("../db/db.js")
const {verifyRole} = require("../api/authentification/middleware.js")
const {updateadmin} = require("../api/PUT/index.js")

const express = require("express")
const route = express.Router()
const multer = require("multer");
const {inscrireClient, inscrireUtilisateur, creerDossier, ajouterDocument} = require("../api/POST/post.js");

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

