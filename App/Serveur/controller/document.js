const express = require("express")
const route = express.Router()
import {db} from "../db/db.js"
import {midleware} from "./midleware.js"
import {updatedocument} from "./update.js"
const multer = require("multer");
const upload = multer();

// Routes pour la modification des données d'un document
route.put("/update_document/:id" ,midleware(), upload.single("document"), updatedocument())


module.exports = {route}