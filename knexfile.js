const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'database', 'database.db')
    },
    migrations: {
      directory: path.resolve(__dirname, 'database', 'knex', 'migrations')
    },
    useNullAsDefault: true
  }
};
