import React, { useState, useEffect } from "react";
import "./Reservation.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reservations = ({ isOpen }) => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    // Retrieve the authentication token from localStorage
    const token = localStorage.getItem("jwtToken");
    // Check if the token exists and is valid
    if (token) {
      // Create headers with the token
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Fetch reservations from the backend with the token in headers
      axios
        .get(`${process.env.REACT_APP_BACKEND}/admin/reservations`, { headers })
        .then((response) => {
          // Handle successful response and update the state
          const { reservations } = response.data;
          setReservations(reservations);
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
        });
    } else {
      navigate("/admin/login");
    }
  }); // This effect runs only on component mount

  const markReservationAsDone = (reservationId) => {
    // Retrieve the authentication token from localStorage
    const token = localStorage.getItem("jwtToken");

    // Check if the token exists and is valid
    if (token) {
      // Send a request to the backend to mark the reservation as done
      axios
        .put(
          `${process.env.REACT_APP_BACKEND}/admin/reservations/${reservationId}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the JWT token in the headers
            },
          }
        )
        .then((response) => {
          // Handle successful response, e.g., remove the reservation from the UI
          const updatedReservations = reservations.filter(
            (reservation) => reservation.id !== reservationId
          );
          setReservations(updatedReservations);
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
        });
    } else {
      // Handle the case where the token is not available (e.g., user is not authenticated)
      // You can redirect the user to the login page or show an error message.
      console.error("Authentication token is missing.");
    }
  };

  return (
    <div>
      <div
        className={`row main-content ${isOpen ? "" : "sidebar-closed"}`}
      ></div>
      <div className="row main-content">
        <h2
          style={{
            color: "#fceeb0",
            fontSize: "50px",
          }}
        >
          Reservations
        </h2>
        {reservations.map((reservation) => (
          <div className="col-md-6 mb-2" key={reservation.id}>
            <div className="reservation-card">
              <div className="card-content">
                <h5 className="card-title">Full Name :</h5>
                <p className="card-text">{reservation.full_name}</p>
                <br />
                <h5 className="card-title">Email :</h5>
                <p className="card-text">{reservation.email}</p>
                <br />
                <h5 className="card-title">Destination :</h5>
                <p className="card-text">{reservation.destination}</p>
                <br />
                <h5 className="card-title">Phone Number :</h5>
                <p className="card-text">{reservation.phone_number}</p>
                <br />
                <h5 className="card-title">Date :</h5>
                <p className="card-text">{reservation.date.slice(0, 10)}</p>
                <br />
                <button
                  className="done-button"
                  onClick={() => markReservationAsDone(reservation.id)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservations;
