const express = require('express');
const router = express.Router();
const WebhookController = require('../controllers/webhookController');
const models = require("../models");
const matrixClient = require('../config/matrixClient');
var _ = require('lodash');

router.post('/', WebhookController.index);

async function init() {
    const rules = await models.Rule.findAll({ where: { type: "webhook", active: true } });

    for (rule of rules) {
        router.post(rule.dataValues.webhookAddress, function (req, res) {
            const symbols = rule.dataValues.outputMessage.match(/(?<=\$)[^<\s]*/ig)
            let message = rule.dataValues.outputMessage
            for (symbol of symbols) {
                message = message.replace(`$${symbol}`, _.at(req.body, symbol)[0])
            }
            matrixClient.send_message(rule.dataValues.targetRoom, message)
            res.json(message)
        });
    }
}

init()

module.exports = router;
