const User = require("../models/User");
const Listing = require("../models/Listing");
const calculateDistance = require("../utilities/calculateDistance");

/**
 * GET - http://localhost:8002/api/v1/vendor/getvendordetails/:id/:longitude/:latitude
 *
 */

exports.getVendorDetails = async (req, res) => {
  try {
    const { id, longitude, latitude } = req.params;

    // Find the vendor by id
    const vendor = await User.findById(id);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Calculate distance between requester's location and vendor's location
    const requesterCoordinates = [parseFloat(longitude), parseFloat(latitude)];
    const vendorCoordinates = vendor.location.coordinates;
    const distance = calculateDistance(requesterCoordinates, vendorCoordinates); // Implement your distance calculation logic here

    // Extract required fields from the vendor object
    const {
      profile,
      fullname,
      _id,
      rating,
      ratingCount,
      verifiedAccount,
      address,
    } = vendor;

    res.status(200).json({
      vendor: {
        profile,
        fullname,
        id: _id,
        rating,
        ratingCount,
        distance,
        verifiedAccount,
        address,
      },
    }); // Return vendor details and distance
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * GET - http://localhost:8002/api/v1/vendor/getvendorlisting/:id/
 *
 */

exports.getVendorListing = async (req, res) => {
  try {
    const vendorId = req.params.id; // Get the vendor ID from the request parameters

    // Find the user by their ID and populate the listings
    const vendor = await User.findById(vendorId).populate("listings");

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json(vendor.listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
