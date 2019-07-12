//author Dipti:-25/06/2019
// Operations related backend of Shipping Partners Schema

// Express is a module. Provides you a way to implement HTTP server.
const express = require("express");
// parses request body with desired format. currently we are using JSON.
const bodyParser = require("body-parser");
//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
const mongoose = require('mongoose');
// config to read post from file and env.
const Post = require('../models/post');
//  Routes enable you to create different URLs for different content in your application.
const router = express.Router();
// import controllers
const CarrierController = require('../controllers/carrier');
 // use body parser... currently parsing only JSON requests.
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
// fetching data from backend
 router.get('/', CarrierController.carrier_get_all_record);
// Adding the data to the database
router.post("/",CarrierController.carrier_create_record);
// Fetching data from the database using ID
router.get('/:postId', CarrierController.carrier_get_single_record);
//Update the data stored in the database
router.patch('/:postId', CarrierController.carrier_update_record );
//Delete the data from the database
router.delete('/:postId', CarrierController.carrier_delete_record);

module.exports = router;
