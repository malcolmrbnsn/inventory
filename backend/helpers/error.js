function errorHandler (error, req, res, next) {
  console.log(error)
  return res.status(error.status || 500).json({
    error: {
      message: error.message || "An error occured"
    }
  })
}

module.exports = errorHandler;
