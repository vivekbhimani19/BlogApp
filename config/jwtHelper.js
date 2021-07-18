const jwt = require('jsonwebtoken');
const logger = require("../Utils/tracer");

// this modulw is used to verify JWT Token
module.exports.verifyJwtToken = (req, res, next) => {
    logger.info("In verifyJwtToken");
    var token;
    if ('authorization' in req.headers) {
        token = req.headers['authorization'].split(' ')[1];
    }
    logger.info(token);
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    else {
        jwt.verify(token, process.env.JWT_SECRET,
            (err, decoded) => {
                if (err)
                    return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
                else {
                    req._id = decoded._id;
                    next();
                }
            }
        )
    }
}