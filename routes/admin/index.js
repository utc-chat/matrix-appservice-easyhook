const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'TWS ADMIN', layout:false });
});

module.exports = router;
