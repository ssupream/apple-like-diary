import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { openDropDownMenu } from "../features/page/pageSlice";
import DropDownMenu from "./DropDownMenu";
import { expandCard } from "../features/page/pageSlice";

const Page = ({ openMenu, id, date, text, marked, isExpanded }) => {
  const dispatch = useDispatch();
  const buttonRef = useRef(null);

  return (
    <article>
      <div className="container-card">
        <div
          className="card"
          onClick={() => {
            dispatch(expandCard({ id }));
          }}
        >
          <div className="content">
            <p className={`${isExpanded ? "" : "expandCard"}`}>{text}</p>
          </div>
          <div className="date">
            <span className="date-var">
              {`${date.edited} ${date.day}, ${date.dayN} ${date.month}`}
            </span>

            <div className="button-section">
              <button
                ref={buttonRef}
                onClick={() => {
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
