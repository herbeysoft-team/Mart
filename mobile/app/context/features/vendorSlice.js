import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";


export const getVendorDetails = createAsyncThunk(
  "vendor/getVendorDetails ",
  async (vendor, { rejectWithValue }) => {
    const {id, longitude, latitude} = vendor;
    try {
      const response = await api.getVendorDetails(id, longitude, latitude);
      return response.data;
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err.response.data.message,
      });
      return rejectWithValue(err.response.data);
    }
  }
);

export const getVendorListings = createAsyncThunk(
  "vendor/getVendorListings ",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getVendorListings(id);
      return response.data;
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err.response.data.message,
      });
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteVendorListing = createAsyncThunk(
  "vendor/deleteVendorListing",
  async ({id, Toast}, { rejectWithValue }) => {
    try {
      const response = await api.deleteVendorListing(id);
      if (response.data.status) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
      }
      return response.data;
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err.response.data.message,
      });
      return rejectWithValue(err.response.data);
    }
  }
);
const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    loadingvendor: false,
    errorvendor: "",
    vendordetails: [],
    loadingvendorlisting: false,
    errorvendorlisting: "",
    vendorlistings: [],
    deleteloading: false,
    deleteerror: "",
  },
//   reducers: {
//     setListingStatus: (state, action) => {
//       state.addlistingstatus = false;
//     },
//   },
  extraReducers: (builder) => {
    builder
      
      .addCase(getVendorDetails.pending, (state) => {
        state.loadingvendor = true;
      })
      .addCase(getVendorDetails.fulfilled, (state, action) => {
        state.loadingvendor = false;
        state.vendordetails = action.payload;
      })
      .addCase(getVendorDetails.rejected, (state, action) => {
        state.loadingvendor = false;
        state.errorvendor = action.payload;
      })
      .addCase(getVendorListings.pending, (state) => {
        state.loadingvendorlisting = true;
      })
      .addCase(getVendorListings.fulfilled, (state, action) => {
        state.loadingvendorlisting = false;
        state.vendorlistings = action.payload;
      })
      .addCase(getVendorListings.rejected, (state, action) => {
        state.loadingvendorlisting = false;
        state.errorvendorlisting = action.payload;
      })
      .addCase(deleteVendorListing.pending, (state) => {
        state.deleteloading = true;
      })
      .addCase(deleteVendorListing.fulfilled, (state, action) => {
        state.deleteloading = false;
      })
      .addCase(deleteVendorListing.rejected, (state, action) => {
        state.deleteloading = false;
        state.deleteerror= action.payload;
      });
  },
});

// export const { setListingStatus } = listingSlice.actions;
export default vendorSlice.reducer;
