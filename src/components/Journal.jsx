import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";

const Journal = () => {
  const { pages } = useSelector((store) => store.page);
  const hasPages = pages.length <= 0;

  return (
    <main className={`${hasPages ? "journal no-pages" : " journal"}`}>
      <div className="journal-container">
        <h1 style={{ margin: hasPages ? "0px" : "1em 0 2em 0em" }}>JOURNAL</h1>
        <div className="pages-container">
          {/* {hasPages ? <span>I might use it later</span> : null} */}
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
