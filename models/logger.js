'use strict';
module.exports = (sequelize, DataTypes) => {
  const Logger = sequelize.define('Logger', {
    timestamp: DataTypes.STRING,
    type: DataTypes.STRING,
    message: DataTypes.TEXT,
    trace: DataTypes.TEXT,
    notified: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Logger',
    tableName: 'loggers',
  });
  return Logger;
};