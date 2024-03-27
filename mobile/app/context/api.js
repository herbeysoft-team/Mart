import axios from "axios";
import { getItem } from "../utils/asyncStorage.js";


const API = axios.create({
  baseURL: "http://192.168.1.197:8002/",
  // baseURL: "http://172.20.10.6:8002/",
 
});

API.interceptors.request.use(async (req) => {
  const token = await getItem("trowmarttoken")
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  // Set Content-Type for FormData requests
  if (req.data instanceof FormData) {
    req.headers['Content-Type'] = 'multipart/form-data';
  }
  return req;
});

/**AUTHENTICATION API */
export const login = (user) => API.post("/api/v1/auth/login", user); //sign in for all users
export const register = (user) => API.post("/api/v1/auth/signup", user); //register users
export const logout = () => API.post("/api/v1/auth/logout"); //logout the user
export const resendOTP = (user) =>
  API.post("/api/v1/auth/emailotp", user); //request for new OTP
export const verifyOTP = (user) =>
  API.post("/api/v1/auth/verifyemailotp", user); //verify email with OTP
export const resetPasswordOTP = (user) =>
  API.post("/api/v1/auth/passwordreset", user); //request for OTP to reset passowrd
export const resetPassword = (user) =>
  API.post("/api/v1/auth/reset", user); //reset passowrd
export const completeReg = (formData) =>
  API.post("/api/v1/auth/completereg", formData); //complete Reg

/**USER API */
export const getUserProfile = (userId) => API.get(`/api/v1/user/getuserprofile/${userId}`); //get user profile
export const updateProfile = (formData) => API.put(`/api/v1/user/updateuserprofile`,formData); //update profile
export const updateProfilePic = (formData) => API.post(`api/v1/user/changeprofilepic`,formData); //update profile Pic
export const submitVerification = (formData) => API.post(`api/v1/user/submitverification`, formData); //submit verification


/** LISTING API */
export const uploadPhotos = (formData) => API.post(`/api/v1/listing/uploadimages/`, formData); //upload Photos
export const addListing = (formData) => API.post(`/api/v1/listing/addlisting/`, formData); //Add A Listing
export const getListingsByLocation = (longitude, latitude) => API.get(`/api/v1/listing/getlistingbylocation/${longitude}/${latitude}`) //Get listing by location
export const updateListing = (id, formData) => API.put(`/api/v1/listing/updatelisting/${id}`, formData); //Update A Listing
export const getSimilarListings= (id, longitude, latitude) => API.get(`/api/v1/listing/getsimilarlisting/${id}/${longitude}/${latitude}`) //Get Similar listing By Location

/** CATEGORY API */
export const getCategory = (type) => API.get(`/api/v1/category/getallcategories/${type}`); //get subcategories

/** CART API */
export const addItemToCart= (formData) => API.post(`/api/v1/cart/addcart/`, formData); //add to cart
export const incrementCartItemQuantity= (formData) => API.post(`/api/v1/cart/incrementcartitem/`, formData); //increment cart  item
export const decrementCartItemQuantity= (formData) => API.post(`/api/v1/cart/decrementcartitem/`, formData); //decrement cart item
export const getUserCartItemsGroupedByVendor = (userId) => API.get(`/api/v1/vendor/getcartitems//${userId}`); //get user cart Item

/** VENDOR API */
export const getVendorDetails = (id, longitude, latitude) => API.get(`/api/v1/vendor/getvendordetails/${id}/${longitude}/${latitude}`); //get vendor details
export const getVendorListings = (id) => API.get(`/api/v1/vendor/getvendorlisting/${id}`); //get vendor listings
export const deleteVendorListing = (id) => API.delete(`/api/v1/listing/deletelisting/${id}`); //delete a listing
export const getVendorsByLocation = (longitude, latitude) => API.get(`/api/v1/vendor/getvendorsbylocation/${longitude}/${latitude}`) //Get Vendor by Location

/** MESSAGE API */
export const getChatList = (id) => API.get(`/api/v1/message/getchatlist/${id}`) //get user chatlist
export const getChatUser = (id) => API.get(`/api/v1/message/${id}`) //get chat user
export const getMessages = (senderId, recepientId) => API.get(`api/v1/message/getmessages/${senderId}/${recepientId}`) //get chat between two users
export const sendMessage = (content) => API.post(`api/v1/message/sendmessage`, content) //send message

/**REVIEW API */
export const getMyReviews = (userId) => API.get(`/api/v1/review/getuserreview/${userId}`); //Get all user review
export const getVendorReviews = (vendorId) => API.get(`/api/v1/review/getvendorreview/${vendorId}`); //Get vendor id
export const updateReview = (formData) => API.post(`/api/v1/review/editreview/`, formData); //Update A Review
export const deleteReview = (reviewId) => API.delete(`/api/v1/review/deletereview/${reviewId}`); //Delete A Review



