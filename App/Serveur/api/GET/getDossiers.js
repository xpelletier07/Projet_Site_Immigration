const {db} = require("../../db/db.js")

async function getDossiers() {
    return await db("dossier").select("*")
}