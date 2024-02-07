import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modal/modalSlice";
import pageReducer from "./features/page/pageSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    page: pageReducer,
  },
});
