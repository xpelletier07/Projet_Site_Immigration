const { db } = require("../../db/db.js");

async function deleteDocumentById(id_document) {
    return await db("documents").where({ id_document }).del();
}

module.exports = { deleteDocumentById };
