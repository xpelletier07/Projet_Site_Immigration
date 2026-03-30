import { db } from "../../db/db.js";

export async function deleteClientById(id_client) {
    return await db("client").where({ id_client }).del();
}
