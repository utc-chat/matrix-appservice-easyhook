'use strict';

module.exports = function (sequelize, DataTypes) {
  const Room = sequelize.define('Room', {
    name: DataTypes.STRING,
    room_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Room',
    tableName: 'room',
  });

  return Room;
};

