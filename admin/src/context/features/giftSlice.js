import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const allgiftcount= createAsyncThunk(
    "gift/allgiftcount",
    async (_, { rejectWithValue }) => {

        try {
        const response = await api.allgiftcount();    
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const allgift= createAsyncThunk(
    "gift/allgift",
    async (_, { rejectWithValue }) => {

        try {
        const response = await api.allgift();    
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const updategiftbyadmin = createAsyncThunk(
    "trow/updategiftbyadmin",
  
    async ({ updatedValue, toast }, { rejectWithValue }) => {
      try {
        const response = await api.updategiftbyadmin(updatedValue);

        if(response){
          toast.success(response.data.message)
        }
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

const giftSlice = createSlice({
    name: "gift",
    initialState: {
      allGiftCount: [],
      allGift:[],
      error: "",
      loadinggiftcount: false,
      loadinggift: false,
      loadingupdategift: false,
      successupdategift:false,
    },
    reducers: {
      setSuccessUpdateGift: (state, action) => {
        state.successupdategift = false;
        state.loadingupdategift = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(allgiftcount.pending, (state) => {
          state.loadinggiftcount = true;
        })
        .addCase(allgiftcount.fulfilled, (state, action) => {
          state.loadinggiftcount = false;
          state.allGiftCount = action.payload;
        })
        .addCase(allgiftcount.rejected, (state, action) => {
          state.loadinggiftcount = false;
          state.error = action.payload;
        })
        .addCase(allgift.pending, (state) => {
          state.loadinggift = true;
        })
        .addCase(allgift.fulfilled, (state, action) => {
          state.loadinggift = false;
          state.allGift = action.payload;
        })
        .addCase(allgift.rejected, (state, action) => {
          state.loadinggift = false;
          state.error = action.payload;
        })
        .addCase(updategiftbyadmin.pending, (state) => {
          state.loadingupdategift = true;
          state.successupdategift = false;
        })
        .addCase(updategiftbyadmin.fulfilled, (state, action) => {
          state.loadingupdategift = false;
          const {
            arg: { id },
          } = action.meta;
          if (id) {
            state.allGift= state.allGift.map((item) =>
              item.id === id ? action.payload : item
            );
          }
          state.successupdategift = true;
        })
        .addCase(updategiftbyadmin.rejected, (state, action) => {
          state.loadingupdategift= false;
          state.error = action.payload;
          
        })
     },
    
  });
  
  export const { setSuccessUpdateGift } = giftSlice.actions;
  export default giftSlice.reducer;