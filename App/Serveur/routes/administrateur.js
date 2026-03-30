import {db} from("../db/db.js")
import {verifyRole} from("../api/authentification/middleware.js")
import {updateadmin} from("../api/PUT/index.js")

import express from("express")

const route = express.Router()
import multer from("multer");
import {inscrireClient, inscrireUtilisateur, creerDossier, ajouterDocument} from("../api/POST/post.js");

// Routes pour la modification des données d'un administrateur
route.put("/administrateur/:id" ,verifyRole("admin"), updateadmin())

/**************
// Routes POST

***************/

// Route pour inscrire unc client
route.post('/api/inscriptions/client', createAccount);

// Route pour connecter un utilisateur
route.post("/api/login/admin", login);

// Route pour inscrire un utilisateur
route.post('/api/inscriptions/utilisateur', inscrireUtilisateur);

// Route pour créer un dossier
route.post('/api/dossiers', createDossier);

// Route pour ajouter un document à un dossier
route.post('/api/documents', addDocument);


/*********************
 * 
 * Routes DELETE
 * 
 *********************/
// Route pour supprimer un administrateur
route.delete("/administrateur/:id", VerifyRole("admin"), deleteAdminById)

//Route pour supprimer un client
route.delete("/client/:id", VerifyRole("admin"), deleteClient)

//Route pour supprimer un dossier
route.delete("/dossier/:id", VerifyRole("admin"), deleteDossier)

//Route pour supprimer un document
route.delete("/document/:id", VerifyRole("admin"), deleteDocument)


/********************
 * 
 * Routes GET
 * 
 ********************/

// Route pour obtenir tous les clients
route.get("/clients", VerifyRole("admin"), getAllClients)

// Route pour obtenir un client par ID
route.get("/clients/:id", VerifyRole("admin"), getClientById)

// Route pour obtenir tous les dossiers
route.get("/dossiers", VerifyRole("admin"), getAllDossiers)

// Route pour obtenir un dossier par ID
route.get("/dossiers/:id", VerifyRole("admin"), getDossierById)

// Route pour obtenir tous les documents
route.get("/documents", VerifyRole("admin"), getAllDocuments)

// Route pour obtenir un document par ID
route.get("/documents/:id", VerifyRole("admin"), getDocumentById)




export default route;

