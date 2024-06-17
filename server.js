require('express-async-errors');
require('dotenv/config');

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const AppError = require('./utils/AppError');
const uploadConfig = require('./configs/upload');
const knex = require('./database/knex');

const api = express();
const PORT = process.env.PORT || 3000;

// Replace this with your actual frontend URL
const allowedOrigins = ['https://favemeal.netlify.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

api.use(cors(corsOptions));
api.use(express.json());

// Run migrations
knex.migrate
  .latest()
  .then(() => console.log('Database migrated'))
  .catch(error => console.error('Migration failed:', error));

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

  console.error(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
});
