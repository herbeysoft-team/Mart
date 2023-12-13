const { hashData, verifyHashData } = require("../utilities/hashData");
const createToken = require("../utilities/createToken");
const geocode = require("../utilities/geocode");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const {
  sendOTP,
  verifyOTP,
  sendVerificationOTPEmail,
  verifyUserEmail,
  resetUserPassword,
  sendPasswordResetOTPEmail,
} = require("../utilities/sendOTP");
// const moment = require("moment");
const User = require("../models/User");

/**
 * POST - http://localhost:8002/api/v1/auth/signup
 */

exports.signup = async (req, res) => {
  let { email, password } = req.body;

  //TRIM THE EMAIL AND PASSWORD
  email = email.trim();
  password = password.trim();
  //CHECK IF USER EXIST
  try {
    //check if user already exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "user already exist, please sign in", code: 6 });
    }

    //IF IT IS A NEW USER, HASHED THE PASSWORD
    const hashedPassword = await hashData(password);

    //CREATE A NEW USER
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    //SAVE USER
    const createdUser = await newUser.save();

    if (createdUser) {
      const otp = await sendVerificationOTPEmail(email);
      res.status(201).json({
        message: "User has been created Successfully",
        regstatus: true,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

/**
 * POST - http://localhost:8002/api/v1/auth/login
 *
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //CHECK IF THE INPUT IS NOT EMPTY
    if (!(email && password)) {
      throw Error("Empty Credentials Supplied");
    }

    //CHECK IF THE USER EXIST
    const userExist = await User.findOne(
      { email },
      { __v: 0, updatedAt: 0, createdAt: 0 }
    );

    //IF USER DOES NOT EXIST
    if (!userExist) {
      return res.status(201).json({ message: "user does not exist", code: 1 });
    }

    if (!userExist.verifiedEmail) {
      return res.status(201).json({
        message: "Your email hasn't be verified yet. Please check your inbox",
        code: 2,
      });
    }

    if (!userExist.profileCompleted) {
      return res.status(201).json({
        message: "Please!!! Complete your Registration",
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
    const tokenData = { userId: userExist?._id, email, userType: userExist?.userType};
    const token = await createToken(tokenData);

    //ASIGN user token
    userExist.token = token;

    //DESTRUCTION USER EXIST INFO
    const {
      email: userEmail,
      password: userPassword,
      ...others
    } = userExist._doc;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

/**
 * POST - http://localhost:8002/api/v1/auth/verify
 *
 */
exports.verify = async (req, res) => {
  try {
    let { email, otp } = req.body;

    const validOTP = await verifyOTP({ email, otp });
    res.status(200).json({ valid: validOTP });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

/**
 * POST - http://localhost:8002/api/v1/auth/otp
 */
exports.otp = async (req, res) => {
  try {
    const { email, subject, message, duration } = req.body;

    const createdOTP = await sendOTP({
      email,
      subject,
      message,
      duration,
    });

    res.status(200).json(createdOTP);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

/**
 * POST - http://localhost:8002/api/v1/auth/passwordreset
 */

exports.passwordreset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw Error("Email is required");

    const createPasswordResetOTP = await sendPasswordResetOTPEmail(email);
    res.status(200).json({ createPasswordResetOTP, resetStatus: true });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

/**
 * POST - http://localhost:8002/api/v1/auth/reset
 */
exports.reset = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    if (!(email && code && newPassword)) throw Error("Email is required");

    await resetUserPassword({ email, code, newPassword });
    res.status(200).json({ email, passwordreset: true });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error.message);
  }
};

/**
 * POST - http://localhost:8002/api/v1/auth/verifyemailotp
 */
exports.verifyemailotp = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email && code) throw Error("Empty otp details are not allowed");

    const verifiedEmail = await verifyUserEmail({ email, code });
    res.status(201).json({ email, verified: true, verifiedEmail });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

/**
 * POST - http://localhost:8002/api/v1/auth/emailotp
 */
exports.emailotp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw Error("Email is required");

    const createPhoneVerificationOTP = await sendVerificationOTPEmail(email);

    res.status(200).json(createPhoneVerificationOTP);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

/**
 * POST - http://localhost:8002/api/v1/auth/completereg
 */

exports.completereg = async (req, res) => {
  const file = req.file.filename;
  const email = req.body?.email;
  const address = req.body?.address;

  try {
    const coordinate = await geocode(address);

    // Update user entry with the extracted data
    if (coordinate) {
      const updateUser = {
        userType: req.body?.userType,
        coords: {
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        },
        address: address,
        phoneNumber: req.body?.phone,
        profileCompleted: true,
        profile: file,
      };

      if (req.body?.userType === "individual") {
        // For individual users
        updateUser.fullname = req.body?.fullname;
        updateUser.profession = req.body?.proffession;
      } else if (req.body?.userType === "business") {
        // For business users
        updateUser.businessName = req.body?.businessname;
        updateUser.industry = req.body?.industry;
      }

      const updatedUser = await User.findOneAndUpdate(
        { email }, // Search criteria (assuming email is unique)
        updateUser,
        { new: true } // To return the updated user instead of the old one
      );

      //CREATE USER TOKEN
      const tokenData = { userId: updatedUser?._id, email, userType: updateUser?.userType };
      const token = await createToken(tokenData);
  
      res.status(200).json({ updatedUser, regcompletestatus: true, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

// ADMIN SPECIAL API

/**
 * POST - http://localhost:8002/api/v1/auth/adminsignup
 */

exports.adminsignup = async (req, res) => {
  let { email, password, userType, industry } = req.body;

  //TRIM THE EMAIL AND PASSWORD
  email = email.trim();
  password = password.trim();
  //CHECK IF USER EXIST
  try {
    //check if user already exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "user already exist, please sign in", code: 6 });
    }

    //IF IT IS A NEW USER, HASHED THE PASSWORD
    const hashedPassword = await hashData(password);

    //CREATE A NEW USER
    const newUser = new User({
      email,
      password: hashedPassword,
      userType,
      industry,
    });

    //SAVE USER
    const createdUser = await newUser.save();

    if (createdUser) {
      const otp = await sendVerificationOTPEmail(email);
      res.status(201).json({
        message: "User has been created Successfully",
        regstatus: true,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

/**
 * POST - http://localhost:8002/api/v1/auth/adminlogin
 *
 */
exports.adminlogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    //CHECK IF THE INPUT IS NOT EMPTY
    if (!(email && password)) {
      throw Error("Empty Credentials Supplied");
    }

    //CHECK IF THE USER EXIST
    const userExist = await User.findOne(
      { email },
      { __v: 0, updatedAt: 0, createdAt: 0 }
    );
    //IF USER DOES NOT EXIST
    if (!userExist) {
      return res.status(201).json({ message: "user does not exist", code: 1 });
    }

    if (!userExist.verifiedEmail) {
      return res.status(201).json({
        message: "Your email hasn't be verified yet. Please check your inbox",
        code: 2,
      });
    }

    if (!userExist.profileCompleted) {
      return res.status(201).json({
        message: "Please!!! Complete your Registration",
        code: 3,
      });
    }

    if (userExist.userType !== "admin") {
      return res.status(201).json({
        message: "You are not authorized",
        code: 4,
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
      userType: userExist.userType,
    };
    const token = await createToken(tokenData);

    //ASIGN user token
    userExist.token = token;

    //DESTRUCTION USER EXIST INFO
    const {
      email: userEmail,
      password: userPassword,
      verifiedEmail,
      verifiedAccount,
      profileCompleted,
      industry,
      coords,
      rating,
      ratingCount,
      userType,
      ...others
    } = userExist._doc;

    res.status(200).json({ others, message: "Login Successfully", code: 9 });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

exports.changepassword = async (req, res) => {
  const { id, cpassword } = req.body;
  try {
    const hashedPassword = await hashData(cpassword);

    const updatedAdmin = await User.findOneAndUpdate(
      { _id: id },
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
