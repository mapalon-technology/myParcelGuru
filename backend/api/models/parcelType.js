//author Shambhu:-25/06/2019
// Schema for the Parcel type
const mongoose = require('mongoose');

const parcelTypeSchema = mongoose.Schema
(
  {
  _id: mongoose.Schema.Types.ObjectId,
  name: {type: String, required: true },
  code: {type: String, required: true }
}
);
module.exports = mongoose.model('ParcelType', parcelTypeSchema);
