const { Router } = require('express');
const userRoutes = require('./user.routes');
const dishRoutes = require('./dish.routes');
const tagRoutes = require('./tag.routes');

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/dishes', dishRoutes);
routes.use('/tags', tagRoutes);

module.exports = routes;
