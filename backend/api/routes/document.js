//author Shambhu:-25/06/2019
// Operations related backend of Document Type Schema

// Express is a module. Provides you a way to implement HTTP server.
const express = require('express');
//  Routes enable you to create different URLs for different content in your application.
const router = express.Router();
//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
const mongoose = require('mongoose');
// config to read document from file and env.
const Document = require('../models/document');
// import controllers
const DocumentController = require('../controllers/document')
//fetching data from backend
router.get('/',DocumentController.document_get_all_document);
//Adding data to the backend
router.post('/',DocumentController.document_create_documents);
//fetching data from backend by documentId
router.get('/:documentId',DocumentController.document_get_document );
  //Update the data which is already in the database
router.patch('/:documentsId', DocumentController.document_update_document);
//Delete the data from backend
router.delete('/:documentsId', DocumentController.document_delete_document );

module.exports = router;
