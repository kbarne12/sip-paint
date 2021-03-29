const Class = require('../models/class')


module.exports = {
    index,
}


function index(req, res) {
    Class.findById({}, function (err, classes) {
        res.render('classes/index', {
            title: 'Classes',
            level,
            instructor,
            rating


        })
    })
  }