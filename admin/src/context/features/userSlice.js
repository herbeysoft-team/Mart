import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",

  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getUserProfile(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const allcountfordashboard = createAsyncThunk(
  "user/allcountfordashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.allcountfordashboard();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const allusersforadmin = createAsyncThunk(
  "user/allusersforadmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.allusersforadmin();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateuserprofilebyadmin = createAsyncThunk(
  "user/updateuserprofilebyadmin",

  async ({ updatedValue, toast }, { rejectWithValue }) => {
    try {
      const response = await api.updateuserprofilebyadmin(updatedValue);

      if (response) {
        toast.success(response.data.message);
      }
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
    loading: false,
    error: "",
    allcount: [],
    allusers: [],
    erroradmincount: "",
    loadingadmincount: false,
    erroralluser: "",
    loadingalluser: false,
    errorupdateuser: "",
    loadingupdateuser: false,
    successupdateuser: false,
  },
  reducers: {
    setSuccessUpdateUser: (state, action) => {
      state.successupdateuser = false;
      state.loadingupdateuser = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(allcountfordashboard.pending, (state) => {
        state.loadingadmincount = true;
      })
      .addCase(allcountfordashboard.fulfilled, (state, action) => {
        state.loadingadmincount = false;
        state.allcount = action.payload;
      })
      .addCase(allcountfordashboard.rejected, (state, action) => {
        state.loadingadmincount = false;
        state.error = action.payload;
      })
      .addCase(allusersforadmin.pending, (state) => {
        state.loadingalluser = true;
      })
      .addCase(allusersforadmin.fulfilled, (state, action) => {
        state.loadingalluser = false;
        state.allusers = action.payload;
      })
      .addCase(allusersforadmin.rejected, (state, action) => {
        state.loadingalluser = false;
        state.error = action.payload;
      })
      .addCase(updateuserprofilebyadmin.pending, (state) => {
        state.loadingupdateuser = true;
        state.successupdateuser = false;
      })
      .addCase(updateuserprofilebyadmin.fulfilled, (state, action) => {
        state.loadingupdateuser = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.allusers = state.allusers.map((item) =>
            item.id === id ? action.payload : item
          );
        }
        state.successupdateuser = true;
      })
      .addCase(updateuserprofilebyadmin.rejected, (state, action) => {
        state.loadingupdateuser = false;
        state.error = action.payload;
      });
  },
});

export const { setSuccessUpdateUser } = userSlice.actions;
export default userSlice.reducer;
