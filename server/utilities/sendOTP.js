require("dotenv").config(); //have access to environment variable
const { hashData, verifyHashData } = require("./hashData");
const generateOTP = require("./generateOTP");
const sendEmail = require("./sendEmail");
const { AUTH_EMAIL } = process.env;
const OTP = require("../models/OTP");
const User = require("../models/User");

/*VERIFY OTP */
const verifyOTP = async ({ email, code }) => {
  try {
    if (!(email && code)) {
      throw Error("Provide values for email and code");
    }

    //ENSURE OTP RECORD EXISTS
    const matchedOTPRecord = await OTP.findOne({ email });
    //ENSURE OTP RECORD MATCHES
    if (!matchedOTPRecord) {
      throw Error("No otp records found.");
    }

    const { expiredAt } = matchedOTPRecord;

    //CHECK FOR EXPIRED CODDE
    if (expiredAt < Date.now()) {
      //CLEAR ANY OLD RECORD
      await OTP.deleteOne({ email });
      throw Error("Code has expired. Request for a new one.");
    }

    //IF NOT EXPIRED
    const hashedOTP = matchedOTPRecord.otp;
    const validOTP = await verifyHashData(code, hashedOTP);
    return validOTP;
  } catch (error) {
    throw error;
  }
};

/*SEND OTP */
const sendOTP = async ({ email, subject, message, duration = 1 }) => {
  try {
    if (!(email && message)) {
      throw Error("Provide values for email and message");
    }

    //CLEAR ANY OLD RECORD
    await OTP.deleteOne({ email });

    //GENERATE NEW PIN
    const genOTP = await generateOTP();

    //SEND EMAIL
    const mailOptions = {
      from: "noreply@trowmart.app",
      to: email,
      subject,
      html: `<p>${message}</p><p style="color:blue; font-size:40px; letter-spacing:2px;"> ${genOTP}</p><p>This code <b>expires in ${duration} hour(s)</b></p>`,
    };
    await sendEmail(mailOptions);

    //SAVE OTP RECORD
    const hashedOTP = await hashData(genOTP);

    const newOTP = await new OTP({
      email,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000 * +duration,
    });

    const createdOTPRecord = await newOTP.save();
    return createdOTPRecord;
  } catch (error) {
    throw error;
  }
};

/*DELETE OTP */
const deleteOTP = async (email) => {
  try {
    //CLEAR ANY OLD RECORD
    await OTP.deleteOne({ email });
  } catch (error) {
    throw error;
  }
};

/*SEND OTP TO EMAIL FOR VERIFICATION */
const sendVerificationOTPEmail = async (email) => {
  try {
    //CHECK IF THE USER EXISTS
    const userExist = await User.findOne({ email });

    if (!userExist) {
      throw Error("There's no account for the provided email");
    }

    const otpDetails = {
      email,
      subject: "Email Verification",
      message: "Verify your email with the code below",
      duration: 1,
    };

    const createdOTP = await sendOTP(otpDetails);
    return createdOTP;
  } catch (error) {
    throw error;
  }
};

/*VERIFY USER OTP*/
const verifyUserEmail = async ({ email, code }) => {
  try {
    //CHECK IF THE OTP VALID
    const validOTP = await verifyOTP({ email, code });
    if (!validOTP) {
      throw Error("Invalid code passed. Check your inbox");
    }

    //NOW UPDATE USER RECORD AFTER SUCCESSFUL VERIFICATION
    await User.updateOne({ email }, { verifiedEmail: true });

    await OTP.deleteOne({ email });

    return;
  } catch (error) {
    throw error;
  }
};

/*SEND PASSWORD RESET TO EMAIL*/
const sendPasswordResetOTPEmail = async (email) => {
  try {
    //CHECK IF THE USER EXISTS
    const userExist = await User.findOne({ email });

    if (!userExist) {
      throw Error("There's no account for the provided email");
    }

    if (!userExist.verifiedEmail) {
      throw Error("Email hasn't been verified yet. Check your inbox");
    }

    const otpDetails = {
      email,
      subject: "Reset Email Password",
      message: "Reset your password with the code below",
      duration: 1,
    };

    const createdOTP = await sendOTP(otpDetails);
    return createdOTP;
  } catch (error) {
    throw error;
  }
};

/*RESET USER PASSWORD */
const resetUserPassword = async ({ email, code, newPassword }) => {
  try {
    //CHECK IF THE OTP VALID
    const validOTP = await verifyOTP({ email, code });
    if (!validOTP) {
      throw Error("Invalid code passed. Check your inbox");
    }

    //NOW UPDATE USER RECORD
    const hashedNewPassword = await hashData(newPassword);
    await User.updateOne({ email }, { password: hashedNewPassword });

    await OTP.deleteOne({email});
    return;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  sendOTP,
  verifyOTP,
  deleteOTP,
  sendVerificationOTPEmail,
  verifyUserEmail,
  sendPasswordResetOTPEmail,
  resetUserPassword,
};
