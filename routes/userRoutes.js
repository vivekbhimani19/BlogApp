const express = require('express');
const userController = require('./../controllers/userController');
const userRouter = express.Router();
const jwtHelper = require('../config/jwtHelper');

// routes for CRUD operation in user
userRouter.route('/register').post(userController.register);
userRouter.route('/login').post(userController.authenticate);
userRouter.route('/deleteUser').delete(jwtHelper.verifyJwtToken,userController.delete);

module.exports = userRouter;