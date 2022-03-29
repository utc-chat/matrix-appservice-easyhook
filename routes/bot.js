const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')
const BotController = require('../controllers/botController');

/* GET bots listing. */
router.get('/', authMiddleware, BotController.index);

router.post('/save', authMiddleware, BotController.save);

router.delete('/:id', authMiddleware, BotController.delete);

module.exports = router;
