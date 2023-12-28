import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './features/authSlice'
import UserReducer from './features/userSlice'
import CategoryReducer from './features/categorySlice'
import ListingReducer from './features/listingSlice'
import VendorReducer from './features/vendorSlice'

export default configureStore({
  reducer: {
    auth: AuthReducer,
    user: UserReducer,
    category: CategoryReducer,
    listing: ListingReducer,
    vendor: VendorReducer,
  }
});