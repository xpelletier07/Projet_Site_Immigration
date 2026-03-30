const { db } = require("../../db/db.js");

async function deleteFactureById(id_facture) {
    return await db("facture").where({ id_facture }).del();
}

module.exports = { deleteFactureById };
