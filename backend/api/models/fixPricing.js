//author Shambhu:-10/07/2019
// Schema for the Fix Pricing
//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
const mongoose = require('mongoose');
// Declaring schema for the Fix Pricing
const fixPricingSchema = mongoose.Schema
(
  {
  cc_priceId: {type: String, required: true },
  sameDay: {type: Boolean, required: false },
  nextDay: {type: Boolean, required: false },
  twoDay: {type: Boolean, required: false },
  threePlus: {type: Boolean, required: false },
  isPickup: {type: String, required: true },
  isInsure: {type: String, required: true }
}
);
module.exports = mongoose.model('fixPricing', fixPricingSchema);
