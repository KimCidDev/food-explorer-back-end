const AppError = require('../utils/AppError');

const knex = require('../database/knex');

class DishController {
  async create(request, response) {
    const { name, description, tags } = request.body;
    const { user_id } = request.params;

    const [dish_id] = await knex('dishes').insert({
      name,
      description,
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

    return response.json({ name, description, dish_id });
  }

  async index(request, response) {
    const { user_id, name, tags } = request.query;

    let dishes;

    if (tags) {
      const targetTag = tags.split(',').map(tag => tag.trim());

      dishes = await knex('tags').whereIn('name', targetTag);
    } else {
      dishes = await knex('dishes')
        .where({ user_id })
        .whereLike('name', `%${name}%`)
        .orderBy('name');
    }

    return response.json({ dishes });
  }
  async show(request, response) {
    const { id } = request.params;

    const dish = await knex('dishes').where({ id }).first();
    const tags = await knex('tags').where({ user_id: id }).orderBy('name');
    console.log(tags);

    return response.json({ ...dish, tags });
  }
  async delete(request, response) {
    const { id } = request.params;

    await knex('dishes').where({ id }).delete();

    return response.json();
  }
}

module.exports = DishController;
