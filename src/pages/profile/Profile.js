import React, { useContext } from "react";
import AuthContext from "../../store/AuthContext";
import "./Profile.css";

const Profile = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className="profile-container">
      <div className="container">
        <div className="profile-info">
          <div className="profile-avatar">
            {authCtx.currentUser.imageUrl ? (
              <img
                src={authCtx.currentUser.imageUrl}
                alt={authCtx.currentUser.name}
              />
            ) : (
              <div className="text-avatar">
                <span>
                  {authCtx.currentUser.name && authCtx.currentUser.name[0]}
                </span>
              </div>
            )}
          </div>
          <div className="profile-name">
            <h2>{authCtx.currentUser.name}</h2>
            <p className="profile-email">{authCtx.currentUser.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
