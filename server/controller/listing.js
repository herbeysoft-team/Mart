const User = require("../models/User");
const Listing = require("../models/Listing");

/**
 * POST - http://localhost:8002/api/v1/listing/addlisting
 *
 */
exports.addlisting = async (req, res) => {
  const {
    name,
    description,
    price,
    unit,
    brand,
    condition,
    image,
    latitude,
    longitude,
    address,
    quantity,
    userId,
    tags,
    organizer, // Add fields specific to event
    date, // Add fields specific to event
    time, // Add fields specific to event
    provider, // Add fields specific to service
    available, // Add fields specific to service
  } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new listing
    const newListing = new Listing({
      type,
      name,
      description,
      price,
      unit,
      brand,
      condition,
      image,
      location: {
        latitude,
        longitude,
        address,
      },
      stock: {
        available: true, // You can adjust this based on your business logic
        quantity,
      },
      user: user._id, // Assign the user ID to the listing
      tags,
      organizer, // Add fields specific to event
      date, // Add fields specific to event
      time, // Add fields specific to event
      provider, // Add fields specific to service
      available, // Add fields specific to service
    });

    // Save the listing to the database
    const savedListing = await newListing.save();

    // Update the user with the new listing
    user.listings.push(savedListing._id);
    await user.save();

    res.status(201).json(savedListing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


/**
 * GET - http://localhost:8002/api/v1/listing/getalllisting
 *
 */
exports.getAllListings = async (req, res) => {
  try {
    const allListings = await Listing.find();
    res.status(200).json(allListings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


/**
 * GET - http://localhost:8002/api/v1/listing/getlisting/:id
 *
 */
exports.getListingById = async (req, res) => {
  const { id } = req.params;

  try {
    const foundListing = await Listing.findById(id);
    if (!foundListing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json(foundListing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


/**
 * PUT - http://localhost:8002/api/v1/listing/updatelisting/:id
 *
 */
exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedListing = await Listing.findByIdAndUpdate(id, updateData, {
      new: true, // To return the updated document
    });
    if (!updatedListing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.status(200).json(updatedListing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


/**
 * DELETE - http://localhost:8002/api/v1/listing/deletelisting/:id
 *
 */

exports.deleteListing = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    // Remove the listing ID from the user's listings array
    const user = await User.findOne({ listings: id });
    if (user) {
      user.listings.pull(id);
      await user.save();
    }
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
