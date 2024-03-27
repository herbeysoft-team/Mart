const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/VerifyToken");
const {
   addlisting,
   getAllListings,
   getListingById,
   updateListing,
   deleteListing,
   uploadimages,
   getListingsByLocation,
   getSimilarListings
  } = require("../controller/listing");
const { multerMultipleMiddleware } = require("../middleware/MulterUtil");


/**ADD LISTING */
router.post("/uploadimages", multerMultipleMiddleware, uploadimages);

/**ADD LISTING */
router.post("/addlisting/", verifyToken, multerMultipleMiddleware, addlisting);

/**GET ALL LISTINGS */
router.get("/getalllisting",  getAllListings);

/** GET LISTIING BY LOCATION */
router.get("/getlistingbylocation/:longitude/:latitude", getListingsByLocation)

/** GET SIMILAR LISTING */
router.get("/getsimilarlisting/:id/:longitude/:latitude", getSimilarListings)

/**GET LISTING BY ID*/
router.get("/getlisting/:id", getListingById);

/**UPDATE LISTING*/
router.put("/updatelisting/:id", verifyToken, updateListing);

/**DELETE LISTING*/
router.delete("/deletelisting/:id", deleteListing);

module.exports = router;