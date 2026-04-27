// swagger/swagger.paths.js
// ─────────────────────────────────────────────────────────────────────────────
// Définition de toutes les routes de l'API (équivalent des fichiers routes/).
// Chaque section correspond à un fichier dans routes/ ou controller/.
// ─────────────────────────────────────────────────────────────────────────────

import { request, response } from "express";

export const swaggerPaths = {
	// ══════════════════════════════════════════════════════════════════════════
	// AUTH — routes/auth.js
	// ══════════════════════════════════════════════════════════════════════════

	"/auth/create/{type}": {
		post: {
			tags: ["🔐 Auth"],
			summary: "Créer un compte",
			description: `Route unique pour la création de compte.
- \`/auth/create/client\` → crée un client
- \`/auth/create/utilisateur\` → crée un employé

Le type est validé côté serveur (400 si invalide).`,
			security: [], // pas de token requis
			parameters: [
				{
					name: "type",
					in: "path",
					required: true,
					schema: { type: "string", enum: ["client", "utilisateur"] },
					description: "Type de compte à créer",
				},
			],
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/CreateAccountBody",
						},
					},
				},
			},
			responses: {
				201: {
					description: "Compte créé avec succès",
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									message: { type: "string" },
									id_client: {
										type: "integer",
										description: "Présent si type = client",
									},
									id_utilisateur: {
										type: "integer",
										description:
											"Présent si type = utilisateur",
									},
								},
							},
						},
					},
				},
				400: {
					description: "Type invalide ou champs manquants",
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

    "/auth/create/Client": {
        post: {
            tags: ["🔐 Auth"],
            summary: "Créer un compte client",
            description: "Route pour créer un compte de type client.",
        },
        security: [], // pas de token requis
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/CreateAccountBody" },
                },
            },
        },
        responses: {
            201: {
                description: "Compte client créé avec succès",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                message: { type: "string" },
                                id_client: {
                                    type: "integer",
                                    description: "ID du nouveau client",
                                },
                            },
                        },
                    },
                },
            },
            400: { description: "Champs manquants ou invalides" },
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
    "/auth/create/Utilisateur": {
        post: {
            tags: ["🔐 Auth"],
            summary: "Créer un compte utilisateur",
            description: "Route pour créer un compte de type utilisateur.",
        },
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/CreateAccountBody" },
                },
            },
        },
        responses: {
            201: {
                description: "Compte utilisateur créé avec succès",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                message: { type: "string" },
                                id_utilisateur: {
                                    type: "integer",
                                    description: "ID du nouvel utilisateur",
                                },
                            },
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
				"Retourne un token JWT valide **24 heures**. Passez-le dans le header `Authorization: Bearer <token>`.",
			security: [],
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: { $ref: "#/components/schemas/LoginBody" },
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
										enum: ["client", "utilisateur"],
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

	// ══════════════════════════════════════════════════════════════════════════
	// CLIENTS — routes/client.js + controller/Client.js
	// ══════════════════════════════════════════════════════════════════════════

	"/clients": {
		get: {
			tags: ["👥 Clients"],
			summary: "Lister tous les clients",
			description:
				"🔒 **Rôle : utilisateur** — retourne la liste sans les mots de passe.",
			responses: {
				200: {
					description: "Liste complète des clients",
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
				"🔒 **Token requis** — un client peut voir son propre profil; un employé peut voir n'importe lequel.",
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
			description: "🔒 **Token requis** — client ou employé.",
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
			description: "🔒 **Rôle : utilisateur**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: { description: "Client supprimé" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},

	// ══════════════════════════════════════════════════════════════════════════
	// UTILISATEURS — routes/utilisateur.js + controller/Utilisateur.js
	// ══════════════════════════════════════════════════════════════════════════

	"/utilisateurs": {
		get: {
			tags: ["🧑‍💼 Utilisateurs"],
			summary: "Lister tous les employés",
			description: "🔒 **Rôle : utilisateur**",
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
			description: "🔒 **Rôle : utilisateur**",
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
			description: "🔒 **Rôle : utilisateur**",
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
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},

	"/utilisateurs/delete/{id}": {
		delete: {
			tags: ["🧑‍💼 Utilisateurs"],
			summary: "Supprimer un employé",
			description: "🔒 **Rôle : admin**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: { description: "Employé supprimé" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},

	// ══════════════════════════════════════════════════════════════════════════
	// DOSSIERS — routes/dossier.js + controller/dossier.js
	// ══════════════════════════════════════════════════════════════════════════

	"/dossiers": {
		get: {
			tags: ["📁 Dossiers"],
			summary: "Lister tous les dossiers",
			description:
				"🔒 **Rôle : utilisateur** — inclut le nom et prénom du client associé.",
			responses: {
				200: { description: "Liste des dossiers avec infos client" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
			},
		},
	},

	"/dossiers/{id}": {
		get: {
			tags: ["📁 Dossiers"],
			summary: "Dossier complet par ID",
			description:
				"🔒 **Token requis** — retourne le dossier avec **toutes** ses relations : notes, factures, documents, types de demande.",
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

	"/dossiers/client/{idClient}": {
		get: {
			tags: ["📁 Dossiers"],
			summary: "Dossiers d'un client",
			description: "🔒 **Token requis** — client ou employé.",
			parameters: [{ $ref: "#/components/parameters/idClientPath" }],
			responses: {
				200: { description: "Liste des dossiers du client" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},

	"/dossiers/create": {
		post: {
			tags: ["📁 Dossiers"],
			summary: "Créer un dossier",
			description: "🔒 **Rôle : utilisateur**",
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
			summary: "Supprimer un dossier",
			description: "🔒 **Rôle : utilisateur**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: { description: "Dossier supprimé" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},

	// ══════════════════════════════════════════════════════════════════════════
	// NOTES — routes/note.js + controller/note.js
	// ══════════════════════════════════════════════════════════════════════════

	"/notes/dossier/{idDossier}": {
		get: {
			tags: ["📝 Notes"],
			summary: "Notes d'un dossier",
			description:
				"🔒 **Rôle : utilisateur** — notes internes, non visibles par le client.",
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
			description: "🔒 **Rôle : utilisateur**",
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
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},

	"/notes": {
		post: {
			tags: ["📝 Notes"],
			summary: "Créer une note",
			description: "🔒 **Rôle : utilisateur**",
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
			description: "🔒 **Rôle : utilisateur**",
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
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},

	"/notes/delete/{id}": {
		delete: {
			tags: ["📝 Notes"],
			summary: "Supprimer une note",
			description: "🔒 **Rôle : utilisateur**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: { description: "Note supprimée" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},

	// ══════════════════════════════════════════════════════════════════════════
	// FACTURES — routes/facture.js + controller/facture.js
	// ══════════════════════════════════════════════════════════════════════════

	"/factures/dossier/{idDossier}": {
		get: {
			tags: ["🧾 Factures"],
			summary: "Factures d'un dossier",
			description:
				"🔒 **Token requis** — visible par le client et l'employé.",
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
			description: "🔒 **Token requis**",
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
			description:
				"🔒 **Rôle : utilisateur** — tous les champs sont obligatoires.",
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
			description: "🔒 **Rôle : utilisateur**",
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
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},

	"/factures/delete/{id}": {
		delete: {
			tags: ["🧾 Factures"],
			summary: "Supprimer une facture",
			description: "🔒 **Rôle : utilisateur**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: { description: "Facture supprimée" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},

	// ══════════════════════════════════════════════════════════════════════════
	// DOCUMENTS — routes/document.js + controller/document.js
	// ══════════════════════════════════════════════════════════════════════════

	"/documents/dossier/{idDossier}": {
		get: {
			tags: ["📄 Documents"],
			summary: "Documents d'un dossier (métadonnées)",
			description:
				"🔒 **Token requis** — retourne les métadonnées sans le contenu binaire.",
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
			description:
				"🔒 **Token requis** — ne retourne pas le contenu binaire.",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: {
					description: "Métadonnées du document",
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
			description:
				"🔒 **Token requis** — retourne le fichier avec `Content-Disposition: attachment`.",
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
				"🔒 **Token requis** — envoi `multipart/form-data`. Champ fichier = **`fichier`**. Max **10 MB**.",
			requestBody: {
				required: true,
				content: {
					"multipart/form-data": {
						schema: {
							type: "object",
							required: ["id_dossier", "fichier"],
							properties: {
								id_dossier: { type: "integer", example: 1 },
								fichier: {
									type: "string",
									format: "binary",
									description:
										"Fichier à uploader (max 10 MB)",
								},
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
				400: { description: "id_dossier ou fichier manquant" },
				401: { $ref: "#/components/responses/Unauthorized" },
			},
		},
	},

	"/documents/delete/{id}": {
		delete: {
			tags: ["📄 Documents"],
			summary: "Supprimer un document",
			description: "🔒 **Rôle : utilisateur**",
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: { description: "Document supprimé" },
				401: { $ref: "#/components/responses/Unauthorized" },
				403: { $ref: "#/components/responses/Forbidden" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},

	// ══════════════════════════════════════════════════════════════════════════
	// TYPE DEMANDES — routes/type_demande.js + controller/Type_demande.js
	// ⚠️ AUCUNE AUTHENTIFICATION — à sécuriser
	// ══════════════════════════════════════════════════════════════════════════

	"/type-demandes/dossier/{idDossier}": {
		get: {
			tags: ["🗂️ Type Demandes"],
			summary: "Types de demande d'un dossier",
			description:
				"⚠️ **Aucune authentification** — pensez à ajouter `verifyToken` dans routes/type_demande.js",
			security: [],
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
			},
		},
	},

	"/type-demandes/{id}": {
		get: {
			tags: ["🗂️ Type Demandes"],
			summary: "Obtenir un type de demande par ID",
			security: [],
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: { description: "Type de demande trouvé" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},

	"/type-demandes": {
		post: {
			tags: ["🗂️ Type Demandes"],
			summary: "Créer un type de demande",
			security: [],
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
				201: { description: "Type de demande créé" },
				400: { description: "Champs manquants" },
			},
		},
	},

	"/type-demandes/update/{id}": {
		put: {
			tags: ["🗂️ Type Demandes"],
			summary: "Modifier un type de demande",
			security: [],
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
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},

	"/type-demandes/delete/{id}": {
		delete: {
			tags: ["🗂️ Type Demandes"],
			summary: "Supprimer un type de demande",
			security: [],
			parameters: [{ $ref: "#/components/parameters/idPath" }],
			responses: {
				200: { description: "Supprimé" },
				404: { $ref: "#/components/responses/NotFound" },
			},
		},
	},

	// ══════════════════════════════════════════════════════════════════════════
	// ADMINISTRATEURS — routes/administrateur.js + controller/administrateur.js
	// ══════════════════════════════════════════════════════════════════════════

	"/administrateurs/update/{id}": {
		put: {
			tags: ["⚙️ Administrateurs"],
			summary: "Modifier un administrateur",
			description: "🔒 **Rôle : admin**",
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
			description: "🔒 **Rôle : admin**",
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
