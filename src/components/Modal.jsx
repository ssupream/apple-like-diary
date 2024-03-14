import React, { useState, useEffect, useRef } from "react";
import { closeModal } from "../features/modal/modalSlice";
import { clearEdit } from "../features/page/pageSlice";
import { useDispatch, useSelector } from "react-redux";
import { addPage } from "../features/page/pageSlice";
import { nanoid } from "nanoid";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

const Modal = () => {
  const { edit } = useSelector((store) => store.page);
  const [images, setImages] = useState(null);
  const [imageList, setImageList] = useState([]);
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
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const selectedImages = Array.from(files);
    setImages(selectedImages);
  };

  useEffect(() => {
    listAll();
    setTimeout(() => {
      setOpenAnimation(true);
    }, 1);
  }, []);

  const handleDoneClick = async () => {
    const uploadedImageUrls = [];
    const promises = images?.map((image) => {
      const imageRef = ref(storage, `images/${image.name}`);
      return uploadBytes(imageRef, image)
        .then(() => {
          console.log(`Image ${image.name} uploaded successfully`);
          return getDownloadURL(imageRef).then((url) => {
            uploadedImageUrls.push(url);
          });
        })
        .catch((error) => {
          console.error(`Error uploading image ${image.name}:`, error);
        });
    });

    Promise.all(promises)
      .then(() => {
        console.log("Image URLs:", uploadedImageUrls);

        const pageContent = {
          storageKey: "pages",
          img: uploadedImageUrls,
          text: entryText,
          date: savedDate,
          id: id,
          marked: false,
        };
        if (edit.text) {
          dispatch(addPage(pageContent));
          dispatch(clearEdit());
        } else {
          dispatch(addPage(pageContent));
        }
        setTimeout(() => {
          dispatch(closeModal());
        }, 1000);
        setOpenAnimation(false);
        // setImageList([]);
        // setImages(null);
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });
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
        <div className="images-container">
          {images &&
            images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Selected ${index}`}
                className="upload-image"
              />
            ))}
        </div>
        <input
          style={{ display: "none" }}
          type="file"
          name="image"
          onChange={handleImageUpload}
          ref={fileInputRef}
          accept="image/*"
          multiple
        />
        <button onClick={() => fileInputRef.current.click()}>Pick File</button>
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
