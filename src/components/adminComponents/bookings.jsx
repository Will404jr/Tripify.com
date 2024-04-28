import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Booking = () => {
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
      navigate("/login"); // Redirect to login if token not found
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
    if (decodedUser && decodedUser.company) {
      const filtered = bookings.filter(
        (booking) => booking.chosenBus === decodedUser.company
      );
      setFilteredBookings(filtered);
    }
  }, [decodedUser, bookings]);

  return (
    <div className="container">
      <h2>Booking Data</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Full Names</th>
              <th>Tell Number</th>
              <th>Destination</th>
              <th>Chosen Bus</th>
              <th>Selected Date</th>
              <th>Shipping Time</th>
              <th>Selected Seat</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.bookingID}</td>
                <td>{booking.fullNames}</td>
                <td>{booking.tellNumber}</td>
                <td>{booking.destination}</td>
                <td>{booking.chosenBus}</td>
                <td>{new Date(booking.selectedDate).toLocaleDateString()}</td>
                <td>{booking.shippingTime}</td>
                <td>{booking.selectedSeat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booking;
