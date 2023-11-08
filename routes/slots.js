var express = require('express');
var router = express.Router();
var slots=require('../resources/slots')


/* GET home page. */
router.get('/add', function(req, res, next) {
  res.render('addslots', { title: 'ADD slots' });
});
router.post('/save', function(req, res, next) {
  slots.push({...req.body,_id:`00${slots.length}`})
    res.redirect('/')
  });
  router.get('/edit/:_id', function(req, res, next){
    const slot = slots.find((slot)=>slot._id === req.params._id)
    res.render('editslots', {title: "Edit slots", slot})
  })
  router.post('/saveEdited/:_id', function(req, res, next){
    const currIndex = slots.findIndex((slot)=>slot._id === req.params._id)
    // alert ("currIndex")
    slots.splice(currIndex, 1, {...req.body, _id:req.params._id})
    res.redirect('/')
  })


  router.get('/delete/:_id', function(req, res, next) {
    const delIndex = slots.findIndex((slot) => slot._id === req.params._id);
    if (delIndex !== -1) {
        slots.splice(delIndex, 1);
        console.log(`slot with _id ${req.params._id} deleted`);
    } else { console.log(`slot with _id ${req.params._id} not found`); }

    res.redirect('/');
});
module.exports = router;
  