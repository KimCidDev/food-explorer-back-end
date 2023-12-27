require('express-async-errors');

const express = require('express');
const routes = require('./routes');

const database = require('./database/sqlite');

const api = express();
const PORT = 5555;

database();

api.use(express.json());
api.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

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
