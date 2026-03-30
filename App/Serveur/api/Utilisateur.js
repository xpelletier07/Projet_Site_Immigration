// fonction pour supprimer un admin
export async function deleteAdminById(req, res) {
    try{
        const deleted = await db("admin")
                    .where({ id_admin : req.params.id })
                    .delete();
                if (!deleted)
                    return res.status(404).json({ error: "Administrateur introuvable." });
                res.json({ message: "Administrateur supprimé." });
    return await db("admin").where({ id_admin }).del();
    } catch (error) {
        console.error("Erreur lors de la suppression de l'administrateur:", error);
        throw new Error("Une erreur est survenue lors de la suppression de l'administrateur.");
    }
}

//Fonction pour mettre à jour les données d'un utilisateur
export async function updateuser(req, res) {
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

// fonction pour obtenir tous les utilisateurs
export async function getAllUsers(req, res) {
    try {
        const users = await db("utilisateur").select("id_utilisateur", "nom", "prenom", "courriel", "telephone", "date_creation");
        res.json(users);
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des utilisateurs." });
    }
}


