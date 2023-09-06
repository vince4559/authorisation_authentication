const allowedOrigins = require('../config/allowedOrigins');

const credentails = (req, res, next) => {
    const origin = req.headers.origin;
    if(allowedOrigins.includes(origin)) {
        res.headers("Access-Control-Allow-credentials", true);
    }
    next()
}

module.exports = credentails