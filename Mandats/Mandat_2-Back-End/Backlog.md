# Répartition des contributions


## Xavier Pelletier
Xavier a beaucoup travaillé sur la base du backend: organisation des routes et des contrôleurs, mise en place des routes GET/POST, et la stabilisation du serveur. Il a aussi fait plusieurs correctifs de debug.

## Éric Gouife A Djiben
Éric a contribué aux parties UPDATE et POST. Il a travaillé sur les mises à jour, le contrôleur administrateur, et certains éléments d'authentification. Il a aussi participé à la modélisation (diagramme entité-relation) et aux ajustements des fichiers du projet.

## Glodie
Glodie a contribué sur des ajustements backend, en autres les routes POST ainsi que les tests de chaque route pour s'assurer de leur bon fonctionnement. 

## Hichem Khederi
J'ai surtout travaillé sur la partie DELETE et l'authentification liée, avec la suppression de plusieurs entités (client, admin, document, dossier, facture, note, type de demande, utilisateur) ainsi que sur la documentation du projet.

L'authentification a été fait par : Hichem Khederi

La base de données (db.js) a été faite par : Xavier Pelletier (création et ajustements)

Les routes DELETE ont été faites par : Hichem Khederi

Les routes GET ont été faites par : Xavier Pelletier

Les routes POST ont été faites par : Xavier Pelletier, Éric Gouife A Djiben et Glodie

Les routes PUT/UPDATE ont été faites par : Éric Gouife A Djiben

Le contrôleur administrateur a été fait par : Éric Gouife A Djiben

Le diagramme entité-relation a été fait par : Éric Gouife A Djiben

La documentation du projet a été faite par : Hichem Khederi


---

# État du projet

## Ce qui est fait
- Connexion et création de comptes (client / employé) avec JWT et mots de passe hachés
- Base de données SQLite avec toutes les tables créées automatiquement
- Routes CRUD complètes pour : Client, Utilisateur, Facture, Note, Type de demande
- Routes partielles pour : Dossier , Document
- Upload et téléchargement de fichiers
- Protection des routes par rôle (`verifyToken`, `verifyRole`)

## Ce qui reste à faire
- La gestion des **admins** n'est pas branchée (fichier existant mais non monté dans `app.js`)
- Le **frontend** (HTML/CSS) n'a pas encore de JavaScript pour appeler l'API
- Le secret JWT est codé en dur — il faudra un fichier `.env`
- Aucun test automatisé

