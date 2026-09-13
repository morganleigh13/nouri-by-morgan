import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import studioReducer from "@/redux/slices/studioSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    studio: studioReducer,
  },
});

export default store;
