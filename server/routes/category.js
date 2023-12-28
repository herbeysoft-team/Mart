const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/VerifyToken");
const {
   addcategory,
   getAllCategories,
   updateCategory,
   deletecategory
  } = require("../controller/category");




/**ADD CATEGORY */
router.post("/addcategory", addcategory);

/**GET ALL CATEGORY BY TYPE */
router.get("/getallcategories/:type", getAllCategories);

/**UPDATE CATEGORY*/
router.put("/updatecategory/:type/:id", updateCategory);

/**DELETE LISTING*/
router.delete("/deletecategory/:type/:id", deletecategory);

module.exports = router;