'use strict';

module.exports = function (sequelize, DataTypes) {
  const settings = sequelize.define('Settings', {
    name: DataTypes.STRING,
    key: DataTypes.STRING,
    value: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Settings',
    tableName: 'settings',
  });

  return settings;
};

