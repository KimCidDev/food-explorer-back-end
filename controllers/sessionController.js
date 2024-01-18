const AppError = require('../utils/AppError');

const knex = require('../database/knex');

class sessionController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const user = await knex('users').where({ email }).first();

    if (!user) {
      throw new AppError(
        'te liga, mermão. Com esse email tu vai ter que te cadastrar primeiro',
        201
      );
    }

    return response.json(user);
  }
}

module.exports = sessionController;
