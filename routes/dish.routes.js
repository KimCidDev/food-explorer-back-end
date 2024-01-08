const { Router } = require('express');

const DishController = require('../controllers/dishController');
const dishController = new DishController();

const notesRoutes = Router();

notesRoutes.post('/', dishController.create);

module.exports = notesRoutes;
