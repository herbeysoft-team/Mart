import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const uploadPhotos = createAsyncThunk(
  "listing/uploadPhotos",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.uploadPhotos(formData);
      return response.data;
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err.response.data.message,
      });
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const addListing = createAsyncThunk(
  "listing/addListing",
  async ({ formData, Toast }, { rejectWithValue }) => {
    try {
      const response = await api.addListing(formData);
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

export const updateListing = createAsyncThunk(
  "listing/updateListing",
  async ({ id, formData, Toast, navigation }, { rejectWithValue }) => {
    try {
      const response = await api.updateListing(id, formData);
      if (response.data.status) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
        navigation.navigate("My-Listing")
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

export const getListingsByLocation = createAsyncThunk(
  "listing/getListingsByLocation",
  async (location, { rejectWithValue }) => {
    const { longitude, latitude} = location;
    try {
      const response = await api.getListingsByLocation(longitude, latitude);
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

export const getSimilarListings = createAsyncThunk(
  "listing/getSimilarListings",
  async (listingcontent, { rejectWithValue }) => {
    const { id, longitude, latitude} = listingcontent;
    try {
      const response = await api.getSimilarListings(id, longitude, latitude);
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
const listingSlice = createSlice({
  name: "listing",
  initialState: {
    openSetting: false,
    loadingaddlisting: false,
    erroraddlisting: "",
    loadingupdatelisting: false,
    errorupdatelisting: "",
    addlistingstatus: false,
    filenames: null,
    errorfileloading: "",
    listingsbylocation: [],
    loadinglistingsbylocation: false,
    errorlistingsbylocation: "",
    similarlistings: [],
    loadingsimilarlistings: false,
    errorsimilarlistings: "",
  },
  reducers: {
    setListingStatus: (state, action) => {
      state.addlistingstatus = false;
    },
    setSetting: (state, action) => {
      state.openSetting = action.payload;
    },
    filterListingsBySearch: (state, action) => {
      const searchText = action.payload.toLowerCase(); // Convert search text to lowercase for case-insensitive matching
      state.listingsbylocation = state.listingsbylocation.filter((listing) => {
        return listing.name.toLowerCase().includes(searchText);
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addListing.pending, (state) => {
        state.loadingaddlisting = true;
      })
      .addCase(addListing.rejected, (state, action) => {
        state.loadingaddlisting = false;
        state.erroraddlisting = action.payload;
      })
      .addCase(addListing.fulfilled, (state, action) => {
        state.loadingaddlisting = false;
        state.addlistingstatus = action.payload.status;
      })
      .addCase(updateListing.pending, (state) => {
        state.loadingupdatelisting = true;
      })
      .addCase(updateListing.rejected, (state, action) => {
        state.loadingupdatelisting = false;
        state.errorupdatelisting = action.payload;
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        state.loadingupdatelisting = false;
      })
      .addCase(uploadPhotos.rejected, (state, action) => {
        // state.loadingaddlisting= false;
        state.errorfileloading = action.payload;
      })
      .addCase(uploadPhotos.fulfilled, (state, action) => {
        // state.loadingaddlisting = false;
        state.filenames = action.payload;
      })
      .addCase(getListingsByLocation.pending, (state) => {
        state.loadinglistingsbylocation = true;
      })
      .addCase(getListingsByLocation.fulfilled, (state, action) => {
        state.loadinglistingsbylocation = false;
        state.listingsbylocation = action.payload;
      })
      .addCase(getListingsByLocation.rejected, (state, action) => {
        state.loadinglistingsbylocation = false;
        state.errorlistingsbylocation = action.payload;
      })
      .addCase(getSimilarListings.pending, (state) => {
        state.loadingsimilarlistings = true;
      })
      .addCase(getSimilarListings.fulfilled, (state, action) => {
        state.loadingsimilarlistings = false;
        state.similarlistings = action.payload;
      })
      .addCase(getSimilarListings.rejected, (state, action) => {
        state.loadingsimilarlistings = false;
        state.errorsimilarlistings = action.payload;
      });
  },
});

export const toggleSetting = (value) => (dispatch) => {
  dispatch(setSetting(value));
};
export const { setListingStatus, setSetting, filterListingsBySearch} = listingSlice.actions;
export default listingSlice.reducer;
