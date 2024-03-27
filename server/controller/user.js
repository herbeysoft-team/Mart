const User = require("../models/User");
const Verification = require("../models/Verification");
const geocode = require("../utilities/geocode");

/**
 * GET - http://localhost:8002/api/v1/user/getuserprofile/:id
 */
//Get user profile
exports.getuserprofile = async (req, res) => {
  const userId = req.params.userId;
  try {
    const getUserProfile = await User.findOne({ _id: userId })
      .select(
        "_id fullname businessName profile verifiedEmail verifiedAccount profileCompleted email address profession industry userType phoneNumber verificationstatus"
      )
      .exec();

    if (getUserProfile) {
      res.status(201).json(getUserProfile);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

/**
 * PUT - http://localhost:8002/api/v1/user/updateuserprofile
 *
 */
exports.updateuserprofile = async (req, res) => {
  const userId = req.user.userId;
  const { userType } = req.user; // Assuming userType is available in the user object

  let updateFields = {};

  // Check the user type and update fields accordingly
  if (userType === "individual") {
    const { fullname, profession, address, phone } = req.body;
    updateFields = { fullname, profession, address, phone };
  } else if (userType === "business") {
    const { businessName, industry, address, phone } = req.body;
    updateFields = { businessName, industry, address, phone };
  } else {
    return res.status(400).json({ error: "Invalid user type" });
  }

  try {
    // Retrieve new coordinate
    const coordinate = await geocode(updateFields?.address);

    // Update fields with new location if coordinate exists
    if (coordinate) {
      updateFields.location = {
        type: "Point",
        coordinates: [coordinate.longitude, coordinate.latitude],
      };
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      updateFields,
      { new: true }
    );

    if (updatedUser) {
      return res.status(200).json({ message: "Profile updated successfully" });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

/**
 * POST - http://localhost:8002/api/v1/user/submitverification
 *
 */

exports.submitVerification = async (req, res) => {
  const userId = req.user.userId; // Assuming user ID is available in the request
  const userType = req.user.userType; // Assuming user Type is available in the request
  // Extract files from the request
  const files = req.files;

  try {
    // Check if the user already has a pending verification
    const existingVerification = await Verification.findOne({
      user: userId,
      status: { $in: ["pending", "under review"] },
    });
    if (existingVerification) {
      return res.status(400).json({
        message:
          "You already have a pending verification document under review",
      });
    }

    let verificationStatus = "under review"; // Default status for new verification

    if (userType === "business") {
      // Create a new verification document for business user
      const verification = new Verification({
        user: userId,
        userType,
        idType: req.body?.idType,
        identityFront: files[0].filename,
        identityBack: files[1].filename,
        faceCapture: files[2].filename,
        cacDocument: files[3].filename,
        status: verificationStatus,
      });
      // Save the verification document
      await verification.save();
    } else if (userType === "individual") {
      // Create a new verification document for individual user
      const verification = new Verification({
        user: userId,
        userType,
        idType: req.body?.idType,
        identityFront: files[0].filename,
        identityBack: files[1].filename,
        faceCapture: files[2].filename,
        status: verificationStatus,
      });

      // Save the verification document
      await verification.save();
    } else {
      return res.status(400).json({ error: "Invalid userType" });
    }

    // Update the user's verification status to "under review"
    await User.findByIdAndUpdate(userId, {
      verificationstatus: verificationStatus,
    });

    res.status(200).json({ message: "Verification submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to submit verification" });
  }
};

/**
 * POST - http://localhost:8002/api/v1/user/changeprofilepic
 *
 */
exports.changeProfilePic = async (req, res) => {
  const userId = req.user.userId;
  const file = req.file.filename;

  try {
    const checkUser = await User.findById(userId);
    if (!checkUser) {
      return res.status(404).json({ error: "User not found" });
    }
    // Get image paths associated with the listing
    const imagePath = checkUser.profile; // Assuming 'images' contains paths or IDs

    // Use file system commands to delete the images
    const fs = require("fs");
    const path = require("path");
    const imagePathToDelete = path.join(
      __dirname,
      "../public/images/",
      imagePath
    );

    // Check if the file exists before attempting deletion
    if (fs.existsSync(imagePathToDelete)) {
      fs.unlinkSync(imagePathToDelete);
      console.log(`Deleted ${imagePathToDelete}`);
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { profile: file },
      { new: true } // To return the updated user instead of the old one
    );
    if (updatedUser) {
      return res.status(201).json({ message: "Profile Pic Updated" });
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
    const getAllUsers = await User.find();
    if (getAllUsers) {
      res.status(201).json(getAllUsers);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

/**
 * GET - http://localhost:8002/api/v1/user/getallverifications/
 */
//Get all verification documents
exports.getallverifications = async (req, res) => {
  try {
    const verifications = await Verification.find().populate({
      path: "user",
      select: "fullname businessName profile",
    });
    if (verifications) {
      res.status(201).json(verifications);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * PUT - http://localhost:8002/api/v1/user/updateverification/
 */
//Update Verfication Status
exports.updateverificationstatus = async (req, res) => {
  try {
    const { verificationId, status } = req.body;

    // Find the verification record
    const verification = await Verification.findById(verificationId);

    if (!verification) {
      return res.status(404).json({ message: "Verification record not found" });
    }

    // Update verification status based on input
    verification.status = status;

    // Update related user's verifiedAccount field if status is "approved"
    if (status === "approved") {
      const user = await User.findById(verification?.user?._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.verifiedAccount = true;
      user.verificationstatus = status;
      await user.save();
    } else if (status === "rejected") {
      const user = await User.findById(verification.user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.verifiedAccount = false;
      user.verificationstatus = status;
      await user.save();
    }

    // Save changes to verification model
    await verification.save();

    res
      .status(200)
      .json({ message: "Verification status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
