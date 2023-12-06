import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk(
    "auth/login",
    async ({ formValue, navigate, toast }, { rejectWithValue }) => {
        
        try {
        const response = await api.login(formValue); 
        if(response.data?.code === 9){
            toast.success("Login Successfully");
            navigate("/home")
        }else{
          toast.error(response.data?.message);
        }       
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
  export const passwordChange = createAsyncThunk(
    "auth/passwordChange",
    async ({ formValue,  toast }, { rejectWithValue }) => {
      try {
        const response = await api.passwordChange(formValue);
        if(response){
          toast.success(response.data.message)
        }
        return response.data;
      } catch (err) {
        toast.error(err.response.data);
        return rejectWithValue(err.response.data);
      }
    }
  );
  


const authSlice = createSlice({
    name: "auth",
    initialState: {
      user: null,
      errorlogin: "",
      loadinglogin: false,
    },
    reducers: {
      setUser: (state, action) => {
        state.user = action.payload;
      },
      setLogout: (state, action) => {
        localStorage.clear();
        state.user = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.loadinglogin = true;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loadinglogin = false;
          localStorage.setItem("trowadmin", JSON.stringify({ ...action.payload }));
          state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.loadinglogin = false;
          state.error = action.payload;
        })
        .addCase(passwordChange.pending, (state) => {
          state.loadinglogin = true;
        })
        .addCase(passwordChange.fulfilled, (state, action) => {
          state.loadinglogin = false;
          state.user = action.payload;
        })
        .addCase(passwordChange.rejected, (state, action) => {
          state.loadinglogin = false;
          state.error = action.payload;
        })
     },
    
  });
  
  export const { setUser, setLogout } = authSlice.actions;
  export default authSlice.reducer;