//author Dipti:-25/06/2019
// Operations related backend of Shipping Partners Schema
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Post = require('../models/post');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
// fetching data from backend
 router.get('',(req,res,next) =>
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
            url: 'http://localhost:3000'
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
// Adding the data to the database
router.post("/",(req,res, next) =>
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
});
// Fetching data from the database using ID
router.get('/:postId', (req, res, next) =>
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
});

router.patch('/:postId', (req,res,next) =>
{
res.status(200).json({
  message: 'Update product'
});
});

router.delete('/:postId', (req,res,next) =>
{
  const id= req.params.postId
});

module.exports = router;
