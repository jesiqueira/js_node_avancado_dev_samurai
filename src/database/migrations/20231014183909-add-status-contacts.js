/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('contacts', 'status', {
      type: Sequelize.ENUM('ACTIVE', 'ARCHIVID'),
      allowNull: false,
      defaultValue: 'ACTIVE',
    });
  },

  async down(queryInterface) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('contacts', 'status', { transaction });
      await queryInterface.sequelize.query('DROP TYPE enum_contacts_status', { transaction });
    });
  },
};
