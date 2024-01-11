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

  update(request, response) {
    const { name, iceCreamFlavor } = request.body;

    return response.json({ name, iceCreamFlavor });
  }
  show(request, response) {
    const { name, iceCreamFlavor } = request.body;

    return response.json({ name, iceCreamFlavor });
  }
  delete(request, response) {
    const { name, iceCreamFlavor } = request.body;

    return response.json({ name, iceCreamFlavor });
  }
}

module.exports = DishController;
