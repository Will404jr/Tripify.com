import React, { useState, useEffect } from "react";
import PrevostX345SeatLayout from "./BusSeat/seat";
import { message } from "antd";

import "./book.css";

const Book = () => {
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    destination: "",
    busCompany: "",
    station: "",
    date: "",
    schedule: "",
    selectedSeat: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketPrice, setTicketPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/buses");
        const data = await response.json();
        setBuses(data);
      } catch (error) {
        console.error("Error fetching bus data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredBuses = buses.filter((bus) =>
      bus.stations.some((station) =>
        station.destinations.some((dest) => dest.name === formData.destination)
      )
    );
    setFilteredBuses(filteredBuses);
  }, [formData.destination, buses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTicketPrice(getTicketPrice());
  };

  const getTicketPrice = () => {
    const selectedBus = filteredBuses.find(
      (bus) => bus.company === formData.busCompany
    );
    const selectedStation = selectedBus?.stations.find(
      (station) => station.stationName === formData.station
    );
    const selectedDestination = selectedStation?.destinations.find(
      (dest) => dest.name === formData.destination
    );
    return selectedDestination ? selectedDestination.price : 0;
  };

  const generateBookingID = () => {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleProceedToPayment = async () => {
    try {
      const bookingID = generateBookingID();

      const bookingData = {
        bookingID: bookingID,
        fullNames: formData.name,
        email: formData.email,
        tellNumber: formData.phoneNumber,
        destination: formData.destination,
        chosenBus: formData.busCompany,
        station: formData.station,
        selectedDate: formData.date,
        shippingTime: formData.schedule,
        selectedSeat: formData.selectedSeat,
      };

      const response = await fetch(
        process.env.REACT_APP_API_URL + "/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      // Send email after successful booking
      const emailResponse = await fetch(
        process.env.REACT_APP_API_URL + "/booking-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            ticketDetails: bookingData,
          }),
        }
      );

      if (!emailResponse.ok) {
        throw new Error("Failed to send email");
      }

      setSubmitted(true);

      // Display success message
      message.success("Ticket successfully booked");
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            className="input"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            className="input"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="tel"
            className="input"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <select
            className="select"
            name="destination"
            onChange={handleChange}
            required
          >
            <option value="">Select Destination</option>
            {buses.map((bus) =>
              bus.stations
                .flatMap((station) => station.destinations)
                .map((destination) => (
                  <option key={destination._id} value={destination.name}>
                    {destination.name}
                  </option>
                ))
            )}
          </select>
        </div>
        <div>
          <select
            className="select"
            name="busCompany"
            value={formData.busCompany}
            onChange={handleChange}
            required
          >
            <option value="">Select Bus</option>
            {filteredBuses.map((bus) => (
              <option key={bus._id} value={bus.company}>
                {bus.company}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            className="select"
            name="station"
            onChange={handleChange}
            required
          >
            <option value="">Select Station</option>
            {filteredBuses
              .flatMap((bus) => bus.stations)
              .map((station) => (
                <option key={station._id} value={station.stationName}>
                  {station.stationName}
                </option>
              ))}
          </select>
        </div>
        <div>
          <input
            type="date"
            className="input"
            name="date"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <select
            className="select"
            name="schedule"
            onChange={handleChange}
            required
          >
            <option value="">Select Schedule</option>
            {filteredBuses
              .flatMap((bus) => bus.schedules)
              .map((schedule, index) => (
                <option key={index} value={schedule}>
                  {schedule}
                </option>
              ))}
          </select>
        </div>
        <PrevostX345SeatLayout
          selectedSeat={formData.selectedSeat} // Pass current selected seat
          handleChange={handleChange} // Pass handleChange function as a prop
        />
        {/* <button type="submit" className="btn btn-primary">
          Submit
        </button> */}
      </form>
      {submitted && (
        <div>
          <p>Ticket Price: shs. {ticketPrice}</p>
          <button className="button" onClick={handleProceedToPayment}>
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default Book;
