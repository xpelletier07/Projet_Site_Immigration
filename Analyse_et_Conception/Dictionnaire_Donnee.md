Table:
    Administrateur:
        - id_Admin : int : id unique de l'administrateur (Clé primaire)
        - Role
        - nom
        - prenom



    Utilisateur (les employes):
        - id_User : int : id unique de l'utilisateur (Clé primaire)
        - Role
        - nom
        - prenom
        - courriel
        - telephone
        - MDP : 
        - date_creation


    Client:
        - id_Client: int : id unique du client (Clé primaire)
        - nom : nvarchar : Nom du client
        - prenom : nvarchar : Prenom du client
        - courriel : nvarchar : 
        - telephone : 
        - MDP : 
        - date_creation : 


    TypeDemande:
        - id_Demande : int : id de la demande unique (Clé primaire)
        - Type_Demande : nvarchar : Type de la demande ex. Résidence permanente, Temporaire, etc...
        - id_Dossier : int : Le Dossier auquel cette demande s'applique (Clé étrangère)


    Note:
        - id_Note : int : id de la note unique (Clé primaire)
        - id_Dossier : int : Id du dossier auquel cette note est assigner (Clé étrangère - Dossier)

    Facture:
        - id_Note : int : id de la Facture unique (Clé primaire)
        - id_Dossier : int : Id du dossier auquel cette facture est assigner (Clé étrangère - Dossier)

    Documents:
        - id_Document : int : id du document (Clé primaire)
        - id_Dossier : int : id unique du client ayant envoye le document (Clé étrangère - Client)

        - lien_document : nvarchar : lien depuis la route pour le document associé
    
    Dossier:
        - id_Dossier : int : Id unique représentant un dossier unique (Clé primaire)



