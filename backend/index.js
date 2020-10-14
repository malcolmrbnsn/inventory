/**
 * Required External Modules
 */

const express = require("express"),
  app = express(),
  helmet = require("helmet"),
  bodyParser = require('body-parser'),
  cors = require("cors");
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
app.use(morgan("dev"));

app.use(bodyParser.json())
app.use(morgan('dev'))

app.use(helmet());
app.use(cors())


/**
 * Routes Definitions
 */
const boxesRoutes = require("./routes/boxes");
const sellersRoutes = require("./routes/sellers");


app.use('/api/boxes', boxesRoutes)
app.use('/api/sellers', sellersRoutes)

/**
 * Server Activation
 */
app.listen(PORT, IP, ()=> console.log(`HTTP-SERVER: LISTENING ON HTTP://${IP}:${PORT}`))
