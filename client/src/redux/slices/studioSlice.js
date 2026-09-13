import { createSlice } from "@reduxjs/toolkit";
import { fallbackClasses, fallbackSiteContent } from "@/lib/siteData";

const initialState = {
  siteContent: fallbackSiteContent,
  classes: fallbackClasses,
  status: "idle",
  error: null,
  storage: "memory",
};

const studioSlice = createSlice({
  name: "studio",
  initialState,
  reducers: {
    hydrateStudio: (state, action) => {
      state.siteContent = action.payload.siteContent;
      state.classes = action.payload.classes;
      state.storage = action.payload.storage;
      state.status = "ready";
      state.error = null;
    },
    setStudioStatus: (state, action) => {
      state.status = action.payload;
    },
    setStudioError: (state, action) => {
      state.error = action.payload;
      state.status = "error";
    },
    setAboutMe: (state, action) => {
      state.siteContent = {
        ...state.siteContent,
        ...action.payload,
      };
    },
    replaceCarousel: (state, action) => {
      state.siteContent.carouselImages = action.payload;
    },
    upsertClass: (state, action) => {
      const nextClass = action.payload;
      const existingIndex = state.classes.findIndex((session) => session.id === nextClass.id);

      if (existingIndex >= 0) {
        state.classes[existingIndex] = nextClass;
        return;
      }

      state.classes.unshift(nextClass);
    },
    removeClass: (state, action) => {
      state.classes = state.classes.filter((session) => session.id !== action.payload);
    },
  },
});

export const {
  hydrateStudio,
  removeClass,
  replaceCarousel,
  setAboutMe,
  setStudioError,
  setStudioStatus,
  upsertClass,
} = studioSlice.actions;
export default studioSlice.reducer;
