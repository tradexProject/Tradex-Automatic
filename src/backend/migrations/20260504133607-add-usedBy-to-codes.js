'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Codes', 'usedBy', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'isUsed' 
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Codes', 'usedBy');
  }
};