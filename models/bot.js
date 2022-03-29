'use strict';

module.exports = function (sequelize, DataTypes) {
  const Bot = sequelize.define('Bot', {
    name: DataTypes.STRING,
    access_token: DataTypes.STRING,
    bot_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Bot',
    tableName: 'bot',
  });

  return Bot;
};

