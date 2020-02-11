'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return (
      queryInterface.addColumn('user', 'created_at', {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      }))
    .then(() => {
      queryInterface.addColumn('user', 'updated_at', {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      })
    })
    .then(() => {
      queryInterface.addColumn('user', 'role', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        after: 'password' // PostgreSQLでは無効なオプションです
      })
    });

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return (
      queryInterface.removeColumn('user', 'created_at')
    ).then(() => {
      queryInterface.removeColumn('user', 'updated_at')
    }).then(() => {
      queryInterface.removeColumn('user', 'role')
    })
  }
};
