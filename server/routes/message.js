const express = require("express");
const router = express.Router();
const {
    sendmessage,
    getmessages,
    getmessageuser,
    getchatlist
   } = require("../controller/message");

/**SEND MESSAGE */
router.post("/sendmessage/", sendmessage);

/**RETRIEVE MESSAGES BETWEEN TWO USERS */
router.get("/getmessages/:senderId/:recepientId", getmessages);

/**GET USER YOU CHAT WITH */
router.get("/:userId", getmessageuser);

/**GET USER CHAT LIST */
router.get("/getchatlist/:userId", getchatlist);


module.exports = router;