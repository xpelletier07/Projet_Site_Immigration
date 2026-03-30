import { db } from "../../db/db.js";

export async function deleteDocumentById(id_document) {
    return await db("documents").where({ id_document }).del();
}
