//Fonction pour mettre à jour les données d'un document
async function updatedocument(req, res) {
    try {
    const fichier = req.file;
    const id_document  = req.params.id;
    const {id_dossier, type_document, nom_document} = req.body;

    if (!id_document) {
        return res.status(400).json({ error: "L'ID du document est requis." });
    }

    if(!id_dossier){
        return res.status(400).json({ error: "L'ID du dossier est requis." });
    }
    
    const dossierExiste = await db('dossier').where({ id_dossier }).first();
    if (!dossierExiste) {
        return res.status(404).json({ error: "Dossier introuvable ou non existant" });
    }

    const data ={
        nom_document: nom_document,
        type_document: type_document,
        id_dossier: id_dossier
    };

    if(fichier){
        data.nom_document = fichier.originalname;
        data.type_document = fichier.mimetype;
        data.contenu = fichier.buffer;
    }

    await db("documents").where({ id_document }).update(data).then(() => {
        res.status(200).json({ message: "Document mis à jour avec succès." });
    });

    res.json({ message: "Document enregistré" });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du document:", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la mise à jour du document." });
    }
}

module.exports = {updatedocument}