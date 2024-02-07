import { createSlice } from "@reduxjs/toolkit";

const pagesStorage =
  localStorage.getItem("pages") !== null
    ? JSON.parse(localStorage.getItem("pages"))
    : [];

const initialState = {
  pages: pagesStorage,
  total: 0,
  flaggedPages: [],
  flagged: 0,
  isLoading: true,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      if (payload.text) {
        state.pages.push(payload);
      } else {
        return;
      }
      localStorage.setItem(
        "pages",
        JSON.stringify(state.pages.map((page) => page))
      );
    },
    openDropDownMenu: (state, { payload }) => {
      // const openMenus = state.pages.map((page) => (page.openMenu = false));
      const itemId = payload;
      const page = state.pages.find((page) => page.id === itemId);
      const openMenuState = page.openMenu;
      page.openMenu = !openMenuState;
    },
  },
});

export const { addItem, openDropDownMenu } = pageSlice.actions;
export default pageSlice.reducer;
