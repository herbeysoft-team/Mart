import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8002/",
  // baseURL: "https://trowbox.com/",
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("trowadmin")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("trowadmin")).token
      }`;
    }
    return req;
  });


/**AUTHENTICATION API */  
export const login = (formData) => API.post("/api/v1/auth/adminlogin", formData); //sign in for all users
export const passwordChange = (formValue) => API.post("/api/v1/auth/changepassword", formValue); //change user password

/**DASHBOARD API */  
export const allcountfordashboard = () => API.get(`/api/v1/user/allcountfordashboard/`); //all count for dashboard
export const allgiftcount = () => API.get('/api/v1/trow/allgiftcount/'); // all gift count for dashboard

/**USERS API */
export const getUserProfile = (userId) => API.get(`/api/v1/user/getuserprofile/${userId}`); //get user profile
// export const getUnfollowUsers = (id) => API.get(`/api/v1/user/getunfollowusers/${id}`); //get unfollow users
// export const getSearchUsers= (searchname) => API.get(`/api/v1/user/getsearchusers/${searchname}`); //get search users
// export const getUsersToGift= () => API.get(`/api/v1/user/getuserstogift/`); //getusers to gift
// export const updateUserProfile = (updatedValue) => API.put("/api/v1/user/updateuserprofile", updatedValue); //update user profile
// export const uploadProfilePic = (formData) => API.put("/api/v1/user/updateuserprofilepic", formData); //upload profile pic
export const allusersforadmin = () => API.get('/api/v1/user/allusersforadmin/'); // all users for admin
export const updateuserprofilebyadmin = (updatedValue) => API.put("/api/v1/user/updateuserprofilebyadmin", updatedValue); //update user profile by admin

/**TROW API */
export const alltrowbox = () => API.get('/api/v1/trow/alltrowbox/'); // all users for admin
export const updatetrowboxbyadmin = (updatedValue) => API.put("/api/v1/trow/updatetrowboxbyadmin", updatedValue); //update trowbox by admin

/**GIFT API */
export const allgift = () => API.get('/api/v1/trow/allgift/'); // all gift for admin
export const updategiftbyadmin = (updatedValue) => API.put("/api/v1/trow/updategiftbyadmin", updatedValue); //update gift by admin

/**POST API */
export const allpost = () => API.get('/api/v1/post/allpostbyadmin/'); // all post by admin

/**LIKE API */
export const allupvote = () => API.get('/api/v1/like/allupvote/'); // all upvote by admin

/**ITEM API */
export const getSubcategories = () => API.get(`/api/v1/subcategory/allsubcategories/`); //Get all Subcategories
export const getCategories = () => API.get(`/api/v1/category/allcategories/`); //Get all Categories
export const createItem = (formData) => API.post(`/api/v1/item/createitem`,formData); //create an item
export const getItems = () => API.get(`/api/v1/item/allitems/`); //Get all items
export const getItemsByCategory = (newValue)=> API.get(`/api/v1/item/getitemsbysubcategory/${newValue}`); //Get items by category
export const getItemsBySearch = (searchName) => API.get(`/api/v1/item/getitemsbysearch/${searchName}`); //Get items by search
export const updateItem = (updatedValue) => API.put("/api/v1/item/updateitem", updatedValue); //update item
export const updateSubCat = (updatedValue) => API.put("/api/v1/subcategory/updatesubcategory", updatedValue); //update subcategory
export const updateCat = (updatedValue) => API.put("/api/v1/category/updatecategory", updatedValue); //update category
export const createCategory = (formValue) => API.post(`/api/v1/category/createcategory`, formValue); //create a category
export const createSubCategory = (formValue) => API.post(`/api/v1/subcategory/createsubcategory`, formValue); //create a category
export const deleteCategory = (id) => API.delete(`/api/v1/category/deletecategory/${id}`); //delete one category
export const deleteSubCategory = (id) => API.delete(`/api/v1/subcategory/deletesubcategory/${id}`); //delete one subcategory
export const deleteItem = (id) => API.delete(`/api/v1/item/deleteitem/${id}`); //delete one item

/**MEESAGE API */
export const sendtextmessagetouser= (formValue) => API.post('/api/v1/message/sendtextmessagetouser', formValue); // admin sending text message to user