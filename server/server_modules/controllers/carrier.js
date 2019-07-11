//author Dipti:-10/07/2019
// Operations related backend of Shipping Partners Schema
// register your router here.
const Post = require("../models/post");
//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
const mongoose = require('mongoose');
// fetching data from backend
exports.carrier_get_all_record = (req,res,next) =>
{
 Post.find().select('name')
 .exec()
 .then(docs =>
   {
   res.status(200).json(
     {
     count: docs.length,
     Post: docs.map(doc =>
        {
       return {
         _id: doc._id,
         name: doc.name,
         code: doc.code,
         request: {
           type: 'GET',
           url: 'http://localhost:3000/v1/carrier/'
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
// Adding data to the backend
exports.carrier_create_record = (req,res, next) =>
{
  const post= new Post(
    {
    _id: new mongoose.Types.ObjectId(),
    name:req.body.name,
    code: req.body.code
  });
  post.save()
  .then(result =>
     {
    console.log(result);
  })
  .catch(err => console.log(err));
  res.status(201).json({
    message: "Handling POST requests to /carrier!!!",
  createdPost:post
  });
}
// fetching data from backend with particular ID
exports.carrier_get_single_record = (req, res, next) =>
{
  const id = req.params.postId;
  Post.findById(id)
  .exec()
  .then(doc =>
    {
    console.log(doc);
    res.status(200).json(doc);
  })
  .catch(err =>
    {
    console.log(err);
    res.status(500).json({error : err})
  });
}
// Updating data which is already in the backend
exports.carrier_update_record = (req,res,next) =>
{
  const id = req.params.postId;
  const updateOps = {};
  for(const ops of req.body)
   {
    updateOps[ops.propName] = ops.value;
  }
  Post.update({_id: id }, {$set: updateOps })
 .exec()
 .then(result =>
  {
   res.status(200).json(
     {
     message: 'Carrier data updated',
     request: {
       type: 'GET',
       url: 'http://localhost:3000/v1/carrier/' +id
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
exports.carrier_delete_record =  (req,res,next) =>
{
  Post.remove({_id: req.params.postId})
  .exec()
  .then(result =>
    {
    res.status(200).json(
      {
      message: 'Carrier  Deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/v1/carrier/',
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
