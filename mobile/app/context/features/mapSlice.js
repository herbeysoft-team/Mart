import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";



const mapSlice = createSlice({
  name: "map",
  initialState: {
    userLocation: null,
    
  },
  reducers: {
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    
  },
});

export const { setUserLocation} = mapSlice.actions;
export default mapSlice.reducer;
