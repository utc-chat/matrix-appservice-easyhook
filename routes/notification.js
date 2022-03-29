const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notificationController');

router.get('/clearall/', NotificationController.clearAll);
router.get('/:notification_id/', NotificationController.action);

module.exports = router;