const Lesson = require('../models/class')
const User = require('../models/user')

module.exports = {
    index,
    new: newClass,
    show,
    create,
    delete: deleteLesson,
    edit,
    update
    
}
function update(req, res) {
    Lesson.findByIdAndUpdate(req.params.id, req.body)
    .then((lesson) =>{
        res.redirect(`/classes/${lesson._id}`)
    })
}   
function edit(req, res) {
    const locations = ["Virtual","Dupont","Adams Morgan"]
    const titles = ["Date Night","Amatuer Night", "Free paint", "Corporate Paint"]
    User.find({}, (err, users) => {
        Lesson.findById(req.params.id)
        .then((lesson) => {
            res.render('classes/update', {
                title: 'Edit Lesson', 
                lesson,
                user: req.user, 
                locations,
                titles,
                users

            })
        })
    })
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
    Lesson.findById(req.params.id) 
    .populate('instructor')
    .then((lesson) => {
        res.render('classes/show', {
          user: req.user,
          title: "Lesson Details",
          lesson
        })
    })
    }

function newClass(req, res) {
    User.find({}, (err, users) => {
        res.render('classes/new', {title: 'Add Classes',
        user: req.user,
        users,
      
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

