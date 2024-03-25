import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    manager: "",
    contact: "",
    mainStation: "",
    images: [],
    destinations: [],
    prices: [],
    schedules: [],
  });

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "images") {
      // Append new files to the existing ones
      setFormData({ ...formData, images: [...formData.images, ...files] });
    } else if (
      name.includes("destinations") ||
      name.includes("prices") ||
      name.includes("schedules")
    ) {
      // Handle inputs related to destinations, prices, and schedules
      const index = parseInt(name.split("[")[1].split("]")[0]);
      const fieldName = name.split("[")[0];
      const updatedData = [...formData[fieldName]];
      updatedData[index] = value;
      setFormData({ ...formData, [fieldName]: updatedData });
    } else {
      // For other regular inputs
      setFormData({ ...formData, [name]: value });
    }
  };

  const addDestination = () => {
    setFormData({
      ...formData,
      destinations: [...formData.destinations, ""],
      prices: [...formData.prices, ""],
      schedules: [...formData.schedules, ""],
    });
  };

  const removeDestination = (index) => {
    const updatedDestinations = formData.destinations.filter(
      (_, i) => i !== index
    );
    const updatedPrices = formData.prices.filter((_, i) => i !== index);
    const updatedSchedules = formData.schedules.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      destinations: updatedDestinations,
      prices: updatedPrices,
      schedules: updatedSchedules,
    });
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form>
        <div className="row mb-3">
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                className="form-control"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="manager">Manager</label>
              <input
                type="text"
                className="form-control"
                id="manager"
                name="manager"
                value={formData.manager}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="contact">Contact Number</label>
              <input
                type="tel"
                className="form-control"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="mainStation">Main Station</label>
              <input
                type="text"
                className="form-control"
                id="mainStation"
                name="mainStation"
                value={formData.mainStation}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <div className="form-group">
              <label htmlFor="images">Company Images</label>
              <input
                type="file"
                className="form-control"
                id="images"
                name="images"
                multiple
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <hr />
        <h3>Destinations</h3>
        {formData.destinations.map((destination, index) => (
          <div key={index} className="row mb-3">
            <div className="col-sm-4">
              <div className="form-group">
                <label htmlFor={`destination${index}`}>
                  Destination {index + 1}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`destination${index}`}
                  name={`destinations[${index}]`}
                  value={formData.destinations[index] || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-sm-3">
              <div className="form-group">
                <label htmlFor={`price${index}`}>Price</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    id={`price${index}`}
                    name={`prices[${index}]`}
                    value={formData.prices[index] || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-2">
              <div className="form-group">
                <label htmlFor={`schedule${index}`}>Schedule</label>
                <input
                  type="text"
                  className="form-control"
                  id={`schedule${index}`}
                  name={`schedules[${index}]`}
                  value={formData.schedules[index] || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-sm-1">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeDestination(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="row mb-3">
          <div className="col-sm-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={addDestination}
            >
              Add Destination
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
