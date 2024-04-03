import React, { useState } from "react";
import "./RegisterForm.css";
import ImageUpload from "./ImageUpload";

const TravelForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [manager, setManager] = useState("");
  const [contact, setContact] = useState("");
  const [stations, setStations] = useState([
    { stationName: "", destinations: [{ name: "", price: "" }] },
  ]);

  const handleStationChange = (index, field, value) => {
    const updatedStations = [...stations];
    updatedStations[index][field] = value;
    setStations(updatedStations);
  };

  const handleDestinationChange = (
    stationIndex,
    destinationIndex,
    field,
    value
  ) => {
    const updatedStations = [...stations];
    updatedStations[stationIndex].destinations[destinationIndex][field] = value;
    setStations(updatedStations);
  };

  const handleAddStation = () => {
    setStations([
      ...stations,
      { stationName: "", destinations: [{ name: "", price: "" }] },
    ]);
  };

  const handleAddDestination = (stationIndex) => {
    const updatedStations = [...stations];
    updatedStations[stationIndex].destinations.push({ name: "", price: "" });
    setStations(updatedStations);
  };

  const handleDeleteStation = (index) => {
    const updatedStations = [...stations];
    updatedStations.splice(index, 1);
    setStations(updatedStations);
  };

  const handleDeleteDestination = (stationIndex, destinationIndex) => {
    const updatedStations = [...stations];
    updatedStations[stationIndex].destinations.splice(destinationIndex, 1);
    setStations(updatedStations);
  };

  // const handleRegister = () => {
  //   console.log("Company Name:", companyName);
  //   console.log("Manager:", manager);
  //   console.log("Contact:", contact);
  //   console.log("Stations and Destinations:");
  //   console.log(stations);
  // };

  const handleRegister = () => {
    const formData = {
      companyName: companyName,
      manager: manager,
      contact: contact,
      stations: stations,
    };
    console.log(formData);
  };

  return (
    <div className="container">
      <h2>Company Registration Form</h2>
      <label>
        Company Name:
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Manager:
        <input
          type="text"
          value={manager}
          onChange={(e) => setManager(e.target.value)}
        />
      </label>
      <br />
      <label>
        Contact:
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </label>
      <br />
      <label>
        Upload bus images:
        <ImageUpload />
      </label>
      <br />
      {stations.map((station, stationIndex) => (
        <div className="card mt-3" key={stationIndex}>
          <div className="card-body">
            <h3 className="card-title">Station {stationIndex + 1}</h3>
            <label>
              Station Name:
              <input
                type="text"
                value={station.stationName}
                onChange={(e) =>
                  handleStationChange(
                    stationIndex,
                    "stationName",
                    e.target.value
                  )
                }
              />
            </label>
            <br />
            {station.destinations.map((destination, destinationIndex) => (
              <div className="row mt-3" key={destinationIndex}>
                <div className="col">
                  <label>
                    Destination Name:
                    <input
                      type="text"
                      value={destination.name}
                      onChange={(e) =>
                        handleDestinationChange(
                          stationIndex,
                          destinationIndex,
                          "name",
                          e.target.value
                        )
                      }
                    />
                  </label>
                </div>
                <div className="col">
                  <label>
                    Destination Price:
                    <input
                      type="text"
                      value={destination.price}
                      onChange={(e) =>
                        handleDestinationChange(
                          stationIndex,
                          destinationIndex,
                          "price",
                          e.target.value
                        )
                      }
                    />
                  </label>
                </div>
                <div className="col">
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      handleDeleteDestination(stationIndex, destinationIndex)
                    }
                  >
                    Delete Destination
                  </button>
                </div>
              </div>
            ))}
            <button
              className="btn btn-primary mt-3"
              onClick={() => handleAddDestination(stationIndex)}
            >
              Add Destination
            </button>
          </div>
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteStation(stationIndex)}
          >
            Delete Station
          </button>
        </div>
      ))}
      <button className="btn btn-primary mt-3" onClick={handleAddStation}>
        Add Station
      </button>
      <button className="btn btn-success mt-3" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default TravelForm;
