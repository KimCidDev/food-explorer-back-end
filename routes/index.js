const { Router } = require('express');
const userRoutes = require('./user.routes');
const dishRoutes = require('./dish.routes');
const tagRoutes = require('./tag.routes');
const sessionRoutes = require('./session.routes');
const paymentRoutes = require('./payment.routes');

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/dishes', dishRoutes);
routes.use('/tags', tagRoutes);
routes.use('/sessions', sessionRoutes);
routes.use('/payments', paymentRoutes);

module.exports = routes;
