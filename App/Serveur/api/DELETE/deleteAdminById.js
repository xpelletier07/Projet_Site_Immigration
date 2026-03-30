import { db } from "../../db/db.js";

export async function deleteAdminById(id_admin) {
    return await db("admin").where({ id_admin }).del();
}
