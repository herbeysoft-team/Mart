const User = require("../models/User");

/**
 * GET - http://localhost:8002/api/v1/user/getuserprofile/:id
 */
//Get user profile
exports.getuserprofile = async (req, res) => {
  const userId = req.params.userId;
  try {
    const getUserProfile = await User.findOne({ _id : userId });
    
    if (getUserProfile) {
      res.status(201).json(getUserProfile);
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

// /**
//  * GET - http://localhost:8000/api/v1/user/updateuserprofile/:id
//  * id- Get user id
//  * fullname
//  * username
//  * gender
//  * city
//  *
//  */
// //Update user profile
// exports.updateuserprofile = async (req, res) => {
//   const userId = req.user.userId;
//   const { fullname, username, gender, city } = req.body;
//   try {
//     const UpdateUserProfile = await db.update(
//       "UPDATE userProfile SET fullname = ?, username = ?, gender=?, city=? WHERE id = ?",
//       [fullname, username, gender, city, userId]
//     );
//     if (UpdateUserProfile) {
//       res.status(201).json("Profile Updated Successfully");
//     }
//   } catch (error) {
//     res.status(500).json({ message: "something went wrong" });
//     console.log(error);
//   }
// };

// /**
//  * GET - http://localhost:8000/api/v1/user/updateuserprofilepic/:id
//  * id- Get user id
//  *
//  */
// //Update user profile
// exports.updateuserprofilepic = async (req, res) => {
//   const userId = req.user.userId;
//   const file = req.file.filename;
//   try {
//     const UpdateUserProfilePic = await db.update(
//       "UPDATE userProfile SET profilePic = ? WHERE id = ?",
//       [file, userId]
//     );
//     if (UpdateUserProfilePic) {
//       res.status(201).json("Updated Successfully");
//     }
//   } catch (error) {
//     res.status(500).json({ message: "something went wrong" });
//     console.log(error);
//   }
// };

// /**
//  * GET - http://localhost:8000/api/v1/user/getunfollowusers/:id
//  * id- Get user id
//  *
//  */
// //Get unfollow users
// exports.getunfollowusers = async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const getUnfollowUsers = await db.getall(
//       "SELECT u.id as unfollowId, u.fullname, u.profilePic FROM userProfile u WHERE u.id NOT IN (SELECT following_id FROM relationship WHERE follower_id = ? )  AND u.id <> ? ORDER BY u.username ASC LIMIT 5",
//       [userId, userId]
//     );

//     if (getUnfollowUsers) {
//       res.status(201).json(getUnfollowUsers);
//     }
//   } catch (error) {
//     res.status(500).json({ message: "something went wrong" });
//     console.log(error);
//   }
// };

// /**
//  * GET - http://localhost:8000/api/v1/user/getsearchusers/:searchname
//  * name - Name of the user OR
//  * phone Number - Phone number of the user
//  *
//  */
// //Get Search users
// exports.getsearchusers = async (req, res) => {
//   const searchName = req.params.searchname;
//   const userId = req.user.userId;
//   try {
//     const getSearchUsers = await db.getall(
//       "SELECT u.id as userId, u.fullname, u.profilePic, u.phone_no FROM userProfile u WHERE (u.fullname LIKE ? OR u.phone_no LIKE ?) AND u.id <> ?",
//       [`%${searchName}%`, `%${searchName}%`, userId]
//     );

//     if (getSearchUsers) {
//       res.status(201).json(getSearchUsers);
//     }
//   } catch (error) {
//     res.status(500).json({ message: "something went wrong" });
//     console.log(error);
//   }
// };

// /**
//  * GET - http://localhost:8000/api/v1/user/getuserstogift/:searchname
//  * name - Name of the user OR
//  * phone Number - Phone number of the user
//  *
//  */
// //Get Search users
// exports.getuserstogift = async (req, res) => {
//   const userId = req.user.userId;
//   try {
//     const getUsersToGift = await db.getall(
//       "SELECT u.id as userId, u.fullname, u.phone_no, u.username FROM userProfile u WHERE u.id <> ? ",
//       [userId]
//     );

//     if (getUsersToGift) {
//       res.status(201).json(getUsersToGift);
//     }
//   } catch (error) {
//     res.status(500).json({ message: "something went wrong" });
//     console.log(error);
//   }
// };

// // ADMIN SPECIAL API////////////////////////////////////////////////////////////

// //Get all users count
// exports.allcountfordashboard = async (req, res) => {
//   try {
//     const getUsersCount = await db.getval(
//       "SELECT COUNT(*) AS users FROM userprofile ",
//       []
//     );

//     const getPostCount = await db.getval(
//       "SELECT COUNT(*) AS posts FROM post ",
//       []
//     );

//     const getTrowboxCount = await db.getval(
//       "SELECT COUNT(*) AS trowbox FROM trowbox ",
//       []
//     );

//     const getGiftCount = await db.getval(
//       "SELECT COUNT(*) AS gift FROM trowbox_gift ",
//       []
//     );

//     const getRetrowCount = await db.getval(
//       "SELECT COUNT(*) AS retrow FROM retrow ",
//       []
//     );

//     const getShareCount = await db.getval(
//       "SELECT COUNT(*) AS share FROM share",
//       []
//     );

//     res.status(201).json({
//       getUsersCount,
//       getTrowboxCount,
//       getPostCount,
//       getGiftCount,
//       getRetrowCount,
//       getShareCount,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "something went wrong" });
//     console.log(error);
//   }
// };

// //Get all users count
// exports.allusersforadmin = async (req, res) => {
//   try {
//     const getAllUsers = await db.getall("SELECT * FROM userprofile ", []);

//     if (getAllUsers) {
//       res.status(201).json(getAllUsers);
//     }
//   } catch (error) {
//     res.status(500).json({ message: "something went wrong" });
//     console.log(error);
//   }
// };

// //Update user profile
// exports.updateuserprofilebyadmin = async (req, res) => {
//   const { verified, city, id } = req.body;
//   try {
//     const UpdateUserProfile = await db.update(
//       "UPDATE userProfile SET verified = ?, city = ? WHERE id = ?",
//       [verified, city, id]
//     );
//     if (UpdateUserProfile) {
      
//         res.status(201).json({ successupdateuser: true, message:"Updated Successfully" }); // Return an object with successupdateuser property set to true
     
//     }
//   } catch (error) {
//     res.status(500).json({ message: "something went wrong" });
//     console.log(error);
//   }
// };