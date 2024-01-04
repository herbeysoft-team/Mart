const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  recepientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  messageType: {
    type: String,
    enum: ["text", "listing"],
  },
  textMessage: {
    type: String,
    default: null,
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    default: null,
  },
  viewed: {
    type: Boolean,
    default: false,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const MessageModel = mongoose.model('Message', messageSchema);

module.exports = MessageModel;
