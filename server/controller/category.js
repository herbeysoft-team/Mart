const Category = require("../models/Category");

/**
 * POST - http://localhost:8002/api/v1/category/addcategory
 *
 */
exports.addcategory = async (req, res) => {
  const { type, name } = req.body;
  try {
    const category = await Category.findOneAndUpdate(
      { type },
      { $addToSet: { subcategories: { name } } },
      { new: true, upsert: true }
    );
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET - http://localhost:8002/api/v1/category/getallcategories/:type
 *
 */
exports.getAllCategories = async (req, res) => {
  const { type } = req.params;
  console.log(type);
  try {
    const subcategories = await Category.findOne({ type });
    res.json(subcategories.subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * PUT - http://localhost:8002/api/v1/category/updatecategory/:type/:oldName
 *
 */
exports.updateCategory = async (req, res) => {
  const { type, oldName } = req.params;
  const { newName } = req.body;
  try {
    const category = await Category.findOneAndUpdate(
      { type, "subcategories.name": oldName },
      { $set: { "subcategories.$.name": newName } },
      { new: true }
    );
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE - http://localhost:8002/api/v1/category/deletecategory/:type/:name
 *
 */

exports.deletecategory = async (req, res) => {
  const { type, name } = req.params;
  try {
    const category = await Category.findOneAndUpdate(
      { type },
      { $pull: { subcategories: { name } } },
      { new: true }
    );
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
