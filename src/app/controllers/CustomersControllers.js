import { Op } from 'sequelize';
import { parseISO } from 'date-fns';
import * as Yup from 'yup';

import Customer from '../models/Customer';
import Contact from '../models/Contact';

// const customers = [
//   { id: 1, name: 'Dev Samurai', site: 'http://devsamurai.com.br' },
//   { id: 2, name: 'Google', site: 'http://google.com' },
//   { id: 3, name: 'UOL', site: 'http://uol.com.br' },
// ];

class CustomersController {
  // listagem dos registros
  async index(req, res) {
    const { name, email, status, createdBefore, createdAfter, updatedBefore, updatedAfter, sort } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 25;

    // localhost:3000/customers?createdAfter=2059-12-13
    // localhost:3000/customers?page2&limit=25
    // 250 registro (10 paginas)
    // pg 2 (25 - 50)

    let where = {};
    let order = [];

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
          [Op.in]: status.split(',').map((item) => item.toUpperCase()),
        },
      };
    }
    if (createdBefore) {
      where = {
        ...where,
        createdAt: {
          [Op.gte]: parseISO(createdBefore),
        },
      };
    }
    if (createdAfter) {
      where = {
        ...where,
        createdAt: {
          [Op.lte]: parseISO(createdAfter),
        },
      };
    }
    if (updatedBefore) {
      where = {
        ...where,
        updatedAt: {
          [Op.gte]: parseISO(updatedBefore),
        },
      };
    }
    if (updatedAfter) {
      where = {
        ...where,
        updatedAt: {
          [Op.lte]: parseISO(updatedAfter),
        },
      };
    }

    // localhost:3000/customers?sort=id:desc,name
    // order: [['name', 'asc'], ['email', 'desc']]
    if (sort) {
      order = sort.split(',').map((item) => item.split(':'));
    }

    try {
      const data = await Customer.findAll({
        where,
        include: [
          {
            model: Contact,
            attributes: ['id', 'status'],
          },
        ],
        order,
        limit,
        offset: limit * page - limit, // 25 * 10 - 25
      });
      return res.json(data);
    } catch (error) {
      //   console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Recupera 1 Customer
  async show(req, res) {
    try {
      const customer = await Customer.findByPk(req.params.id);

      if (!customer) {
        res.status(404).json({ error: 'Nada foi localizado!' });
      } else {
        return res.json(customer);
      }
    } catch (error) {
      return res.status(404).json({ error: 'Nada foi localizado!' });
    }
  }

  // Cria um Customer
  async create(req, res) {
    //Validar os campos obrigatório no banco de dados
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      status: Yup.string().uppercase(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Error de validação dos campos!' });
    }
    try {
      const customer = await Customer.create(req.body);
      return res.status(201).json(customer);
    } catch (error) {}
  }

  // Atualiza um Customer
  async updade(req, res) {
    //Validar os campos obrigatório no banco de dados
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      status: Yup.string().uppercase(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Error de validação dos campos!' });
    }
    try {
      const customer = await Customer.findByPk(req.params.id);

      if (!customer) {
        return res.status(404).json({ error: 'Nada localizado' });
      } else {
        await customer.update(req.body);
        return res.status(200).json(customer);
      }
    } catch (error) {}
  }

  // Exclui um Customer
  async destroy(req, res) {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json({ error: 'Nada localizado' });
    } else {
      await customer.destroy(req.body);
      return res.status(200).json();
    }
  }
}

export default new CustomersController();
