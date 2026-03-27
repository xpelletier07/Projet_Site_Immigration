const {db} = require("../../db/db.js")

async function getUtilisateurs() {
    return await db("utilisateur").select("*")
}

module.exports = {getUtilisateurs}