import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const alltrowbox= createAsyncThunk(
    "trow/alltrowbox",
    async (_, { rejectWithValue }) => {
        try {
        const response = await api.alltrowbox();    
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const updatetrowboxbyadmin = createAsyncThunk(
    "trow/updatetrowboxbyadmin",
  
    async ({ updatedValue, toast }, { rejectWithValue }) => {
      try {
        const response = await api.updatetrowboxbyadmin(updatedValue);

        if(response){
          toast.success(response.data.message)
        }
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

const trowSlice = createSlice({
    name: "trow",
    initialState: {
      alltrow: [],
      error: "",
      loadingalltrow: false,
      errorupdatetrow: "",
      loadingupdatetrow: false,
      successupdatetrow:false,
    },
    reducers: {
      setSuccessUpdateTrow: (state, action) => {
        state.successupdatetrow = false;
        state.loadingupdatetrow = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(alltrowbox.pending, (state) => {
          state.loadingalltrow = true;
        })
        .addCase(alltrowbox.fulfilled, (state, action) => {
          state.loadingalltrow = false;
          state.alltrow = action.payload;
        })
        .addCase(alltrowbox.rejected, (state, action) => {
          state.loadingalltrow = false;
          state.error = action.payload;
        })
        .addCase(updatetrowboxbyadmin.pending, (state) => {
          state.loadingupdatetrow = true;
          state.successupdatetrow = false;
        })
        .addCase(updatetrowboxbyadmin.fulfilled, (state, action) => {
          state.loadingupdatetrow = false;
          const {
            arg: { id },
          } = action.meta;
          if (id) {
            state.alltrow = state.alltrow.map((item) =>
              item.id === id ? action.payload : item
            );
          }
          state.successupdatetrow = true;
        })
        .addCase(updatetrowboxbyadmin.rejected, (state, action) => {
          state.loadingupdatetrow= false;
          state.error = action.payload;
          
        })
     },
    
  });
  
  export const { setSuccessUpdateTrow } = trowSlice.actions;
  export default trowSlice.reducer;