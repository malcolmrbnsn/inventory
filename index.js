/**
 * Required External Modules
 */
const express = require('express')
const app = express() // Initialise the server
const exphbs = require('express-handlebars')
const helmet = require('helmet')
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

app.use(bodyParser.json()) // Parses any JSON requests for us to use
app.use(helmet()) // Blocks any insecure HTTP/HTTPS headers

// Cookie session setup
app.use(cookieSession({
  name: 'session',
  secret: process.env.COOKIE_SECRET
}))

// Enable HTML templating
app.engine('hbs', exphbs({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs'
}));
app.set('view engine', 'hbs')

/**
 * Route Definitions
 */
const homeRoutes = require('./routes/home')
const boxesRoutes = require('./routes/boxes')
const sellersRoutes = require('./routes/sellers')
const userRoutes = require('./routes/users')

app.use('/', homeRoutes)
app.use('/', userRoutes)
app.use('/boxes', boxesRoutes)
app.use('/sellers', sellersRoutes)

// Error handler route
const errorHandler = require('./helpers/error')
app.use(errorHandler)

/**
 * HTTP server setup
 */
app.listen(PORT, IP, () => console.log(`HTTP-SERVER: LISTENING ON http://${IP}:${PORT}`))
