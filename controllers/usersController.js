const { hash } = require('bcrypt');

const AppError = require('../utils/AppError');

const sqliteConnection = require('../database/sqlite');

class UserController {
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
}

module.exports = UserController;
