// // var express = require('express');
// // var router = express.Router();

// // /* GET home page. */
// // router.get('/', function(req, res, next) {
// //   res.render('index', { title: 'Express' });
// // });

// // module.exports = router;
// var express = require('express');
// var db = require('../db');

// function fetchSlots(req, res, next) {
//   db.all('SELECT * FROM appointments WHERE doctor_id = ?', [
//     req.user.id
//   ], function(err, rows) {
//     if (err) { return next(err); }
    
//     var appointments = rows.map(function(row) {
//       return {
//         id: row.id,
//         starttime: row.starttime,
//         endtime: row.endtime,
//         date:row.date,
//         status: row.status,
//         url: '/appointments/' + row.id
//       }
//     });
//     res.locals.appointments = appointments;
//     res.locals.activeCount = appointments.filter(function(appointment) { return appointment.status === 'active'; }).length;
//     res.locals.completedCount = appointments.filter(function(appointment) { return appointment.status === 'completed'; }).length;
//     res.locals.cancelledCount = appointments.filter(function(appointment) { return appointment.status === 'cancelled'; }).length;
//     next();
//   });
// }

// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   if (!req.user) { return res.render('home'); }
//   next();
// }, fetchSlots, function(req, res, next) {
//   res.locals.filter = null;
//   res.render('index', { user: req.user });
// });

// router.get('/active', fetchSlots, function(req, res, next) {
//   res.locals.appointments = res.locals.appointments.filter(function(appointment) { return appointment.status === 'active'; });
//   res.locals.filter = 'active';
//   res.render('index', { user: req.user });
// });

// router.get('/completed', fetchSlots, function(req, res, next) {
//   res.locals.appointments = res.locals.appointments.filter(function(appointment) { return appointment.status === 'completed'; });
//   res.locals.filter = 'completed';
//   res.render('index', { user: req.user });
// });

// router.get('/cancelled', fetchSlots, function(req, res, next) {
//   res.locals.appointments = res.locals.appointments.filter(function(appointment) { return appointment.status === 'cancelled'; });
//   res.locals.filter = 'cancelled';
//   res.render('index', { user: req.user });
// });
// router.post('/add-appointment', function(req, res, next) {
//   // Extract appointment details from the form submission
//   var appointDate= req.body.appointDate;
//   var startTime = req.body.startTime;
//   var endTime = req.body.endTime;
  
//   // Insert the new appointment into the database
//   db.run('INSERT INTO appointments (doctor_id, date, start_time, end_time, status) VALUES (?, ?, ?, ?, ?)', [
//     req.user.id,
//     date,
//     startTime,
//     endTime,
//     'active' // default status is 'active' upon creation
//   ], function(err) {
//     if (err) { return next(err); }
//     return res.redirect('/');
//   });
// });


// router.post('/appointments/:id/cancel', function(req, res, next) {
//   db.run('UPDATE appointments SET status = ? WHERE id = ? AND doctor_id = ?', [
//     'cancelled',
//     req.params.id,
//     req.user.id
//   ], function(err) {
//     if (err) { return next(err); }
//     return res.redirect('/');
//   });
// });

// router.post('/appointments/:id/complete', function(req, res, next) {
//   db.run('UPDATE appointments SET status = ? WHERE id = ? AND doctor_id = ?', [
//     'completed',
//     req.params.id,
//     req.user.id
//   ], function(err) {
//     if (err) { return next(err); }
//     return res.redirect('/');
//   });
// });

// router.post('/clear-cancelled', function(req, res, next) {
//   db.run('DELETE FROM appointments WHERE doctor_id = ? AND status = ?', [
//     req.user.id,
//     'cancelled'
//   ], function(err) {
//     if (err) { return next(err); }
//     return res.redirect('/');
//   });
// });

// module.exports = router;
