const express = require("express")
const route = express.Router()
import {db} from "../db/db.js"
import {midleware} from "./midleware.js"
import {updateadmin} from "../controller/update.js"
const multer = require("multer");




// Routes pour la modification des données d'un administrateur
route.update("/administrateur/:id" ,midleware(), updateadmin())




module.exports = {route}

