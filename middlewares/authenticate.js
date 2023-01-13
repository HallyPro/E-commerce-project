const jwt = require('jsonwebtoken');


const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
       return res.status(401).json({ error: 'Unauthorized :('}); 
    }

    token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const {userId, name} = payload;
        req.user = { userId, name };
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized :('});
    }   
}

module.exports = auth;