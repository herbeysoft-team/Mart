const mongoose = require("mongoose");
const { Schema } = mongoose;

const ListingSchema = new Schema({
  id: Number,
  type: {
    type: String,
    enum: ["product", "service", "event"],
  },
  date: String,
  time: String,
  name: String,
  description: String,
  price: Number,
  unit: String,
  brand: String,
  category: String,
  condition: String,
  organizer: String,
  provider: String,
  available: String,
  image: [String],
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: {
      type: [Number],
      index: '2dsphere' // Ensures this field has a 2dsphere index
    },
    address: String,
  },
  stock: {
    available: Boolean,
    quantity: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tags: [String],
}, { timestamps: true });

const ListingModel = mongoose.model("Listing", ListingSchema);

module.exports = ListingModel;
