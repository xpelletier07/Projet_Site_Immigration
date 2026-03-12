import express from "express"; 
import bcrypt from "bcrypt";   // pour hacher le mot de passe
import { db } from "../db/db.js";

const app = express();
app.use(express.json());

//Route POST : ajouter une nouvelle inscription d'un client
app.post('/api/inscriptions/client', async (req, res) => {
    const { nom, prenom, courriel, telephone, MDP } = req.body;

    if (!nom || !prenom || !courriel || !telephone || !MDP) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs obligatoires." });
    }

    try {
        // Vérifier si le client existe déjà
        const existant = await db('client').where({ courriel }).first();
        if (existant) {
            return res.status(409).json({ message: "Un client existe déjà avec ce courriel." });
        }

        // Hachage du mot de passe
        const mdpHache = await bcrypt.hash(MDP, 10);

        // Insertion du client
        const [id_client] = await db('client').insert({
            nom, prenom, courriel, telephone: parseInt(telephone), MDP: mdpHache
        });

        console.log(`Nouveau client créé (ID: ${id_client})`);

        // Création automatique du dossier associé
        const id_dossier = await addDossier(id_client);

        res.status(201).json({
            message: "Client inscrit et dossier créé avec succès !",
            id_client,
            id_dossier
        });

    } catch (erreur) {
        console.error("Erreur (Client) :", erreur);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
});


//Route POST : ajouter une nouvelle inscription d'un utilisateur
app.post('/api/inscriptions/utilisateur', async (req, res) => {
    const { nom, prenom, courriel, telephone, MDP } = req.body;

    if (!nom || !prenom || !courriel || !telephone || !MDP) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs obligatoires." });
    }

    try {
        const existant = await db('utilisateur').where({ courriel }).first();
        if (existant) {
            return res.status(409).json({ message: "Un utilisateur existe déjà avec ce courriel." });
        }

        const mdpHache = await bcrypt.hash(MDP, 10);

        const [id_utilisateur] = await db('utilisateur').insert({
            nom, prenom, courriel, telephone: parseInt(telephone), MDP: mdpHache
        });

        console.log(`Nouvel utilisateur créé (ID: ${id_utilisateur})`);

        res.status(201).json({
            message: "Utilisateur inscrit avec succès !",
            id_utilisateur
        });

    } catch (erreur) {
        console.error("Erreur (Utilisateur) :", erreur);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
});


//Route POST : Création d'un DOSSIER pour un client
app.post('/api/dossiers', async (req, res) => {
    const { id_client } = req.body;

    // on vérifie à qui appartient le Dossier
    if (!id_client) {
        return res.status(400).json({ message: "L'ID du client est obligatoire." });
    }

    try {
        // on Vérifier si le client existe réellement dans la base de données
        const clientExiste = await db('client').where({ id_client }).first();
        if (!clientExiste) {
            return res.status(404).json({ message: "Client introuvable." });
        }

        // Création du dossier
        const [id_dossier] = await db('dossier').insert({ 
            id_client: id_client 
        });

        console.log(`Nouveau dossier créé (ID: ${id_dossier}) pour le client ${id_client}`);

        res.status(201).json({
            message: "Dossier créé avec succès !",
            id_dossier: id_dossier,
            id_client: id_client
        });

    } catch (erreur) {
        console.error("Erreur lors de la création du dossier :", erreur);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
});

app.post('/api/documents', async (req, res) => {
    // On s'attend à ce que 'contenuBase64' soit une chaîne de caractères envoyée par le frontend
    const { nom_document, type_document, contenuBase64, id_dossier } = req.body;

    // Validation de base
    if (!nom_document || !type_document || !contenuBase64 || !id_dossier) {
        return res.status(400).json({ message: "Tous les champs (nom, type, contenu, id_dossier) sont obligatoires." });
    }

    try {
        // on Vérifier si le dossier existe
        const dossierExiste = await db('dossier').where({ id_dossier }).first();
        if (!dossierExiste) {
            return res.status(404).json({ message: "Dossier introuvable." });
        }

        // 3. Conversion : Transformer la chaîne Base64 en données binaires (Buffer)
        // C'est ce que SQLite attend pour une colonne "binary"
        const bufferContenu = Buffer.from(contenuBase64, 'base64');

        // 4. Insertion dans la base de données
        const [id_document] = await db('documents').insert({
            nom_document: nom_document,
            type_document: type_document,       // ex: "application/pdf" ou "image/png"
            contenu: bufferContenu,             // Les données binaires
            id_dossier: id_dossier
        });

        console.log(`Document '${nom_document}' ajouté au dossier ${id_dossier}`);

        res.status(201).json({
            message: "Document sauvegardé avec succès !",
            id_document: id_document
        });

    } catch (erreur) {
        console.error("Erreur lors de l'ajout du document :", erreur);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
});