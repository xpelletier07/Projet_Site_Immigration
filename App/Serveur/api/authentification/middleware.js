import jwt from "jsonwebtoken";
const JWT = "";

export function verifyToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res
			.status(401)
			.json({
				message:
					"Vous devez être connecté pour accéder à cette ressource.",
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
			if (!roles.includes(req.user.role))
				return res
					.status(403)
					.json({ error: "Accès interdit pour ce rôle." });
			next();
		});
	};
};

//export default { verifyToken, verifyRole };
