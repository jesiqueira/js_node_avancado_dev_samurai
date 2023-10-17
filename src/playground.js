import './database';

import Customer from './app/models/Customer';
import Contact from './app/models/Contact';
import { Op } from 'sequelize';

class Playgroung {
  static async play() {
    // const customer = await Customer.findByPk(1);

    // const customer = await Customer.findOne({
    //   // attributes: ['id', 'name'] //mostrar somente os atributos que desejo
    //   attributes: { exclude: ['status'] }, // ocultar um atributo
    // });

    // const customers = await Customer.findAll({
    //   // attributes: ['id', 'name'] //mostrar somente os atributos que desejo
    //   attributes: { exclude: ['status'] }, // ocultar um atributo
    //   where: {
    //     id: 1,
    //   },
    // });
    // const customers = await Customer.findAll({
    //   where: {
    //     status: {
    //       //   [Op.eq]: 'ACTIVE',
    //       [Op.in]: ['ACTIVE'],
    //     },
    //     //     name: {
    //     //         [Op.like]: 'Dev%'
    //     //     }
    //     // createadAt: {
    //     //   [Op.between]: [new Date(2023, 9, 14), new Date(2023, 12, 31)],
    //     // },
    //   },
    // });
    // const customers = await Customer.findAll({
    //   include: [
    //     {
    //       model: Contact,
    //       where: {
    //         status: 'ACTIVE', //Inner Join
    //       },
    //       required: false, // Left Join -> join default
    //     },
    //   ],
    //   where: {
    //     [Op.or]: {
    //       status: {
    //         [Op.in]: ['ACTIVE'],
    //       },
    //       name: {
    //         [Op.like]: 'Dev%',
    //       },
    //     },
    //   },
    //   order: [['name', 'desc'], ['created_at']],
    //   limit: 2,
    //   offset: 2 * 1 - 2, // limit * page - limit
    // });

    // const customers = await Customer.count()
    // const customers = await Customer.scope('active').findAll()
    // const customers = await Customer.scope({ method: ['created', new Date(2023, 1, 1)] }).findAll();
    // const customers = await Customer.scope(['active', 'samurai']).findAll();
    
    // const customer = await Customer.create({name: 'Supermercado Zazá', email:'contato1@zaza.com.br'})
    // const customer = await Customer.findByPk(7)
    // console.log("Antes: ",JSON.stringify(customer, null, 2));
    
    // const newCustomer = await customer.update({status: 'ARCHIVED'})
    // console.log("Depois: ",JSON.stringify(newCustomer, null, 2));

    // customer.destroy()
    const customer1 = await Customer.findAll()
    console.log("Após remover: ",JSON.stringify(customer1, null, 2));

  }
}
Playgroung.play();
