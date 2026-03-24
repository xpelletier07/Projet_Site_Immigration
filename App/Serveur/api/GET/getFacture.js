const {db} = require("../../db/db.js")

async function getFacture(id_dossier) {
    return await db("facture").select("*").where({ id_dossier })
}