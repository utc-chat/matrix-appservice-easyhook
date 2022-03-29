'use strict';

const fs = require('fs');
const path = require('path');
const { kill } = require('process');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const databases = Object.keys(config.databases);

/** Add Databases**/
for (let i = 0; i < databases.length; ++i) {
    let database = databases[i];
    let dbPath = config.databases[database];
    db[database] = new Sequelize(dbPath.database, dbPath.username, dbPath.password, dbPath);
}

/**Add the Database Models**/
//Add models from main model folder
fs
    .readdirSync(__dirname + '/')
    .filter(file =>
        (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js'))
    .forEach(file => {
        var model = require(path.join(__dirname, file))(db.system, Sequelize);
        db[model.name] = model;
    });


Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = db.system;

module.exports = db;
