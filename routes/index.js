var express = require('express');
var router = express.Router();
var slots=require('../resources/slots')


/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Slots', slotList:slots });
});
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Slots', :slots });
// });
module.exports = router;
