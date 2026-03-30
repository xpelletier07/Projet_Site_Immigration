const { db } = require("../../db/db.js");

async function deleteUtilisateurById(id_utilisateur) {
    return await db("utilisateur").where({ id_utilisateur }).del();
}

module.exports = { deleteUtilisateurById };
