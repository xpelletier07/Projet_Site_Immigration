const { db } = require("../../db/db.js");

async function deleteClientById(id_client) {
    return await db("client").where({ id_client }).del();
}

module.exports = { deleteClientById };
