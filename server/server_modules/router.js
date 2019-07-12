// Express is a module. Provides you a way to implement HTTP server.
const express = require("express");
// create a express application object .
const app = express();
//  Routes enable you to create different URLs for different content in your application.
const router = express.Router();
// import controllers
const ParcelTypeController = require('./controllers/parcelType');
const DocumentController = require('./controllers/document')

class Routes {
  constructor() {

    // this.documents();
    // this.nonDocumentRoutes();
    this.parcelTypeRoutes();
    // rest of your routes initialization...
    // app.use('/documents',router);
    // app.use('/nonDocuments', router);

    app.use('/parcelType', router);

    // app.use('/carrier', carrierRoutes())


  }

  documents() {
    //fetching data from backend
    router.get('/', DocumentController.document_get_all_document);
    //Adding data to the backend
    router.post('/', DocumentController.document_create_documents);
    //fetching data from backend by documentId
    router.get('/:documentId', DocumentController.document_get_document);
    //Update the data which is already in the database
    router.patch('/:documentsId', DocumentController.document_update_document);
    //Delete the data from backend
    router.delete('/:documentsId', DocumentController.document_delete_document);

  }

  noDocuments() {

  }

  parcelTypeRoutes() {
    
    //fetching data from database
// router.get('/', ParcelTypeController.parcelType_get_allrecords);
//Adding data to the database
router.post('/', ParcelTypeController.parcelType_create_parcelType);
//fetching data from the database by id
//  router.get('/:parcelTypeId', ParcelTypeController.parcelType_get_single_record );
//Deleting data from the database
// router.delete('/:parcelTypeId', ParcelTypeController.parcelType_delete_record);
    
  }

  carrierRoutes() {


  }
}

new Routes();


module.exports = app;
