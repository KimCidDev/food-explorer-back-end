const { Router } = require('express');

const TagController = require('../controllers/tagController');
const tagController = new TagController();

const tagsRoutes = Router();

tagsRoutes.get('/:user_id', tagController.index);

module.exports = tagsRoutes;
