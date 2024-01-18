const AppError = require('../utils/AppError');

const knex = require('../database/knex');

class DishController {
  async create(request, response) {
    const { name, description, tags } = request.body;
    const user_id = request.user.id;

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
    const { name, tags } = request.query;
    const user_id = request.user.id;

    let dishes;

    if (tags) {
      const targetTag = tags.split(',').map(tag => tag.trim());
      console.log(targetTag);

      dishes = await knex('tags')
        .select(['dishes.id', 'dishes.name', 'dishes.user_id'])
        .where('dishes.user_id', user_id)
        .whereLike('dishes.name', `%${name}%`)
        .whereIn('tags.name', targetTag)
        .innerJoin('dishes', 'dishes.id', 'tags.dish_id')
        .orderBy('dishes.name');
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
