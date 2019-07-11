//author Shambhu:-10/07/2019
// Operations related backend of Non-Document type Schema
// register your router here.
const NonDocument = require("../models/nonDocuments");
//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
const mongoose = require('mongoose');
const http = '';
// fetching data from backend
exports.nonDocument_get_single_nonDocument = (req, res, next) =>
{
  console.log('inside controller')
 const id = req.params.nonDocumentsId;
 NonDocument.findById(req.params.nonDocumentsId)
.select('name code _id')
 .exec()
 .then(doc =>
   {
   console.log("From database", doc);
   if(doc)
   {
     res.status(200).json(
       {
       document: doc,
       request:
        {
         type: 'GET',
         url: 'http://localhost:3000/v1/nonDocuments'
       }
     });
   } else
   {
     res.status(404).json({message: 'No Valid entry found for provided ID'})
   }
 })
 .catch(err =>
   {
   console.log(err);
   res.status(500).json({error: err})
 });
 }
// Adding data to the backend
 exports.nonDocument_postCreate_nonDocument = (req, res, next) =>
 {
   const nonDocument = new NonDocument(
     {
     _id: mongoose.Types.ObjectId(),
     name: req.body.name,
     code: req.body.code
   });
   nonDocument
   .save()
   .then(result =>
     {
     console.log(result);
     res.status(201).json({
       message: 'Non Document stored',
       createdNonDocument: {
         _id:result._id,
         name: result.name,
         code: result.code
       },
       request:
       {
         type: 'GET',
         url: 'http://localhost:3000/v1/nonDocuments' +result._id
       }
     });
   })
   .catch(err =>
     {
     console.log(err);
     res.status(500).json(
       {
       error: err
     });
   });
 }
// Deleting data from backend
 exports.nonDocument_delete_nonDocument = (req, res, next) =>
 {
  NonDocument.remove({_id: req.params.nonDocumentsId})
  .exec()
  .then(result =>
    {
    res.status(200).json(
      {
      message: 'Non Documented Deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/v1/nonDocuments',
        body: {name: 'String', code: 'String'}
      }
    })
  })
  .catch(err =>
    {
    res.status(500).json(
      {
      error: err
    });
  });
}
// fetching data from backend with particular ID
exports.nonDocument_getRecord_nonDocument = (req, res, next) =>
{
  NonDocument.find()
  .select('name code _id')
  .exec()
  .then(docs =>
    {
    res.status(200).json(
      {
      count: docs.length,
      nonDocument: docs.map(doc =>
        {
        return {
          _id: doc._id,
          name: doc.name,
          code: doc.code,
          request:
          {
            type: 'GET',
            url: 'http://localhost:3000/v1/nonDocuments/' +doc._id
          }
        }
      })
    });
  })
  .catch(err =>
    {
    res.status(500).json(
      {
      error: err
    });
  })
}

