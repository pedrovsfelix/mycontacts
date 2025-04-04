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

  async store(request, response) {
    //Criar um novo registro
    const {
      name, email, phone, category_id
    } = request.body;

    if(!name) {
      return response.status(400).json({ error: 'Name is required'});
    }

    const contactExists = await ContactRepository.findByEmail(email);

    if(contactExists) {
      return response.status(400).json({ error: 'This e-mail is already in use.'});
    }

    const contact = await ContactRepository.create({
      name, email, phone, category_id,
    });

    return response.json(contact);

  }

  async update(request, response) {
    //Editar UM registro
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await ContactRepository.findById(id);
    if(!contactExists) {
      return response.status(404).json({ error: 'User not found.'});
    }

    if(!name) {
      return response.status(400).json({ error: 'Name is required'});
    }

    const contactByEmail = await ContactRepository.findByEmail(email);
    if(contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'This e-mail is already in use.'});
    }

    const contact = await ContactRepository.update(id, {
      name, email, phone, category_id,
    });

    response.json(contact);
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
