const express = require("express")
const route = express.Router()
import {db} from "../db/db.js"
import {midleware} from "../api/authentification/midleware.js"
import {updateadmin} from "./update.js"
const multer = require("multer");
const upload = multer();



// Routes pour la modification des données d'un administrateur
route.put("/update_administrateur/:id" ,midleware(), updateadmin())

module.exports = {route}

