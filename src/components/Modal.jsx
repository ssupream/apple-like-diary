import React, { useState, useEffect, useRef } from "react";
import { BsImages } from "react-icons/bs";
import { GrDocumentMissing } from "react-icons/gr";
import { closeModal } from "../features/modal/modalSlice";
import { clearEdit, deleteImage } from "../features/page/pageSlice";
import { useDispatch, useSelector } from "react-redux";
import { addPage } from "../features/page/pageSlice";
import { nanoid } from "nanoid";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

const Modal = () => {
  const { edit } = useSelector((store) => store.page);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const pageId = nanoid();
  const id = edit.id ? edit.id : pageId;

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

  const [entryText, setEntryText] = useState("");
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

  useEffect(() => {
    setEntryText(edit.text || "");
  }, [edit]);

  const handleDoneClick = async () => {
    setLoading(true);

    let uploadedImageUrls = [];

    if (images) {
      try {
        uploadedImageUrls = await Promise.all(
          images.map(async (image) => {
            const imageRef = ref(storage, `images/${image.name}`);
            await uploadBytes(imageRef, image);
            const url = await getDownloadURL(imageRef);
            console.log(`Image ${image.name} uploaded successfully`);
            return url;
          })
        );
      } catch (error) {
        console.error("Error uploading images:", error);
        setLoading(false);
        return;
      }
    }

    const imagesAddedDuringEdit = images && images.length > 0;

    let updatedImages;
    if (imagesAddedDuringEdit) {
      updatedImages = [...uploadedImageUrls, ...(edit.img || [])];
    } else {
      updatedImages = edit.img || [];
    }

    const pageContent = {
      storageKey: "pages",
      img: updatedImages,
      text: entryText,
      date: savedDate,
      id: id,
      marked: false,
    };

    if (edit) {
      dispatch(addPage(pageContent));
      dispatch(clearEdit());
    }

    dispatch(addPage(pageContent));

    setTimeout(() => {
      dispatch(closeModal());
    }, 100);
    setOpenAnimation(false);
    setImages([]);
  };

  const handleTextareaChange = (e) => {
    setEntryText(e.target.value);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleDeleteEditImage = (index) => {
    const updatedEditImages = [...edit.img];
    updatedEditImages.splice(index, 1);
    dispatch(deleteImage({ id, index }));
  };

  return (
    <main className={`modal-container ${openAnimation ? "open" : ""}`}>
      <div className={`modal ${openAnimation ? "open" : ""}`}>
        {loading && <div className="modal-loading">Loading...</div>}
        <div className="top-section">
          <div className="top-section-actions">
            <h1>{`${edit.text ? "Edit" : "New entry"}`}</h1>
            <button
              className="image-picker-button"
              onClick={() => fileInputRef.current.click()}
            >
              <BsImages />
            </button>
          </div>

          <div className="date">{`
          ${dayName},
          ${currentDate.getDate()} 
          ${monthName}`}</div>
          <button className="modal-done-button" onClick={handleDoneClick}>
            Done
          </button>
        </div>
        <div
          className={`${
            images.length > 0 || (edit.img && edit.img.length > 0)
              ? "images-container"
              : ""
          }`}
        >
          {(images || []).map((image, index) => (
            <div className="image-wrapper">
              <img
                key={`selected-${index}`}
                src={URL.createObjectURL(image)}
                alt={`Selected ${index}-missing`}
                className="selected-images"
                onMouseEnter={() => setShowButton(true)}
                onMouseLeave={() => setShowButton(false)}
              />
              <button
                className={`image-delete-button ${showButton ? "visible" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteImage(index);
                }}
              >
                X
              </button>
            </div>
          ))}
          {(edit.img || []).map((image, index) => (
            <div className="image-wrapper">
              <img
                key={`edit-${index}`}
                src={image}
                alt={`${(<GrDocumentMissing />)} ${index}-missing`}
                className="selected-images"
                onMouseEnter={() => setShowButton(true)}
                onMouseLeave={() => setShowButton(false)}
              />
              <button
                className={`image-delete-button ${showButton ? "visible" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteEditImage(index);
                }}
              >
                X
              </button>
            </div>
          ))}
          {/* {(!images || !edit.img) && (
            <p className="no-image">No images selected</p>
          )} */}
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

        <textarea
          id="entry-textarea"
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
