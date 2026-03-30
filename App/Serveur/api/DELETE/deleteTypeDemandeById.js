import { db } from "../../db/db.js";

export async function deleteTypeDemandeById(id_demande) {
    return await db("type_demande").where({ id_demande }).del();
}
