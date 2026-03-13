const express = require("express")
import {db} from "../db/db.js"
const multer = require("multer");




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

//Fonction pour mettre à jour les données d'un utilisateur
async function updateutilisateur(req, res) {
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