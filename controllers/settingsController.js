const models = require('../models')

exports.index = async function (req, res) {
	const result = await models.Settings.findAll()
	return res.json(result);
}

exports.save = async function (req, res) {
	const data = req.body.data

	const exist = await models.Settings.findOne({ where: { key: data.key } });
	if (!data.id) {
		if (exist && !data.partCreate) {
			res.json("same_key");
			return
		}

		await models.Settings.findOrCreate({
			where: { key: data.key },
			defaults: {
				key: data.key,
				name: data.name,
				value: data.value,
			}
		})
	} else {
		const item = await models.Settings.findOne({ where: { id: data.id } });
		if (exist && (item.id != exist.id && !data.partCreate)) {
			res.json("same_key");
			return
		}
		item.key = data.key;
		item.name = data.name;
		item.value = data.value;
		await item.save();
	}

	const result = await models.Settings.findAll()
	res.json(result);
};

exports.delete = async function (req, res) {
	await models.Settings.destroy({ where: { id: req.params.id } })
	const result = await models.Settings.findAll()
	return res.json(result);
};
