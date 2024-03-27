const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    profile: {
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
    role: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    status: {
      type: String,
      enum: ["active", "pending", "deactivated"],
      default: "pending",
    },
    token: String,
  },
  { timestamps: true }
);

const AdminUserModel = mongoose.model("Admin", AdminSchema);

module.exports = AdminUserModel;
