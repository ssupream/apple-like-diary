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
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { toggle } from "../features/theme/themeSlice";

const Navbar = () => {
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();

  return (
    <nav className="nav-bar">
      <button
        className="nav-buttons add"
        onClick={() => {
          dispatch(openModal());
          dispatch(closeDropDownMenu());
        }}
      >
        <IoMdAdd />
      </button>
      <button
        className="nav-buttons"
        onClick={() => {
          dispatch(renderPages());
          dispatch(closeDropDownMenu());
        }}
      >
        <IoIosJournal />
      </button>
      <button
        className="nav-buttons"
        onClick={() => {
          dispatch(closeDropDownMenu());
          dispatch(renderMarked());
        }}
      >
        <IoBookmark />
      </button>
      <button
        id="theme-toggle"
        className="nav-buttons"
        onClick={() => {
          dispatch(toggle());
          console.log(theme);
        }}
      >
        {theme === "dark" ? <FaToggleOn /> : <FaToggleOff />}
      </button>
    </nav>
  );
};

export default Navbar;
