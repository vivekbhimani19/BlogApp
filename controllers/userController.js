const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const logger = require("../Utils/tracer");

//this module is register new user
module.exports.register = (req, res, next) => {
    logger.info("In register");
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

//this module is used to authenticate user
module.exports.authenticate = (req, res, next) => {
    logger.info("In authenticate");
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(400).json(err);
        }
        else if (user) {
            return res.status(200).json({ "token": user.generateJwt() });
        }
        else {
            return res.status(404).json(info);
        }
    })(req, res);
}

//this module is used to delete user
module.exports.delete = (req, res, next) => {
    logger.info("In delete");
    const email = req.body.email;
    User.deleteOne({"email": email}, (err,data) => {
        console.log(data)
        if (err) {
            return res.status(400).json(err);
        }
        else if (data) {
            return res.status(200).json({ "messgage" : "User successfully deleted"});
        }
    });
}