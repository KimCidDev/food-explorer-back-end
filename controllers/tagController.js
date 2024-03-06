const knex = require('../database/knex');

class TagController {
  async create(request, response) {
    const { name, dish_id } = request.body;
    const user_id = request.user.id;

    const newTag = await knex('tags').insert({
      name,
      dish_id,
      user_id
    });

    return response.json({ newTag });
  }

  async index(request, response) {
    const user_id = request.user.id;

    const tagList = await knex('tags').groupBy('name');

    return response.json({ tagList });
  }
}

module.exports = TagController;
