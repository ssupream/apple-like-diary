import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";

const Journal = () => {
  const { pages } = useSelector((store) => store.page);
  const hasPages = pages.length <= 0;

  return (
    <div className="w-full p-2 flex flex-col">
      <div className="flex-1 flex">
        {hasPages ? (
          <div className="text-center m-auto">
            <img
              src="/journal.svg"
              alt="journal icon"
              className="mx-auto h-20 w-20"
            />
            <h1 className="mt-10 text-2xl font-bold">Start Journaling</h1>
            <div className="font-semibold opacity-50">
              <p>Create your personal journal.</p>
              <p>Tap the plus button and get started.</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 ">
            {" "}
            {/* Added flex-1 and overflow */}
            <div className="cards-container">
              {pages
                .slice()
                .reverse()
                .map((page) => {
                  return <Card key={nanoid()} {...page} />;
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Journal;
