require('express-async-errors');

const express = require('express');
const routes = require('./routes');
const AppError = require('./utils/AppError');
const uploadConfig = require('./configs/upload');

const migrationsRun = require('./database/sqlite/migrations');

const api = express();
const PORT = 5555;

migrationsRun();

api.use(express.json());
api.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

api.use('/files', express.static(uploadConfig.UPLOADS_FOLDER));

api.use(routes);

api.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  console.log(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
});
