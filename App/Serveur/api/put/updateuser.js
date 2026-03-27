//Fonction pour mettre à jour les données d'un utilisateur
async function updateuser(req, res) {
    try {
    const { id_utilisateur } = req.params;
    const { nom, prenom, courriel, telephone, MDP } = req.body;

    if (!id_utilisateur || !nom || !prenom || !courriel || !telephone || !MDP) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    const data = { nom, prenom, courriel, telephone, MDP };
    await db("utilisateur")
        .where({ id_utilisateur })
        .update(data)
        .then(() => {
            res.status(200).json({ message: "Utilisateur mis à jour avec succès." });
        })
        .catch((error) => {
            console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
            res.status(500).json({ error: "Une erreur est survenue lors de la mise à jour de l'utilisateur." });
        });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la mise à jour de l'utilisateur." });
    }
}