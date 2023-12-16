const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    type: {
        type: String,
        enum: ['product', 'event', 'service'],
        required: true,
        unique: true,
      },
      subcategories: [{
        name: {
          type: String,
          required: true,
          unique: true,
        },
    }],
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
