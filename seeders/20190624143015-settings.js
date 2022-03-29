'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('settings', [
            {
                name: 'Home Server',
                key: 'home_server',
                value: 'https://matrix.chat.zkx.ca',
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('settings', null, {});
    }
};
