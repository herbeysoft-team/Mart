const User = require("../models/User");
const Listing = require("../models/Listing");
const geocode = require("../utilities/geocode");

/**
 * POST - http://localhost:8002/api/v1/listing/addlisting
 *
 */
exports.addlisting = async (req, res) => {
  const userId = req.user.userId;

  try {
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
          brand: req.body?.brand,
          condition: req.body?.condition,
          image: req.body?.image,
          location: {
            latitude: coordinate?.latitude,
            longitude: coordinate?.longitude,
            address: req.body?.location,
          },
          stock: {
            available: req.body?.available,
            quantity: parseInt(req.body?.quantity),
          },
          user: userId,
          tags: req.body?.tags,
        });

        // Save the listing to the database
        const savedListing = await productListing.save();

        // Update the user with the new listing
        user.listings.push(savedListing._id);
        await user.save();

        res
          .status(201)
          .json({ message: "Listing Added Successfully", savedListing });
      }
    }

    if (req.body?.type == "service") {
      const serviceListing = new Listing({
        type: req.body?.type,
        name: req.body?.name,
        description: req.body?.description,
        price: parseInt(req.body?.price),
        unit: req.body?.unit,
        provider: req.body?.provider,
        available: req.body?.available,
        time: req.body?.time,
        image: req.body?.image,
        location: {
          latitude: coordinate?.latitude,
          longitude: coordinate?.longitude,
          address: req.body?.location,
        },
        user: userId,
        tags: req.body?.tags,
      });

      // Save the listing to the database
      const savedListing = await serviceListing.save();

      // Update the user with the new listing
      user.listings.push(savedListing._id);
      await user.save();

      res
        .status(201)
        .json({ message: "Listing Added Successfully", savedListing });
    }

    if (req.body?.type === "event") {
      const eventListing = new Listing({
        type: req.body?.type,
        name: req.body?.name,
        description: req.body?.description,
        price: parseInt(req.body?.price),
        unit: req.body?.unit,
        date: req.body?.date,
        time: req.body?.time,
        organizer: req.body?.organizer,
        image: req.body?.image,
        location: {
          latitude: coordinate?.latitude,
          longitude: coordinate?.longitude,
          address: req.body?.location,
        },
        user: userId,
        tags: req.body?.tags,
      });

      // Save the listing to the database
      const savedListing = await eventListing.save();

      // Update the user with the new listing
      user.listings.push(savedListing._id);
      await user.save();

      res
        .status(201)
        .json({ message: "Listing Added Successfully", savedListing });
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
    res.status(200).json({message: "Listing Updated Successfuly", updatedListing});
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
