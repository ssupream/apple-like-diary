import { createSlice } from "@reduxjs/toolkit";

const getStorageKey = (key) => `${key}`;

const loadPagesFromStorage = (key) => {
  const pagesStorage = localStorage.getItem(getStorageKey(key));
  return pagesStorage ? JSON.parse(pagesStorage) : [];
};

const initialState = {
  pages: loadPagesFromStorage("pages"),
  total: 0,
  flagged: 0,
  isLoading: true,
};

console.log(initialState.markedPages);

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    addPage: (state, { payload }) => {
      if (payload.text) {
        state.pages.push(payload);
      } else {
        return;
      }
      localStorage.setItem(
        getStorageKey(payload.storageKey),
        JSON.stringify(state.pages.map((page) => page))
      );
    },

    markPage: (state, { payload }) => {
      const cardId = payload.id;
      const page = state.pages.find((page) => page.id === cardId);
      if (page) {
        const marked = page.marked;
        page.marked = !marked;
      }
      localStorage.setItem(
        getStorageKey(payload.storageKey),
        JSON.stringify(state.pages)
      );
    },

    renderPages: (state) => {
      state.pages = loadPagesFromStorage("pages");
    },

    renderMarked: (state) => {
      state.pages = state.pages.filter((page) => page.marked === true);
    },

    deleteCard: (state, { payload }) => {
      const cardId = payload.id;
      state.pages = state.pages.filter((page) => page.id !== cardId);
      localStorage.setItem(getStorageKey("pages"), JSON.stringify(state.pages));
    },
    openDropDownMenu: (state, { payload }) => {
      const itemId = payload;
      state.pages.forEach((page) => {
        if (itemId === page.id) {
          const open = page.openMenu;
          page.openMenu = !open;
        } else page.openMenu = false;
      });
    },

    closeDropDownMenu: (state) => {
      state.pages.forEach((page) => (page.openMenu = false));
    },
  },
});

export const {
  addPage,
  markPage,
  renderPages,
  renderMarked,
  openDropDownMenu,
  closeDropDownMenu,
  deleteCard,
} = pageSlice.actions;
export default pageSlice.reducer;
