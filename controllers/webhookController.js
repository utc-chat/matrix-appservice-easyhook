const matrixClient = require('../config/matrixClient');

exports.index = async function (req, res) {
	matrixClient.send_message(req.body.roomId, req.body.text)
	// console.log(await matrixClient())
	// console.log(matrixClient)
	// console.log(req.body)
	res.json(true)
};
