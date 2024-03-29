exports.up = knex =>
  knex.schema.createTable('dishes', table => {
    table.increments('id');
    table.text('name');
    table.text('description');
    table.text('price');
    table.text('category');
    table.integer('quantity').defaultTo(1);
    table.text('dishImg').defaultTo(null);
    table.integer('user_id').references('id').inTable('users');

    table.timestamp('created_at').default(knex.fn.now());
    table.timestamp('updated_at').default(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTable('dishes');
