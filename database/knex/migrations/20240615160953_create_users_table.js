exports.up = async function (knex) {
  const exists = await knex.schema.hasTable('users');
  if (!exists) {
    return knex.schema.createTable('users', table => {
      table.increments('id');
      table.string('name', 50).notNullable();
      table.string('email', 100).notNullable().unique();
      table.string('password', 255).notNullable();
      table.boolean('isAdmin').defaultTo(false);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  }
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
