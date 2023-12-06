import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const allpost= createAsyncThunk(
    "post/allpost",
    async (_, { rejectWithValue }) => {
        try {
        const response = await api.allpost();    
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

const postSlice = createSlice({
    name: "post",
    initialState: {
      allPost: [],
      error: "",
      loadingallpost: false,
    },
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(allpost.pending, (state) => {
          state.loadingallpost = true;
        })
        .addCase(allpost.fulfilled, (state, action) => {
          state.loadingallpost = false;
          state.allPost = action.payload;
        })
        .addCase(allpost.rejected, (state, action) => {
          state.loadingallpost = false;
          state.error = action.payload;
        })
       
     },
    
  });

  export default postSlice.reducer;