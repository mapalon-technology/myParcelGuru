//author Shambhu:-25/06/2019
// Operations related backend of ParcelType Schema
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ParcelType = require('../models/parcelType');
//fetching data from database
router.get('/', (req, res, next) =>
{
  ParcelType.find().select('name code')
  .exec()
  .then(docs =>
    {
    res.status(200).json(
      {
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
            url: 'http://localhost:3000/parcelType/'
          }
        }
      })
    });
  })
  .catch(err => {
    res.status(500).json(
      {
      error: err
    });
  })
});
//Adding data to the database
router.post('/', (req, res, next) =>
{
  const parcelType = new ParcelType(
    {
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    code: req.body.code
  });
  parcelType
  .save()
  .then(result =>
    {
    console.log(result);
    res.status(201).json(
      {
      message: 'Non Document stored',
      createdParcelType: {
        _id:result._id,
        name: result.name,
        code: result.code
      },
      request: {
        type: 'GET',
        url: 'http://localhost:3000/parcelType/' +result._id
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(
      {
      error: err
    });
  });
});
//fetching data from the database by id
 router.get('/:nonDocumentsId', (req, res, next) =>
  {
   const id = req.params.nonDocumentsId;
   NonDocument.findById(id)
   .select('name code _id')
   .exec()
   .then(doc => {
     console.log("From database", doc);
     if(doc) {
       res.status(200).json(
         {
         nonDocument: doc,
         request: {
           type: 'GET',
           url: 'http://localhost:3000/nonDocuments/'
         }
       });
     } else
     {
       res.status(404).json({message: 'No Valid entry found for provided ID'})
     }
   })
   .catch(err => {
     console.log(err);
     res.status(500).json({error: err})
   });
   });
//Deleting data from the database
router.delete('/:parcelTypeId', (req, res, next) =>
 {
  ParcelType.remove({_id: req.params.parcelTypeId})
  .exec()
  .then(result =>
    {
    res.status(200).json(
      {
      message: 'ParcelType  Deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/parcelType',
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
