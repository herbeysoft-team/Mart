const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/VerifyToken");
const {
   addlisting,
   getAllListings,
   getListingById,
   updateListing,
   deleteListing
  } = require("../controller/listing");
const { multerMiddleware } = require("../middleware/MulterUtil");



/**ADD LISTING */
router.post("/addlisting", verifyToken, addlisting);

/**GET ALL LISTINGS */
router.get("/getalllisting", getAllListings);

/**GET LISTING BY ID*/
router.get("/getlisting/:id", getListingById);

/**UPDATE LISTING*/
router.put("/updatelisting/:id", updateListing);

/**DELETE LISTING*/
router.delete("/deletelisting/:id", deleteListing);

module.exports = router;