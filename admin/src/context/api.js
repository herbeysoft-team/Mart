import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8002/",
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("trowadmin")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("trowadmin"))?.others?.token
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
export const allusersforadmin = () => API.get('/api/v1/user/allusersforadmin/'); // all users for admin
export const updateuserprofilebyadmin = (updatedValue) => API.put("/api/v1/user/updateuserprofilebyadmin", updatedValue); //update user profile by admin

/**LISTING API */
export const alllisting = () => API.get(`api/v1/listing/getalllisting/`); //get all listings