const jwt = require("jsonwebtoken");


require("dotenv").config(); // Load environment variables


const authenticateToken = (req, res, next) =>{
    // Check if the Authorization header is present
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Token missing" });
    }
  
    // Verify the token
    jwt.verify(token, process.env.TWJ, (err, user) => {
        if (err) {
            // Handle different errors
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ error: "Token has expired" });
            } else if (err.name === "JsonWebTokenError") {
                return res.status(403).json({ error: "Invalid token" });
            }
            return res.status(403).json({ error: "Token verification failed" });
        }
  
        // Attach user information to request object
        req.user = user;
        next();
    });
  }
  
module.exports=authenticateToken
    