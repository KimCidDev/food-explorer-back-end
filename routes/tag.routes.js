const { Router } = require('express');

const TagController = require('../controllers/tagController');
const tagController = new TagController();

const authenticate = require('../middleware/authenticate');

const tagsRoutes = Router();

tagsRoutes.get('/', authenticate, tagController.index);
tagsRoutes.post('/', authenticate, tagController.create);

module.exports = tagsRoutes;
