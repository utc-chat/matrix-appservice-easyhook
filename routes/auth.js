const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// login API for React Client
router.post('/login', UserController.login);

// //Register new user
router.post('/signin', UserController.signup);

//Logout current user
router.get('/logout', UserController.logout);

// Signup User
router.post('/signup', UserController.signup);

module.exports = router;
