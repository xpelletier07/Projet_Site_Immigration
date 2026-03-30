const { db } = require("../../db/db.js");

async function deleteNoteById(id_note) {
    return await db("note").where({ id_note }).del();
}

module.exports = { deleteNoteById };
