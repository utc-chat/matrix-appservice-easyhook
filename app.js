require('./services/logger');
const express = require('express');


async function startServer() {

    const app = express();
    module.exports = app;

    await require('./loaders').init(app);
}
startServer().catch((e)=>{Logger.exception(e.message)});
