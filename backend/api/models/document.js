//author Shambhu:-25/06/2019
// Schema for the Document type
//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
const mongoose = require('mongoose');
// Declaring schema for the Document type
const documentSchema = mongoose.Schema
(
  {
  _id: mongoose.Schema.Types.ObjectId,
  name: {type: String, required: true },
  code: {type: String, required: true }
}
);
module.exports = mongoose.model('Document', documentSchema);
