const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(request, response) {

    const contacts = await ContactRepository.findAll();
    //Listar todos os registros
    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactRepository.findById(id);

    //Obter UM registro apenas
    if(!contact) {
      // 404: Not found

      return response.status(404).json({error: 'User not found.'});
    }

    response.json(contact);
  }

  store() {
    //Criar um novo registro
  }

  update() {
    //Editar UM registro
  }

  async delete(request, response) {
    const { id } = request.params;

    const contact = await ContactRepository.findById(id);
    //Deletar um registro

    if(!contact) {
      return response.status(404).json({ error: 'User not found.'});
    }

    await ContactRepository.delete(id);

    // 204: No content
    response.sendStatus(204);

  }
}
// Singleton
module.exports = new ContactController();