const express = require("express")
const route = express.Router()
const {db} = require("../db/db.js")
const {middleware} = require("../api/authentification/middleware.js")
const {updateclient} = require("../api/PUT/index.js")
const multer = require("multer");
const upload = multer();

// Route pour la modification des données d'un client
route.put("/update_client/:id" ,middleware, updateclient)