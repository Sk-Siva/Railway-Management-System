const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    console.log("token :" ,token );
    
    if (!token) return res.status(403).json({ message: 'Token is required!' });
    console.group("token is required")
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token!' });
        console.log("invalid token")
        
        req.user = user;
        console.log("user set successfully")
        next();
    });
};
