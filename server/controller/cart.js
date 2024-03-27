const mongoose = require("mongoose");
const Cart = require("../models/Cart");

/**
 * POST - http://localhost:8002/api/v1/cart/addcart
 *
 */
exports.addItemToCart = async (req, res) => {
  try {
    const { userId, listingId } = req.body;

    // Check if the user already has a cart
    let cart = await Cart.findOne({ user: userId });

    // If the user doesn't have a cart, create a new one
    if (!cart) {
      cart = new Cart({ user: userId });
    }

    // Check if the item is already in the cart
    const existingItem = cart.items.find(
      (item) => item.listing.toString() === listingId
    );

    // If the item is already in the cart, increment its quantity
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      // If the item is not in the cart, add it with quantity 1
      cart.items.push({ listing: listingId });
    }

    // Save the updated cart
    await cart.save();


    res.status(200).json({ message: "Item Added to cart successfully", cart });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Internal Server Error", error: "Internal Server Error" });
  }
};

// Controller to increment the quantity of an item in the cart
exports.incrementCartItemQuantity = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

     // Find the cart by user ID and populate the items
     const cart = await Cart.findOne({ user: userId }).populate({
      path: 'items.listing',
      select: "user name price image location",
    });;

    // Convert itemId string to ObjectId
    const itemIdObject = new mongoose.Types.ObjectId(itemId.toString());

    // Find the item in the cart
    const item = cart.items.find((item) => item.listing.equals(itemIdObject));
    // Increment the quantity of the item
    if (item) {
      item.quantity += 1;
    } else {
      return res
        .status(404)
        .json({ success: false, error: "Item not found in cart" });
    }

    // Save the updated cart
    await cart.save();
   

    res.status(200).json({ success: true, cart});
  } catch (error) {
    console.error("Error incrementing item quantity:", error);
    res.status(500).json({ message: "Internal Server Error", error: "Internal Server Error" });
  }
};

// Controller to decrement the quantity of an item in the cart
exports.decrementCartItemQuantity = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Find the cart by user ID and populate the items
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'items.listing',
      select: "user name price image location",
    });;

    // Convert itemId string to ObjectId
    const itemIdObject = new mongoose.Types.ObjectId(itemId.toString());

    
    // Find the item in the cart
    const itemIndex = cart.items.findIndex((item) =>
      item.listing.equals(itemIdObject)
    );

    // If the item is not found in the cart, return an error
    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, error: "Item not found in cart" });
    }

    // Decrement the quantity of the item
    cart.items[itemIndex].quantity -= 1;

    // If the item quantity becomes 0, remove it from the cart
    if (cart.items[itemIndex].quantity === 0) {
      cart.items.splice(itemIndex, 1);
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Error decrementing item quantity:", error);
    res.status(500).json({ message: "Internal Server Error", error: "Internal Server Error" });
  }
};

// Controller to get user cart items grouped by the vendor that listed the items
exports.getUserCartItemsGroupedByVendor = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ user: userId }).populate({
      path: "items.listing",
      select: "user name price image location",
    });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // Calculate total amount in the cart
    const totalAmount = cart.calculateTotal();

    const itemsGroupedByVendor = {};

    cart.items.forEach((item) => {
      const { user, name, price, image, location } = item.listing;
      if (!itemsGroupedByVendor[user]) {
        itemsGroupedByVendor[user] = [];
      }
      itemsGroupedByVendor[user].push({
        name,
        price,
        quantity: item.quantity,
        image,
        location
      });
    });

    res.status(200).json({ success: true, itemsGroupedByVendor, totalAmount });
  } catch (error) {
    console.error("Error getting user cart items grouped by vendor:", error);
    res.status(500).json({ message: "Internal Server Error", error: "Internal Server Error" });
  }
};
