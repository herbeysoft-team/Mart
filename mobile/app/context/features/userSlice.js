import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",

  async (_, { rejectWithValue }) => {
    console.log("I got here")
    try {
      const response = await api.getUserProfile();

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
      userProfile: null,
      unfollowUsers: [],
      searchUsers: [],
      loadingusers: false,
      usersToGift: [],
      errorProfile: "",
      loadingProfile: false,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getUserProfile.pending, (state) => {
          state.loadingProfile = true;
        })
        .addCase(getUserProfile.fulfilled, (state, action) => {
          state.loadingProfile = false;
          state.userProfile = action.payload;
        })
        .addCase(getUserProfile.rejected, (state, action) => {
          state.loading = false;
          state.errorProfile = action.payload;
        });
        
    },
  });
  
  export default userSlice.reducer;
  