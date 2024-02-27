import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modal/modalSlice";
import pageReducer from "./features/page/pageSlice";
import themeReducer from "./features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    page: pageReducer,
    theme: themeReducer,
  },
});
