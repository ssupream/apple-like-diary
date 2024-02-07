import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../features/modal/modalSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <nav className="nav-bar">
      <h1></h1>
      <button className="button add" onClick={() => dispatch(openModal())}>
        <span className="plus-sign">+</span>
      </button>
    </nav>
  );
};

export default Navbar;
