const models = require('../models')
const JSONWebToken = require('../services/jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = function (req, res) {
	const { email, password } = req.body
	const secret = req.app.get('jwt-secret')

	// check the user info & generate the jwt
	const check = async (user) => {
		if (!user) {
			// user does not exist
			throw new Error('User does not exist!');
		} else {
			// user exists, check the password
			const isValidPwd = await bcrypt.compare(password, user.password);
			if (isValidPwd) {
				return JSONWebToken.generateToken({
					id: user.id,
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
					role_id: user.role_id,
				}, secret, {
					expiresIn: '7d',
					subject: 'userInfo'
				});
			} else {
				throw new Error('Password is incorrect!');
			}
		}
	}

	// respond the token 
	const respond = (token) => {
		res.json({
			message: 'logged in successfully',
			token
		});
	}

	// error occured
	const onError = (error) => {
		res.status(403).json({
			message: error.message
		});
	}

	// find the user
	models.User.findOne({ where: { email } })
		.then(check)
		.then(respond)
		.catch(onError);
};

exports.signup = function (req, res) {

	const secret = req.app.get('jwt-secret');

	const create = (user) => {
		if (user) {
			throw new Error("Email exist")
		} else {
			return models.User.create({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: (req.body.email).toLowerCase(),
				role_id: req.body.role = "admin" ? 1 : 2,
				password: req.body.password,
			});
		}
	}

	const getToken = (user) => {
		if (!user) {
			throw new Error('Register Failed');
		} else {
			return JSONWebToken.generateToken({
				id: user.id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				role_id: user.role_id,
			}, secret, {
				expiresIn: '7d',
				subject: 'userInfo'
			});
		}
	}

	const respond = (token) => {
		res.json({
			message: 'Registered in successfully',
			token
		});
	}

	// run when there is an error (username exists)
	const onError = (error) => {
		res.status(409).json({
			message: error.message
		});
	}

	models.User.findOne({ where: { email: req.body.email } })
		.then(create)
		.then(getToken)
		.then(respond)
		.catch(onError);

};

exports.logout = function (req, res) {
	req.logout();
	// res.redirect('/login/');
};

exports.users = function (req, res) {
	return res.json("asdf");
}

exports.check = (req, res) => {
	res.json({
		success: true,
		info: req.decoded
	});
}
