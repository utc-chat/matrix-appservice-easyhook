'use strict';

module.exports = function (sequelize, DataTypes) {
  const Rule = sequelize.define('Rule', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    webhookAddress: DataTypes.STRING,
    targetRoom: DataTypes.STRING,
    sendAs: DataTypes.STRING,
    outputMessage: DataTypes.STRING,
    cron: DataTypes.INTEGER,
    every: DataTypes.INTEGER,
    duration: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Rule',
    tableName: 'rule',
  });

  return Rule;
};

