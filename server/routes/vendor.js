const express = require("express");
const router = express.Router();

const {
  getVendorDetails,
  getVendorListing
} = require("../controller/vendor");
const verifyToken = require("../middleware/VerifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const {multerMiddleware} = require("../middleware/MulterUtil");


/** GET VENDOR DETAILS*/
router.get("/getvendordetails/:id/:longitude/:latitude", getVendorDetails)

/** GET VENDOR LISTINGS*/
router.get("/getvendorlisting/:id", getVendorListing)

module.exports = router;