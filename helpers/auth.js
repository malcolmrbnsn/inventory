const checkAuth = (req, res, next) => req.session.loggedIn ? next()  : res.redirect("/login")


module.exports = checkAuth