import jwt from "jsonwebtoken";
import { db } from "../../db/db.js";

const JWT = process.env.JWT_SECRET || "dev_secret_change_me";

export function verifyToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({
			message: "Vous devez être connecté pour accéder à cette ressource.",
		});
	}

	try {
		const decoded = jwt.verify(token, JWT);
		req.user = decoded;
	} catch (err) {
		return res.status(401).json({ message: "Token invalide." });
	}

	next();
}

// verifyRole — garde l'admin toujours autorisé, vérifie les autres rôles
// Correction : la condition était inversée (|| au lieu de &&, et ! manquant)
export const verifyRole = (...roles) => {
	return (req, res, next) => {
		verifyToken(req, res, () => {
			if (req.user.type !== "admin" && !roles.includes(req.user.type)) {
				return res
					.status(403)
					.json({ error: "Accès interdit pour ce rôle." });
			}
			next();
		});
	};
};

// verifyAdmin — admin seulement (ex: gestion des employés)
export function verifyAdmin(req, res, next) {
	verifyToken(req, res, () => {
		if (req.user.type !== "admin") {
			return res
				.status(403)
				.json({ error: "Accès réservé aux administrateurs." });
		}
		next();
	});
}

// verifyEmploye — utilisateur ou admin (ex: gérer clients, notes, factures)
// Correction : remplace l'appel à _extractToken() inexistant par verifyToken()
export function verifyEmploye(req, res, next) {
	verifyToken(req, res, () => {
		if (req.user.type !== "utilisateur" && req.user.type !== "admin") {
			return res
				.status(403)
				.json({ error: "Accès réservé aux employés." });
		}
		next();
	});
}

// verifyClientOrEmploye — client, utilisateur ou admin (ex: faire une demande)
// Correction : remplace l'appel à _extractToken() inexistant par verifyToken()
export function verifyClientOrEmploye(req, res, next) {
	verifyToken(req, res, () => {
		const allowed = ["client", "utilisateur", "admin"];
		if (!allowed.includes(req.user.type)) {
			return res.status(403).json({ error: "Accès interdit." });
		}
		next();
	});
}

export function verifyClientHasAccessToDossier(req, res, next) {
	verifyToken(req, res, async () => {
		if (req.user.type !== "client") {
			return next();
		}
		try {
			const dossierId =
				req.params.idDossier || req.params.id || req.body.id_dossier;

			if (!dossierId) {
				return res
					.status(400)
					.json({ error: "ID de dossier manquant dans la requête." });
			}

			const dossier = await db("dossier")
				.where("id_dossier", dossierId)
				.first();

			if (!dossier) {
				return res.status(404).json({ error: "Dossier introuvable." });
			}

			if (dossier.id_client !== req.user.id) {
				return res.status(403).json({
					error: "Accès interdit à ce dossier.",
				});
			}

			next();
		} catch (error) {
			console.error("Erreur verifyClientHasAccessToDossier:", error);
			return res.status(500).json({
				error: "Erreur interne serveur.",
			});
		}
	});
}

export function verifyClientOwnsProfile(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.type !== "client") {
            return next(); 
        }
        const requestedId = parseInt(req.params.id);
        if (req.user.id !== requestedId) {
            return res.status(403).json({ error: "Accès interdit à ce profil." });
        }
        next();
    });
}

// Middlewares spécifiques pour les permissions de routes
export function verifyConnected(req, res, next) {
	return verifyToken(req, res, next);
}

export function verifyAdminOnly(req, res, next) {
	return verifyAdmin(req, res, next);
}

export function verifyEmployeOrAdmin(req, res, next) {
	return verifyEmploye(req, res, next);
}
