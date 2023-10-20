import Sequelize, { Model, Op } from 'sequelize';

class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        status: Sequelize.ENUM('ACTIVE', 'ARCHIVED'),
      },
      {
        sequelize,
        name: {
          singular: 'customer',
          plural: 'customers',
        },
        scopes: {
          active: {
            where: {
              status: 'ACTIVE',
            },
          },
          samurai: {
            where: {
              name: 'Dev Samurai',
            },
          },
        },
        created(date) {
          return {
            where: {
              createdAt: {
                [Op.gte]: date,
              },
            },
          };
        },
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Contact);
  }
}

export default Customer;
