const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../configs/upload');

const authenticate = require('../middleware/authenticate');

const UserController = require('../controllers/userController');
const userController = new UserController();

const UserAvatarController = require('../controllers/userAvatarController');
const userAvatarController = new UserAvatarController();

const userRoutes = Router();
const upload = multer(uploadConfig.MULTER);

userRoutes.post('/', userController.create);
userRoutes.put('/', authenticate, userController.update);
userRoutes.patch(
  '/avatar',
  authenticate,
  upload.single('avatar'),
  userAvatarController.update
);

module.exports = userRoutes;
