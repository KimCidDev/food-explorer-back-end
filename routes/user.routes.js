const { Router } = require('express');

const UserController = require('../controllers/usersController');
const userController = new UserController();

const userRoutes = Router();

userRoutes.post('/', userController.create);

module.exports = userRoutes;
