const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    userType: {
      type: String,
      enum: ["admin", "individual", "business"],
      required: false,
    },
    profile: {
      type: String,
      required: false,
    },
    fullname: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    profession: {
      type: String,
    },
    businessName: {
      type: String,
    },
    industry: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 1,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    coords: {
      latitude: { type: Number },
      longitude: { type: Number },
      latitudeDelta: { type: Number },
      longitudeDelta: { type: Number },
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
