const {db} = require("../../db/db.js")

async function getType_Demande(id_dossier) {
    return await db("type_demande").select("*").where({ id_dossier })
}