import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { openDropDownMenu } from "../features/page/pageSlice";
import DropDownMenu from "./DropDownMenu";
import { expandCard } from "../features/page/pageSlice";

const Page = ({ openMenu, id, date, text, marked, isExpanded, img }) => {
  const dispatch = useDispatch();
  const buttonRef = useRef(null);

  return (
    <article>
      <div className="container-card">
        <div className="card" onClick={() => dispatch(expandCard({ id }))}>
          <div className="content">
            <div className="image-cards">
              {img?.map((image, index) => {
                return (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index}`}
                    className="image-inside-card"
                  />
                );
              })}
            </div>
            <div>
              <p className={`text-content ${isExpanded ? "expand-text " : ""}`}>
                {text}
              </p>
            </div>
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
