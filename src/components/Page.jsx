import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  openDropDownMenu,
  closeDropDownMenu,
} from "../features/page/pageSlice";
import DropDownMenu from "./DropDownMenu";

const Page = ({ openMenu, id, date, text, marked }) => {
  const dispatch = useDispatch();
  const buttonRef = useRef(null);

  return (
    <article>
      <div className="container-card">
        <div className="card">
          <p className="content">{text}</p>
          <div className="date">
            <span className="date-var">{`${date.day}, ${date.dayN} ${date.month}`}</span>

            <div className="button-section">
              <button
                ref={buttonRef}
                onClick={() => {
                  // dispatch(closeDropDownMenu());
                  dispatch(openDropDownMenu(id));
                }}
              >
                ···
              </button>
            </div>
          </div>
        </div>
        <DropDownMenu openMenu={openMenu} id={id} marked={marked} />
      </div>
    </article>
  );
};

export default Page;
