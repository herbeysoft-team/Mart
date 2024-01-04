import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './features/authSlice'
import UserReducer from './features/userSlice'
import CategoryReducer from './features/categorySlice'
import ListingReducer from './features/listingSlice'
import VendorReducer from './features/vendorSlice'
import MessageReducer from './features/messageSlice'

export default configureStore({
  reducer: {
    auth: AuthReducer,
    user: UserReducer,
    category: CategoryReducer,
    listing: ListingReducer,
    vendor: VendorReducer,
    message: MessageReducer,
  }
});