// packcages required

require('dotenv').config();
const express = require('express');
const logger = require('morgan'); // logs
const createError = require('http-errors'); // Library to create errors
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


// configs required
// database configuration
require("./config/db.config");

// Express config
// We create our own server named app
// Express server will be handling requests and responses
const app = express();
const cors = require('cors');
const { Mongoose } = require('mongoose');
 

//Make everything inside of public/ available 
app.use(express.static('public')); 

//Middlewares

app.use(express.json()); // for parsear and use req.body as json
app.use(logger('dev')); // for view logs of requests 

//Routes
const routes = require('./config/routes.config');
app.use('/api', routes)

// Handle errors

app.use((req,res, next) => {

   // always log the error
  console.log('There was an error on the server!',req.method,req.path)
  next(createError(404, 'Route not found'));
});

app.use((error, req,res, next)=> {
  console.log('Error: ', error)
  if (error instanceof mongoose.Error.ValidationError) error = createError(400, error)
  else if (error instanceof mongoose.Error.CastError) error = createError(404, 'Resource not found')
  else if (jwt.JsonWebTokenError) error = createError(401, error)
  else if (error.message.includes('E11000')) error = createError(404, 'Already exists')
  else if (!error.status) error = createError(500, error)

  if (error.status >= 500) {
    console.log(error);
  }

  //pass the error to de route

  const data = {}
  data.message = error.message;
  data.errors = error.errors ? 
    Object.keys(error.errors)
      .reduce((errors, key) => ({ ...errors, [key]: error.errors[key].message || error.errors[key] }), {}) :
    undefined;

  res.status(error.status).json(data)
 })


 

const port = Number(process.env.PORT || 3001);

app.listen(port, () => {
  console.log(`Ready! Listen on port ${port}`);
})