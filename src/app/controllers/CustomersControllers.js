const customers = [
  { id: 1, name: 'Dev Samurai', site: 'http://devsamurai.com.br' },
  { id: 2, name: 'Google', site: 'http://google.com' },
  { id: 3, name: 'UOL', site: 'http://uol.com.br' },
];

class CustomersController {
  // listagem dos registros
  index(req, res) {
    return res.json(customers);
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
