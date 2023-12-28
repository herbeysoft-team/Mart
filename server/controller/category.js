const Category = require("../models/Category");

/**
 * POST - http://localhost:8002/api/v1/category/addcategory
 *
 */
exports.addcategory = async (req, res) => {
  const { type, label, value } = req.body;
  console.log(req.body);
  try {
    const category = await Category.findOneAndUpdate(
      { type },
      { $addToSet: { subcategories: { label, value } } },
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
  const { type, id } = req.params;
  const { newName } = req.body;
  try {
    const category = await Category.findOneAndUpdate(
      { type, "subcategories._id": id },
      {
        $set: {
          "subcategories.$.label": newName,
          "subcategories.$.value": newName.toLowerCase(),
        },
      },
      { new: true }
    );
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE - http://localhost:8002/api/v1/category/deletecategory/:type/:id
 *
 */
exports.deletecategory = async (req, res) => {
  const { type, id } = req.params;
  try {
    const category = await Category.findOneAndUpdate(
      { type },
      { $pull: { subcategories: { _id: id } } },
      { new: true }
    );
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
