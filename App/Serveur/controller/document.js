const express = require("express")
const route = express.Router()
const {db} = require("../db/db.js")
const {middleware} = require("../api/authentification/middleware.js")
const {updatedocument} = require("../api/PUT/index.js")
const multer = require("multer");
const upload = multer();

// Routes pour la modification des données d'un document
route.put("/update_document/:id" ,middleware, upload.single("document"), updatedocument)


module.exports = {route}