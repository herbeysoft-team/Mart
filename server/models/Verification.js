// verification.model.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const VerificationSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userType: {
    type: String,
    enum: ["individual", "business"],
    required: true,
  },
  idType:{
    type: String,
    required: false,
  },
  identityFront: {
    type: String,
    required: false,
  },
  identityBack: {
    type: String,
    required: false,
  },
  faceCapture: {
    type: String,
    required: false,
  },
  cacDocument: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ["pending", "under review", "approved", "rejected"],
    default: "pending",
  },
}, { timestamps: true });

const VerificationModel = mongoose.model("Verification", VerificationSchema);

module.exports = VerificationModel;
