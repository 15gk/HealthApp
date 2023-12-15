var express = require('express');
var router = express.Router();
// var slots=require('../resources/slots')
var Slot=require('../models/slots')

router.get('/', async function(req, res, next) {
   const slots = await Slot.find()
   res.render("slots", {
     title: "Slots",
     slotList:slots,
   });
 });

/* GET home page. */
router.get('/add', async function(req, res, next) {
  const slots = await Slot.find();
  res.render("addslots", {
    title: "ADD slots",
    token:`${slots.length+1}`,
    doctorId: "doc-001",
    status: "available",
    _id:`${slots.length+1}`,
  });
});
router.post('/save', async function(req, res, next) {
  await Slot.insertMany([req.body])
    res.redirect('/slots')
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


  router.get('/delete/:_id',async function(req, res, next) {
    const delIndex = slots.findIndex((slot) => slot._id === req.params._id);
    if (delIndex !== -1) {
        slots.splice(delIndex, 1);
        console.log(`slot with _id ${req.params._id} deleted`);
    } else { console.log(`slot with _id ${req.params._id} not found`); }

    res.redirect('/');
});
module.exports = router;
