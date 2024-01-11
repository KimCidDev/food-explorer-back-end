const { Router } = require('express');

const DishController = require('../controllers/dishController');
const dishController = new DishController();

const dishesRoutes = Router();

dishesRoutes.post('/:user_id', dishController.create);
dishesRoutes.get('/:id', dishController.show);
dishesRoutes.get('/', dishController.index);
dishesRoutes.delete('/:id', dishController.delete);

module.exports = dishesRoutes;
