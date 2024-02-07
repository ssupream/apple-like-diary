import React from "react";
import Page from "./Page";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";

const Journal = () => {
  const { pages } = useSelector((store) => store.page);
  const hasPages = pages.length <= 0;

  return (
    <main className={`${hasPages ? "journal no-pages" : " journal"}`}>
      <h1>JOURNAL</h1>
      {hasPages ? <span>Journal App</span> : null}
      {pages
        .slice()
        .reverse()
        .map((page) => {
          return <Page key={nanoid()} {...page} />;
        })}
    </main>
  );
};

export default Journal;
