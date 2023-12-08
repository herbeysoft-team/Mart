import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './features/authSlice'
import UserReducer from './features/userSlice'

export default configureStore({
  reducer: {
    auth: AuthReducer,
    user: UserReducer,
  }
});