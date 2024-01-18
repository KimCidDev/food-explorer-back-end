const { hash, compare } = require('bcrypt');

const AppError = require('../utils/AppError');

const sqliteConnection = require('../database/sqlite');

class sessionController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const isThereUser = await database.get('SELECT * FROM users WHERE (?)', [
      email
    ]);

    if (isThereUser) {
      throw new AppError(
        'Esse usuário já está cadastrado. Utilize outro email'
      );
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const userWithUpdatedEmail = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== id) {
      throw new AppError('Este email já está e uso');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('Tu precisa digitar a senha antiga');
    }

    if (password && old_password) {
      const comparePasswords = await compare(password, old_password);

      if (!comparePasswords) {
        throw new AppError('A senha informada não está correta');
      }
    }

    await database.run(
      `
      UPDATE users SET
      name = ?,
      email = ?,
      updated_at = ?
      WHERE id = (?)`,
      [user.name, user.email]
    );
  }
}

module.exports = sessionController;
