import { db } from "../../db/db.js";

export async function deleteDossierById(id_dossier) {
    return await db("dossier").where({ id_dossier }).del();
}
