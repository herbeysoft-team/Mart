const { hashData, verifyHashData } = require("../utilities/hashData");
const createToken = require("../utilities/createToken");
const geocode = require("../utilities/geocode");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { sendInviteNotificationEmail } = require("../utilities/sendOTP");
const RoleModel = require("../models/Role");
const AdminModel = require("../models/Admin");

/**
 * POST - http://localhost:8002/api/v1/admin/addrole
 */

exports.addRole = async (req, res) => {
  try {
    const { roleName, permissions } = req.body;

    // Check if the role name is already taken
    const existingRole = await RoleModel.findOne({ roleName });
    if (existingRole) {
      return res.status(400).json({ error: "Role name is already taken" });
    }

    // Create an array of PermissionSchema based on the permissions received
    const permissionArray = Object.entries(permissions).map(
      ([action, { modify, view }]) => ({
        action,
        modify,
        view,
      })
    );

    // Ensure each action is unique
    const uniqueActions = new Set();
    const uniquePermissionArray = permissionArray.filter((permission) => {
      if (uniqueActions.has(permission.action)) {
        return false; // Duplicate action found, skip
      }
      uniqueActions.add(permission.action);
      return true;
    });
    // Create a new role
    const newRole = new RoleModel({
      roleName,
      permissions: uniquePermissionArray,
    });

    // Save the new role
    await newRole.save();

    res.status(201).json({ message: "Role added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add role" });
  }
};

/**
 * GET - http://localhost:8002/api/v1/admin/getallroles
 */
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await RoleModel.find().select(
      "-createdAt -description -updatedAt -__v"
    );

    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch roles" });
  }
};

/**
 * PUT - http://localhost:8002/api/v1/admin/editrole/:roleId
 */
exports.editRole = async (req, res) => {
  const { roleId } = req.params;
  const { roleName, permissions } = req.body;

  try {
    // Find the role by ID
    const existingRole = await RoleModel.findById(roleId);

    if (!existingRole) {
      return res.status(404).json({ error: "Role not found" });
    }

    // Create an array of PermissionSchema based on the permissions received
    const permissionArray = Object.entries(permissions).map(
      ([action, { modify, view }]) => ({
        action,
        modify,
        view,
      })
    );

    // Update the role details
    existingRole.roleName = roleName || existingRole.roleName;
    existingRole.permissions = permissionArray || existingRole.permissions;

    // Save the updated role
    await existingRole.save();

    res.status(200).json({ message: "Role updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update role" });
  }
};

/**
 * DELETE - http://localhost:8002/api/v1/admin/deleterole/:roleId
 */
exports.deleteRole = async (req, res) => {
  const { roleId } = req.params;

  try {
    //Find the role by ID and delete it
    const deletedRole = await RoleModel.findByIdAndDelete(roleId);

    if (!deletedRole) {
      return res.status(404).json({ error: "Role not found" });
    }

    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete role" });
  }
};

/**
 * POST - http://localhost:8002/api/v1/admin/register
 */
