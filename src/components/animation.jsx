import { useEffect } from "react";

const useProfileFadeIn = () => {
  useEffect(() => {
    const avatar = document.querySelector(".avatar");
    const avatarName = document.querySelector(".avatar-name");
    const avatarField = document.querySelector(".avatar-field");
    const editProfile = document.querySelector(".edit-profile");
    const buttonLarge = document.querySelector(".button-large");

    // Set initial opacity to 0
    if (avatar) avatar.style.opacity = "0";
    if (avatarName) avatarName.style.opacity = "0";
    if (avatarField) avatarField.style.opacity = "0";
    if (editProfile) editProfile.style.opacity = "0";
    if (buttonLarge) buttonLarge.style.opacity = "0";

  }, []);
}

export default useProfileFadeIn;