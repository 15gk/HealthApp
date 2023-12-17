var express = require('express');
var router = express.Router();
// var slots=require('../resources/slots')
var Slot=require('../models/slots')

router.get("/", async function (req, res, next) {
  // Check if the user is logged in
  if (!req.user) {
    // If not logged in, redirect to the register page
    return res.redirect("/register"); 
  }

  // console.log(req.user);
  // console.log(req.user.username);
  const doctorId = req.user.doctorId;

  try {
    // Assuming you have a field 'doctorId' in your Slot model
    const slots = await Slot.find({ doctorId: doctorId });
    res.render("slots", {
      title: "Slots",
      slotList: slots,
      user: req.user,
    });
  } catch (error) {
    // Handle any errors that may occur during the database query
    console.error(error);
    next(error); // Pass the error to the error handling middleware
  }
});


/* GET home page. */
router.get('/add', async function(req, res, next) {
  // Check if the user is logged in
  if (!req.user) {
    // If not logged in, redirect to the register page
    return res.redirect('/register'); // Assuming '/register' is the register page route
  }

  console.log(req.user.doctorId);
  const doctorId = req.user.doctorId;
  const slots = await Slot.find();

  res.render("addslots", {
    title: "ADD slots",
    token: `${slots.length + 1}`,
    doctorId: doctorId,
    status: "available",
    _id: `slot00-${slots.length + 1}`,
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


router.get("/delete/:_id", async function (req, res, next) {
  console.log(req.params._id);
  const doctorId = req.user.doctorId;

  try {
    // Find the slot by ID
    const slotToDelete = await Slot.findById(req.params._id);

    // Check if the slot exists
    if (!slotToDelete) {
      // Slot not found
      return res.redirect("/slots"); // Redirect to the same page or handle as needed
    }

    // Check if the slot is booked
    if (slotToDelete.status !== "available") {
      // Slot is booked, display a popup or message
      const slots = await Slot.find({ doctorId: doctorId });
      return res.render("slots", {
        title: "Slots",
        slotList: slots,
        user: req.user,
        redirectUrl: "/",
        errorMessage: "Cannot delete booked slot.",
      });
    }

    // Delete the slot
    await Slot.findOneAndDelete({ _id: req.params._id });

    // Fetch the updated slot list
    const slots = await Slot.find({ doctorId: doctorId });

    // Render the updated slots page
    res.render("slots", {
      title: "Slots",
      slotList: slots,
      user: req.user,
      redirectUrl: "/",
    });
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error("Error deleting slot:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
