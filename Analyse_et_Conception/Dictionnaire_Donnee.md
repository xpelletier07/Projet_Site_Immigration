Table:
    Administrateur:
        - id_Admin : int : id unique de l'administrateur (Clé primaire)
        - nom : nvarchar : Nom de l'admin
        - prenom : nvarchar : Prenom de l'admin
        - courriel : nvarchar : Courriel du admin
        - telephone : int : Telephone du admin
        - MDP : nvarchar : Mot de passe de l'admin, il est crypté
        - date_creation : date : Receuille la date de création de l'admin


    Utilisateur (les employes):
        - id_User : int : id unique de l'utilisateur (Clé primaire)
        - nom : nvarchar : Nom de l'utilisateur
        - prenom : nvarchar : Prenom de l'utilisateur
        - courriel : nvarchar : Courriel de l'utilisateur
        - telephone : int : Telephone de l'utilisateur
        - MDP : nvarchar : Mot de passe dde l'utilisateur, il est crypté
        - date_creation : date : Receuille la date de création de l'utilisateur


    Client:
        - id_Client: int : id unique du client (Clé primaire)
        - nom : nvarchar : Nom du client
        - prenom : nvarchar : Prenom du client
        - courriel : nvarchar : Courriel du client
        - telephone : int : Telephone du client
        - MDP : nvarchar : Mot de passe du Client, il est crypté
        - date_creation : date : Receuille la date de création du client


    TypeDemande:
        - id_Demande : int : id de la demande unique (Clé primaire)
        - Type_Demande : nvarchar : Type de la demande ex. Résidence permanente, Temporaire, etc...
        - id_Dossier : int : Le Dossier auquel cette demande s'applique (Clé étrangère - Dossier)


    Note:
        - id_Note : int : id de la note unique (Clé primaire)
        - id_Dossier : int : Id du dossier auquel cette note est assigner (Clé étrangère - Dossier)
        - note : nvarchar : Contenu de la note

    Facture:
        - id_Facture : int : id de la Facture unique (Clé primaire)
        - id_Dossier : int : Id du dossier auquel cette facture est assigner (Clé étrangère - Dossier)
        - facture : nvarchar : Contenu de la facture

    Documents:
        - id_Document : int : id du document (Clé primaire)
        - id_Dossier : int : id unique du client ayant envoye le document (Clé étrangère - Dossier)
        - lien_document : nvarchar : lien depuis la route pour le document associé
    
    Dossier:
        - id_Dossier : int : Id unique représentant un dossier unique (Clé primaire)
        - id_Client : int : Id du client auquel ce dossier est attribuer (Clé étrangère - Client)



