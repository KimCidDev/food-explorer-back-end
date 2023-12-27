class NotesController {
  create(request, response) {
    const { name, iceCreamFlavor } = request.body;

    return response.json({ name, iceCreamFlavor });
  }
}

module.exports = NotesController;
