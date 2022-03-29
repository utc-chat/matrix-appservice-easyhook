'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('bot', [
      {
        name: 'Crypto Bot',
        access_token: 'syt_Y3J5cHRvLWJvdA_iCrkyiegsmfknYJcZdEq_3Yp5iI',
        bot_id: '@crypto-bot:chat.zkx.ca'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('bot', null, {});
  }
};
