import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openDropDownMenu,
  closeDropDownMenu,
  expandCard,
  deleteImage,
} from "../features/page/pageSlice";
import DropDownMenu from "./DropDownMenu";
import { IoBookmark } from "react-icons/io5";

const Page = ({ openMenu, id, date, text, marked, isExpanded, img }) => {
  const { pages } = useSelector((store) => store.page);

  const dispatch = useDispatch();
  const buttonRef = useRef(null);

  const handleButtonClick = (e) => {
    e.stopPropagation();
    dispatch(openDropDownMenu(id));
  };

  return (
    <article>
      <div
        className="container-card"
        style={{ maxWidth: pages.length > 1 ? "" : "700px" }}
      >
        <div
          className="card"
          onClick={() => {
            dispatch(expandCard({ id }));
            dispatch(closeDropDownMenu());
          }}
        >
          <div className="content">
            <div className="image-cards">
              {img?.map((image, index) => {
                const [showButton, setShowButton] = useState(false);

                return (
                  <div
                    key={index}
                    className={`image-container ${
                      img.length > 1 ? "" : "single-image-width"
                    }`}
                    id={index}
                  >
                    <img
                      src={image}
                      alt={`Image ${index}`}
                      className={`image-inside-card ${
                        img.length > 1 ? "" : "single-image-width"
                      }`}
                      onMouseEnter={() => setShowButton(true)}
                      onMouseLeave={() => setShowButton(false)}
                    />
                    <button
                      className={`image-delete-button ${
                        showButton ? "visible" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("clicked button");
                        dispatch(deleteImage({ id, index }));
                      }}
                    >
                      X
                    </button>
                  </div>
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
              <div>{marked && <IoBookmark className="marked-card" />}</div>
              <div className="">
                <button ref={buttonRef} onClick={handleButtonClick}>
                  ···
                </button>
              </div>
            </div>
          </div>
        </div>
        <DropDownMenu openMenu={openMenu} id={id} marked={marked} />
      </div>
    </article>
  );
};

export default Page;
