const mongoose = require('mongoose')

// Mongoose setup
mongoose.Promise = global.Promise
const databaseURI = process.env.MONGO_URI || 'mongodb://localhost/inventory'

mongoose.connect(databaseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => console.log('MONGO: connected'))
  .catch(err => console.log(`MONGO: connection error: ${err.message}`))

mongoose.set('useCreateIndex', true) // Hides collection.ensureIndex deprication warning

module.exports.Box = require('./box')
module.exports.User = require('./user')
module.exports.Seller = require('./seller')
module.exports.Shipment = require('./shipment')