const router = require('express').Router()
const classCtrl = require('../controllers/classes')

router.get("/", isLoggedIn, classCtrl.index);
router.get('/new', isLoggedIn, classCtrl.new);
router.get('/:classId', classCtrl.show)
router.post('/', isLoggedIn, classCtrl.create);
router.delete('/:id', isLoggedIn, classCtrl.delete);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }


module.exports = router;