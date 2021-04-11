function errorHandler (error, req, res, next) {
  console.log(error)
  if (process.env.NODE_ENV === "PRODUCTION") {
    res.send("an error occured. thats all we know")
  }
  return res.status(error.status || 500).json({
    error: {
      message: error.message || 'An error occured'
    }
  })
}

module.exports = errorHandler
