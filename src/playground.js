import './database';

import Customer from './app/models/Customer';

class Playgroung {
  static async play() {
    // const customer = await Customer.findByPk(1);

    // const customer = await Customer.findOne({
    //   // attributes: ['id', 'name'] //mostrar somente os atributos que desejo
    //   attributes: { exclude: ['status'] }, // ocultar um atributo
    // });

    const customers = await Customer.findAll({
      // attributes: ['id', 'name'] //mostrar somente os atributos que desejo
      attributes: { exclude: ['status'] }, // ocultar um atributo
      where: {
        id: 1,
      },
    });
    console.log(JSON.stringify(customers, null, 2));
  }
}
Playgroung.play();
