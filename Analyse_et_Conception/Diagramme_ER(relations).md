* Utilisateur(employé) :
  - id
  - nom
  - prenom
  - courriel
  - telephone
  - MDP
  - date_creation
  
* Client :
  - id_Client
  - nom
  - prenom
  - courriel
  - telephone
  - MDP
  - date_creation

* Dossier :
 - id_dossier
 - id_client

* TypeDemande :
 - id_demande
 - type_demande
 - id_dossier 

* Note :
  - id_note
  - id_dossier
  - note

* Facture :
  - id_facture
  - id_dossier
  - facture

* Document :
  - id_document
  - id_dossier
  - lien_document 


RELATIONS Utilisateur:
Utilisateur(1)(employé)---est responsable de--- Dossier(N)
utilisateur(1)---Téléverse--- Document(N)
utilisateur(1)---Rédige--- Note(N)
utilisateur(1)---crée--- Facture(N)

RELATIONS Client:
Client(1)---Est lié à des---Dossier(N)

RELATIONS Dossier:
Dossier(1)---comporte---Note(N)
Dossier(1)---génère---Facture(N)
Dossier(N)---concerne---TypeDemande(1)
