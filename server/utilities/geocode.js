const axios = require("axios");
require("dotenv").config(); //have access to environment variable

const { GOOGLE_API } = process.env;

const geocode = async (address) => {

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: address,
          key: GOOGLE_API,
        },
      }
    );

    const { results } = response.data;
    if (results.length > 0) {
      const { lat, lng } = results[0].geometry.location;
      return { latitude: lat, longitude: lng };

    } else {
      console.log("No coordinates found for the address");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = geocode;
