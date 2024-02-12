import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../features/modal/modalSlice";
import {
  closeDropDownMenu,
  renderMarked,
  renderPages,
} from "../features/page/pageSlice";
import { IoBookmark } from "react-icons/io5";
import { IoIosJournal } from "react-icons/io";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <nav className="nav-bar">
      <h1></h1>
      <button
        className="button add"
        onClick={() => {
          dispatch(openModal());
          dispatch(closeDropDownMenu());
        }}
      >
        <span className="plus-sign">+</span>
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
    </nav>
  );
};

export default Navbar;
