import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "./bookings.css";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [stationFilter, setStationFilter] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("");
  const [selectedDateFilter, setSelectedDateFilter] = useState("");
  const [shippingTimeFilter, setShippingTimeFilter] = useState("");
  const [stationFilterOptions, setStationFilterOptions] = useState([]);
  const [destinationFilterOptions, setDestinationFilterOptions] = useState([]);
  const [shippingTimeFilterOptions, setShippingTimeFilterOptions] = useState(
    []
  );
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [busDetails, setBusDetails] = useState(null);

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
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/buses");
        setBusDetails(response.data);
      } catch (error) {
        console.error("Error fetching bus details:", error);
      }
    };

    fetchBusDetails();
  }, []);

  useEffect(() => {
    if (decodedUser && decodedUser.company && busDetails) {
      const companyBusDetails = busDetails.find(
        (bus) => bus.company === decodedUser.company
      );
      const stations = companyBusDetails.stations.map(
        (station) => station.stationName
      );
      setStationFilterOptions(stations);
      const destinations = companyBusDetails.stations.flatMap((station) =>
        station.destinations.map((destination) => destination.name)
      );
      setDestinationFilterOptions(destinations);
      const shippingTimes = companyBusDetails.schedules;
      setShippingTimeFilterOptions(shippingTimes);
    }
  }, [decodedUser, busDetails]);

  useEffect(() => {
    let filtered = bookings;
    if (stationFilter) {
      filtered = filtered.filter(
        (booking) => booking.station === stationFilter
      );
    }
    if (destinationFilter) {
      filtered = filtered.filter(
        (booking) => booking.destination === destinationFilter
      );
    }
    if (selectedDateFilter) {
      filtered = filtered.filter(
        (booking) =>
          new Date(booking.selectedDate).toLocaleDateString() ===
          selectedDateFilter
      );
    }
    if (shippingTimeFilter) {
      filtered = filtered.filter(
        (booking) => booking.shippingTime === shippingTimeFilter
      );
    }
    if (searchTerm) {
      filtered = filtered.filter((booking) =>
        booking.bookingID.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredBookings(filtered);
  }, [
    stationFilter,
    destinationFilter,
    selectedDateFilter,
    shippingTimeFilter,
    searchTerm,
    bookings,
  ]);

  const handleClearBooking = async (bookingId) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/bookings/${bookingId}/clear`
      );
      // Refresh bookings after clearing
      const response = await axios.get("http://localhost:5000/api/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Error clearing booking:", error);
    }
  };

  return (
    <div className="card">
      <h2>Booking Data</h2>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search Booking ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <select
          value={stationFilter}
          onChange={(e) => setStationFilter(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="">Filter by Station</option>
          {stationFilterOptions.map((station, index) => (
            <option key={index} value={station}>
              {station}
            </option>
          ))}
        </select>
        <select
          value={destinationFilter}
          onChange={(e) => setDestinationFilter(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="">Filter by Destination</option>
          {destinationFilterOptions.map((destination, index) => (
            <option key={index} value={destination}>
              {destination}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={selectedDateFilter}
          onChange={(e) => setSelectedDateFilter(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <select
          value={shippingTimeFilter}
          onChange={(e) => setShippingTimeFilter(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="">Filter by Shipping Time</option>
          {shippingTimeFilterOptions.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <div>
        <table className="btable">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Full Names</th>
              <th>Tell Number</th>
              <th>Destination</th>
              <th>Chosen Bus</th>
              <th>Station</th>
              <th>Selected Date</th>
              <th>Shipping Time</th>
              <th>Selected Seat</th>
              <th>Actions</th> {/* New column for actions */}
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
                <td>{booking.station}</td>
                <td>{new Date(booking.selectedDate).toLocaleDateString()}</td>
                <td>{booking.shippingTime}</td>
                <td>{booking.selectedSeat}</td>
                <td>
                  {booking.cleared ? (
                    <span>Cleared</span>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleClearBooking(booking._id)}
                    >
                      Clear
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booking;
