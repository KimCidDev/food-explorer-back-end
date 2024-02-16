const knex = require('../database/knex');

class TagController {
  async index(request, response) {
    const user_id = request.user.id;

    const tagList = await knex('tags').groupBy('name');

    return response.json({ tagList });
  }
}

module.exports = TagController;
