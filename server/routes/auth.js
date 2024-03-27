const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/VerifyToken");
const {
  signup,
  login,
  verify,
  otp,
  emailotp,
  verifyemailotp,
  passwordreset,
  reset,
  completereg,
  changepassword,
} = require("../controller/auth");
const { multerMiddleware } = require("../middleware/MulterUtil");

/**SIGN UP */
router.post("/signup", signup);

/**LOGIN */
router.post("/login", login);

/*REQUEST NEW VERIFICATION OTP */
router.post("/otp", otp);

/**VERIFY THE OTP */
router.post("/verify", verify);

/**REQUEST NEW EMAIL VERIFICATION OTP*/
router.post("/emailotp", emailotp);

/**PHONE VERIFICATION OTP*/
router.post("/verifyemailotp", verifyemailotp);

/**PASSWORD RESET REQUEST */
router.post("/passwordreset", passwordreset);

/**PASSWORD RESET */
router.post("/reset", reset);

/**COMPLETE REG */
router.post("/completereg", multerMiddleware, completereg);

/**ADMIN CHANGE PASSOWRD */
router.post("/changepassword", changepassword);


// /**LOGOUT */
// router.post("/logout", logout);

module.exports = router;
