import React, {useState, useEffect} from 'react';
import EditProfileModal from "./EditProfileModal";
import NewPostModal from './NewPostModal';
import Gallery from './Gallery';
import "./css/animation.css";
import useProfileFadeIn from "./animation";

const ProfileHeader = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [addImageOpen, setAddImageOpen] = useState(false); // Added state
  const [newImage, setNewImage] = useState(null); // Added state
  const [profile, setProfile] = useState({
    name: "Bessie Coleman",
    field: "Civil Aviator",
    avatar: "/assets/img/Avatar.png"
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("profile");
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);
    
  useProfileFadeIn();

    
    return (
        <div>
        <section className="profile-header">
            <div className="avatar-section">
                <img className="avatar" id="userAvatar" src={profile.avatar} alt={profile.name} />
                <div className="avatar-description">
                    <div className="avatar-children">
                        <h3 className="avatar-name" id="userName">{profile.name}</h3>
                        <span className="avatar-field" id="userField">{profile.field}</span>
                    </div>
                        <div className="edit-profile">
                            <img className="small-pencil" src="/assets/img/Group-2.png" alt="Edit icon" />
                            <button id="profileEditBtn" className="edit-btn" type="button" onClick={() => setModalOpen(true)}>Edit Profile</button>
                        </div>
                </div>
            </div>
            <button className="button-large" onClick={() => setAddImageOpen(true)}>
                <img className="btn-plus" src="/assets/img/Group-26.png" alt="" />
                <span className="btn-text">New Post</span>
            </button>
        </section>
            <EditProfileModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={setProfile}
                initialProfile={profile} />
            <NewPostModal open={addImageOpen} onClose={() => setAddImageOpen(false)} onAdd={img => setNewImage(img)} />
            <Gallery newImage={newImage} />
            </div>
    );
};

export default ProfileHeader;