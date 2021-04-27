/**
 * Required External Modules
 */
const express = require('express'),
  exphbs = require('express-handlebars'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  cookieSession = require('cookie-session'),
  morgan = require('morgan'),
  moment = require('moment'),
  flash = require('connect-flash'),
  app = express() // Initialise the server
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

// parse form data from the browser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// Cookie session setup
app.use(cookieSession({
  name: 'session',
  secret: process.env.COOKIE_SECRET,
  sameSite: true
}))
app.use(flash())

app.use(function(req, res, next){
  res.locals.session = req.session;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});


// Enable HTML templating
app.engine('hbs', exphbs({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs',
  helpers: {
    displayDate: val => moment(val).format("MMM Do YY"),
    formatDate: val => moment(val).format("YYYY-MM-DD"),
    count: val => val.length,
    idMatches: (val1, val2) => val1.equals(val2)
  }

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
