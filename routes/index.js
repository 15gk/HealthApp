var express = require('express');
var router = express.Router();
// var slots=require('../resources/slots')
var Slot=require("../models/slots")
var Appoint = require("../models/appoint");
// const appoint = require('../resources/appoint');


/* GET home page. */
router.get('/home', async function(req, res, next) {
  const slots=await Slot.find()
  res.render('index', { title: 'Slots', slotList:slots });
});
router.get("/viewAppoint", async function (req, res, next) {
  const appoint= await Appoint.find()
  res.render("viewAppoint", { title: "Appoint", appointList:appoint});
});

module.exports = router;
