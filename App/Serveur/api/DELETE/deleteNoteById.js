import { db } from "../../db/db.js";

export async function deleteNoteById(id_note) {
    return await db("note").where({ id_note }).del();
}
