const { Router } = require('express');

const multer = require('multer');
const uploadConfig = require('../configs/upload');
const upload = multer(uploadConfig.MULTER);

const DishController = require('../controllers/dishController');
const dishController = new DishController();
const DishImgController = require('../controllers/dishImgController');
const dishImgController = new DishImgController();

const authenticate = require('../middleware/authenticate');

const dishesRoutes = Router();

dishesRoutes.use(authenticate);

dishesRoutes.post('/', dishController.create);
dishesRoutes.get('/', dishController.index);
dishesRoutes.get('/:id', dishController.show);
dishesRoutes.delete('/:id', dishController.delete);
dishesRoutes.patch(
  '/dishImg/:id',
  authenticate,
  upload.single('dishImg'),
  dishImgController.update
);

module.exports = dishesRoutes;
