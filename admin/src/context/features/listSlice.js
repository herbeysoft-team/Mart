import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";


export const alllisting = createAsyncThunk(
  "list/alllisting",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.alllisting();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);



const listSlice = createSlice({
  name: "list",
  initialState: {
    alllist: [],
    errorlist: "",
    loadinglist: false,
  },
  reducers: {
    // setSuccessUpdateUser: (state, action) => {
    //   state.successupdateuser = false;
    //   state.loadingupdateuser = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(alllisting.pending, (state) => {
        state.loadinglist = true;
      })
      .addCase(alllisting.fulfilled, (state, action) => {
        state.loadinglist = false;
        state.alllist = action.payload;
      })
      .addCase(alllisting.rejected, (state, action) => {
        state.loadinglist = false;
        state.errorlist = action.payload;
      })
      
  },
});


export default listSlice.reducer;
