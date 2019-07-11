// Express is a module. Provides you a way to implement HTTP server.
const express = require("express");
// create a express application object .
const app = express();
//  Routes enable you to create different URLs for different content in your application.
const router = express.Router();
// import controllers
const DocumentController = require('./controllers/document')




class Routes {
  constructor() {

    // this.documents();
    // this.noDocuments();
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

    const mongoose = require('mongoose');
    const ParcelType = require('./models/parcelType');

    // fetching data from backend

    router.get("/",
      (req, res) => {

       

        ParcelType.find().select('name code')
          .exec()
          .then(docs => {
            console.log("Data ala re , ");
            
            let data = {
              count: docs.length,
              parcelType: docs.map(doc =>
                {
               return {
                 _id: doc._id,
                 name: doc.name,
                 code: doc.code,
                 request:
                 {
                   type: 'GET',
                   url: 'http://localhost:3000/v1/parcelType/'
                 }
               }
             })
              
            };

            res.send(data);
            console.log("Data ala re , ", data);
          })
          .catch(err => {
            console.error("Error :: ", err);
          })
       }
    );
  }

  carrierRoutes() {


  }
}

new Routes();


module.exports = app;
