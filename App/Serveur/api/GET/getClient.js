const {db} = require("../../db/db.js")

async function getClient(id_client) {
    return await db("client").select("*").where({ id_client })
}

module.exports = {getClient}