exports.adminRegister = async (req, res) => {
  let { email, password, firstname, lastname, role } = req.body;

  //CHECK IF USER EXIST
  try {
    //check if user already exist
    const existingUser = await AdminModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Admin already exist, please sign in", code: 6 });
    }

    //IF IT IS A NEW USER, HASHED THE PASSWORD
    const hashedPassword = await hashData(password);

    //CREATE A NEW USER
    const adminUser = new AdminModel({
      email,
      password: hashedPassword,
      firstname,
      lastname,
      role,
    });

    //SAVE USER
    const createdAdmin = await adminUser.save();

    // if (createdUser) {
    //   const otp = await sendVerificationOTPEmail(email);
    //   res.status(201).json({
    //     message: "User has been created Successfully",
    //     regstatus: true,
    //   });
    // }

    res.status(201).json({
      message: "Admin has been created Successfully",
      regstatus: true,
    });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

/**
 * POST - http://localhost:8002/api/v1/admin/invite
 */
exports.adminInvite = async (req, res) => {
  let { email, role } = req.body;

  //CHECK IF USER EXIST
  try {
    //check if user already exist
    const existingUser = await AdminModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Admin already exist, please sign in", code: 6 });
    }

    const hashedPassword = await hashData("45ty63gssyashbydg");

    if (!existingUser) {
      const adminUser = new AdminModel({
        email,
        role,
        password: hashedPassword,
        firstname: "New",
        lastname: "User",
        status: "pending", // Set an initial status, indicating the registration is pending
      });

      //SAVE USER
      await adminUser.save();

      if (adminUser) {
        await sendInviteNotificationEmail(adminUser?.email);
      }

      res.status(201).json({
        message: "Invitation sent successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

/**
 * POST - http://localhost:8002/api/v1/admin/login
 *
 */
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    //CHECK IF THE INPUT IS NOT EMPTY
    if (!(email && password)) {
      throw Error("Empty Credentials Supplied");
    }

    //CHECK IF THE USER EXIST
    const userExist = await AdminModel.findOne(
      { email },
      { __v: 0, updatedAt: 0, createdAt: 0 }
    ).populate("role");
    //IF USER DOES NOT EXIST
    if (!userExist) {
      return res.status(201).json({ message: "user does not exist", code: 1 });
    }

    if (userExist.status === "pending") {
      return res.status(201).json({
        message: "Your account is pending approval",
        code: 2,
      });
    }

    if (userExist.status === "deactivated") {
      return res.status(201).json({
        message: "Your account has been deactivated",
        code: 3,
      });
    }

    //IF USER EXIST
    const hashedPassword = userExist.password;

    //CHECK IF PASSWORD MATCH
    const passwordMatch = await verifyHashData(password, hashedPassword);

    if (!passwordMatch) {
      return res
        .status(201)
        .json({ message: "Password in incorrect", code: 4 });
    }

    //CREATE USER TOKEN
    const tokenData = {
      userId: userExist._id,
      email,
    };
    const token = await createToken(tokenData);

    //ASIGN user token
    userExist.token = token;

    // //DESTRUCTION USER EXIST INFO
    const { password: userPassword, status, ...others } = userExist._doc;

    res.status(200).json({ others, message: "Login Successfully", code: 5 });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

/**
 * PUT - http://localhost:8002/api/v1/admin/changepassword
 *
 */
exports.changePassword = async (req, res) => {
  const userId = req.user.userId;
  const cpassword = req.params.cpassword;

  try {
    const hashedPassword = await hashData(cpassword);

    const updatedAdmin = await AdminModel.findOneAndUpdate(
      { _id: userId },
      { password: hashedPassword },
      { new: true } // To return the updated user instead of the old one
    );
    if (updatedAdmin) {
      return res
        .status(201)
        .json({ message: "Password Successsfully Changed" });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

/**
 * PUT - http://localhost:8002/api/v1/admin/updateprofile
 *
 */
exports.updateProfile = async (req, res) => {
  const userId = req.user.userId;
  const { firstname, lastname } = req.body;

  try {
    const updatedAdmin = await AdminModel.findOneAndUpdate(
      { _id: userId },
      { firstname: firstname, lastname: lastname },
      { new: true } // To return the updated user instead of the old one
    );
    if (updatedAdmin) {
      return res.status(201).json({ message: "Profile Updated Successsfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

/**
 * PUT - http://localhost:8002/api/v1/admin/updateadmin
 *
 */
exports.updateAdmin = async (req, res) => {
  const { firstname, lastname, role, status, email } = req.body;

  try {
    const updatedAdmin = await AdminModel.findOneAndUpdate(
      { email: email },
      { firstname: firstname, lastname: lastname, role: role, status: status },
      { new: true } // To return the updated user instead of the old one
    );
    if (updatedAdmin) {
      return res.status(201).json({ message: "Admin Updated Successsfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

/**
 * PUT - http://localhost:8002/api/v1/admin/updateadminadmit
 *
 */
exports.updateAdminAdmit = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const hashedPassword = await hashData(password);
    const updatedAdmin = await AdminModel.findOneAndUpdate(
      { email: email },
      { firstname: firstname, lastname: lastname, password: hashedPassword },
      { new: true } // To return the updated user instead of the old one
    );
    if (updatedAdmin) {
      return res.status(201).json({ message: "SignUp Successsfully", code: 9 });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

/**
 * POST - http://localhost:8002/api/v1/admin/changeprofilepic
 *
 */
exports.changeProfilePic = async (req, res) => {
  const userId = req.user.userId;
  const file = req.file.filename;

  try {
    const checkUser = await AdminModel.findById(userId);
    if (!checkUser) {
      return res.status(404).json({ error: "User not found" });
    }
    // Get image paths associated with the listing
    const imagePath = checkUser.profile; // Assuming 'images' contains paths or IDs

    if (imagePath) {
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
    }

    const updatedAdmin = await AdminModel.findOneAndUpdate(
      { _id: userId },
      { profile: file },
      { new: true } // To return the updated user instead of the old one
    );
    if (updatedAdmin) {
      return res.status(201).json({ message: "Profile Pic Updated" });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

/**
 * GET - http://localhost:8002/api/v1/admin/getalladmin
 */
exports.getAllAdmin = async (req, res) => {
  try {
    const admin = await AdminModel.find()
      .populate("role")
      .select("-password -createdAt -updatedAt -__v");

    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch roles" });
  }
};

/**
 * DELETE - http://localhost:8002/api/v1/admin/deleteadmin/:id
 */
exports.deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the role by ID and delete it
    const deletedAdmin = await AdminModel.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.status(200).json({ message: "Admin User Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete admin" });
  }
};
