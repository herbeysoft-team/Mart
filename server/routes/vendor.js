const express = require("express");
const router = express.Router();

const {
  getVendorDetails,
  getVendorListing,
  getVendorsByLocation
} = require("../controller/vendor");
const verifyToken = require("../middleware/VerifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const {multerMiddleware} = require("../middleware/MulterUtil");


/** GET VENDOR DETAILS*/
router.get("/getvendordetails/:id/:longitude/:latitude", getVendorDetails)

/** GET VENDOR LISTINGS*/
router.get("/getvendorlisting/:id", getVendorListing)

/** GET VENDOR BY LOCATION */
router.get("/getvendorsbylocation/:longitude/:latitude", verifyToken, getVendorsByLocation)

module.exports = router;