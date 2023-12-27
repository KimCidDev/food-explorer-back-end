class NotesController {
  create(request, response) {
    const { name, iceCreamFlavour } = request.body;

    return response.json({ name, iceCreamFlavour });
  }
}

module.exports = NotesController;
