exports.up = knex =>
  knex.schema.createTable('dishes', table => {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.text('description').notNullable();
    table.decimal('price', 10, 2).notNullable(); // Assuming price is a decimal value
    table.string('category', 100).notNullable();
    table.integer('quantity').defaultTo(1).notNullable();
    table.string('dishImg').defaultTo(null);
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTable('dishes');
