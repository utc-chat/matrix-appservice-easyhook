const models = require("../models/index");
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

exports.init = async function() {
    const myStore = new SequelizeStore({
        db: models.sequelize,
    });
    try {
        myStore.sync();
    }catch (e) {
        console.log(e.message);
    }
    return myStore;
};
