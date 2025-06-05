import React, { useState, useEffect, useRef } from 'react';
import "./css/edit-profile-modal.css";

const EditProfileModal = ({ open, onClose, onSave, initialProfile }) => {
    const [name, setName] = useState(initialProfile.name || "");
    const [field, setField] = useState(initialProfile.field || "");
    const [avatar, setAvatar] = useState(initialProfile.avatar || "");
    const fileInputRef = useRef();


    useEffect(() => {
        if (open) {
            setName(initialProfile.name || "");
            setField(initialProfile.field || "");
            setAvatar(initialProfile.avatar || "");
        }
    }, [open, initialProfile]);


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

    
    
    function handleAvatarChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = evt => setAvatar(evt.target.result);
            reader.readAsDataUrl(file);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSave({ name, field, avatar });
        onClose();
    }

    if (!open) return null;

    return (
        <div className="editModal" ref={modalRef} style={{ display: "flex" }}>
      <div className="editModal-content">
        <span className="closeEditModal" onClick={onClose}>&times;</span>
        <h2>Edit Profile</h2>
        <form id="editProfileForm" onSubmit={handleSubmit}>
          <label htmlFor="profileNameInput">Name:</label>
          <input
            type="text"
            id="profileNameInput"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <label htmlFor="profileFieldInput">Field:</label>
          <input
            type="text"
            id="profileFieldInput"
            value={field}
            onChange={e => setField(e.target.value)}
            required
          />
          <label htmlFor="profileAvatarInput">Upload Image:</label>
          <input
            type="file"
            id="profileAvatarInput"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
          />
          <br />
          <button type="submit" className="save-btn">Save</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;