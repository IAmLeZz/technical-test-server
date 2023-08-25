'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Launches', {
      year: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      launches: {
        type: Sequelize.INTEGER
      },
      successful_launches: {
        type: Sequelize.INTEGER
      },
      failed_launches: {
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Launches');
  }
};