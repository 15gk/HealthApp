var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/p_appointment', function(req, res, next) {
  res.render('p_appointment', { title: 'ADD slots' });
});
// router.post('/save', function(req, res, next) {
//     books.push({...req.body,_id:`00${books.length+1}`})
//     res.redirect('/')
//   });

module.exports = router;
