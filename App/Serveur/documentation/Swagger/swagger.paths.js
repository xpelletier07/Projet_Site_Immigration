// swagger/swagger.paths.js
// Voir fichier complet ci-dessous
export const swaggerPaths = {
	"/auth/create/client": {
		post: {
			tags: ["🔐 Auth"],
			summary: "Créer un compte client",
			description:
				"🌐 **Public** — aucun token requis.\n\nLa matrice autorise les non-connectés à créer un compte client.",
			security: [],
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/CreateAccountBody",
						},
						example: {
							nom: "Tremblay",
							prenom: "Alice",
							courriel: "alice@exemple.com",
							telephone: "5141234567",
							MDP: "MotDePasse123!",
						},
					},
				},
			},
			responses: {
				201: {
					description: "Compte client créé",
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									message: { type: "string" },
									id_client: { type: "integer", example: 4 },
								},
							},
						},
					},
				},
				400: {
					description: "Champs manquants ou courriel invalide",
					content: {
						"application/json": {
							schema: { $ref: "#/components/schemas/Error400" },
						},
					},
				},
				409: {
					description: "Courriel déjà utilisé",
					content: {
						"application/json": {
							schema: { $ref: "#/components/schemas/Error409" },
						},
					},
				},
			},
		},
	},
	"/auth/create/utilisateur": {
		post: {
			tags: ["🔐 Auth"],
			summary: "Créer un compte employé",
			description:
				"🛡️ **Admin seulement** — la matrice réserve la gestion des utilisateurs à l'admin.",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/CreateAccountBody",
						},
						example: {
							nom: "Bouchard",
							prenom: "Marc",
							courriel: "marc@cabinet.com",
							telephone: "5149876543",
							MDP: "MotDePasse456!",
						},
					},
				},
			},
			responses: {
				201: {
					description: "Compte employé créé",
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									message: { type: "string" },
									id_utilisateur: {
										type: "integer",
										example: 2,
									},
								},
							},
						},
					},
				},
				400: {
					description: "Champs manquants",
					content: {
						"application/json": {
							schema: { $ref: "#/components/schemas/Error400" },
						},
					},
				},
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
				409: {
					description: "Courriel déjà utilisé",
					content: {
						"application/json": {
							schema: { $ref: "#/components/schemas/Error409" },
						},
					},
				},
			},
		},
	},
	"/auth/login": {
		post: {
			tags: ["🔐 Auth"],
			summary: "Connexion — obtenir un JWT",
			description:
				"🌐 **Public** — retourne un token JWT valide **24 heures**.",
			security: [],
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: { $ref: "#/components/schemas/LoginBody" },
						examples: {
							admin: {
								summary: "Admin",
								value: {
									courriel: "admin@cmaisonneuve.qc.ca",
									MDP: "password",
								},
							},
							employe: {
								summary: "Employé",
								value: {
									courriel: "marc@cabinet.com",
									MDP: "MotDePasse456!",
									type: "utilisateur",
								},
							},
							client: {
								summary: "Client",
								value: {
									courriel: "alice@exemple.com",
									MDP: "MotDePasse123!",
									type: "client",
								},
							},
						},
					},
				},
			},
			responses: {
				200: {
					description: "Connexion réussie",
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									message: { type: "string" },
									token: {
										type: "string",
										example:
											"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
									},
									type: {
										type: "string",
										enum: [
											"client",
											"utilisateur",
											"admin",
										],
									},
									id: { type: "integer" },
								},
							},
						},
					},
				},
				401: { description: "Identifiants invalides" },
			},
		},
	},
	"/clients": {
		get: {
			tags: ["👥 Clients"],
			summary: "Lister tous les clients",
			description: "👷 **Employé/Admin**",
			responses: {
				200: {
					description: "Liste des clients",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: { $ref: "#/components/schemas/Client" },
							},
						},
					},
				},
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
			},
		},
	},
	"/clients/{id}": {
		get: {
			tags: ["👥 Clients"],
			summary: "Obtenir un client par ID",
			description:
				"🔑 **Tout connecté** — un client peut voir son propre profil.",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: {
					description: "Client trouvé",
					content: {
						"application/json": {
							schema: { $ref: "#/components/schemas/Client" },
						},
					},
				},
				401: { $ref: "#/components/responses/Unauthorized" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},
	"/clients/update/{id}": {
		put: {
			tags: ["👥 Clients"],
			summary: "Modifier un client",
			description:
				"🔑 **Tout connecté** — un client peut modifier son propre profil.",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			requestBody: {
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								nom: { type: "string" },
								prenom: { type: "string" },
								courriel: { type: "string" },
								telephone: { type: "string" },
							},
						},
					},
				},
			},
			responses: {
				200: { description: "Client mis à jour" },
				401: { $ref: "#/components/responses/Unauthorized" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},
	"/clients/delete/{id}": {
		delete: {
			tags: ["👥 Clients"],
			summary: "Supprimer un client",
			description: "👷 **Employé/Admin**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: { description: "Client supprimé" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},
	"/utilisateurs": {
		get: {
			tags: ["🧑‍💼 Utilisateurs"],
			summary: "Lister tous les employés",
			description: "🛡️ **Admin seulement**",
			responses: {
				200: {
					description: "Liste des employés",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: {
									$ref: "#/components/schemas/Utilisateur",
								},
							},
						},
					},
				},
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
			},
		},
	},
	"/utilisateurs/{id}": {
		get: {
			tags: ["🧑‍💼 Utilisateurs"],
			summary: "Obtenir un employé par ID",
			description: "🛡️ **Admin seulement**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: {
					description: "Employé trouvé",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Utilisateur",
							},
						},
					},
				},
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},
	"/utilisateurs/update/{id}": {
		put: {
			tags: ["🧑‍💼 Utilisateurs"],
			summary: "Modifier un employé",
			description: "🛡️ **Admin seulement**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			requestBody: {
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								nom: { type: "string" },
								prenom: { type: "string" },
								courriel: { type: "string" },
								telephone: { type: "string" },
							},
						},
					},
				},
			},
			responses: {
				200: { description: "Employé mis à jour" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},
	"/utilisateurs/delete/{id}": {
		delete: {
			tags: ["🧑‍💼 Utilisateurs"],
			summary: "Supprimer un employé",
			description: "🛡️ **Admin seulement**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: { description: "Employé supprimé" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},
	"/dossiers": {
		get: {
			tags: ["📁 Dossiers"],
			summary: "Lister tous les dossiers",
			description: "👷 **Employé/Admin**",
			responses: {
				200: { description: "Liste des dossiers" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
			},
		},
	},
	"/dossiers/client/{idClient}": {
		get: {
			tags: ["📁 Dossiers"],
			summary: "Dossiers d'un client",
			description: "🔑 **Tout connecté**",
			parameters: [{ $ref: "#/components/parameters/idClientPath" }],
			responses: {
				200: { description: "Dossiers du client" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/dossiers/{id}": {
		get: {
			tags: ["📁 Dossiers"],
			summary: "Dossier complet par ID",
			description: "🔑 **Tout connecté**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: {
					description: "Dossier complet",
					content: {
						"application/json": {
							schema: { $ref: "#/components/schemas/Dossier" },
						},
					},
				},
				401: { $ref: "#/components/responses/Unauthorized" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},
	"/dossiers/create": {
		post: {
			tags: ["📁 Dossiers"],
			summary: "Créer un dossier",
			description: "👷 **Employé/Admin**",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							type: "object",
							required: ["id_client"],
							properties: {
								id_client: { type: "integer", example: 1 },
							},
						},
					},
				},
			},
			responses: {
				201: {
					description: "Dossier créé",
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: { id_dossier: { type: "integer" } },
							},
						},
					},
				},
				400: { description: "id_client manquant" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
			},
		},
	},
	"/dossiers/delete/{id}": {
		delete: {
			tags: ["📁 Dossiers"],
			summary: "Fermer/Supprimer un dossier",
			description:
				'👷 **Employé/Admin** — matrice : "Fermer un dossier d\'un client".',
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: { description: "Dossier supprimé" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},
	"/notes/dossier/{idDossier}": {
		get: {
			tags: ["📝 Notes"],
			summary: "Notes d'un dossier",
			description:
				"👷 **Employé/Admin** — notes internes, jamais accessibles par le client.",
			parameters: [{ $ref: "#/components/parameters/idDossierPath" }],
			responses: {
				200: {
					description: "Liste des notes",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: { $ref: "#/components/schemas/Note" },
							},
						},
					},
				},
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
			},
		},
	},
	"/notes/{id}": {
		get: {
			tags: ["📝 Notes"],
			summary: "Obtenir une note par ID",
			description: "👷 **Employé/Admin**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: {
					description: "Note trouvée",
					content: {
						"application/json": {
							schema: { $ref: "#/components/schemas/Note" },
						},
					},
				},
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},
	"/notes": {
		post: {
			tags: ["📝 Notes"],
			summary: "Créer une note",
			description: "👷 **Employé/Admin**",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							type: "object",
							required: ["id_dossier", "note"],
							properties: {
								id_dossier: { type: "integer", example: 1 },
								note: {
									type: "string",
									example: "Acte de naissance reçu.",
								},
							},
						},
					},
				},
			},
			responses: {
				201: {
					description: "Note créée",
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: { id_note: { type: "integer" } },
							},
						},
					},
				},
				400: { description: "Champs manquants" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
			},
		},
	},
	"/notes/update/{id}": {
		put: {
			tags: ["📝 Notes"],
			summary: "Modifier une note",
			description: "👷 **Employé/Admin**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			requestBody: {
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: { note: { type: "string" } },
						},
					},
				},
			},
			responses: {
				200: { description: "Note mise à jour" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},
	"/notes/delete/{id}": {
		delete: {
			tags: ["📝 Notes"],
			summary: "Supprimer une note",
			description: "👷 **Employé/Admin**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: { description: "Note supprimée" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},
	"/factures/dossier/{idDossier}": {
		get: {
			tags: ["🧾 Factures"],
			summary: "Factures d'un dossier",
			description:
				"🔑 **Tout connecté** — un client peut voir ses factures.",
			parameters: [{ $ref: "#/components/parameters/idDossierPath" }],
			responses: {
				200: {
					description: "Liste des factures",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: { $ref: "#/components/schemas/Facture" },
							},
						},
					},
				},
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/factures/{id}": {
		get: {
			tags: ["🧾 Factures"],
			summary: "Obtenir une facture par ID",
			description: "🔑 **Tout connecté**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: {
					description: "Facture trouvée",
					content: {
						"application/json": {
							schema: { $ref: "#/components/schemas/Facture" },
						},
					},
				},
				401: { $ref: "#/components/responses/Unauthorized" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},
	"/factures": {
		post: {
			tags: ["🧾 Factures"],
			summary: "Créer une facture",
			description: "👷 **Employé/Admin**",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							type: "object",
							required: [
								"id_dossier",
								"description",
								"montant",
								"date_emission",
								"date_echeance",
								"statut",
							],
							properties: {
								id_dossier: { type: "integer", example: 1 },
								description: {
									type: "string",
									example: "Frais de traitement RP",
								},
								montant: { type: "number", example: 1500.0 },
								date_emission: {
									type: "string",
									format: "date",
									example: "2024-03-15",
								},
								date_echeance: {
									type: "string",
									format: "date",
									example: "2024-04-15",
								},
								statut: {
									type: "string",
									enum: ["en attente", "payée", "annulée"],
								},
							},
						},
					},
				},
			},
			responses: {
				201: {
					description: "Facture créée",
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: { id_facture: { type: "integer" } },
							},
						},
					},
				},
				400: { description: "Champs manquants" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
			},
		},
	},
	"/factures/update/{id}": {
		put: {
			tags: ["🧾 Factures"],
			summary: "Modifier une facture",
			description: "👷 **Employé/Admin**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			requestBody: {
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								description: { type: "string" },
								montant: { type: "number" },
								date_emission: { type: "string" },
								date_echeance: { type: "string" },
								statut: {
									type: "string",
									enum: ["en attente", "payée", "annulée"],
								},
							},
						},
					},
				},
			},
			responses: {
				200: { description: "Facture mise à jour" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},
	"/factures/delete/{id}": {
		delete: {
			tags: ["🧾 Factures"],
			summary: "Supprimer une facture",
			description: "👷 **Employé/Admin**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: { description: "Facture supprimée" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},
	"/documents/dossier/{idDossier}": {
		get: {
			tags: ["📄 Documents"],
			summary: "Documents d'un dossier (métadonnées)",
			description: "🔑 **Tout connecté**",
			parameters: [{ $ref: "#/components/parameters/idDossierPath" }],
			responses: {
				200: {
					description: "Liste des documents",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: {
									$ref: "#/components/schemas/Document",
								},
							},
						},
					},
				},
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/documents/{id}/info": {
		get: {
			tags: ["📄 Documents"],
			summary: "Métadonnées d'un document",
			description: "🔑 **Tout connecté**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: {
					description: "Métadonnées",
					content: {
						"application/json": {
							schema: { $ref: "#/components/schemas/Document" },
						},
					},
				},
				401: { $ref: "#/components/responses/Unauthorized" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},
	"/documents/{id}/telecharger": {
		get: {
			tags: ["📄 Documents"],
			summary: "Télécharger le fichier brut",
			description: "🔑 **Tout connecté**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: { description: "Fichier binaire" },
				401: { $ref: "#/components/responses/Unauthorized" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},
	"/documents": {
		post: {
			tags: ["📄 Documents"],
			summary: "Uploader un document",
			description:
				"🔑 **Tout connecté** — matrice : client peut ajouter ses propres documents. Envoi multipart/form-data, champ = `fichier`, max 10 MB.",
			requestBody: {
				required: true,
				content: {
					"multipart/form-data": {
						schema: {
							type: "object",
							required: ["id_dossier", "fichier"],
							properties: {
								id_dossier: { type: "integer", example: 1 },
								fichier: { type: "string", format: "binary" },
							},
						},
					},
				},
			},
			responses: {
				201: {
					description: "Document uploadé",
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									id_document: { type: "integer" },
									nom_document: { type: "string" },
								},
							},
						},
					},
				},
				400: { description: "Champs manquants" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/documents/delete/{id}": {
		delete: {
			tags: ["📄 Documents"],
			summary: "Supprimer un document",
			description:
				"🔑 **Tout connecté** — matrice : client peut supprimer ses propres documents.",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: { description: "Document supprimé" },
				401: { $ref: "#/components/responses/Unauthorized" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},
	"/type-demandes/dossier/{idDossier}": {
		get: {
			tags: ["🗂️ Type Demandes"],
			summary: "Types de demande d'un dossier",
			description: "🔑 **Tout connecté** — route maintenant sécurisée.",
			parameters: [{ $ref: "#/components/parameters/idDossierPath" }],
			responses: {
				200: {
					description: "Liste des types de demande",
					content: {
						"application/json": {
							schema: {
								type: "array",
								items: {
									$ref: "#/components/schemas/TypeDemande",
								},
							},
						},
					},
				},
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},
	"/type-demandes/{id}": {
		get: {
			tags: ["🗂️ Type Demandes"],
			summary: "Obtenir un type de demande par ID",
			description: "🔑 **Tout connecté**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: { description: "Type de demande trouvé" },
				401: { $ref: "#/components/responses/Unauthorized" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},
	"/type-demandes": {
		post: {
			tags: ["🗂️ Type Demandes"],
			summary: "Créer une demande d'immigration",
			description:
				"🧑‍💼+🛡️ **Client + Admin** — matrice : \"Faire une demande d'immigration\". ⚠️ L'employé (utilisateur) n'est pas autorisé selon la matrice.",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							type: "object",
							required: ["id_dossier", "Type_Demande"],
							properties: {
								id_dossier: { type: "integer", example: 1 },
								Type_Demande: {
									type: "string",
									enum: [
										"Résidence permanente",
										"Permis temporaire",
										"Visa étudiant",
										"Regroupement familial",
									],
								},
							},
						},
					},
				},
			},
			responses: {
				201: {
					description: "Demande créée",
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: { id_demande: { type: "integer" } },
							},
						},
					},
				},
				400: { description: "Champs manquants" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
			},
		},
	},
	"/type-demandes/update/{id}": {
		put: {
			tags: ["🗂️ Type Demandes"],
			summary: "Modifier un type de demande",
			description: "👷 **Employé/Admin**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			requestBody: {
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: { Type_Demande: { type: "string" } },
						},
					},
				},
			},
			responses: {
				200: { description: "Mis à jour" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},
	"/type-demandes/delete/{id}": {
		delete: {
			tags: ["🗂️ Type Demandes"],
			summary: "Supprimer un type de demande",
			description: "👷 **Employé/Admin**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: { description: "Supprimé" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},
	"/administrateurs/update/{id}": {
		put: {
			tags: ["⚙️ Administrateurs"],
			summary: "Modifier un administrateur",
			description: "🛡️ **Admin seulement**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			requestBody: {
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								nom: { type: "string" },
								prenom: { type: "string" },
								courriel: { type: "string" },
								telephone: { type: "string" },
								MDP: { type: "string" },
							},
						},
					},
				},
			},
			responses: {
				200: { description: "Administrateur mis à jour" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
			},
		},
	},
	"/administrateurs/delete/{id}": {
		delete: {
			tags: ["⚙️ Administrateurs"],
			summary: "Supprimer un administrateur",
			description: "🛡️ **Admin seulement**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: { description: "Administrateur supprimé" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},
};
