import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";

const TopBar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-3 z-10 ">
      <h1 className="text-4xl font-bold">JOURNAL</h1>
      <div className="flex items-center gap-4">
        <button className="flex h-8 w-8 items-center justify-center cursor-pointer rounded-full backdrop-blur-md icon-gb">
          <FaSearch className="h-4 w-4 " />
        </button>
        <button className="flex h-8 w-8 items-center justify-center cursor-pointer rounded-full backdrop-blur-md ">
          <FaCircleUser className="h-full w-full " />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
