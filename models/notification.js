'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    message: DataTypes.TEXT,
    action: DataTypes.STRING,
    type: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Notification',
    tableName: 'notifications',
  });
  Notification.associate = function (models) {
    // associations can be defined here
  };
  return Notification;
};