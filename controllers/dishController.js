class DishController {
  async create(request, response) {
    const { name, description } = request.body;
    const { id } = request.params;

    return response.json({ name, description });
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
