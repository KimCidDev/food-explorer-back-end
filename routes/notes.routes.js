const { Router } = require('express');

const NotesController = require('../controllers/notesController');
const notesController = new NotesController();

const notesRoutes = Router();

notesRoutes.post('/notes', notesController.create);

module.exports = notesRoutes;
