import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const allupvote= createAsyncThunk(
    "like/allupvote",
    async (_, { rejectWithValue }) => {
        try {
        const response = await api.allupvote();    
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

const likeSlice = createSlice({
    name: "like",
    initialState: {
      allVote: [],
      error: "",
      loadingallvote: false,
    },
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(allupvote.pending, (state) => {
          state.loadingallvote = true;
        })
        .addCase(allupvote.fulfilled, (state, action) => {
          state.loadingallvote = false;
          state.allVote = action.payload;
        })
        .addCase(allupvote.rejected, (state, action) => {
          state.loadingallvote = false;
          state.error = action.payload;
        })
       
     },
    
  });

  export default likeSlice.reducer;