'use strict';

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      isUnique: true,
      allowNull: false,
      validate: {
        isEmail: { msg: "Must be a valid email" },
        isLowercase: { msg: "Not Lowercase" }
      },

    },
    role_id: DataTypes.INTEGER,
    password: DataTypes.STRING,
  }, {
    timestamps: false,
    modelName: 'User',
    tableName: 'users',
    hooks: {
      beforeSave: (user, options) => {
        user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, SALT_ROUNDS) : null;
      }
    }
  });

  User.associate = function (models) {
    // associations can be defined here
  };


  return User;
};

