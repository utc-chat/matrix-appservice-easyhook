const models = require('../models');
const WebSocket = require('ws');
const CronJob = require('cron').CronJob;
var _ = require('lodash');
const matrixClient = require('../config/matrixClient');

const init_socket = async () => {
    const rules = await models.Rule.findAll({ where: { type: 'websocket', active: true } })

    rules.forEach(rule => {
        let cron;
        if (rule.dataValues.duration === 's') {
            cron = `*/${rule.dataValues.every} * * * * *`
        } else if (rule.dataValues.duration === 'm') {
            cron = `0 */${rule.dataValues.every} * * * *`
        } else if (rule.dataValues.duration === 'h') {
            cron = `0 0 */${rule.dataValues.every} * * *`
        } else if (rule.dataValues.duration === 'd') {
            cron = `0 0 0 */${rule.dataValues.every} * *`
        }

        const ws = new WebSocket(rule.dataValues.webhookAddress);

        ws.on('open', function open() {
            // ws.send('something');
        });

        ws.on('message', function message(buffer) {
            if (!rule.limit) {
                const data = JSON.parse(buffer.toString())
                const symbols = rule.dataValues.outputMessage.match(/(?<=\$)[^<\s]*/ig)
                let message = rule.dataValues.outputMessage
                for (symbol of symbols) {
                    symbol = symbol.replace("$", "")
                    message = message.replace(`$${symbol}`, _.at(data, symbol)[0])
                }
                matrixClient.send_message(rule.dataValues.targetRoom, message)
                rule.limit = true
            }
        });

        new CronJob(cron, async function () {
            rule.limit = false
        }, null, true);
    })
}

init_socket()