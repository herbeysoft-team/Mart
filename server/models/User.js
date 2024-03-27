const mongoose = require("mongoose");
const { Schema } = mongoose;


const UserSchema = new Schema(
  {
    userType: {
      type: String,
      enum: [ "individual", "business"],
      required: false,
    },
    profile: {
      type: String,
      required: false,
    },
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
    verifiedAccount: {
      type: Boolean,
      default: false,
    },
    profileCompleted: {
      type: Boolean,
      default: false,
    },
    token: String,
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
      unique: true,
      required: true,
    },
    password: {
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
    physicalStore: {
      type: Boolean,
      default: false,
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
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        index: '2dsphere' // Ensures this field has a 2dsphere index
      },
    },
    listings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
      },
    ],
    verificationstatus: {
      type: String,
      enum: ["pending", "under review", "approved", "rejected"],
      default: "pending",
    },
    receivedReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Reviews received as a vendor
    givenReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Reviews given as a customer
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
