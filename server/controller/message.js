const User = require("../models/User");
const Message = require("../models/Message");
const Listing = require("../models/Listing");

/**
 * POST - http://localhost:8002/api/v1/message/sendtextmessage
 *
 */
exports.sendmessage = async (req, res) => {
  const { senderId, recepientId, textMessage, messageType, listingId } =
    req.body;
  try {
    const newMessage = new Message({
      senderId,
      recepientId,
      messageType,
      textMessage,
      timestamp: new Date(),
      listing: messageType === "listing" ? listingId : null,
    });

    const savedMessage = await newMessage.save();

    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to send text message" });
  }
};

/**
 * GET - http://localhost:8002/api/v1/message/:senderId/:recepientId
 *
 */
exports.getmessages = async (req, res) => {
  try {
    const { senderId, recepientId } = req.params;

    // Fetch messages sent to the recipient with viewed: false
    let messages = await Message.find({
      senderId: senderId,
      recepientId: recepientId,
      viewed: false,
    })
      .sort({ timeStamp: 1 })
      .populate({
        path: "listing",
        model: Listing, // Replace with your Listing model
      });

    // Update recipient's messages to viewed: true
    if (messages.length > 0) {
      const messageIdsToUpdate = messages
        .filter((message) => message.senderId != senderId)
        .map((message) => message._id);

      if (messageIdsToUpdate.length > 0) {
        await Message.updateMany(
          { _id: { $in: messageIdsToUpdate } },
          { $set: { viewed: true } }
        );
      }
    }
    messages = await Message.find({
      $or: [
        { senderId: senderId, recepientId: recepientId },
        { senderId: recepientId, recepientId: senderId },
      ],
    })
      .sort({ timeStamp: 1 })
      .populate({
        path: "listing",
        model: Listing, // Replace with your Listing model
      });

    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * GET - http://localhost:8002/api/v1/message/:userId
 *
 */
exports.getmessageuser = async (req, res) => {
  try {
    const { userId } = req.params;

    //fetch the user data from the user ID
    const recepientId = await User.findById(userId).select(
      "fullname profile id"
    );

    res.json(recepientId);
  } catch (error) {}
};

/**
 * GET - http://localhost:8002/api/v1/message/getchatlist:userId
 *
 */
exports.getchatlist = async (req, res) => {
  const { userId } = req.params;
  try {
    const senderIds = await Message.distinct("senderId", {
      $and: [
        { $or: [{ senderId: userId }, { recepientId: userId }] },
        { senderId: { $ne: userId } }, // Exclude the current userId
      ],
    });

    const recepientIds = await Message.distinct("recepientId", {
      $and: [
        { $or: [{ senderId: userId }, { recepientId: userId }] },
        { recepientId: { $ne: userId } }, // Exclude the current userId
      ],
    });

    // Combine both senderIds and recepientIds into a single array

    const distinctUserIds = Array.from(
      new Set([...senderIds, ...recepientIds])
    );

    const uniqueUserIds = [
      ...new Set(distinctUserIds.map((id) => id.toString())),
    ];

    const userDetailsPromises = uniqueUserIds.map(async (id) => {
      const user = await User.findById(id).select("fullname profile");

      const unreadMessageCount = await Message.countDocuments({
        recepientId: userId,
        viewed: false,
      });

      const lastMessage = await Message.findOne({
        $or: [
          { senderId: userId, recepientId: id },
          { senderId: id, recepientId: userId },
        ],
        messageType: "text",
      }).sort({ timeStamp: -1 });

      return {
        userId: id,
        fullname: user.fullname,
        image: user.profile,
        lastMessage: lastMessage ? lastMessage.textMessage : "",
        lastMessageTime: lastMessage ? lastMessage.timeStamp : null,
        unreadMessageCount,
      };
    });

    const userDetails = await Promise.all(userDetailsPromises);

    const totalUnreadMessages = userDetails.reduce(
      (total, user) => total + user.unreadMessageCount,
      0
    );

    res.status(200).json({ userDetails, totalUnreadMessages });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.error(error);
  }
};
