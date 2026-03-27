
const jwt = require("jsonwebtoken")
const JWT = ""

function middleware(req, res, next) {
    console.log("je suis un midleware")

    const authHeader = req.headers["authorization"]

    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: "Vous devez être connecté pour accéder à cette ressource." })
    }

    try {
        const decoded = jwt.verify(token, JWT)
        req.user = decoded
    } catch (err) {
        return res.status(401).json({ message: "Token invalide." })
    }

    next()
}

module.exports = {middleware}