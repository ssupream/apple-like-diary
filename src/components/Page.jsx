import React from "react";
import { useDispatch } from "react-redux";
import { openDropDownMenu } from "../features/page/pageSlice";

const Page = ({ openMenu, id, date, text }) => {
  const dispatch = useDispatch();
  return (
    <article>
      <div className="page">
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
        <div className="card">
          <p className="content">{text}</p>
          <div className="date">
            <span className="date-var">{`${date.day}, ${date.dayN} ${date.month}`}</span>

            <div className="button-section">
              <button onClick={() => dispatch(openDropDownMenu(id))}>
                ···
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Page;
