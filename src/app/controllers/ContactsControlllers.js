import { Op } from 'sequelize';
import { parseISO } from 'date-fns';
import * as Yup from 'yup';

import Customer from '../models/Customer';
import Contact from '../models/Contact';

class ContactsController {
  // listagem dos registros
  async index(req, res) {
    const { name, email, status, createdBefore, createdAfter, updatedBefore, updatedAfter, sort } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 25;

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
      const data = await Contact.findAll({
        where,
        include: [
          {
            model: Customer,
            attributes: ['id', 'status'],
            required: true, // forçar que seja realizado o INNER JOIN
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
  async show(req, res) {
    try {
      const contact = await Contact.findByPk(req.params.id);

      if (!contact) {
        res.status(404).json({ error: 'Nada foi localizado!' });
      } else {
        return res.json(contact);
      }
    } catch (error) {
      return res.status(404).json({ error: 'Nada foi localizado!' });
    }
  }
}

export default ContactsController;
