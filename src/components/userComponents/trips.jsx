import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "./trips.css"; // Import external CSS file for additional styling

const Trips = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      const decodedUser = jwtDecode(jwt);
      setUser(decodedUser);
    } else {
      navigate("/auth"); // Redirect to login if token not found
    }
  }, [navigate]);

  // Assuming you have access to the decoded user object
  const decodedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/bookings");
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    if (decodedUser && decodedUser.email) {
      const filtered = bookings.filter(
        (booking) => booking.email === decodedUser.email
      );
      setFilteredBookings(filtered);
    }
  }, [decodedUser, bookings]);

  return (
    <div className="cont">
      <div className="card-cont">
        {filteredBookings.map((booking, index) => (
          <div key={index} className="booking-card">
            <p className="booking-info">
              <strong>Ticket ID:</strong> {booking.bookingID}
            </p>
            <p className="booking-info">
              <strong>To:</strong> {booking.destination}
            </p>
            <p className="booking-info">
              <strong>Chosen Bus:</strong> {booking.chosenBus}
            </p>
            <p className="booking-info">
              <strong>Station:</strong> {booking.station}
            </p>
            <p className="booking-info">
              <strong>Travel Date:</strong>{" "}
              {new Date(booking.selectedDate).toLocaleDateString()}
            </p>
            <p className="booking-info">
              <strong>Departure Time:</strong> {booking.shippingTime}
            </p>
            <p className="booking-info">
              <strong>Occupied Seat:</strong> {booking.selectedSeat}
            </p>
            <button
              className={`booking-button ${
                booking.cleared ? "cleared" : "uncleared"
              }`}
            >
              {booking.cleared ? "Cleared" : "Uncleared"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trips;
