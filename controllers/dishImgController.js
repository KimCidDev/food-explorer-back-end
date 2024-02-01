const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/diskStorage');

class dishImgController {
  async update(request, response) {
    const user_id = request.user.id;
    const dishFileName = request.file.filename;

    const diskStorage = new DiskStorage();

    const dish = await knex('dishes').where({ user_id }).first();
    console.log(dish);

    if (!dish) {
      throw new AppError(
        'Somente pratos válidos podem atulizar a imagem, mermão',
        401
      );
    }

    if (dish.dishImg) {
      await diskStorage.deleteFile(dish.dishImg);
    }

    const fileName = await diskStorage.saveFile(dishFileName);
    dish.dishImg = fileName;

    await knex('dishes').update(dish).where({ id: user_id });

    return response.json(dish);
  }
}

module.exports = dishImgController;
