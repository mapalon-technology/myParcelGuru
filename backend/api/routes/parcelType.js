//author Shambhu:-25/06/2019
// Operations related backend of ParcelType Schema

// Express is a module. Provides you a way to implement HTTP server.
const express = require('express');
//  Routes enable you to create different URLs for different content in your application.
const router = express.Router();
//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
const mongoose = require('mongoose');
// config to read parcel type from file and env.
const ParcelType = require('../models/parcelType');
// import controllers
const ParcelTypeController = require('../controllers/parcelType');
//fetching data from database
router.get('/', ParcelTypeController.parcelType_get_allrecords);
//Adding data to the database
router.post('/', ParcelTypeController.parcelType_create_parcelType);
//fetching data from the database by id
 router.get('/:parcelTypeId', ParcelTypeController.parcelType_get_single_record );
//Deleting data from the database
router.delete('/:parcelTypeId', ParcelTypeController.parcelType_delete_record);

module.exports = router;
