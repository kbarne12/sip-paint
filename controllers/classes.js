const Lesson = require('../models/class')
const User = require('../models/user')

module.exports = {
    index,
    new: newClass,
    show,
    create,
    delete: deleteLesson
    
}
function deleteLesson (req, res) {
    Lesson.findByIdAndDelete(req.params.id)
    .then(()=> {
        res.redirect('/classes')
    })
}
function create (req, res) {
    Lesson.create(req.body, (err, lesson) => {
        res.render("classes/show", { user: req.user, lesson, title: "lesson"})
    })
}
function show (req, res) {
    User.findById(req.user._id, (err, users) => {
      
        res.render('classes/show', {
          user: req.user,
          users
        })
    })
  }

function newClass(req, res) {
    User.find({}, (err, users) => {
        res.render('classes/new', {title: 'Add Classes',
        user: req.user,
        users
    })
})
}

function index(req, res) {
    Lesson.find({}, function(err, lessons){
    res.render('classes/index', {
    title: "Classes",
    user: req.user, 
    lessons
})
})
}

