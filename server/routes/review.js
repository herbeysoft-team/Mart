const express = require("express");
const router = express.Router();

const {
  addReview,
  getVendorReviews,
  editReview, 
  getUserReview,
  deleteReview
} = require("../controller/review");
const verifyToken = require("../middleware/VerifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const {multerMiddleware} = require("../middleware/MulterUtil");


/**GIVE A REVIEW TO A VENDOR*/
router.post("/addreview", verifyToken, addReview);

/**GET VENDOR REVIEWS*/
router.get("/getvendorreview/:vendorId", getVendorReviews);

/**GET USER REVIEWS*/
router.get("/getuserreview/:userId", getUserReview);

/**EDIT MY REVIEWS*/
router.post("/editreview", verifyToken, editReview);

/**EDIT MY REVIEWS*/
router.delete("/deletereview/:reviewId", verifyToken, deleteReview);

module.exports = router;