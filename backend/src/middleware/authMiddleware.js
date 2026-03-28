const jwt = require('jsonwebtoken');
const JWT_SECRET = "your_super_secret_key_123";

const authMiddleware = {
    // Verifying if the user is logged in with the JWT token
    verifyToken: (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1]; // Get token from "Bearer <token>"

        if (!token) {
            return res.status(403).json({ error: "No token provided. Access denied." });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded; // Add user data (id, role) to the request object
            next(); // Move to the next function
        } catch (err) {
            return res.status(401).json({ error: "Invalid or expired token." });
        }
    },

    // 🔑 2. Check if the user has the right Role
    authorizeRole: (requiredRole) => {
        return (req, res, next) => {
            if (req.user.role !== requiredRole) {
                return res.status(403).json({ 
                    error: `Access denied. ${requiredRole} status required.` 
                });
            }
            next();
        };
    }
};

module.exports = authMiddleware;
