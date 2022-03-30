const models = require('../models')

exports.index = async function (req, res) {
	const result = await models.Rule.findAll()
	return res.json(result);
}

exports.save = async function (req, res) {
	const data = req.body.data

	if (!data.id) {
		await models.Rule.findOrCreate({
			where: { id: data.id },
			defaults: {
				name: data.name,
				type: data.type,
				webhookAddress: data.webhookAddress,
				targetRoom: data.targetRoom,
				sendAs: data.sendAs,
				outputMessage: data.outputMessage,
				cron: data.cron,
				every: data.every,
				duration: data.duration,
				active: data.active,
			}
		})
	} else {
		const item = await models.Rule.findOne({ where: { id: data.id } });
		item.name = data.name;
		item.type = data.type;
		item.webhookAddress = data.webhookAddress;
		item.targetRoom = data.targetRoom;
		item.sendAs = data.sendAs;
		item.outputMessage = data.outputMessage;
		item.cron = data.cron;
		item.every = data.every;
		item.duration = data.duration;
		item.active = data.active;
		await item.save();
	}

	res.json(true);

	// restart server automatically after create a new rule for loading the new rules/
	process.exit(1);
};

exports.delete = async function (req, res) {
	await models.Rule.destroy({ where: { id: req.params.id } })
	const result = await models.Rule.findAll()
	res.json(result);

	process.exit(1);
};
