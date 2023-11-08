var express = require('express');
var router = express.Router();
var slots=require('../resources/slots')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Slots', slotList:slots });
});

module.exports = router;
