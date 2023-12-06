import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const sendtextmessagetouser= createAsyncThunk(
    "message/sendtextmessagetouser",
    async ({formValue, toast}, { rejectWithValue }) => {
        try {
        const response = await api.sendtextmessagetouser(formValue);  
        toast.success(response.data.message)  
        console.log(response.data.message)
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

const messageSlice = createSlice({
    name: "message",
    initialState: {
      error: "",
      loadingmesssage: false,
    },
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(sendtextmessagetouser.pending, (state) => {
          state.loadingmesssage = true;
        })
        .addCase(sendtextmessagetouser.fulfilled, (state, action) => {
          state.loadingmesssage= false;
        //   state.allVote = action.payload;
        })
        .addCase(sendtextmessagetouser.rejected, (state, action) => {
          state.loadingmesssage = false;
          state.error = action.payload;
        })
       
     },
    
  });

  export default messageSlice.reducer;