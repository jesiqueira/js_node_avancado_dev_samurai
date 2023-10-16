import Sequelize, { Model } from 'sequelize';

class Contact extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        status: Sequelize.ENUM('ACTIVE', 'ARCHIVED'),
      },
      {
        sequelize,
        modelName: 'Contacts',
      }
    );
  }
  static associations(models) {
    this.belongsTo(models.Customer, { foreignKey: 'customer_id' });
  }
}

export default Contact;
