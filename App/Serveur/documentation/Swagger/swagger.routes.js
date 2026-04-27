// swagger/swagger.routes.js
// ─────────────────────────────────────────────────────────────────────────────
// Rôle : équivalent d'un fichier routes/ — monte Swagger UI sur /api-docs.
//
// INSTALLATION :
//   npm install swagger-ui-express
//
// INTÉGRATION dans app.js — 2 lignes :
//   import swaggerRouter from './swagger/swagger.routes.js';
//   app.use('/api-docs', swaggerRouter);
//
// Accès : http://localhost:3000/api-docs
// ─────────────────────────────────────────────────────────────────────────────

import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerConfig } from "./swagger.config.js";
import { swaggerPaths } from "./swagger.paths.js";

const router = Router();

// ── Assemblage du document OpenAPI final ─────────────────────────────────────
// On fusionne config (métadonnées + composants) et paths (routes)
// de la même façon que app.js importe et monte les routes séparées.
const swaggerDocument = {
	...swaggerConfig,
	paths: swaggerPaths,
};

// ── Options d'affichage Swagger UI ───────────────────────────────────────────
const swaggerUiOptions = {
	customSiteTitle: "Immigration API — Documentation",

	// Personnalisation CSS de la barre de titre
	customCss: `
    .swagger-ui .topbar { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); }
    .swagger-ui .topbar-wrapper img { display: none; }
    .swagger-ui .topbar-wrapper::after {
        content: '🏛️ Immigration API — Documentation';
        color: #e2e8f0;
        font-size: 1.1rem;
        font-weight: 600;
        letter-spacing: 0.02em;
    }
    .swagger-ui .info .title { color: #1a1a2e; }
`,

	swaggerOptions: {
		persistAuthorization: true, // conserve le token JWT entre les rechargements
		displayRequestDuration: true, // affiche le temps de réponse (utile pour le debug)
		tryItOutEnabled: true, // active "Try it out" par défaut sur chaque endpoint
		filter: true, // barre de recherche par tag ou nom de route
		deepLinking: true, // URL directe vers un endpoint (#/Clients/get_clients)
		defaultModelsExpandDepth: 1, // déplie les schémas 1 niveau par défaut
		defaultModelExpandDepth: 1,
	},
};

// ── Montage ──────────────────────────────────────────────────────────────────
router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument, swaggerUiOptions));

export default router;
