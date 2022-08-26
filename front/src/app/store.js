import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import consultFormReducer from "../features/consultForm/consultFormSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    consultForm: consultFormReducer,
  },
});
