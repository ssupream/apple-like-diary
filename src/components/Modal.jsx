import React from "react";
import { closeModal } from "../features/modal/modalSlice";
import { clearEdit } from "../features/page/pageSlice";
import { useDispatch, useSelector } from "react-redux";
import { addPage } from "../features/page/pageSlice";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

const Modal = () => {
  const { edit } = useSelector((store) => store.page);
  const pageId = nanoid();
  const id = edit.id ? edit.id : pageId;
  console.log(`Current ID value: ${id}`);

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

  const [entryText, setEntryText] = useState([] && edit.text);
  const [openAnimation, setOpenAnimation] = useState(false);
  const dayName = dayNames[currentDate.getDay()];
  const monthName = monthNames[currentDate.getMonth()];
  const savedDate = {
    edited: edit.id ? "Edited last on: " : "",
    day: dayName,
    dayN: currentDate.getDate(),
    month: monthName,
  };
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setOpenAnimation(true);
    }, 1);
  }, []);

  const handleDoneClick = () => {
    const pageContent = {
      date: savedDate,
      text: entryText,
      id: id,
      marked: false,
      storageKey: "pages",
    };
    if (edit.text) {
      dispatch(addPage(pageContent));
      dispatch(clearEdit());
    } else {
      dispatch(addPage(pageContent));
    }
    setOpenAnimation(false);
    setTimeout(() => {
      dispatch(closeModal());
    }, 300);
  };

  const handleTextareaChange = (e) => {
    setEntryText(e.target.value);
  };

  return (
    <main className={`modal-container ${openAnimation ? "open" : ""}`}>
      <div className={`modal ${openAnimation ? "open" : ""}`}>
        <div className="top-section">
          <h1>{`${edit.text ? "" : "New entry"}`}</h1>
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
          autoFocus={true}
        ></textarea>
      </div>
    </main>
  );
};

export default Modal;
