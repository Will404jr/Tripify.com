import React, { useState } from "react";

const Package = () => {
  const [formData, setFormData] = useState({}); // State to store user input

  const handleInputChange = (event) => {
    if (event.target) {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted!", formData); // Log form data
  };

  const destinations = [
    { value: "city1", label: "City 1" },
    { value: "city2", label: "City 2" },
    { value: "city3", label: "City 3" },
  ];

  const buses = [
    {
      value: "bus1",
      label: "Bus 1 (Luxury)",
      items: [
        { value: "bus1_morning", label: "Morning Departure" },
        { value: "bus1_evening", label: "Evening Departure" },
      ],
    },
    {
      value: "bus2",
      label: "Bus 2 (Standard)",
      items: [{ value: "bus2_daytime", label: "Daytime Departure" }],
    },
  ];

  const shippingTimes = [
    { value: "time1", label: "9:00 AM" },
    { value: "time2", label: "12:00 PM" },
    { value: "time3", label: "3:00 PM" },
  ];

  return (
    <form
      className="container-fluid"
      style={{ maxWidth: "600px" }}
      onSubmit={handleSubmit}
    >
      <div className="row mb-3">
        <label htmlFor="fullNames" className="col-sm-2 col-form-label">
          Full Names
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="fullNames"
            name="FullNames"
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="tellNumber" className="col-sm-2 col-form-label">
          Tell Number
        </label>
        <div className="col-sm-10">
          <input
            type="number"
            className="form-control"
            id="tellNumber"
            name="TellNumber"
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="recipientsNames" className="col-sm-2 col-form-label">
          Receipient's Names
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="recipientsNames"
            name="Receipient's Names"
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="recipientsNumber" className="col-sm-2 col-form-label">
          Receipient Number
        </label>
        <div className="col-sm-10">
          <input
            type="number"
            className="form-control"
            id="recipientsNumber"
            name="Receipient Number"
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="packageFile" className="col-sm-2 col-form-label">
          Package File
        </label>
        <div className="col-sm-10">
          <input
            type="file"
            className="form-control"
            id="packageFile"
            name="packageFile"
            onChange={handleInputChange}
            accept=".pdf,.docx,.jpg,.jpeg,.png" // Specify allowed file types
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
            name="Destination"
            onChange={handleInputChange}
            required
          >
            {destinations.map((destination) => (
              <option key={destination.value} value={destination.value}>
                {destination.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="chosenBus" className="col-sm-2 col-form-label">
          Choose a bus
        </label>
        <div className="col-sm-10">
          <select
            className="form-select"
            id="chosenBus"
            name="chosenBus"
            onChange={handleInputChange}
            required
          >
            <option value="">Select Bus</option>
            {buses.map((bus) => (
              <option key={bus.value} value={bus.value}>
                {bus.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="shippingDate" className="col-sm-2 col-form-label">
          Select shipping date
        </label>
        <div className="col-sm-10">
          <input
            type="date"
            className="form-control"
            id="shippingDate"
            name="shippingDate"
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="shippingTime" className="col-sm-2 col-form-label">
          Choose shipping time
        </label>
        <div className="col-sm-10">
          <select
            className="form-select"
            id="shippingTime"
            name="shippingTime"
            onChange={handleInputChange}
            required
          >
            <option value="">Select Time</option>
            {shippingTimes.map((time) => (
              <option key={time.value} value={time.value}>
                {time.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-10 offset-sm-2">
          <button type="submit" className="btn btn-primary">
            Proceed to payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default Package;
