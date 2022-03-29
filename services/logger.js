const https = require('https');
const url = require('url');
const models = require('../models');
const LoggerModel = models.Logger;

class Logger{}

/*
Logger Class

Env file options:

LOGGER_LEVEL=0
Levels - lower number includes higher numbers
0 - Debug - please use only for development since it will not be send to log server or stored to DB
1 - Log - for any data that would be good help in researching any found bugs, it will store to DB and
            send to server but without trace
2 - Warning - all information that is required for stable continuation of procedures
3 - Error - for all error messages
4 - Exception - all exception messages

LOGGER_LOG_SERVER=http://lab-rat.com/project/product-data/api/logger
If set Logger will try to send captured logs to URL in this option.

LOGGER_TOKEN=jh23g4jh2g54g5uyg
In case if its required by server this will be appended to url as access_token.

LOGGER_NAMESPACE=product-data.lab-rat.com
Option to set namespace so log server can separate logs by different server instead to have them all mixed.
 */

Logger.debug=function(string, trace){
    if(process.env.LOGGER_LEVEL === 0) {
        console.log(string);
        if (trace === true) {
            console.trace();
        }
    }
};

Logger.log=function(string){
    if(process.env.LOGGER_LEVEL > 1) return;

    console.log(string);
    const trace = new Error().stack;

    Logger.storeData(string, trace, 'LOG');
};

Logger.warning=function(string){
    if(process.env.LOGGER_LEVEL > 2) return;

    console.log('\x1b[33m%s\x1b[0m', string);
    const trace = new Error().stack;

    Logger.storeData(string, trace, 'WARNING');
};

Logger.error=function(string){
    if(process.env.LOGGER_LEVEL > 3) return;

    console.log('\x1b[31m%s\x1b[0m', string);
    const trace = new Error().stack;

    Logger.storeData(string, trace, 'ERROR');
};

Logger.exception=function(string){
    if(process.env.LOGGER_LEVEL > 4) return;

    console.log('\x1b[31m%s\x1b[0m', string);
    const trace = new Error().stack;

    Logger.storeData(string, trace, 'EXCEPTION');
};

Logger.storeData = async function(message,trace, type){
    const timestamp = Date.now();
    const notified = await this.sendToServer(message, trace, type, timestamp);
    this.storeToDatabase(message, trace, type, timestamp, notified);

};

Logger.storeToDatabase = function(message, trace, type, timestamp,notified){
    const log = new LoggerModel();
    log.timestamp = timestamp;
    log.type = type;
    log.message = message;
    log.trace = trace;
    log.notified = notified;
    log.save();
};

Logger.sendToServer=function(message,trace, type,timestamp){
    if(process.env.LOGGER_LOG_SERVER === undefined) return false;
    const uri = url.parse(process.env.LOGGER_LOG_SERVER);
    if(uri.hostname === null || uri.hostname === undefined || uri.path === '/') return false;

    const data = JSON.stringify({
        message: message,
        trace: trace,
        type: type,
        timestamp: timestamp
    });
    const options = {
        hostname: uri.hostname,
        port: 443,
        path: uri.path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = https.request(options, (res) => {
        res.on('data', (d) => {
            process.stdout.write(d);
        });
    });

    req.on('error', (error) => {
        console.error(error);
    });

    req.write(data);
    req.end();
};


global.Logger = Logger;
