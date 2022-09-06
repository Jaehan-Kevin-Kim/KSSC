import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import consultFormService from "./consultFormService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  //   user: user ?? null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  consultForms: [],
  consultForm: {},
  file: "",
};

export const createConsultForm = createAsyncThunk(
  "consultForms/create",
  async (consultFormData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await consultFormService.createConsultForm(consultFormData, token);
    } catch (error) {
      console.log("error for createConsultForm: ", error);
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getFormById = createAsyncThunk(
  "consultForms/getFormById",
  async (formId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await consultFormService.getFormById(formId, token);
    } catch (error) {
      console.log("Error during getting a form by id", error);
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const deleteForm = createAsyncThunk(
  "consultForms/deleteForm",
  async (formId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await consultFormService.deleteForm(formId, token);
    } catch (error) {
      console.log("Error during delete form", error);
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getForms = createAsyncThunk(
  "consultForms/getForms",
  async (thunkAPI) => {
    try {
      return await consultFormService.getForms();
    } catch (error) {
      console.log("error for getForms: ", error);
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const postFile = createAsyncThunk(
  "consultForms/postFile",
  async (fileFormData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await consultFormService.postFile(fileFormData, token);
    } catch (error) {
      console.log("error for postFile: ", error);
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const consultFormSlice = createSlice({
  name: "consultForm",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createConsultForm.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(createConsultForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.consultForm = action.payload;
      })
      .addCase(createConsultForm.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getForms.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getForms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.consultForms = action.payload;
      })
      .addCase(getForms.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFormById.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getFormById.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.consultForm = action.payload;
      })
      .addCase(getFormById.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteForm.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(deleteForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.consultForms = state.consultForms.filter(
          (v) => v._id !== action.payload.id,
        );
      })
      .addCase(deleteForm.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
    // .addCase(postFile.success, (state, action)=>{

    // })
  },
});

export const { reset } = consultFormSlice.actions;
export default consultFormSlice.reducer;
