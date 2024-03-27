const express = require("express");
const router = express.Router();

const {
  addRole,
  getAllRoles,
  editRole,
  deleteRole,
  adminRegister,
  adminLogin,
  changePassword,
  updateProfile,
  changeProfilePic,
  getAllAdmin,
  updateAdmin,
  adminInvite,
  deleteAdmin,
  updateAdminAdmit
} = require("../controller/admin");

const verifyAdmin = require("../middleware/verifyAdmin");
const {multerMiddleware} = require("../middleware/MulterUtil");


/**ADD ADMIN NEW ROLE*/
router.post("/addrole", addRole);

/**REGISTER NEW ADMIN*/
router.post("/register", adminRegister);

/**LOGIN ADMIN*/
router.post("/login", adminLogin);

/**SEND INVITE TO USER*/
router.post("/invite", verifyAdmin, adminInvite);

/**CHANGE PASSWORD*/
router.put("/changepassword/:cpassword", verifyAdmin, changePassword);

/**UPDATE PROFILE*/
router.put("/updateprofile", verifyAdmin, updateProfile);

/**UPDATE ADMIN*/
router.put("/updateadmin", verifyAdmin, updateAdmin);

/**UPDATE ADMIN ADMIT*/
router.put("/updateadminadmit", updateAdminAdmit);

/**UPDATE PROFILE PICTURE*/
router.post("/changeprofilepic", verifyAdmin, multerMiddleware, changeProfilePic);

/**GET ALL ADMIN*/
router.get("/getalladmin", getAllAdmin);

/**GET ALL ROLES*/
router.get("/getallroles", getAllRoles);

/**EDIT ROLE*/
router.put("/editrole/:roleId", editRole);

/**DELETE ROLE*/
router.delete("/deleterole/:roleId", deleteRole);

/**DELETE ADMIN*/
router.delete("/deleteadmin/:id", verifyAdmin, deleteAdmin);


module.exports = router;