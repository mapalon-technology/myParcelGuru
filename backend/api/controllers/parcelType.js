//author Shambhu:-10/07/2019
// Operations related backend of ParcelType Schema
// register your router here.
const ParcelType = require('../models/parcelType');
//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
const mongoose = require('mongoose');
// fetching data from backend
exports.parcelType_get_allrecords = (req, res, next) =>
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
            url: 'http://localhost:3000/v1/parcelType/'
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
}
// Adding data to the backend
exports.parcelType_create_parcelType = (req, res, next) =>
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
        url: 'http://localhost:3000/v1/parcelType/' +result._id
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
}
// fetching data from backend with particular ID
exports.parcelType_get_single_record = (req, res, next) =>
{
 const id = req.params.parcelTypeId;
 ParcelType.findById(id)
 .select('name code _id')
 .exec()
 .then(doc => {
   console.log("From database", doc);
   if(doc) {
     res.status(200).json(
       {
        parcelType: doc,
       request: {
         type: 'GET',
         url: 'http://localhost:3000/v1/parcelType/'
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
 }
 // Deleting data from backend
exports.parcelType_delete_record = (req, res, next) =>
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
       url: 'http://localhost:3000/v1/parcelType/',
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
