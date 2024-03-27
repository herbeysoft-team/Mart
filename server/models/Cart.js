const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartItemSchema = new Schema({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const CartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [CartItemSchema],
});

CartSchema.methods.calculateTotal = function () {
  let total = 0;
  this.items.forEach((item) => {
    total += item.listing.price * item.quantity;
  });
  return total;
};

const CartModel = mongoose.model("Cart", CartSchema);

module.exports = CartModel;
