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
        label: {
          type: String,
          required: true,
        },
        value: {
          type: String,
        },
    }],
  },
  { timestamps: true }
);

CategorySchema.index({ type: 1, 'subcategories.label': 1 }, { unique: true });

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
