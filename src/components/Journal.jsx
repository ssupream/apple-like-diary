import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";

const Journal = () => {
  const { pages } = useSelector((store) => store.page);
  const hasPages = pages.length <= 0;

  return (
    <div className="w-full px-2">
      <div className="">
        {hasPages ? (
          <div className="h-screen">
            <div className="z-20 flex h-full flex-col">
              {" "}
              {/* Add h-full here */}
              <h1 className="ml-8 mt-6 text-4xl font-bold">JOURNAL</h1>
              {/* Inner div to take all remaining space */}
              <div className="flex flex-1 flex-col items-center justify-center text-center">
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
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="">
        <h1 className="mb-6 ml-8 mt-6 text-4xl font-bold">JOURNAL</h1>

        <div className="cards-container h-fit">
          {pages
            .slice()
            .reverse()
            .map((page) => {
              return <Card key={nanoid()} {...page} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Journal;
