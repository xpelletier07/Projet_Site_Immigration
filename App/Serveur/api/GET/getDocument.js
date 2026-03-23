const {db} = require("../../db/db.js")

async function getDocument(id_dossier) {
    return await db("Document").select("*").where({ id_dossier })
}