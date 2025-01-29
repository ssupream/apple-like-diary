import { createSlice } from "@reduxjs/toolkit";

const themeStorage = localStorage.getItem("theme-preference");

const initialState = {
  theme: themeStorage ? JSON.parse(themeStorage) : "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle: (state) => {
      const changeTheme = state.theme === "dark" ? "light" : "dark";
      state.theme = changeTheme;
      localStorage.setItem("theme-preference", JSON.stringify(changeTheme));
    },
  },
});

export const { toggle } = themeSlice.actions;

export default themeSlice.reducer;
