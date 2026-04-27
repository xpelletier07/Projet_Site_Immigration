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

export const verifyRole = (...roles) => {
    return (req, res, next) => {
        verifyToken(req, res, () => {
            // Vérifier le type de l'utilisateur au lieu du role
            if ((req.user.type === "admin") || roles.includes(req.user.type)) {
                return res.status(403).json({ error: "Accès interdit pour ce rôle." });
            }
            next();
        });
    };
};

export const verifyClientOwnership = (resourceType) => {
    const resourceConfig = {
        client: { table: 'client', idField: 'id_client', dossierField: 'id_client' },
        dossier: { table: 'dossier', idField: 'id_dossier', dossierField: 'id_dossier' },
        document: { table: 'documents', idField: 'id_document', dossierField: 'id_dossier' },
        facture: { table: 'facture', idField: 'id_facture', dossierField: 'id_dossier' },
        note: { table: 'note', idField: 'id_note', dossierField: 'id_dossier' },
        type_demande: { table: 'type_demande', idField: 'id_demande', dossierField: 'id_dossier' },
    };

    const config = resourceConfig[resourceType];
    if (!config) {
        throw new Error(`Type de ressource inconnu: ${resourceType}`);
    }

    return async (req, res, next) => {
        verifyToken(req, res, async () => {
            if (req.user.type !== "client") {
                return next();
            }

            const resourceId = req.params.id;
            if (!resourceId) {
                return res.status(400).json({ error: "ID de ressource manquant dans les paramètres." });
            }

            try {
                const resource = await db(config.table).where(config.idField, resourceId).first();
                if (!resource) {
                    return res.status(404).json({ error: "Ressource non trouvée." });
                }

                const dossierId = resource[config.dossierField];
                const dossier = await db('dossier').where('id_dossier', dossierId).first();
                if (!dossier || dossier.id_client !== req.user.id) {
                    return res.status(403).json({ error: "Accès interdit. Vous n'êtes pas propriétaire de cette ressource." });
                }

                next();
            } catch (error) {
                console.error("Erreur lors de la vérification de propriété:", error);
                res.status(500).json({ error: "Erreur interne du serveur." });
            }
        });
    };
};