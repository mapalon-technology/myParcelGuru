//author Shambhu:-10/07/2019
// Schema for the C_Services
//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
const mongoose = require('mongoose');
// Declaring schema for the C_Services
const cServicesSchema = mongoose.Schema
(
  {
  c_sId: {type: String, required: true },
  sameDay: {type: Boolean, required: false },
  nextDay: {type: Boolean, required: false },
  twoDay: {type: Boolean, required: false },
  threePlus: {type: Boolean, required: false }
}
);
module.exports = mongoose.model('cServices', cServicesSchema);
