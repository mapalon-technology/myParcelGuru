//author Shambhu:-10/07/2019
// Schema for the Measurement
//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
const mongoose = require('mongoose');
// Declaring schema for the Measurement
const measurementSchema = mongoose.Schema
(
  {
  c_mId: {type: String, required: true },
  weight: {type: String, required: true },
  length: {type: String, required: true },
  breadth: {type: String, required: true },
  height: {type: String, required: true }
}
);
module.exports = mongoose.model('Measurement', measurementSchema);
