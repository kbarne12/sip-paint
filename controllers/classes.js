const Lesson = require('../models/class')
const User = require('../models/user')

module.exports = {
    index,
    new: newClass,
    show,
    create,
    delete: deleteLesson,
    edit,
    update,
    createReview,
    register
    
}
function register (req, res) {
    console.log(req.params.id)
    Lesson.findById(req.params.id, (err, lesson) => {
      lesson.students.push(req.body.students)
      console.log(lesson)
      lesson.save()
      .then(()=> {
        res.redirect(`/classes/${lesson._id}`)
    }).catch(err =>{
        console.log(err)
    })
  })
}
function createReview(req, res) {
    Lesson.findById(req.params.id)
    .then((lesson) => {
      lesson.reviews.push(req.body)
      lesson.save()
      .then(()=> {
        res.redirect(`/classes/${lesson._id}`)
      })
    })
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
        res.render("classes/show", { user: req.user, lesson, title: "lesson", }            
        )
    })
}
function show (req, res) {
    const pictures = {
        'Date Night': 'https://tse3.mm.bing.net/th?id=OIP.gAdeWO-awkFVY3zh5IENzwHaDt&pid=Api&P=0&w=300&h=300',
        'Amatuer Night': 'https://www.artfunstudio.com/wp-content/uploads/2017/03/sip-and-paint-0933-2.jpg',
        'Free paint': 'https://i.pinimg.com/originals/fb/f8/36/fbf8362cffa5dc61a9de2402936acdf0.jpg',
        'Corporate Paint': 'https://www.artfunstudio.com/wp-content/uploads/2016/09/sip-and-paint-0315.jpg'
        
    }
    Lesson.findById(req.params.id) 
    .populate('instructor')
    .populate({path: 'reviews', populate: {path: 'reviewer'}})
    .then((lesson) => {
        res.render('classes/show', {
          user: req.user,
          title: "Lesson Details",
          lesson,
          pictures
          
          

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

