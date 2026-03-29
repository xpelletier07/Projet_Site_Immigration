const {db} = require("../../db/db.js")

async function getUtilisateur(id_utilisateur) {
    return await db("utilisateur").select("*").where({ id_utilisateur })
}

module.exports = {getUtilisateur}