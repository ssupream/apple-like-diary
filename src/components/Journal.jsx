import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";

const Journal = () => {
  const { pages } = useSelector((store) => store.page);
  const hasPages = pages.length <= 0;

  return (
    <div className="w-full px-2">
      <h1
        className={`text-4xl font-bold ${hasPages ? "m-20" : "mb-6 ml-2 mt-8"}`}
      >
        JOURNAL
      </h1>
      <div className="cards-container h-fit pb-32">
        {pages
          .slice()
          .reverse()
          .map((page) => {
            return <Card key={nanoid()} {...page} />;
          })}
      </div>
    </div>
  );
};

export default Journal;
