//author Shambhu:-25/06/2019
// Operations related backend of Non-Document type Schema

// Express is a module. Provides you a way to implement HTTP server.
const express = require('express');
//  Routes enable you to create different URLs for different content in your application.
const router = express.Router();
//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
const mongoose = require('mongoose');
// import controllers
const NonDocumentController = require('../controllers/nonDocument');
//Fetching data from database
router.get('/', NonDocumentController.nonDocument_getRecord_nonDocument );
//Adding data to the database
router.post('/', NonDocumentController.nonDocument_postCreate_nonDocument );
//Fetching data from the database
router.get('/:nonDocumentsId', NonDocumentController.nonDocument_get_single_nonDocument);
//Deleting data from the database
router.delete('/:nonDocumentsId', NonDocumentController.nonDocument_delete_nonDocument );

module.exports = router;
