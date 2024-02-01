const { Router } = require('express');

const authenticate = require('../middleware/authenticate');

const UserController = require('../controllers/userController');
const userController = new UserController();

const userRoutes = Router();

userRoutes.post('/', userController.create);
userRoutes.put('/', authenticate, userController.update);

module.exports = userRoutes;
