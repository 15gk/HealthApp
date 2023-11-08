var doctors =require('../resources/doctors')

router.get('/doctors', function(req, res, next) {
    res.render('doctors', { title: 'show doctors'});//displays
  });