const AppError = require('../utils/AppError');

const knex = require('../database/knex');

class DishController {
  async create(request, response) {
    const { name, description, price, category, tags } = request.body;
    const user_id = request.user.id;

    const [dish_id] = await knex('dishes').insert({
      name,
      description,
      price,
      category,
      user_id
    });

    const tagInsertion = tags.map(name => {
      return {
        dish_id,
        name,
        user_id
      };
    });

    await knex('tags').insert(tagInsertion);

    return response.json({ name, description, price, category, dish_id });
  }

  async index(request, response) {
    const { name, tags } = request.query;

    let dishes;

    if (tags) {
      const targetTag = tags.split(',').map(tag => tag.trim());

      dishes = await knex('dishes')
        .select(['dishes.id', 'dishes.name'])
        .where('name', 'like', `%${name}%`)
        .innerJoin('tags', 'dishes.id', 'tags.dish_id')
        .whereIn('tags.name', targetTag)
        .groupBy('dishes.id')
        .orderBy('dishes.name');
    } else if (name) {
      dishes = await knex('dishes')
        .where('name', 'like', `%${name}%`)
        .orderBy('name');
      console.log(dishes);
    } else {
      dishes = await knex('dishes').orderBy('name');
    }

    return response.json(dishes);
  }

  async show(request, response) {
    const { id } = request.params;
    const user_id = request.user.id;

    const dish = await knex('dishes').where({ id }).first();
    console.log(dish);
    const tags = await knex('tags').where({ dish_id: id }).orderBy('name');

    return response.json({ dish, tags });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex('dishes').where({ id }).delete();

    return response.json();
  }
}

module.exports = DishController;
