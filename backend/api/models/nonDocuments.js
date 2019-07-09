//author Shambhu:-25/06/2019
// Schema for the NonDocument type
const mongoose = require('mongoose');

const nonDocumentSchema = mongoose.Schema
(
  {
  _id: mongoose.Schema.Types.ObjectId,
  name: {type: String, required: true },
  code: {type: String, required: true }
}
);
module.exports = mongoose.model('NonDocument', nonDocumentSchema);
