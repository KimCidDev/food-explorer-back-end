const { Router } = require('express');

const DishController = require('../controllers/dishController');
const dishController = new DishController();

const authenticate = require('../middleware/authenticate');

const dishesRoutes = Router();

dishesRoutes.use(authenticate);

dishesRoutes.post('/', dishController.create);
dishesRoutes.get('/:id', dishController.show);
dishesRoutes.get('/', dishController.index);
dishesRoutes.delete('/:id', dishController.delete);

module.exports = dishesRoutes;
