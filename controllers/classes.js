const Class = require('../models/class')


module.exports = {
    index,
    new: newClass,
    create
    
}
function create(req, res) {
    const classs = new Class(req.body);
    classs.save(function(err) {
        if(err) return res.render('classes/new');
        res.redirect(`/classes/${classs._id}`,{title: '',
        user: req.user
    })
    })
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

