const UserModel = require("../models/User");
const ReviewModel = require("../models/Review");

/**
 * POST - http://localhost:8002/api/v1/review/addvendorreview/
 *
 */

exports.addReview = async (req, res) => {
  const { vendorId, rating, comment } = req.body;
  const userId = req.user.userId;

  try {
    // Retrieve the user's data and populate the givenReviews field
    const vendorReview = await UserModel.findById(vendorId).populate(
      "receivedReviews"
    );
    const user = await UserModel.findById(userId);

    const existingReview = vendorReview.receivedReviews.find((review) =>
      review.user.equals(user.id)
    );

    if (existingReview) {
      return res
        .status(400)
        .json({ error: "You have already given a review to this vendor" });
    }

    // Create a new review
    const newReview = new ReviewModel({
      user: userId,
      rating: parseInt(rating),
      comment,
      vendor: vendorId,
    });

    // Save the review
    await newReview.save();

    // Update the vendor's received reviews
    const vendor = await UserModel.findById(vendorId);
    vendor.receivedReviews.push(newReview);
    // Update vendor's rating based on the new review
    vendor.rating =
      (vendor.rating * vendor.ratingCount + parseInt(rating)) /
      (vendor.ratingCount + 1);
    vendor.ratingCount++;
    await vendor.save();

    // Update the user's given reviews
    user.givenReviews.push(newReview);
    await user.save();

    res.status(200).json({ message: "Review added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add review" });
  }
};

/**
 * GET - http://localhost:8002/api/v1/review/getvendorreview/:id/
 *
 */
exports.getVendorReviews = async (req, res) => {
  const { vendorId } = req.params;

  try {
    // Find the vendor and populate the receivedReviews field to include user details
    const vendor = await UserModel.findById(vendorId).populate({
      path: "receivedReviews",
      populate: {
        path: "user",
        model: "User",
        select: "fullname profile verifiedAccount",
      },
    });

    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    // Extract relevant details for response
    const reviews = vendor.receivedReviews.map((review) => ({
      _id: review._id,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      user: {
        id: review.user._id,
        fullname: review.user.fullname,
        profile: review.user.profile,
        verifiedAccount: review.user.verifiedAccount
      },
    }));

    // Calculate statistics of received reviews
    const reviewStats = {
      '5': 0,
      '4': 0,
      '3': 0,
      '2': 0,
      '1': 0,
    };

    vendor.receivedReviews.forEach((review) => {
      reviewStats[review.rating.toString()]++;
    });

    // Get vendor rating and rating count
    const vendorRating = vendor.rating;
    const ratingCount = vendor.ratingCount;

    const response = {
      reviews,
      reviewStats,
      vendorRating,
      ratingCount,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

/**
 * GET - http://localhost:8002/api/v1/review/getuserreview/:id/
 *
 */
exports.getUserReview = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the vendor and populate the receivedReviews field to include user details
    const user = await UserModel.findById(userId).populate({
      path: "givenReviews",
      populate: {
        path: "vendor",
        model: "User",
        select: "fullname profile verifiedAccount",
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract relevant details for response
    const reviews = user.givenReviews.map((review) => ({
      _id: review._id,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      user: {
        id: review.vendor._id,
        fullname: review.vendor.fullname,
        profile: review.vendor.profile,
        verifiedAccount: review.vendor.verifiedAccount
      },
    }));

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

/**
 * POST - http://localhost:8002/api/v1/review/editreview/
 *
 */

exports.editReview = async (req, res) => {
  const { reviewId, rating, comment } = req.body;

  try {
    // Find the review
    const review = await ReviewModel.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Find the vendor associated with the review
    const vendor = await UserModel.findById(review.vendor);

    // Update the vendor's rating based on the edited review
    vendor.rating =
      (vendor.rating * vendor.ratingCount - review.rating + rating) /
      vendor.ratingCount;

    // Save the updated vendor rating
    await vendor.save();

    // Update the review details
    review.rating = rating;
    review.comment = comment;

    // Save the updated review
    await review.save();

    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update review" });
  }
};


/**
 * DELETE - http://localhost:8002/api/v1/review/deletereview/:reviewId
 *
 */
exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    // Find the review
    const review = await ReviewModel.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Find the vendor and user associated with the review
    const vendor = await UserModel.findById(review.vendor);
    const user = await UserModel.findById(review.user);

    // Remove the review ID from vendor's receivedReviews
    vendor.receivedReviews.pull(review._id);

    // Update vendor's rating based on the removed review
    if (vendor.ratingCount > 1) {
      vendor.rating =
        (vendor.rating * vendor.ratingCount - review.rating) / (vendor.ratingCount - 1);
      vendor.ratingCount--;
    } else {
      vendor.rating = 1; // Set to default if no other reviews
      vendor.ratingCount = 0;
    }

    // Remove the review ID from user's givenReviews
    user.givenReviews.pull(review._id);

    // Save the updated vendor and user
    await vendor.save();
    await user.save();

    // Delete the review1
    await ReviewModel.findOneAndDelete({ _id: reviewId });


    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
};