'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('rule', [
      {
        name: 'ETHBTC Price',
        type: "json",
        webhookAddress: 'https://www.binance.com/api/v3/ticker/bookTicker?symbol=ETHBTC',
        targetRoom: "!AOUdFPDWMLytLnJqdk:chat.zkx.ca",
        sendAs: 1,
        outputMessage: "<p>Current $symbol price is $bidPrice</p>",
        every: 5,
        duration: "m",
        active: true
      },
      {
        name: 'Webhook',
        type: "webhook",
        webhookAddress: 'https://matrix.chat.zkx.ca/appservice-webhooks/api/v1/matrix/hook/SsR2Rnpk76pQ1Ltk5SG06RpqL55ADMZgqsURKaNWLV8hSMcpcM2gbGKqi2VweSGO',
        outputMessage: `{
          "text": "Hello world!",
          "format": "plain",
          "displayName": "My Cool Webhook",
          "avatar_url": "http://i.imgur.com/IDOBtEJ.png"
        }`,
        every: 5,
        duration: "m",
        active: true
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('rule', null, {});
  }
};
