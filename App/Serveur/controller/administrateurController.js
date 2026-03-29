const {db} = require("../db/db.js")
const {VerifyRole} = require("../api/authentification/middleware.js")
const {updateadmin} = require("../api/PUT/index.js")

const express = require("express")
const route = express.Router()
const multer = require("multer");
const {inscrireClient, inscrireUtilisateur, creerDossier, ajouterDocument} = require("../api/POST/post.js");

// Routes pour la modification des données d'un administrateur
route.update("/administrateur/:id" ,midleware(), updateadmin())

// Routes POST
router.post('/api/inscriptions/client',      inscrireClient);
router.post('/api/inscriptions/utilisateur', inscrireUtilisateur);
router.post('/api/dossiers',                 creerDossier);
router.post('/api/documents',                ajouterDocument);

module.exports = router;

module.exports = {route}

