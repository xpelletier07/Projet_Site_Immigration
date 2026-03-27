const {db} = require("../../db/db.js")

async function getNote(id_dossier) {
    return await db("note").select("*").where({ id_dossier })
}

module.exports = {getNote}