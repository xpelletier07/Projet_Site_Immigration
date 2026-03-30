const { db } = require("../../db/db.js");

async function deleteTypeDemandeById(id_demande) {
    return await db("type_demande").where({ id_demande }).del();
}

module.exports = { deleteTypeDemandeById };
