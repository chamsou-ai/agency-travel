import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Fetch the current user's data from your backend API when the component mounts
    const token = localStorage.getItem("jwtToken");

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      axios
        .get(`${process.env.REACT_APP_BACKEND}/admin/profile/UserPassword`, { headers })
        .then((response) => {
          const userData = response.data;
          setUsername(userData.username);
          setPassword(userData.password);
        })
        .catch((error) => {
          console.error("Error fetching user data: ", error);
        });
    }
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const showUpdateConfirmation = () => {
    setShowConfirmationModal(true);
  };

  const handleUpdateProfile = () => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      axios
        .put(
          `${process.env.REACT_APP_BACKEND}/admin/update-profile`,
          { username, password },
          { headers }
        )
        .then((response) => {
          console.log("Profile updated successfully");
          setShowConfirmationModal(false);
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    }
  };

  return (
    <div className="main-content">
      <div className="profile-content">
        <h2 style={{ fontSize: "50px" }}>Profile</h2>
        <div className="profile-form">
          <label className="colo">Username:</label>
          <input
            type="text"
            className="ForLa"
            value={username}
            onChange={handleUsernameChange}
          />
          <label className="colo">Password:</label>
          <input
            type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
            className="ForLa"
            value={password}
            onChange={handlePasswordChange}
          />
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={toggleShowPassword}
              style={{ cursor:'pointer' }}
            />{" "}
            Show Password
          </label>
          <br/>
          <button onClick={showUpdateConfirmation}>Update Profile</button>
        </div>
      </div>
      {/* Confirmation Modal */}
      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to update your profile?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)} className="btn">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateProfile} className="btn">
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
