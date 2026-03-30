const { db } = require("../../db/db.js");

async function deleteDossierById(id_dossier) {
    return await db("dossier").where({ id_dossier }).del();
}

module.exports = { deleteDossierById };
