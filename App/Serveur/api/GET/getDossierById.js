const {db} = require("../../db/db.js")

async function getDossier(id_client) {
    return await db("dossier").select("*").where({ id_client })
}

module.exports = {getDossier}