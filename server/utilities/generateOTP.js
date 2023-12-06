const generateOTP = async () => {
  try {
    return (otp = `${Math.floor(1000000 + Math.random() * 9000000)}`);
  } catch (error) {
    throw error;
  }
};

module.exports = generateOTP;
