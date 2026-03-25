//Fonction pour mettre à jour les données d'un client
async function updateclient(req, res) {
    try {
    const { id_client } = req.params;
    const { nom, prenom, courriel, telephone, MDP } = req.body;

    if (!id_client || !nom || !prenom || !courriel || !telephone || !MDP) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    const data = { nom, prenom, courriel, telephone, MDP };
    await db("client")
        .where({ id_client })
        .update(data)
        .then(() => {
            res.status(200).json({ message: "Client mis à jour avec succès." });
        })
        .catch((error) => {
            console.error("Erreur lors de la mise à jour du client:", error);
            res.status(500).json({ error: "Une erreur est survenue lors de la mise à jour du client." });
        });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du client:", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la mise à jour du client." });
    }
}