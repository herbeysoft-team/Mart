const mongoose = require('mongoose');
const { Schema } = mongoose;

const PermissionSchema = new Schema({
  action: {
    type: String,
    required: true,
  },
  modify: {
    type: Boolean,
    default: false,
  },
  view: {
    type: Boolean,
    default: false,
  },
});

const RoleSchema = new Schema(
  {
    roleName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    permissions: [PermissionSchema],
  },
  { timestamps: true }
);

const RoleModel = mongoose.model('Role', RoleSchema);

module.exports = RoleModel;
