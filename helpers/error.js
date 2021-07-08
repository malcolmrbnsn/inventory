function errorHandler (error, req, res, next) {
  console.log(error)
  req.flash("error", error.message || 'An unexpected error occured.')
  return res.redirect("/")
}

module.exports = errorHandler