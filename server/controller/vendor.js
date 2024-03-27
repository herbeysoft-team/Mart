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
      businessName,
      _id,
      rating,
      ratingCount,
      verifiedAccount,
      address,
      profession,
      industry,
      physicalStore,
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
        businessName,
        profession,
        industry,
        physicalStore,
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

/**
 * GET - http://localhost:8002/api/v1/vendor/getvendorsbylocation/:longitude/:latitude
 *
 */
exports.getVendorsByLocation = async (req, res) => {
  try {
    const { longitude, latitude } = req.params;
    const maxDistance = 30000; // 30 kilometers (adjust as needed)
    const averageCarSpeed = 13.4;
    // Find the user by ID
    const user = await User.findById(req.user.userId);

    // $geoNear stage should be the first stage
    const vendors = await User.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          distanceField: "distance",
          spherical: true,
          maxDistance: maxDistance,
        },
      },
      {
        $match: {
          _id: { $ne: user._id }, // Exclude the current user
        },
      },
      {
        $project: {
          fullname: 1,
          businessName: 1,
          location: 1,
          rating: 1,
          ratingCount: 1,
          verifiedAccount: 1,
          address: 1,
          profile: 1,
          distance: 1,
          profession: 1,
          industry: 1,
          physicalStore: 1, // Include the distance field in the output
        },
      },
    ]);

    // Calculate travel time based on distance and average car speed
    vendors.forEach((vendor) => {
      const travelTime = vendor.distance / averageCarSpeed;
      vendor.travelTimeMinutes = Math.round(travelTime / 60); // Convert seconds to minutes
    });
    res.status(200).json(vendors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
