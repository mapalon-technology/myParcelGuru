//Author Shambhu:-25/06/2019
//Routing files

// Express is a module. Provides you a way to implement HTTP server.
const express = require('express');
// create a express application object .
const app = express();
// Morgan is used for logging request details.
const morgan = require('morgan');
// parses request body with desired format. currently we are using JSON.
const bodyParser = require('body-parser');
//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
const mongoose = require('mongoose');

// register your router here.
const documentRoutes = require('./api/routes/document');
const nonDocumentRoutes = require('./api/routes/nonDocument');
const parcelTypeRoutes = require('./api/routes/parcelType');
const carrierRoutes = require('./api/routes/carrier');
// import DB connection. so that DB intilizes at application start up
mongoose.connect("mongodb+srv://Shambhukeshri:shambhu68@cluster0-co3rz.mongodb.net/parcel-guru?retryWrites=true&w=majority",
 {useNewUrlParser: true});

 mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
 // use body parser... currently parsing only JSON requests.
app.use(bodyParser.json());

app.use((req, res, next) =>
{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if(req.method === 'OPTIONS')
   {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
// register your router here.
//Routes which should handle requests
app.use('/v1/documents', documentRoutes);
app.use('/v1/nonDocuments', nonDocumentRoutes);
app.use('/v1/parcelType', parcelTypeRoutes)
app.use('/v1/carrier', carrierRoutes)

app.use((req, res, next) =>
 {
  const error = new Error('Not found');
  error.status(404);
  next(error);
})
app.use((error, req, res, next) =>
{
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
