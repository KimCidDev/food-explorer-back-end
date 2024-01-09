const { Router } = require('express');
const userRoutes = require('./user.routes');
const dishRoutes = require('./dish.routes');

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/dishes', dishRoutes);

module.exports = routes;
