const { db } = require("../../db/db.js");

async function deleteAdminById(id_admin) {
    return await db("admin").where({ id_admin }).del();
}

module.exports = { deleteAdminById };
