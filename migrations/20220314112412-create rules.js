'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('rule', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      webhookAddress: {
        type: Sequelize.STRING,
      },
      targetRoom: {
        type: Sequelize.STRING,
      },
      sendAs: {
        type: Sequelize.STRING,
      },
      outputMessage: {
        type: Sequelize.TEXT,
      },
      cron: {
        type: Sequelize.INTEGER,
      },
      every: {
        type: Sequelize.INTEGER,
      },
      duration: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('rule');
  }
};