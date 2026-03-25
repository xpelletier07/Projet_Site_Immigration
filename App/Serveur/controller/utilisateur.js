const express = require("express")
const route = express.Router()
import {db} from "../db/db.js"
import {midleware} from "../api/authentification/midleware.js"
import {updateutilisateur} from "./update.js"
const multer = require("multer");
const upload = multer();


// Routes pour la modification des données d'un utilisateur
route.update("/update_utilisateur/:id" ,midleware(), updateutilisateur())


module.exports = {route}