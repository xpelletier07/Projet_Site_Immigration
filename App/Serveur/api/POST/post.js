const bcrypt = require("bcrypt");
const { db } = require("../../db/db.js");


// Fonction pour inscrire un nouveau client et créer automatiquement son dossier
async function inscrireClient(req, res) {
    const { nom, prenom, courriel, telephone, MDP } = req.body;

    if (!nom || !prenom || !courriel || !telephone || !MDP) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    try {
        // Vérifier si un client existe déjà avec ce courriel
        const existant = await db('client').where({ courriel }).first();
        if (existant) {
            return res.status(409).json({ error: "Un client existe déjà avec ce courriel." });
        }
    } catch (error) {
        return res.status(500).json({ error: "Erreur lors de la vérification du courriel." });
    }

    // Hachage sécurisé du mot de passe avant insertion
    const mdpHache = await bcrypt.hash(MDP, 10);

    // Insertion du nouveau client puis création de son dossier
    await db('client')
        .insert({ nom, prenom, courriel, telephone: parseInt(telephone), MDP: mdpHache })
        .then(async ([id_client]) => {
            console.log(`Nouveau client créé (ID: ${id_client})`);

            // Création automatique du dossier associé au client
            const id_dossier = await addDossier(id_client);

            res.status(201).json({
                message: "Client inscrit et dossier créé avec succès !",
                id_client,
                id_dossier
            });
        })
        .catch((error) => {
            console.error("Erreur lors de l'inscription du client :", error);
            res.status(500).json({ error: "Une erreur est survenue lors de l'inscription du client." });
        });
}


// Fonction pour inscrire un nouvel utilisateur (employé / admin)
async function inscrireUtilisateur(req, res) {
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
        .insert({ nom, prenom, courriel, telephone: parseInt(telephone), MDP: mdpHache })
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


// Fonction pour créer un dossier pour un client existant
async function creerDossier(req, res) {
    const { id_client } = req.body;

    if (!id_client) {
        return res.status(400).json({ error: "L'ID du client est obligatoire." });
    }

    try {
        // Vérifier que le client existe bien dans la base de données
        const clientExiste = await db('client').where({ id_client }).first();
        if (!clientExiste) {
            return res.status(404).json({ error: "Client introuvable." });
        }
    } catch (error) {
        return res.status(500).json({ error: "Erreur lors de la vérification du client." });
    }

    // Insertion du nouveau dossier lié au client
    await db('dossier')
        .insert({ id_client })
        .then(([id_dossier]) => {
            console.log(`Nouveau dossier créé (ID: ${id_dossier}) pour le client ${id_client}`);
            res.status(201).json({
                message: "Dossier créé avec succès !",
                id_dossier,
                id_client
            });
        })
        .catch((error) => {
            console.error("Erreur lors de la création du dossier :", error);
            res.status(500).json({ error: "Une erreur est survenue lors de la création du dossier." });
        });
}


// Fonction pour ajouter un document (encodé en Base64) dans un dossier existant
async function ajouterDocument(req, res) {
    const { nom_document, type_document, contenuBase64, id_dossier } = req.body;

    if (!nom_document || !type_document || !contenuBase64 || !id_dossier) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    try {
        // Vérifier que le dossier cible existe bien dans la base de données
        const dossierExiste = await db('dossier').where({ id_dossier }).first();
        if (!dossierExiste) {
            return res.status(404).json({ error: "Dossier introuvable." });
        }
    } catch (error) {
        return res.status(500).json({ error: "Erreur lors de la vérification du dossier." });
    }

    // Conversion du contenu Base64 en Buffer binaire pour le stockage en BD
    const bufferContenu = Buffer.from(contenuBase64, 'base64');

    // Insertion du document dans la base de données
    await db('documents')
        .insert({ nom_document, type_document, contenu: bufferContenu, id_dossier })
        .then(([id_document]) => {
            console.log(`Document '${nom_document}' ajouté au dossier ${id_dossier}`);
            res.status(201).json({
                message: "Document sauvegardé avec succès !",
                id_document
            });
        })
        .catch((error) => {
            console.error("Erreur lors de l'ajout du document :", error);
            res.status(500).json({ error: "Une erreur est survenue lors de l'ajout du document." });
        });
}


module.exports = { inscrireClient, inscrireUtilisateur, creerDossier, ajouterDocument };