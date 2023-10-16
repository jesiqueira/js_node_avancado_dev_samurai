import Customer from '../models/Customer';

// const customers = [
//   { id: 1, name: 'Dev Samurai', site: 'http://devsamurai.com.br' },
//   { id: 2, name: 'Google', site: 'http://google.com' },
//   { id: 3, name: 'UOL', site: 'http://uol.com.br' },
// ];

class CustomersController {
  // listagem dos registros
  async index(req, res) {
    const data = await Customer.findAll({ limit: 1000 });
    return res.json(data);
    // try {
    // } catch (error) {
    //   console.error(error);
    //   return res.status(500).json({ error: 'Internal server error' });
    // }
  }

  //   // Recupera um Customer
  //   show(req, res) {}

  //   // Cria um Customer
  //   create(req, res) {}

  //   // Atualiza um Customer
  //   updade(req, res) {}

  //   // Exclui um Customer
  //   destroy(req, res) {}
}

export default new CustomersController();
