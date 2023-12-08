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
    latitude: Number,
    longitude: Number,
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
