const express = require("express")
const route = express.Router()
const {db} = require("../db/db.js")
const {middleware} = require("../api/authentification/middleware.js")
const {updateuser} = require("../api/PUT/index.js")
const multer = require("multer");
const upload = multer();
const {inscrireClient, creerDossier, ajouterDocument} = require("../api/POST/post.js");


// Routes pour la modification des données d'un utilisateur
route.put("/update_utilisateur/:id" ,middleware, updateuser)


module.exports = {route}