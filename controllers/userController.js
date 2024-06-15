const { hash, compare } = require('bcrypt');
const AppError = require('../utils/AppError');
const knex = require('../database/knex');

class UserController {
  async create(request, response) {
    const { name, email, password, isAdmin } = request.body;

    const isThereUser = await knex('users').where({ email }).first();

    if (isThereUser) {
      throw new AppError(
        'Esse usuário já está cadastrado. Utilize outro email'
      );
    }

    const hashedPassword = await hash(password, 8);

    await knex('users').insert({
      name,
      email,
      password: hashedPassword,
      isAdmin
    });

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const user = await knex('users').where({ id: user_id }).first();

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const userWithUpdatedEmail = await knex('users').where({ email }).first();

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Este email já está e uso');
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError('Tu precisa digitar a senha antiga');
    }

    if (password && old_password) {
      const comparePasswords = await compare(old_password, user.password);

      if (!comparePasswords) {
        throw new AppError('A senha informada não está correta');
      }

      user.password = await hash(password, 8);
    }

    await knex('users')
      .update({
        name: user.name,
        email: user.email,
        password: user.password,
        updated_at: knex.fn.now()
      })
      .where({ id: user_id });

    return response.json({ user });
  }
}

module.exports = UserController;
