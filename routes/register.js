const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/', UserController.register);

router.post('/', UserController.signup);

router.post('/signup', UserController.signupAPI);

module.exports = router;