const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')
const RuleController = require('../controllers/ruleController');

/* GET rules listing. */
router.get('/', authMiddleware, RuleController.index);

router.post('/save', authMiddleware, RuleController.save);

router.delete('/:id', authMiddleware, RuleController.delete);

module.exports = router;
