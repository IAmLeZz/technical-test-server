'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payloads', {
      type_of_payload: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      times_launched: {
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payloads');
  }
};