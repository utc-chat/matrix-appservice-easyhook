const express = require('express');
const router = express.Router();
const ListingController = require('../controllers/listingController');
const authMiddleware = require('../middleware/auth')

router.get('/', authMiddleware, ListingController.index);

module.exports = router;
