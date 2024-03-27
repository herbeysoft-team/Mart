const express = require("express");
const router = express.Router();

const {
  getuserprofile,
  allusersforadmin,
  updateuserprofile,
  changeProfilePic,
  submitVerification,
  getallverifications,
  updateverificationstatus
} = require("../controller/user");
const verifyToken = require("../middleware/VerifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  multerMiddleware,
  multerMultipleMiddleware,
} = require("../middleware/MulterUtil");

/**GET ALL USER FOR ADMIN*/
router.get("/allusersforadmin", verifyAdmin, allusersforadmin);

/**GET USER INFORMATION */
router.get("/getuserprofile/:userId", getuserprofile);

/**UPDATE PROFILE PICTURE*/
router.post(
  "/changeprofilepic",
  verifyToken,
  multerMiddleware,
  changeProfilePic
);

/**SUBMIT VERIFIICATION*/
router.post(
  "/submitverification",
  verifyToken,
  multerMultipleMiddleware,
  submitVerification
);

/**UPDATE ADMIN*/
router.put("/updateuserprofile", verifyToken, updateuserprofile);

/**GET ALL VERIFICATIONS BY ADMIN*/
router.get("/getallverifications", getallverifications);

/**UPDATE VERIFICATION BY ADMIN*/
router.put("/updateverificationstatus", updateverificationstatus);

module.exports = router;
