const Class = require('../models/class')


module.exports = {
    index,
    new: newClass,
    
}

function newClass(req, res) {
    res.render('classes/new', {title: 'Add Classes',
    user: req.user
})
}

function index(req, res) {
    res.render('classes/index', {
    title: "Classes",
    user: req.user

})
}

