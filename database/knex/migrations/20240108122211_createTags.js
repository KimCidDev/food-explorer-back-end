exports.up = knex =>
  knex.schema.createTable('tags', table => {
    table.increments('id');
    table.string('name', 100).notNullable(); // Assuming tag names are relatively short

    table
      .integer('dish_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('dishes')
      .onDelete('CASCADE');
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');
  });

exports.down = knex => knex.schema.dropTable('tags');
