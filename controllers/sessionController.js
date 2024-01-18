const AppError = require('../utils/AppError');

const { compare } = require('bcrypt');

const knex = require('../database/knex');

class sessionController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const user = await knex('users').where({ email }).first();

    if (!password) {
      throw new AppError('Preciso verificar tua senha, mermão', 401);
    }

    if (!user) {
      throw new AppError(
        'te liga, mermão. Com esse email tu vai ter que te cadastrar primeiro',
        401
      );
    }

    const passwordMatch = await compare(password, user.password);
    console.log(passwordMatch);

    if (!passwordMatch) {
      throw new AppError('Perdão, a senha não é a mesma', 401);
    }

    return response.json(user);
  }
}

module.exports = sessionController;
