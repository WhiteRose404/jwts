require('dotenv').config()
require('express-async-errors');
const connectdb=require("./db/connect");
const routes=require("./routes/main");
const express = require('express');

const app = express();

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.static('./public'))
app.use(express.json())
app.use("/api/v1",routes);


//error handler's
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    connectdb(process.env.MONGO);
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
