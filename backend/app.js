//Author Shambhu:-25/06/2019
//Routing files
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const documentRoutes = require('./api/routes/document');
const nonDocumentRoutes = require('./api/routes/nonDocument');
const parcelTypeRoutes = require('./api/routes/parcelType');
const carrierRoutes = require('./api/routes/carrier');
//MongoDB connection
mongoose.connect("mongodb+srv://Shambhukeshri:shambhu68@cluster0-co3rz.mongodb.net/parcel-guru?retryWrites=true&w=majority",
 {useNewUrlParser: true});

 mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
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

//Routes which should handle requests
app.use('/documents', documentRoutes);
app.use('/nonDocuments', nonDocumentRoutes);
app.use('/parcelType', parcelTypeRoutes)
app.use('/carrier', carrierRoutes)

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
