//author Shambhu:-25/06/2019
// Schema for the Parcel type
//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
const mongoose = require('mongoose');
// Declaring schema for the Parcel type
const parcelTypeSchema = mongoose.Schema
(
  {
  _id: mongoose.Schema.Types.ObjectId,
  name: {type: String, required: true },
  code: {type: String, required: true }
}
);
module.exports = mongoose.model('ParcelType', parcelTypeSchema);
