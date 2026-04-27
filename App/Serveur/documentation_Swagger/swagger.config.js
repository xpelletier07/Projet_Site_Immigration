// swagger/swagger.config.js
// ─────────────────────────────────────────────────────────────────────────────
// Métadonnées, serveurs, schémas de sécurité et composants réutilisables.
// Ce fichier est l'équivalent du "dictionnaire de données" pour Swagger.
// ─────────────────────────────────────────────────────────────────────────────

export const swaggerConfig = {
	openapi: "3.0.0",

	// ── Informations générales ────────────────────────────────────────────────
	info: {
		title: "Immigration API",
		version: "1.0.0",
		description: `
## API de gestion des dossiers d'immigration

### Comment s'authentifier
1. Créez un compte : \`POST /auth/create/client\` ou \`POST /auth/create/utilisateur\`
2. Connectez-vous : \`POST /auth/login\` → récupérez le **token**
3. Cliquez sur **Authorize** ci-dessus et entrez : \`Bearer <votre_token>\`

### Rôles disponibles
| Rôle | Accès |
|------|-------|
| \`client\` | Ses propres dossiers, factures, documents |
| \`utilisateur\` | Tout (clients, dossiers, notes, factures, documents) |
| \`admin\` | Tout + gestion des comptes employés |
    `,
	},

	// ── Environnements ────────────────────────────────────────────────────────
	servers: [
		{
			url: "http://localhost:3000",
			description: "🛠  Développement local",
		},
	],

	// ── Sécurité globale (toutes les routes sauf security: []) ───────────────
	security: [{ BearerAuth: [] }],

	// ── Composants réutilisables ──────────────────────────────────────────────
	components: {
		// ── Schéma d'authentification ─────────────────────────────────────────
		securitySchemes: {
			BearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
				description:
					'Token JWT obtenu via POST /auth/login — préfixe "Bearer " inclus automatiquement',
			},
		},

		// ── Modèles de données (miroir du Dictionnaire_Donnee.md) ─────────────
		schemas: {
			Client: {
				type: "object",
				properties: {
					id_client: { type: "integer", example: 1, readOnly: true },
					nom: { type: "string", example: "Tremblay" },
					prenom: { type: "string", example: "Alice" },
					courriel: {
						type: "string",
						format: "email",
						example: "alice@exemple.com",
					},
					telephone: { type: "integer", example: 5141234567 },
					date_creation: {
						type: "string",
						format: "date",
						readOnly: true,
					},
				},
			},

			Utilisateur: {
				type: "object",
				properties: {
					id_utilisateur: {
						type: "integer",
						example: 1,
						readOnly: true,
					},
					nom: { type: "string", example: "Bouchard" },
					prenom: { type: "string", example: "Marc" },
					courriel: {
						type: "string",
						format: "email",
						example: "marc@cabinet.com",
					},
					telephone: { type: "integer", example: 5149876543 },
					date_creation: {
						type: "string",
						format: "date",
						readOnly: true,
					},
				},
			},

			Dossier: {
				type: "object",
				properties: {
					id_dossier: { type: "integer", example: 1, readOnly: true },
					id_client: { type: "integer", example: 1 },
					notes: {
						type: "array",
						items: { $ref: "#/components/schemas/Note" },
					},
					factures: {
						type: "array",
						items: { $ref: "#/components/schemas/Facture" },
					},
					documents: {
						type: "array",
						items: { $ref: "#/components/schemas/Document" },
					},
					typeDemandes: {
						type: "array",
						items: { $ref: "#/components/schemas/TypeDemande" },
					},
				},
			},

			Note: {
				type: "object",
				properties: {
					id_note: { type: "integer", example: 1, readOnly: true },
					id_dossier: { type: "integer", example: 1 },
					note: {
						type: "string",
						example: "Acte de naissance reçu le 2024-03-15.",
					},
				},
			},

			Facture: {
				type: "object",
				properties: {
					id_facture: { type: "integer", example: 1, readOnly: true },
					id_dossier: { type: "integer", example: 1 },
					description: {
						type: "string",
						example: "Frais de traitement — résidence permanente",
					},
					montant: {
						type: "number",
						format: "float",
						example: 1500.0,
					},
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
						example: "en attente",
					},
				},
			},

			Document: {
				type: "object",
				properties: {
					id_document: {
						type: "integer",
						example: 1,
						readOnly: true,
					},
					id_dossier: { type: "integer", example: 1 },
					nom_document: { type: "string", example: "passeport.pdf" },
					type_document: {
						type: "string",
						example: "application/pdf",
					},
				},
			},

			TypeDemande: {
				type: "object",
				properties: {
					id_demande: { type: "integer", example: 1, readOnly: true },
					id_dossier: { type: "integer", example: 1 },
					Type_Demande: {
						type: "string",
						enum: [
							"Résidence permanente",
							"Permis temporaire",
							"Visa étudiant",
							"Regroupement familial",
						],
						example: "Résidence permanente",
					},
				},
			},

			// ── Corps de création (sans les champs readOnly) ──────────────────
			CreateAccountBody: {
				type: "object",
				required: ["nom", "prenom", "courriel", "telephone", "MDP"],
				properties: {
					nom: { type: "string", example: "Tremblay" },
					prenom: { type: "string", example: "Alice" },
					courriel: {
						type: "string",
						format: "email",
						example: "alice@exemple.com",
					},
					telephone: { type: "string", example: "5141234567" },
					MDP: {
						type: "string",
						format: "password",
						example: "MotDePasse123!",
					},
				},
			},

			LoginBody: {
				type: "object",
				required: ["courriel", "MDP"],
				properties: {
					courriel: {
						type: "string",
						format: "email",
						example: "marc@cabinet.com",
					},
					MDP: {
						type: "string",
						format: "password",
						example: "MotDePasse456!",
					},
					type: {
						type: "string",
						enum: ["client", "utilisateur"],
						description:
							"Optionnel — force la table de recherche. Si absent, l'API cherche dans les deux.",
					},
				},
			},

			// ── Réponses d'erreur standard ────────────────────────────────────
			Error400: {
				type: "object",
				properties: {
					message: {
						type: "string",
						example: "Tous les champs sont obligatoires.",
					},
				},
			},
			Error401: {
				type: "object",
				properties: {
					message: {
						type: "string",
						example:
							"Vous devez être connecté pour accéder à cette ressource.",
					},
				},
			},
			Error403: {
				type: "object",
				properties: {
					error: {
						type: "string",
						example: "Accès interdit pour ce rôle.",
					},
				},
			},
			Error404: {
				type: "object",
				properties: {
					error: {
						type: "string",
						example: "Ressource introuvable.",
					},
				},
			},
			Error409: {
				type: "object",
				properties: {
					message: {
						type: "string",
						example: "Un client existe déjà avec ce courriel.",
					},
				},
			},
			Error500: {
				type: "object",
				properties: {
					error: {
						type: "string",
						example: "Erreur interne du serveur.",
					},
				},
			},
		},

		// ── Réponses HTTP réutilisables ───────────────────────────────────────
		responses: {
			Unauthorized: {
				description: "401 — Token manquant ou invalide",
				content: {
					"application/json": {
						schema: { $ref: "#/components/schemas/Error401" },
					},
				},
			},
			Forbidden: {
				description: "403 — Droits insuffisants pour ce rôle",
				content: {
					"application/json": {
						schema: { $ref: "#/components/schemas/Error403" },
					},
				},
			},
			NotFound: {
				description: "404 — Ressource introuvable",
				content: {
					"application/json": {
						schema: { $ref: "#/components/schemas/Error404" },
					},
				},
			},
			InternalError: {
				description: "500 — Erreur interne du serveur",
				content: {
					"application/json": {
						schema: { $ref: "#/components/schemas/Error500" },
					},
				},
			},
		},

		// ── Paramètres réutilisables ──────────────────────────────────────────
		parameters: {
			idPath: {
				name: "id",
				in: "path",
				required: true,
				schema: { type: "integer" },
				description: "Identifiant unique de la ressource",
			},
			idDossierPath: {
				name: "idDossier",
				in: "path",
				required: true,
				schema: { type: "integer" },
				description: "Identifiant du dossier",
			},
			idClientPath: {
				name: "idClient",
				in: "path",
				required: true,
				schema: { type: "integer" },
				description: "Identifiant du client",
			},
		},
	},
};
