const {db} = require("../db/db.js")
const {middleware} = require("../api/authentification/middleware.js")
const {updateadmin} = require("../api/PUT/index.js")

const express = require("express")
const route = express.Router()
const multer = require("multer");
const {inscrireClient, inscrireUtilisateur, creerDossier, ajouterDocument} = require("../api/POST/post.js");

// Routes pour la modification des données d'un administrateur
route.put("/update_administrateur/:id" ,middleware, updateadmin)

module.exports = {route}

