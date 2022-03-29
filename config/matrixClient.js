const models = require('../models');
const MatrixClient = require("matrix-bot-sdk").MatrixClient;
const AutojoinRoomsMixin = require("matrix-bot-sdk").AutojoinRoomsMixin;
var os = require('os');

let matrixClient

const init_matrix_client = async () => {
    const bot = await models.Bot.findOne()
    const settings = await models.Settings.findOne({ where: { key: 'home_server' } })

    const access_token = bot.dataValues.access_token
    const homeserver = settings.dataValues.value

    matrixClient = new MatrixClient(homeserver, access_token);
    AutojoinRoomsMixin.setupOnClient(matrixClient);
    matrixClient.start().then(() => console.log("Client started!"));

    console.log(`Started on ${os.hostname}`);
}

init_matrix_client()

exports.send_message = async (roomId, message, bot_name) => {
    await matrixClient.setDisplayName(bot_name)
    matrixClient.sendMessage(roomId, {
        "name": bot_name,
        "body": message,
        "format": "org.matrix.custom.html",
        "formatted_body": message,
        "msgtype": "m.text",
    });
}