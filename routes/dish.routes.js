const { Router } = require('express');

const DishController = require('../controllers/dishController');
const dishController = new DishController();

const notesRoutes = Router();

notesRoutes.post('/:user_id', dishController.create);

module.exports = notesRoutes;
