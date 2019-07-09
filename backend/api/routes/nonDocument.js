//author Shambhu:-25/06/2019
// Operations related backend of Non-Document type Schema
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const NonDocument = require('../models/nonDocuments');
//Fetching data from database
router.get('/', (req, res, next) =>
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
            url: 'http://localhost:3000/nonDocuments/' +doc._id
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
});
//Adding data to the database
router.post('/', (req, res, next) =>
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
        url: 'http://localhost:3000/nonDocuments/' +result._id
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
//Fetching data from the database
 router.get('/:nonDocumentsId', (req, res, next) =>
  {
   const id = req.params.nonDocumentsId;
   NonDocument.findById(id)
   .select('name code _id')
   .exec()
   .then(doc => {
     console.log("From database", doc);
     if(doc)
      {
       res.status(200).json(
         {
         nonDocument: doc,
         request: {
           type: 'GET',
           url: 'http://localhost:3000/nonDocuments/'
         }
       });
     } else {
       res.status(404).json({message: 'No Valid entry found for provided ID'})
     }
   })
   .catch(err =>
     {
     console.log(err);
     res.status(500).json({error: err})
   });
   });
//Deleting data from the database
router.delete('/:nonDocumentsId', (req, res, next) =>
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
        url: 'http://localhost:3000/nonDocuments',
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
});

module.exports = router;
