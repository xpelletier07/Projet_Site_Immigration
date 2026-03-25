// Fonction pour mettre à jour les données d'un administrateur

async function updateadmin(req, res) {
    try {
    const { id_admin } = req.params;
    const { nom, prenom, courriel, telephone, MDP } = req.body;

    if (!id_admin || !nom || !prenom || !courriel || !telephone || !MDP) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    const data = { nom, prenom, courriel, telephone, MDP };
    await db("admin")
        .where({ id_admin })
        .update(data)
        .then(() => {
            res.status(200).json({ message: "Administrateur mis à jour avec succès." });
        })
        .catch((error) => {
            console.error("Erreur lors de la mise à jour de l'administrateur:", error);
            res.status(500).json({ error: "Une erreur est survenue lors de la mise à jour de l'administrateur." });
        });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'administrateur:", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la mise à jour de l'administrateur." });
    }
}