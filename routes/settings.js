const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')
const SettingsController = require('../controllers/settingsController');

/* GET settingss listing. */
router.get('/', authMiddleware, SettingsController.index);

router.post('/save', authMiddleware, SettingsController.save);

router.delete('/:id', authMiddleware, SettingsController.delete);

module.exports = router;
