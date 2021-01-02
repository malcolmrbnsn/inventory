/**
 * Required External Modules
 */
const express = require("express"),
  app = express(), // Initialise the server instance
  helmet = require("helmet"),
  bodyParser = require('body-parser'),
  cors = require("cors"),
  cookieSession = require("cookie-session");
require("dotenv").config()

/**
 * App Variables
 */
const PORT = process.env.PORT || 3000,
  IP = process.env.IP || "127.0.0.1"

/**
 *  App Configuration
 */

const morgan = require("morgan");
app.use(morgan("dev")); // Logs web activity to the console

app.use(bodyParser.json()); // Parses any JSON requests for us to use
app.use(helmet()); // Blocks any insecure HTTP headers
app.use(cors()); // Allows cross origin requests, we need this as the frontend is hosted on a different server

// Cookie session setup
app.use(cookieSession({
  name: 'session',
  secret: process.env.COOKIE_SECRET
}))

/**
 * Route Definitions
 */
const boxesRoutes = require("./routes/boxes");
const sellersRoutes = require("./routes/sellers");
const userRoutes = require("./routes/users");

app.use('/api/boxes', boxesRoutes);
app.use('/api/sellers', sellersRoutes);
app.use("/api/users", userRoutes);

// Error handler route
const errorHandler = require("./helpers/error")
app.use(errorHandler)


/**
 * HTTP server setup
 */
app.listen(PORT, IP, ()=> console.log(`HTTP-SERVER: LISTENING ON http://${IP}:${PORT}`));
