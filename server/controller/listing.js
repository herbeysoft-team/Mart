const User = require("../models/User");
const Listing = require("../models/Listing");
const geocode = require("../utilities/geocode");
const formatTimeRange = require("../utilities/formatTimeRange");
const formatTime = require("../utilities/formatTime");
const { Console } = require("console");

/**
 * POST - http://localhost:8002/api/v1/listing/uploadimages
 *
 */
exports.uploadimages = async (req, res) => {
  // const userId = req.user.userId;

  // console.log(userId);
  // console.log(req.files);
  // console.log(req.body);

  try {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const url = req.files[i].filename;
      uploadedFiles.push(url);
    }
    res.json(uploadedFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * POST - http://localhost:8002/api/v1/listing/addlisting
 *
 */
exports.addlisting = async (req, res) => {
  const userId = req.user.userId;
  // console.log(req.files)
  try {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const url = req.files[i].filename;
      uploadedFiles.push(url);
    }

    const tagsArray = req.body?.tags?.split(",");

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const coordinate = await geocode(req.body?.location);
    if (coordinate) {
      if (req.body?.type == "product") {
        const productListing = new Listing({
          type: req.body?.type,
          name: req.body?.name,
          description: req.body?.description,
          price: parseInt(req.body?.price),
          unit: req.body?.unit,
          category: req.body?.category,
          brand: req.body?.brand,
          condition: req.body?.condition,
          image: uploadedFiles,
          location: {
            type: "Point", // Adding the type here
            coordinates: [coordinate?.longitude, coordinate?.latitude], // Assigning coordinates
            address: req.body?.location,
          },
          stock: {
            available: req.body?.available,
            quantity: parseInt(req.body?.quantity),
          },
          user: userId,
          tags: tagsArray,
        });
        // Save the listing to the database
        const savedListing = await productListing.save();

        // Update the user with the new listing
        user.listings.push(savedListing._id);
        await user.save();
        res.status(201).json({
          message: "Listing Added Successfully",
          savedListing,
          status: true,
        });
      }
    }
    if (req.body?.type == "service") {
      const formattedTimeRange = formatTimeRange(req.body?.from, req.body?.to);
      const serviceListing = new Listing({
        type: req.body?.type,
        name: req.body?.name,
        description: req.body?.description,
        price: parseInt(req.body?.price),
        unit: req.body?.unit,
        provider: req.body?.provider,
        category: req.body?.category,
        available: req.body?.available,
        time: formattedTimeRange,
        image: uploadedFiles,
        location: {
          type: "Point", // Adding the type here
          coordinates: [coordinate?.longitude, coordinate?.latitude], // Assigning coordinates
          address: req.body?.location,
        },
        user: userId,
        tags: tagsArray,
      });
      // Save the listing to the database
      const savedListing = await serviceListing.save();
      // Update the user with the new listing
      user.listings.push(savedListing._id);
      await user.save();
      res.status(201).json({
        message: "Listing Added Successfully",
        savedListing,
        status: true,
      });
    }
    if (req.body?.type === "event") {
      const formattedTime = formatTime(req.body?.time);

      const eventListing = new Listing({
        type: req.body?.type,
        name: req.body?.name,
        description: req.body?.description,
        price: parseInt(req.body?.price),
        unit: req.body?.unit,
        category: req.body?.category,
        date: req.body?.date,
        time: formattedTime,
        image: uploadedFiles,
        location: {
          type: "Point", // Adding the type here
          coordinates: [coordinate?.longitude, coordinate?.latitude], // Assigning coordinates
          address: req.body?.location,
        },
        user: userId,
        tags: tagsArray,
      });
      // Save the listing to the database
      const savedListing = await eventListing.save();
      // Update the user with the new listing
      user.listings.push(savedListing._id);
      await user.save();
      res.status(201).json({
        message: "Listing Added Successfully",
        savedListing,
        status: true,
      });
    }
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
 * GET - http://localhost:8002/api/v1/listing/getlistingbylocation/:longitude/:latitude
 *
 */

exports.getListingsByLocation = async (req, res) => {
  try {
    const { longitude, latitude } = req.params;
    const maxDistance = 30000; // 30 kilometers (adjust as needed)
    const averageCarSpeed = 13.4;

    const listings = await Listing.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          distanceField: "distance",
          spherical: true,
          maxDistance,
        },
      },
    ]);

    // Calculate travel time based on distance and average car speed
    listings.forEach((listing) => {
      const travelTime = listing.distance / averageCarSpeed;
      listing.travelTimeMinutes = Math.round(travelTime / 60); // Convert seconds to minutes
    });

    res.status(200).json(listings);
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
  const userId = req.user.userId;
  const { id } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const coordinate = await geocode(req.body?.location);
    if (coordinate) {
      if (req.body?.type == "product") {
        const updateData = {
          type: req.body?.type,
          name: req.body?.name,
          description: req.body?.description,
          price: parseInt(req.body?.price),
          unit: req.body?.unit,
          category: req.body?.category,
          brand: req.body?.brand,
          condition: req.body?.condition,
          // image: req.,
          location: {
            type: "Point", // Adding the type here
            coordinates: [coordinate?.longitude, coordinate?.latitude], // Assigning coordinates
            address: req.body?.location,
          },
          stock: {
            available: req.body?.available,
            quantity: parseInt(req.body?.quantity),
          },
          user: userId,
          tags: req.body?.tags,
        };
        const updatedListing = await Listing.findByIdAndUpdate(id, updateData, {
          new: true, // To return the updated document
        });

        res.status(201).json({
          message: "Listing Updated Successfully",
          updatedListing,
          status: true,
        });
      }
      if (req.body?.type == "service") {
        const formattedTimeRange = formatTimeRange(
          req.body?.from,
          req.body?.to
        );
        const updateData = {
          type: req.body?.type,
          name: req.body?.name,
          description: req.body?.description,
          price: parseInt(req.body?.price),
          unit: req.body?.unit,
          provider: req.body?.provider,
          category: req.body?.category,
          available: req.body?.available,
          time: formattedTimeRange,
          // image: uploadedFiles,
          location: {
            type: "Point", // Adding the type here
            coordinates: [coordinate?.longitude, coordinate?.latitude], // Assigning coordinates
            address: req.body?.location,
          },
          user: userId,
          tags: req.body?.tags,
        };
        const updatedListing = await Listing.findByIdAndUpdate(id, updateData, {
          new: true, // To return the updated document
        });

        res.status(201).json({
          message: "Listing Updated Successfully",
          updatedListing,
          status: true,
        });
      }
      if (req.body?.type === "event") {
        const formattedTime = formatTime(req.body?.time);

        const updateData = {
          type: req.body?.type,
          name: req.body?.name,
          description: req.body?.description,
          price: parseInt(req.body?.price),
          unit: req.body?.unit,
          category: req.body?.category,
          date: req.body?.date,
          time: formattedTime,
          // image: uploadedFiles,
          location: {
            type: "Point", // Adding the type here
            coordinates: [coordinate?.longitude, coordinate?.latitude], // Assigning coordinates
            address: req.body?.location,
          },
          user: userId,
          tags: req.body?.tags,
        };
        const updatedListing = await Listing.findByIdAndUpdate(id, updateData, {
          new: true, // To return the updated document
        });

        res.status(201).json({
          message: "Listing Updated Successfully",
          updatedListing,
          status: true,
        });
      }
    }
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
    // Get image paths associated with the listing
    const imagePaths = deletedListing.image; // Assuming 'images' contains paths or IDs

    // Remove images from the public/Images folder
    imagePaths.forEach(async (imagePath) => {
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
    });
    // Remove the listing ID from the user's listings array
    const user = await User.findOne({ listings: id });
    if (user) {
      user.listings.pull(id);
      await user.save();
    }
    res
      .status(200)
      .json({ message: "Listing deleted successfully", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * GET - http://localhost:8002/api/v1/listing/getsimilarlisting/:listingId
 *
 */
exports.getSimilarListings = async (req, res) => {
  const { id, longitude, latitude } = req.params;
  const maxDistance = 30000; // 5 kilometers (adjust as needed)
  const averageCarSpeed = 13.4;
  try {
    // Find the current listing to use its category, type, and tags
    const currentListing = await Listing.findById(id);

    if (!currentListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Extract category, type, and tags of the current listing
    const { category, type, tags } = currentListing;

    // Find similar listings based on category, type, and at least one matching tag,
    // and calculate the distance to the given longitude/latitude
    const similarListings = await Listing.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          distanceField: 'distance',
          maxDistance: maxDistance,
          query: {
            $and: [
              { _id: { $ne: id } }, // Exclude the current listing
              { $or: [{ category }, { type }] }, // Match category or type
              { tags: { $in: tags } }, // Match at least one tag
            ],
          },
          spherical: true,
        },
      },
      { $limit: 2 }, // Limit the number of similar listings to 2
    ]);

    console.log(similarListings)

    similarListings.forEach((listing) => {
      const travelTime = listing.distance / averageCarSpeed;
      listing.travelTimeMinutes = Math.round(travelTime / 60); // Convert seconds to minutes
    });

    res.status(200).json(similarListings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
