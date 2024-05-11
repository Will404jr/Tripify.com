import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Card } from "antd";
import "./trips.css"; // Import a custom CSS file for additional styling

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
    <div className="container">
      <div className="card-container">
        {filteredBookings.map((booking, index) => (
          <Card key={index} className="booking-card">
            <p>
              <strong>Ticket ID:</strong> {booking.bookingID}
            </p>
            <p>
              <strong>To:</strong> {booking.destination}
            </p>
            <p>
              <strong>Chosen Bus:</strong> {booking.chosenBus}
            </p>
            <p>
              <strong>Station:</strong> {booking.station}
            </p>
            <p>
              <strong>Travel Date:</strong>{" "}
              {new Date(booking.selectedDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Departure Time:</strong> {booking.shippingTime}
            </p>
            <p>
              <strong>Occupied Seat:</strong> {booking.selectedSeat}
            </p>
            <button
              className={`btn ${
                booking.cleared ? "btn-secondary" : "btn-danger"
              }`}
            >
              {booking.cleared ? "Cleared" : "Uncleared"}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Trips;
