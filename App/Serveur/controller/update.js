const express = require("express")
import {db} from "../db/db.js"
const multer = require("multer");
const upload = multer();



// Fonction pour mettre à jour les données d'un administrateur
async function updateadmin(req, res) {
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
}

//Fonction pour mettre à jour les données d'un utilisateur
async function updateutilisateur(req, res) {
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

}

//Fonction pour mettre à jour les données d'un client
async function updateclient(req, res) {
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
}

//Fonction pour mettre à jour les données d'un document
async function updatedocument(req, res) {
    const fichier = req.file;
    const id_document  = req.params.id;
    const id_dossier = req.body;

    if (!id_document || !fichier) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
    }
    
    const data ={
        nom_document: fichier.originalname,
        type_document: fichier.mimetype,
        contenu: fichier.buffer,
        id_dossier: id_dossier
    };

    await db("documents").where({ id_document }).update(data).then(() => {
        res.status(200).json({ message: "Document mis à jour avec succès." });
    });

    res.json({ message: "Document enregistré" });

} 