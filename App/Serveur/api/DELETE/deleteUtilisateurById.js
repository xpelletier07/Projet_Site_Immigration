import { db } from "../../db/db.js";

export async function deleteUtilisateurById(id_utilisateur) {
    return await db("utilisateur").where({ id_utilisateur }).del();
}
