import React, { useState, useEffect } from "react";

const Book = () => {
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    destination: "",
    busCompany: "",
    station: "",
    date: "",
    schedule: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketPrice, setTicketPrice] = useState(0);

  useEffect(() => {
    // Fetch the bus data from the server
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/buses");
        const data = await response.json();
        setBuses(data);
      } catch (error) {
        console.error("Error fetching bus data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter buses based on the selected destination
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
    console.log(formData);
    setSubmitted(true);
    setTicketPrice(getTicketPrice()); // Calculate ticket price after form submission
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

  const handleProceedToPayment = async () => {
    try {
      const bookingData = {
        fullNames: formData.name,
        tellNumber: formData.phoneNumber,
        destination: formData.destination,
        chosenBus: formData.busCompany,
        selectedDate: formData.date,
        shippingTime: formData.schedule,
      };

      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      console.log("Booking created successfully");
      setSubmitted(true);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />
        <select name="destination" onChange={handleChange} required>
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
        <select
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
        <select name="station" onChange={handleChange} required>
          <option value="">Select Station</option>
          {filteredBuses
            .flatMap((bus) => bus.stations)
            .map((station) => (
              <option key={station._id} value={station.stationName}>
                {station.stationName}
              </option>
            ))}
        </select>
        <input type="date" name="date" onChange={handleChange} required />
        <select name="schedule" onChange={handleChange} required>
          <option value="">Select Schedule</option>
          {filteredBuses
            .flatMap((bus) => bus.schedules)
            .map((schedule, index) => (
              <option key={index} value={schedule}>
                {schedule}
              </option>
            ))}
        </select>
        <button type="submit">Submit</button>
      </form>
      {submitted && (
        <div>
          <p>Ticket Price: ${ticketPrice}</p>
          <button onClick={handleProceedToPayment}>Proceed to Payment</button>
        </div>
      )}
    </div>
  );
};

export default Book;
