import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/userProfile.css";

const UserProfile = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div>
      <button className="signout" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default UserProfile;
