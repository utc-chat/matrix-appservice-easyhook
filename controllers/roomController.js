const models = require('../models')

exports.index = async function (req, res) {
	const result = await models.Room.findAll()
	return res.json(result);
}

exports.save = async function (req, res) {
	const data = req.body.data

	const exist = await models.Room.findOne({ where: { room_id: data.room_id } });
	if (!data.id) {
		if (exist && !data.partCreate) {
			res.json("same_room_id");
			return
		}

		await models.Room.findOrCreate({
			where: { room_id: data.room_id },
			defaults: {
				room_id: data.room_id,
				name: data.name,
			}
		})
	} else {
		const item = await models.Room.findOne({ where: { id: data.id } });
		if (exist && (item.id != exist.id && !data.partCreate)) {
			res.json("same_room_id");
			return
		}
		item.room_id = data.room_id;
		item.name = data.name;
		await item.save();
	}

	const result = await models.Room.findAll()
	res.json(result);
};

exports.delete = async function (req, res) {
	await models.Room.destroy({ where: { id: req.params.id } })
	const result = await models.Room.findAll()
	return res.json(result);
};
