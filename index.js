/**
 * Required External Modules
 */
const express = require('express')
const app = express() // Initialise the server
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const morgan = require('morgan')
require('dotenv').config()

/**
 * App Variables
 */
const PORT = process.env.PORT || 3000
const IP = process.env.IP || '127.0.0.1'

/**
 *  App Configuration
 */

// Log web access to console
app.use(morgan('short'))

app.use(bodyParser.urlencoded({ extended: true })) // Parses form data from the browser

// Cookie session setup
app.use(cookieSession({
  name: 'session',
  secret: process.env.COOKIE_SECRET,
  sameSite: true,
  

}))

// Enable HTML templating
app.engine('hbs', exphbs({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs'
}));
app.set('view engine', 'hbs')

//public
app.use(express.static('public'))

/**
 * Route Definitions
 */
const homeRoutes = require('./routes/home')
const boxesRoutes = require('./routes/boxes')
const sellersRoutes = require('./routes/sellers')
const userRoutes = require('./routes/users')
const shipmentRoutes = require('./routes/shipments')

app.use('/', homeRoutes)
app.use('/', userRoutes)
app.use('/boxes', boxesRoutes)
app.use('/sellers', sellersRoutes)
app.use('/shipments', shipmentRoutes)

// Error handler route
const errorHandler = require('./helpers/error')
app.use(errorHandler)

/**
 * HTTP server setup
 */
app.listen(PORT, IP, () => console.log(`HTTP-SERVER: LISTENING ON http://${IP}:${PORT}`))
