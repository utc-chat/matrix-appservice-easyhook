//const sentryLoader = require('./sentry');
const sequelizeLoader = require('./sequelize');
const expressLoader = require('./express');
const routerLoader = require('./router');
const cronLoader = require('./crons');

const fs = require('fs');

exports.init = async (app ) => {
    Logger.log("Loading Sequelize");
    const store = await sequelizeLoader.init();
    Logger.log("Loading Express");
    await expressLoader.init(app,store);
    Logger.log("Loading Routers");
    await routerLoader.init(app);

    //create tmp folder (maybe move to post load)
    const dir = './tmp';
    !fs.existsSync(dir) && fs.mkdirSync(dir);

    Logger.log("Loading Crons");
    await cronLoader.init();
};
