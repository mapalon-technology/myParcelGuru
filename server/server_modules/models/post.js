// author Dipti Borde:-25/06/2019
//Schema for Shipping Partners
//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
const mongoose = require('mongoose');
// Declaring schema for shipping partners
const postSchema = mongoose.Schema
(
  {
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  code: String
}
);

module.exports = mongoose.model('Post', postSchema);


