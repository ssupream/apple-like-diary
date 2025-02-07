import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../features/modal/modalSlice";
import {
  closeDropDownMenu,
  renderMarked,
  renderPages,
} from "../features/page/pageSlice";
import { IoBookmark } from "react-icons/io5";
import { IoIosJournal } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { FiPlusCircle } from "react-icons/fi";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { toggle } from "../features/theme/themeSlice";

const Navbar = () => {
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();

  return (
    <nav className="nav-bar md:p-4 gap-3 fixed bottom-0 left-0 right-0 flex items-center justify-around md:static md:block">
      <button
        className="nav-buttons add md:text-3xl text-5xl"
        onClick={() => {
          dispatch(openModal());
          dispatch(closeDropDownMenu());
        }}
      >
        <IoMdAdd />
      </button>
      <button
        className="nav-buttons md:text-2xl text-4xl"
        onClick={() => {
          dispatch(renderPages());
          dispatch(closeDropDownMenu());
        }}
      >
        <IoIosJournal />
      </button>
      <button
        className="nav-buttons md:text-2xl text-4xl"
        onClick={() => {
          dispatch(closeDropDownMenu());
          dispatch(renderMarked());
        }}
      >
        <IoBookmark />
      </button>
      <button
        id="theme-toggle"
        className="nav-buttons md:text-2xl text-4xl"
        onClick={() => {
          dispatch(toggle());
        }}
      >
        {theme === "dark" ? <FaToggleOn /> : <FaToggleOff />}
      </button>
    </nav>
  );
};

export default Navbar;
