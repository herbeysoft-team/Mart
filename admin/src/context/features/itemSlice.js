import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getCategories = createAsyncThunk(
  "item/getCategories",

  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getCategories();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getSubcategories = createAsyncThunk(
  "item/getSubcategories",

  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getSubcategories();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createCategory = createAsyncThunk(
  "item/createCategory",

  async({formValue, toast}, {rejectWithValue})=>{

      try{
        const response = await api.createCategory(formValue);
        if(response){
          toast.success(response.data.message);
        }
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const createSubCategory = createAsyncThunk(
  "item/createSubCategory",

  async({formValue, toast}, {rejectWithValue})=>{

      try{
        const response = await api.createSubCategory(formValue);
        if(response){
          toast.success(response.data.message);
        }
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const createItem = createAsyncThunk(
  "item/createItem",

  async({formData, navigate, toast}, {rejectWithValue})=>{
      try{
        const response = await api.createItem(formData);
        if(response){
          toast.success(response.data.message);
          navigate("/home/item");
        }
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const getItems = createAsyncThunk(
  "item/getItems",

  async(_, {rejectWithValue})=>{
      try{
        const response = await api.getItems();
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)


export const updateItem= createAsyncThunk(
  "item/updateItem",

  async ({ updatedValue, toast }, { rejectWithValue }) => {
    try {
      const response = await api.updateItem(updatedValue);

      if(response){
        toast.success(response.data.message)
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateSubCat= createAsyncThunk(
  "item/updateSubCat",

  async ({ updatedValue, toast }, { rejectWithValue }) => {
    try {
      const response = await api.updateSubCat(updatedValue);

      if(response){
        toast.success(response.data.message)
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCat= createAsyncThunk(
  "item/updateCat",

  async ({ updatedValue, toast }, { rejectWithValue }) => {
    try {
      const response = await api.updateCat(updatedValue);

      if(response){
        toast.success(response.data.message)
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);



export const deleteCategory = createAsyncThunk(
  "item/deleteCategory",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteCategory(id);
      toast.success("Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteSubCategory = createAsyncThunk(
  "item/deleteSubCategory",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteSubCategory(id);
      toast.success("Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteItem = createAsyncThunk(
  "item/deleteItem",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteItem(id);
      toast.success("Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const itemSlice = createSlice({
  name: "item",
  initialState: {
    item_categories: [],
    item_subcategories: [],
    items: [],
    error: "",
    loadingitems: false,
    loadingcategories: false,
    loadingsubcategories: false,
    loadingupdateitem: false,
    successupdateitem: false,
    loadingupdatesubcat: false,
    successupdatesubcat: false,
    loadingupdatecat: false,
    successupdatecat: false,
  },
  reducers: {
    clearItems: (state) => {
      state.items = [];
    },
    setSuccessUpdateItem: (state, action) => {
      state.successupdateitem = false;
      state.loadingupdateitem = false;
    },
    setSuccessUpdateSubCat: (state, action) => {
      state.successupdatesubcat = false;
      state.loadingupdatesubcat = false;
    },
    setSuccessUpdateCat: (state, action) => {
      state.successupdatecat = false;
      state.loadingupdatecat = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getCategories.pending, (state) => {
      state.loadingcategories = true;
    })
    .addCase(getCategories.fulfilled, (state, action) => {
      state.loadingcategories = false;
      state.item_categories = action.payload;
    })
    .addCase(getCategories.rejected, (state, action) => {
      state.loadingcategories = false;
      state.error = action.payload;
    })
      .addCase(getSubcategories.pending, (state) => {
        state.loadingsubcategories = true;
      })
      .addCase(getSubcategories.fulfilled, (state, action) => {
        state.loadingsubcategories = false;
        state.item_subcategories = action.payload;
      })
      .addCase(getSubcategories.rejected, (state, action) => {
        state.loadingsubcategories = false;
        state.error = action.payload;
      })
      .addCase(createItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getItems.pending, (state) => {
        state.loadingitems = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.loadingitems = false;
        state.items = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.loadingitems = false;
        state.error = action.payload;
      })
      .addCase(updateItem.pending, (state) => {
        state.loadingupdateitem = true;
        state.successupdateitem = false;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.loadingupdateitem = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.items = state.items.map((item) =>
            item.id === id ? action.payload : item
          );
        }
        state.successupdateitem = true;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loadingupdateitem= false;
        state.error = action.payload;
        
      })
      .addCase(updateSubCat.pending, (state) => {
        state.loadingupdatesubcat = true;
        state.successupdatesubcat = false;
      })
      .addCase(updateSubCat.fulfilled, (state, action) => {
        state.loadingupdatesubcat = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.item_subcategories = state.item_subcategories.map((item) =>
            item.id === id ? action.payload : item
          );
        }
        state.successupdatesubcat = true;
      })
      .addCase(updateSubCat.rejected, (state, action) => {
        state.loadingupdatesubcat= false;
        state.error = action.payload;
        
      })
      .addCase(updateCat.pending, (state) => {
        state.loadingupdatecat = true;
        state.successupdatecat = false;
      })
      .addCase(updateCat.fulfilled, (state, action) => {
        state.loadingupdatecat = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.item_categories = state.item_categories.map((item) =>
            item.id === id ? action.payload : item
          );
        }
        state.successupdatecat = true;
      })
      .addCase(updateCat.rejected, (state, action) => {
        state.loadingupdatecat= false;
        state.error = action.payload;
        
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loadingupdatecat = true;
        state.successupdatecat = false;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loadingupdatecat = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.item_categories = state.item_categories.filter((item) => item.id !== id);
          
        }
        state.successupdatecat = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loadingupdatesubcat= false;
        state.error = action.payload;
        
      })
      .addCase(deleteSubCategory.pending, (state) => {
        state.loadingupdatesubcat = true;
        state.successupdatesubcat = false;
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.loadingupdatesubcat = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.item_subcategories = state.item_subcategories.filter((item) => item.id !== id);
          
        }
        state.successupdatesubcat = true;
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.loadingupdatesubcat= false;
        state.error = action.payload;
        
      })
      .addCase(deleteItem.pending, (state) => {
        state.loadingupdateitem = true;
        state.successupdateitem = false;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loadingupdateitem = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.items = state.items.filter((item) => item.id !== id);
          
        }
        state.successupdateitem = true;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loadingupdateitem= false;
        state.error = action.payload;
        
      })
      
  },
});
export const { setSuccessUpdateItem, setSuccessUpdateSubCat,setSuccessUpdateCat, clearItems } = itemSlice.actions;
export default itemSlice.reducer;
