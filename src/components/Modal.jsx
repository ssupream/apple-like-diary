import React from "react";
import { closeModal } from "../features/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { addPage } from "../features/page/pageSlice";
import { useState } from "react";

const Modal = () => {
  const { pages } = useSelector((store) => store.page);
  const id = pages.length + 1;

  const currentDate = new Date();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [entryText, setEntryText] = useState();
  const dayName = dayNames[currentDate.getDay()];
  const monthName = monthNames[currentDate.getMonth()];
  const savedDate = {
    day: dayName,
    dayN: currentDate.getDate(),
    month: monthName,
  };
  const dispatch = useDispatch();

  const handleDoneClick = () => {
    const pageContent = {
      date: savedDate,
      text: entryText,
      id: id,
      openMenu: false,
      marked: false,
      storageKey: "pages",
    };

    dispatch(addPage(pageContent));
    dispatch(closeModal());
  };

  const handleTextareaChange = (e) => {
    setEntryText(e.target.value);
  };

  return (
    <main className="modal-container">
      <div className="modal">
        <div className="top-section">
          <h1>New entry</h1>
          <div className="date">{`
          ${dayName},
          ${currentDate.getDate()} 
          ${monthName}`}</div>
          <button onClick={handleDoneClick}>Done</button>
        </div>
        <textarea
          placeholder="Start writing..."
          value={entryText}
          onChange={handleTextareaChange}
        ></textarea>
      </div>
    </main>
  );
};

export default Modal;
