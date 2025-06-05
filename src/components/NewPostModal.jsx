import React, { useState, useEffect, useRef } from "react";
import "./css/new-post-modal.css";

const NewPostModal = ({ open, onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgData, setImgData] = useState("");
  const fileInputRef = useRef();

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => setImgData(evt.target.result);
      reader.readAsDataURL(file);
    }
  }

  const modalRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (open && modalRef.current && event.target === modalRef.current) {
        onClose();
      }
    }
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !imgData) return;
    onAdd({
      name,
      src: imgData,
      alt: name,
      description,
    });
    setName("");
    setDescription("");
    setImgData("");
    fileInputRef.current.value = "";
    onClose();
  }

  if (!open) return null;

  return (
    <div className="newPostModal" style={{ display: "flex" }} ref={modalRef}>
      <div className="newPostModal-content">
        <span className="closeNewPostModal" onClick={onClose}>
          &times;
        </span>
        <h2>Add New Image</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Upload Image:</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            required
          />
          {imgData && (
            <img
              src={imgData}
              alt="Preview"
              style={{ width: 100, margin: "10px 0" }}
            />
          )}
          <button type="submit" className="save-button">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPostModal;
