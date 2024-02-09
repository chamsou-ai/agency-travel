import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Reservation.css";


const Reservation = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    date: "", // Add the required attribute
  });
  const [reservationSuccessful, setReservationSuccessful] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.date) {
      alert("Please select a date");
      return;
    }
console.log("Backend env" , process.env.REACT_APP_BACKEND)
    axios
      .post(`${process.env.REACT_APP_BACKEND}/submit-reservation`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        destination: formData.destination,
        date: formData.date,
      })
      .then((response) => {
        console.log(response.data);
        // Reservation was successful
        setReservationSuccessful(true);
      })
      .catch((error) => {
        console.error(error);
        console.log(process.env)
        // Handle error responses
      });
  };

  // Render the success message if the reservation was successful
  if (reservationSuccessful) {
    return (
      <div className="reservation-container">
        <div className="success-message">
          <h2>Reservation Successful</h2>
          <p>Your reservation has been confirmed. We will contact you soon.</p>
        </div>
        <div className="button-container">
          <button onClick={() => Navigate("/")} className="btn btn-warning">
            Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="reservation-container">
      <form className="reservation-form" onSubmit={handleSubmit}>
        <h2 style={{ color: "rgb(5, 26, 83)" }}>Reservation</h2>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Enter your full name"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            placeholder="Enter your phone number"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="destination">
            Destination
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            className="form-control"
            placeholder="Enter your destination"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-control"
            placeholder="Select a date"
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          onClick={() => Navigate("/")}
          className="btn btn-warning"
          style={{ marginTop: "5px" }}
        >
          Back Home
        </button>
      </form>
    </div>
  );
};

export default Reservation;
