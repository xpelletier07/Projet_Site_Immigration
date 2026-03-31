
// Fonction pour inscrire un nouvel utilisateur (employé / admin)
export async function inscrireUtilisateur(req, res) {
    const { nom, prenom, courriel, telephone, MDP } = req.body;

    if (!nom || !prenom || !courriel || !telephone || !MDP) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    try {
        // Vérifier si un utilisateur existe déjà avec ce courriel
        const existant = await db('utilisateur').where({ courriel }).first();
        if (existant) {
            return res.status(409).json({ error: "Un utilisateur existe déjà avec ce courriel." });
        }
    } catch (error) {
        return res.status(500).json({ error: "Erreur lors de la vérification du courriel." });
    }

    // Hachage sécurisé du mot de passe avant insertion
    const mdpHache = await bcrypt.hash(MDP, 10);

    // Insertion du nouvel utilisateur dans la base de données
    await db('utilisateur')
        .insert({ nom, prenom, courriel, telephone: telephone, MDP: mdpHache })
        .then(([id_utilisateur]) => {
            console.log(`Nouvel utilisateur créé (ID: ${id_utilisateur})`);
            res.status(201).json({
                message: "Utilisateur inscrit avec succès !",
                id_utilisateur
            });
        })
        .catch((error) => {
            console.error("Erreur lors de l'inscription de l'utilisateur :", error);
            res.status(500).json({ error: "Une erreur est survenue lors de l'inscription de l'utilisateur." });
        });
}

// fonction pour supprimer un admin

export async function deleteAdminById(id_admin) {
    return await db("admin").where({ id_admin }).del();
}


// Fonction pour mettre à jour les données d'un administrateur

export async function updateAdmin(req, res) {
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
