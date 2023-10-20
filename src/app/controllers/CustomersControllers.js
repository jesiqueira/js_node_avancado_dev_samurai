import { Op } from 'sequelize';
import Customer from '../models/Customer';

// const customers = [
//   { id: 1, name: 'Dev Samurai', site: 'http://devsamurai.com.br' },
//   { id: 2, name: 'Google', site: 'http://google.com' },
//   { id: 3, name: 'UOL', site: 'http://uol.com.br' },
// ];

class CustomersController {
  // listagem dos registros
  async index(req, res) {
    const { name, email, status, createdBefore, createdAfter, updatedBefore, uṕdatedAfter, sort } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 25;

    // localhost:3000/customers?createdAfter=2059-12-13
    // localhost:3000/customers?page2&limit=25
    // 250 registro (10 paginas)
    // pg 2 (25 - 50)

    let where = {};
    if (name) {
      where = {
        ...where,
        name: {
          [Op.iLike]: name,
        },
      };
    }
    if (email) {
      where = {
        ...where,
        email: {
          [Op.iLike]: email,
        },
      };
    }

    // localhost:3000/customers?status=active,archived
    if (status) {
      where = {
        ...where,
        status: {
          [Op.in]: ['ACTIVE', 'ARCHIVED'],
        },
      };
    }

    try {
      const data = await Customer.findAll({ limit: 1000 });
      return res.json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
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
