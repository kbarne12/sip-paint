const router = require('express').Router()
const classCtrl = require('../controllers/classes')

router.get("/", isLoggedIn, classCtrl.index)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }


module.exports = router;