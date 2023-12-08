const User = require("../models/User");

/**
 * GET - http://localhost:8002/api/v1/user/getuserprofile/:id
 */
//Get user profile
exports.getuserprofile = async (req, res) => {
  const userId = req.params.userId
  try {
    const getUserProfile = await User.findOne({ _id : userId });
    
    if (getUserProfile) {
      res.status(201).json(getUserProfile);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};



/**
 * GET - http://localhost:8002/api/v1/user/allusersforadmin/
 */
//Get all users
exports.allusersforadmin = async (req, res) => {
  try {
    const getAllUsers = await User.find()
    if (getAllUsers) {
      res.status(201).json(getAllUsers);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

