//author Shambhu:-10/07/2019
// Operations related backend of Document Type Schema
// register your router here.
const Document = require("../models/document");
//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
const mongoose = require('mongoose');
// fetching data from backend
exports.document_get_all_document = (req, res, next) =>
{
  Document.find()
  .select('name code _id')
  .exec()
  .then(docs =>
    {
    const response =
    {
      count: docs.length,
      documents: docs.map(doc =>
         {
        return {
          name: doc.name,
          code: doc.code,
          _id: doc._id,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/v1/documents/' + doc._id
          }
        }
      })
    };
      res.status(200).json(response);
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
// Adding data to the backend
exports.document_create_documents = (req, res, next) =>
{
 const document = new Document(
   {
   _id: new mongoose.Types.ObjectId(),
   name:req.body.name,
   code: req.body.code
 });
 document.save()
 .then(result =>
   {
   console.log(result);
   res.status(201).json(
     {
     message: 'Created product successfully',
     createdDocument:
      {
       name: result.name,
       code: result.code,
       _id: result._id,
       request: {
         type: 'GET',
        url: 'http://localhost:3000/v1/documents/' + result._id

       }
     }
   });
 })
 .catch(err =>
   {
   console.log(err);
   res.status(500).json(
     {
     error:err
   })
 });
 }
// fetching data from backend with particular ID
 exports.document_get_document = (req, res, next) =>
 {
  const id = req.params.documentId;
  Document.findById(id)
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
          url: 'http://localhost:3000/v1/documents/'
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
// Updating data which is already stored in the backend
  exports.document_update_document = (req, res, next) =>
  {
    const id = req.params.documentId;
    const updateOps = {};
    for(const ops of req.body)
     {
      updateOps[ops.propName] = ops.value;
    }
   Document.update({_id: id }, {$set: updateOps })
   .exec()
   .then(result =>
    {
     res.status(200).json(
       {
       message: 'Document updated',
       request: {
         type: 'GET',
         url: 'http://localhost:3000/v1/documents/' +id
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
  exports.document_delete_document = (req, res, next) =>
 {
  Document.remove({_id: req.params.DocumentsId})
  .exec()
  .then(result =>
    {
    res.status(200).json(
      {
      message: 'Documented Deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/v1/documents',
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
