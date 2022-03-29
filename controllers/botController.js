const models = require('../models')

exports.index = async function (req, res) {
	const result = await models.Bot.findAll()
	return res.json(result);
}

exports.save = async function (req, res) {
	const data = req.body.data

	const exist = await models.Bot.findOne({ where: { bot_id: data.bot_id } });
	if (!data.id) {
		if (exist && !data.partCreate) {
			res.json("same_bot_id");
			return
		}

		await models.Bot.findOrCreate({
			where: { bot_id: data.bot_id },
			defaults: {
				bot_id: data.bot_id,
				name: data.name,
				access_token: data.access_token
			}
		})
	} else {
		const item = await models.Bot.findOne({ where: { id: data.id } });
		if (exist && (item.id != exist.id && !data.partCreate)) {
			res.json("same_bot_id");
			return
		}
		item.bot_id = data.bot_id;
		item.name = data.name;
		item.access_token = data.access_token;
		await item.save();
	}

	const result = await models.Bot.findAll()
	res.json(result);
};

exports.delete = async function (req, res) {
	await models.Bot.destroy({ where: { id: req.params.id } })
	const result = await models.Bot.findAll()
	return res.json(result);
};
