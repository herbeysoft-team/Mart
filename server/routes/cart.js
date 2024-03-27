const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/VerifyToken");
const {
   addItemToCart,
   incrementCartItemQuantity,
   decrementCartItemQuantity,
   getUserCartItemsGroupedByVendor
  } = require("../controller/cart");


/**ADD TO CART */
router.post("/addcart/", verifyToken, addItemToCart);

/**INCREMENT CART ITEM */
router.post("/incrementcartitem", verifyToken, incrementCartItemQuantity);

/**DECREMENT CART ITEM */
router.post("/decrementcartitem", verifyToken, decrementCartItemQuantity);

/**GET USER CART ITEM GROUP BY VENDOR */
router.post("/getcartitems/:userId", getUserCartItemsGroupedByVendor);


module.exports = router;