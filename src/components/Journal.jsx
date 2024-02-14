import React from "react";
import Page from "./Page";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";

const Journal = () => {
  const { pages } = useSelector((store) => store.page);
  const hasPages = pages.length <= 0;

  return (
    <main className={`${hasPages ? "journal no-pages" : " journal"}`}>
      <h1 style={{ margin: hasPages ? "0px" : "1em 0 2em 0" }}>JOURNAL</h1>
      <div className="pages-container">
        {hasPages ? <span></span> : null}
        {pages
          .slice()
          .reverse()
          .map((page) => {
            return <Page key={nanoid()} {...page} />;
          })}
      </div>
    </main>
  );
};

export default Journal;
