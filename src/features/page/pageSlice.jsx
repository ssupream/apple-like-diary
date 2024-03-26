import { createSlice } from "@reduxjs/toolkit";
import { storage } from "../../firebase";
import { ref, deleteObject } from "firebase/storage";

const getStorageKey = (key) => `${key}`;

const loadPagesFromStorage = (key) => {
  const pagesStorage = localStorage.getItem(getStorageKey(key));
  return pagesStorage ? JSON.parse(pagesStorage) : [];
};

const initialState = {
  pages: loadPagesFromStorage("pages"),
  edit: {},
  total: 0,
  flagged: 0,
  isLoading: true,
  isExpanded: false,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    addPage: (state, { payload }) => {
      const cardId = payload.id;
      const existingPage = state.pages.find((page) => page.id === cardId);
      const pageIndex = state.pages.findIndex((page) => page === existingPage);
      console.log(
        `Card ID: ${cardId}, Existing Page ID: ${existingPage?.id}, page index: ${pageIndex}`
      );

      if (
        existingPage &&
        payload.text === existingPage.text &&
        payload.img.every((img, index) => img === existingPage.img[index])
      ) {
        console.log("Returned");
        return;
      } else if (existingPage) {
        state.pages.splice(pageIndex, 1);
      }

      state.pages.push(payload);

      localStorage.setItem(
        getStorageKey(payload.storageKey),
        JSON.stringify(state.pages.map((page) => page))
      );
    },
    editContent: (state, { payload }) => {
      const cardId = payload.id;
      const page = state.pages.find((page) => cardId === page.id);
      state.edit = page;
      console.log(`Edit ID: ${state.edit.id}`);
    },

    clearEdit: (state) => {
      state.edit = {};
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
        } else delete page?.openMenu;
      });
    },

    closeDropDownMenu: (state) => {
      state.pages.forEach((page) => delete page.openMenu);
    },
    expandCard: (state, { payload }) => {
      const { id } = payload;
      const page = state.pages.find((page) => page.id === id);
      if (page) {
        page.isExpanded = !page.isExpanded;
      }
      // else delete page?.isExpanded;
    },
    deleteImage: (state, { payload }) => {
      const { id, index } = payload;
      const card = state.pages.find((page) => page.id === id);
      if (card) {
        const deletedImage = card.img.splice(index, 1)[0];
        const imageRef = ref(storage, deletedImage);
        deleteObject(imageRef)
          .then(() => {
            console.log("Image deleted successfully from Firebase storage");
          })
          .catch((error) => {
            console.error("Error deleting image from Firebase storage");
          });
        localStorage.setItem(
          getStorageKey("pages"),
          JSON.stringify(state.pages)
        );
      }
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
  editContent,
  clearEdit,
  expandCard,
  deleteImage,
} = pageSlice.actions;
export default pageSlice.reducer;
