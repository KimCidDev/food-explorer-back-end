class DishController {
  async create(request, response) {
    const { name, iceCreamFlavor } = request.body;

    return response.json({ name, iceCreamFlavor });
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
