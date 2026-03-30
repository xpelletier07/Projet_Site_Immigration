import { db } from "../../db/db.js";

export async function deleteFactureById(id_facture) {
    return await db("facture").where({ id_facture }).del();
}
