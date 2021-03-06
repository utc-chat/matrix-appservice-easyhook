# Requirements
- Design an appserivce for matrix acting as a chatbot to listen to webhooks information and fetch API data reguarly, then forward the data to specified rooms.
- Incoming JSON can be formatted or manipulated by script or webUI([ex1](./ex1.md)).
- Output messages should support Plain-text, image contents, audio/video contents, customized sender profile(avatar, name).
- Output messages should be able to be sent to encrypted rooms, and E2EE(olm).
- The bot should be easy to be used by non-tech person, can be managed by chat commands and webUI.
- The bot need to run in a docker container, with docker-compose. 
- The appservice should store data in the matrix postgreSQL database.
- The project should be well documented and commented.
- The project should be i18n compatible, allow translation to different languages to be used in webUI.

# TODOs
- [ ] webhooks listener
- [ ] API fetcher
- [ ] forwarder
- [ ] JSON formatter
- [ ] olm encryption support
- [ ] management webUI
- [ ] dockerized
- [ ] markdown/HTML
- [ ] ducoments and comments

# Documents and example repos
- [Matrix Application Services](https://matrix.org/docs/guides/application-services)
- [Matrix JS SDK](https://matrix.org/docs/guides/usage-of-the-matrix-js-sdk)
- [matrix-appservice-discord](https://github.com/Half-Shot/matrix-appservice-discord)
- [matrix-hookshot](https://github.com/Half-Shot/matrix-hookshot)
## messages format
- [element-client](https://its.h-da.io/element-docs/en/messaging/formatting/)
- [matrix messages types](https://spec.matrix.org/v1.2/client-server-api/#mroommessage-msgtypes)
