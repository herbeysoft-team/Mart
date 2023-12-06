import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import UserReducer from "./features/userSlice";
import GiftReducer from "./features/giftSlice";
import TrowReducer from "./features/trowSlice";
import PostReducer from "./features/postSlice";
import LikeReducer from "./features/likeSlice";
import ItemReducer from "./features/itemSlice";

export default configureStore({
    reducer: {
      auth: AuthReducer,
      user: UserReducer,
      gift: GiftReducer,
      trow: TrowReducer,
      post: PostReducer,
      like: LikeReducer,
      item: ItemReducer,
    }
  });
  