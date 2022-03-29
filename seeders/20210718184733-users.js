'use strict';
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@utc-chat.com',
        role_id: '1',
        password: bcrypt.hashSync('a', SALT_ROUNDS),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
