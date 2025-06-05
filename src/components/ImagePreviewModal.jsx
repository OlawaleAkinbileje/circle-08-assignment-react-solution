import React from "react";
import "./css/image-prev-modal.css";

const ImagePreviewModal = ({ open, src, title, onClose }) => {
  if (!open) return null;

  return (
    <div className="img-preview-styles" onClick={onClose}>
      <img src={src} alt={title} />
      <p className="image-name">{title}</p>
    </div>
  );
}

export default ImagePreviewModal;