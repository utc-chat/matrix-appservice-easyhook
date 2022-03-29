const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')
const RoomController = require('../controllers/roomController');

/* GET rooms listing. */
router.get('/', authMiddleware, RoomController.index);

router.post('/save', authMiddleware, RoomController.save);

router.delete('/:id', authMiddleware, RoomController.delete);

module.exports = router;
