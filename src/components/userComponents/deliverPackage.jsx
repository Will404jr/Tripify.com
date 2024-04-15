import React, { useState, useEffect } from "react";

const Package = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    recipientName: "",
    recipientNumber: "",
    destination: "",
    chosenBus: "",
    station: "",
    date: "",
    schedule: "",
  });
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [stations, setStations] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [courierPrice, setCourierPrice] = useState(0);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/buses");
        const data = await response.json();
        setBuses(data);
      } catch (error) {
        console.error("Error fetching bus data:", error);
      }
    };

    fetchBuses();
  }, []);

  useEffect(() => {
    if (formData.destination) {
      const filteredBuses = buses.filter((bus) =>
        bus.stations.some((station) =>
          station.destinations.some(
            (dest) => dest.name === formData.destination
          )
        )
      );
      setFilteredBuses(filteredBuses);
    }
  }, [formData.destination, buses]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "chosenBus") {
      const selectedBus = buses.find((bus) => bus.company === value);
      if (selectedBus) {
        const courierPrice = selectedBus.courrierPrice;
        setCourierPrice(courierPrice);
      }
    }
  };

  const fetchStationsAndSchedules = async () => {
    const selectedBus = filteredBuses.find(
      (bus) => bus.company === formData.chosenBus
    );
    if (selectedBus) {
      const selectedStation = selectedBus.stations.find((station) =>
        station.destinations.some((dest) => dest.name === formData.destination)
      );
      if (selectedStation) {
        setStations(selectedStation.destinations.map((dest) => dest.name));
        setSchedules(selectedBus.schedules);
      }
    }
  };

  useEffect(() => {
    if (formData.chosenBus && formData.destination) {
      fetchStationsAndSchedules();
    }
  }, [formData.chosenBus, formData.destination]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullNames: formData.fullName,
          tellNumber: formData.phoneNumber,
          recipientsNames: formData.recipientName,
          recipientsNumber: formData.recipientNumber,
          destination: formData.destination,
          chosenBus: formData.chosenBus,
          shippingDate: formData.date,
          shippingTime: formData.schedule,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit package");
      }

      console.log("Package submitted successfully");
    } catch (error) {
      console.error("Error submitting package:", error);
    }
  };

  return (
    <form
      className="container-fluid"
      style={{ maxWidth: "600px" }}
      onSubmit={handleSubmit}
    >
      <div className="row mb-3">
        <label htmlFor="fullName" className="col-sm-2 col-form-label">
          Full Name
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="phoneNumber" className="col-sm-2 col-form-label">
          Phone Number
        </label>
        <div className="col-sm-10">
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="recipientName" className="col-sm-2 col-form-label">
          Recipient's Name
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="recipientName"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="recipientNumber" className="col-sm-2 col-form-label">
          Recipient's Number
        </label>
        <div className="col-sm-10">
          <input
            type="tel"
            className="form-control"
            id="recipientNumber"
            name="recipientNumber"
            value={formData.recipientNumber}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="destination" className="col-sm-2 col-form-label">
          Destination
        </label>
        <div className="col-sm-10">
          <select
            className="form-select"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
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
      </div>
      <div className="row mb-3">
        <label htmlFor="chosenBus" className="col-sm-2 col-form-label">
          Choose Bus
        </label>
        <div className="col-sm-10">
          <select
            className="form-select"
            id="chosenBus"
            name="chosenBus"
            value={formData.chosenBus}
            onChange={handleInputChange}
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
      </div>
      <div className="row mb-3">
        <label htmlFor="station" className="col-sm-2 col-form-label">
          Station
        </label>
        <div className="col-sm-10">
          <select
            className="form-select"
            id="station"
            name="station"
            value={formData.station}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Station</option>
            {stations.map((station, index) => (
              <option key={index} value={station}>
                {station}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="date" className="col-sm-2 col-form-label">
          Date
        </label>
        <div className="col-sm-10">
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="schedule" className="col-sm-2 col-form-label">
          Schedule
        </label>
        <div className="col-sm-10">
          <select
            className="form-select"
            id="schedule"
            name="schedule"
            value={formData.schedule}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Schedule</option>
            {schedules.map((schedule, index) => (
              <option key={index} value={schedule}>
                {schedule}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="courierPrice" className="col-sm-2 col-form-label">
          Courier Price
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="courierPrice"
            name="courierPrice"
            value={`$${courierPrice}`}
            readOnly
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-10 offset-sm-2">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Package;
