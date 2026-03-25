const {db} = require("../../db/db.js")

async function getClients() {
    return await db("client").select("*")
}