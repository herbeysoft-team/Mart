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

/*SEND MESSAGE NOTIFICATION EMAIL*/
const sendMessageNotificationEmail = async (recepientId) => {
  try {
    //CHECK IF THE USER EXISTS
    const userExist = await User.findOne({ _id: recepientId });

    if (!userExist) {
      throw Error("There's no account for the provided email");
    }

    //SEND EMAIL
    const mailOptions = {
      from: "noreply@trowmart.app",
      to: userExist?.email,
      subject: "New Message Notification",
      html: `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6U7Fm6f5eD1fGyoD5TmP3U/igNlVP" crossorigin="anonymous">
  <style>
    body {
      background-color: #f2f2f2;
      font-family: 'Helvetica', sans-serif; /* Use Helvetica font */
      color: #333;
      padding: 20px;
    }
	.header-container {
      background-color: #007bff; /* Blue background color */
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      text-align: center; /* Center align text in the blue box */
      margin-bottom: 20px; /* Add space between blue box and content */
    }
    .email-container {
      background-color: #fff; /* Blue background color */
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px; /* Add space between blue box and content */
    }
    h1 {
      color: #fff; /* White text color for TrowMart */
	  font-family: 'Helvetica', sans-serif; /* Use Helvetica font for paragraphs */
	  font-size: 4rem
    }
	h2 {
      color: #000; 
	  font-family: 'Helvetica', sans-serif; /* Use Helvetica font for paragraphs */
    }
    p {
      margin-bottom: 15px;
      font-family: 'Helvetica', sans-serif; /* Use Helvetica font for paragraphs */
    }
    .social-links {
	  align: center; /* Center align text in the blue box */
      margin-top: 20px;
    }
    .social-links img {
      width: 30px; /* Adjust the width of social media icons */
      height: 30px; /* Adjust the height of social media icons */
      margin-right: 15px;
    }
  </style>
</head>
<body>
  <div class="header-container">
    <h1>TrowMart</h1> <!-- TrowMart text in the center of the blue box -->
  </div>

  <div class="email-container">
    <h2>Dear User,</h2>
    <p>You have a new message. Kindly check it out.</p>
    <br/>
    <p>Regards,</p>
    <p>TrowMart Team</p>

    <!-- Social Media Icons -->
    <div class="social-links">
      <a href="https://www.facebook.com/" target="_blank"><i class="fab fa-facebook"></i></a>
      <a href="https://twitter.com/" target="_blank"><i class="fab fa-twitter"></i></a>
      <a href="https://www.linkedin.com/" target="_blank"><i class="fab fa-linkedin"></i></a>
    </div>
  </div>
</body>
</html>

    `,
    };
    const sendMailNotification = await sendEmail(mailOptions);
    return sendMailNotification;
  } catch (error) {
    throw error;
  }
};

const sendInviteNotificationEmail = async (email) => {
  try {
    const registrationLink = `http://localhost:3000/complete-registration/${encodeURIComponent(
      email
    )}`;

    //SEND EMAIL
    const mailOptions = {
      from: "noreply@trowmart.app",
      to: email,
      subject: "Invitation to Join TrowMart ",
      html: `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6U7Fm6f5eD1fGyoD5TmP3U/igNlVP" crossorigin="anonymous">
  <style>
    body {
      background-color: #f2f2f2;
      font-family: 'Helvetica', sans-serif; /* Use Helvetica font */
      color: #333;
      padding: 20px;
    }
	.header-container {
      background-color: #007bff; /* Blue background color */
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      text-align: center; /* Center align text in the blue box */
      margin-bottom: 20px; /* Add space between blue box and content */
    }
    .email-container {
      background-color: #fff; /* Blue background color */
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px; /* Add space between blue box and content */
    }
    h1 {
      color: #fff; /* White text color for TrowMart */
	  font-family: 'Helvetica', sans-serif; /* Use Helvetica font for paragraphs */
	  font-size: 4rem
    }
	h2 {
      color: #000; 
	  font-family: 'Helvetica', sans-serif; /* Use Helvetica font for paragraphs */
    }
    p {
      margin-bottom: 15px;
      font-family: 'Helvetica', sans-serif; /* Use Helvetica font for paragraphs */
    }
    .social-links {
	  align: center; /* Center align text in the blue box */
      margin-top: 20px;
    }
    .social-links img {
      width: 30px; /* Adjust the width of social media icons */
      height: 30px; /* Adjust the height of social media icons */
      margin-right: 15px;
    }
  </style>
</head>
<body>
  <div class="header-container">
    <h1>TrowMart</h1> <!-- TrowMart text in the center of the blue box -->
  </div>

  <div class="email-container">
    <h2>Hi,</h2>
    <p>You have been invited to join TrowMart. Click the link below to complete your registration:</p>
    
    <a href="${registrationLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Complete Registration</a>
    
    <br/>
    <p>Regards,</p>
    <p>TrowMart Team</p>

    <!-- Social Media Icons -->
    <div class="social-links">
      <a href="https://www.facebook.com/" target="_blank"><i class="fab fa-facebook"></i></a>
      <a href="https://twitter.com/" target="_blank"><i class="fab fa-twitter"></i></a>
      <a href="https://www.linkedin.com/" target="_blank"><i class="fab fa-linkedin"></i></a>
    </div>
  </div>
</body>
</html>

    `,
    };
    const sendMailNotification = await sendEmail(mailOptions);
    return sendMailNotification;
  } catch (error) {
    throw error;
  }
};

/*SEND STOCK NOTIFICATION EMAIL*/
const sendStockNotificationEmail = async (recepientId) => {
  try {
    //CHECK IF THE USER EXISTS
    const userExist = await User.findOne({ _id: recepientId });

    if (!userExist) {
      throw Error("There's no account for the provided email");
    }

    //SEND EMAIL
    const mailOptions = {
      from: "noreply@trowmart.app",
      to: userExist?.email,
      subject: "Low Stock Notification",
      html: `<p>Dear User,</p><p>You have a new message, Kindly check it out.</p><br/><p>Regards,</p><p>TrowMart Team</p>`,
    };
    const sendMailNotification = await sendEmail(mailOptions);
    return sendMailNotification;
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

    await OTP.deleteOne({ email });
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
  sendMessageNotificationEmail,
  sendStockNotificationEmail,
  sendInviteNotificationEmail,
};
