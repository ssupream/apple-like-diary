import React from "react";

const dropDownMenu = () => {
  return (
    <div>
      <div className={`${openMenu ? "drop-down-menu " : "drop-menu-hidden"}`}>
        <li>
          <button>Edit</button>
        </li>
        <li>
          <button>Bookmark</button>
        </li>
        <li>
          <button>Delete</button>
        </li>
      </div>
    </div>
  );
};

export default dropDownMenu;
