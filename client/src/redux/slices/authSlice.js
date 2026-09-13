import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  owner: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    restoreSession: (state) => {
      if (typeof window === "undefined") {
        return;
      }

      const rawSession = window.localStorage.getItem("nouri-owner-session");

      if (!rawSession) {
        return;
      }

      const session = JSON.parse(rawSession);
      state.token = session.token;
      state.owner = session.owner;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.owner = action.payload.owner;

      if (typeof window !== "undefined") {
        window.localStorage.setItem("nouri-owner-session", JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.token = null;
      state.owner = null;

      if (typeof window !== "undefined") {
        window.localStorage.removeItem("nouri-owner-session");
      }
    },
  },
});

export const { loginSuccess, logout, restoreSession } = authSlice.actions;
export default authSlice.reducer;
