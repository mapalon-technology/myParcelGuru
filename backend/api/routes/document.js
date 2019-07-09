//author Shambhu:-25/06/2019
// Operations related backend of Document Type Schema
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Document = require('../models/document');
//fetching data from backend
router.get('/',(req, res, next) =>
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
            url: 'http://localhost:3000/documents/' + doc._id
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
});
//Adding data to the backend
router.post('/',(req, res, next) =>
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
         url: 'http://localhost:3000/documents/' + result._id

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
  })
//fetching data from backend by documentId
router.get('/:documentId', (req, res, next) =>
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
          url: 'http://localhost:3000/ducuments'
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
  });
  //Update the data which is already in the database
router.patch('/:documentsId', (req, res, next) =>
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
       url: 'http://localhost:3000/documents/' +id
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
});
//Delete the data from backend
router.delete('/:documentsId', (req, res, next) =>
{
 const id = req.params.documentId
 Document.remove({_id: id})
 .exec()
 .then(result => {
   res.status(200).json(
     {
     message: 'Product deleted',
     request: {
       type: 'POST',
       url: 'http://localhost:3000/documents',
       body: {name: 'String', code: 'String'}
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
});

module.exports = router;
