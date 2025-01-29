import React from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { closeDropDownMenu } from "../features/page/pageSlice";

const Journal = () => {
  const { pages } = useSelector((store) => store.page);
  const hasPages = pages.length <= 0;
  const dispatch = useDispatch();

  return (
    <main
      className={`${hasPages ? "no-pages" : ""}`}
      onClick={() => dispatch(closeDropDownMenu())}
    >
      <div className="journal-container ">
        <h1 className={`text-red text-4xl ${hasPages ? "m-20" : "mt-8 mb-6"}`}>
          JOURNAL
        </h1>
        <div className="pages-container">
          {pages
            .slice()
            .reverse()
            .map((page) => {
              return <Card key={nanoid()} {...page} />;
            })}
        </div>
      </div>
    </main>
  );
};

export default Journal;
