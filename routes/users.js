const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')
const UserController = require('../controllers/userController');

/* GET users listing. */
router.get('/', authMiddleware, UserController.users);


module.exports = router;
