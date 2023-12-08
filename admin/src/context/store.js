import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import UserReducer from "./features/userSlice";
import ListingReducer from "./features/listSlice"

export default configureStore({
    reducer: {
      auth: AuthReducer,
      user: UserReducer,
      list: ListingReducer,
    }
  });
  