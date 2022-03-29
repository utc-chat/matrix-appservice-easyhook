const models = require('../models');
const CronJob = require('cron').CronJob;
var axios = require('axios')
var _ = require('lodash');
const matrixClient = require('../config/matrixClient');

const init_crons = async () => {
    const rules = await models.Rule.findAll({ where: { type: 'json' } })

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
        if (rule.dataValues.type === 'json') {
            new CronJob(cron, async function () {
                axios.get(rule.dataValues.webhookAddress).then(async function (response) {
                    const data = response.data
                    const symbols = rule.dataValues.outputMessage.match(/(?<=\$)[^<\s]*/ig)
                    let message = rule.dataValues.outputMessage
                    for (symbol of symbols) {
                        message = message.replace(`$${symbol}`, _.at(data, symbol)[0])
                    }
                    matrixClient.send_message(rule.dataValues.targetRoom, message, rule.dataValues.sendAs)
                });
            }, null, true);
        }
    })
}

init_crons()

