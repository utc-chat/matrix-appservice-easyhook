'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('room', [
      {
        name: 'Room 1',
        room_id: '!AOUdFPDWMLytLnJqdk:chat.zkx.ca'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('room', null, {});
  }
};
