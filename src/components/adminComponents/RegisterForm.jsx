import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ImageUpload from "./ImageUpload";
import { message } from "antd";
import "./RegisterForm.css";
import axios from "axios";

const TravelForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [manager, setManager] = useState("");
  const [contact, setContact] = useState("");
  const [courrierPrice, setCourrierPrice] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [stations, setStations] = useState([
    { stationName: "", destinations: [{ name: "", price: "" }] },
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const decodedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (decodedUser && decodedUser.company) {
      setCompanyName(decodedUser.company);
    }
  }, [decodedUser]);

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

  const handleAddSchedule = () => {
    setSchedules([...schedules, ""]); // Add an empty string to the schedules array
  };

  const handleImageChange = (event) => {
    setSelectedImages(Array.from(event.target.files));
  };

  const handleRegister = async () => {
    const imageUrls = [];
    for (const image of selectedImages) {
      const imageFormData = new FormData();
      imageFormData.append("file", image);
      imageFormData.append("upload_preset", "bbifnh5x");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dzuu1kacl/image/upload",
          imageFormData
        );
        imageUrls.push(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    const formData = {
      company: companyName,
      manager: manager,
      contact: contact,
      courrierPrice: courrierPrice,
      schedules: schedules,
      stations: stations,
      images: imageUrls,
    };

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/busRegister",
        formData
      );
      console.log(response.data); // Handle successful response
      setIsSubmitted(true); // Set submitted state to true

      // Display success message and navigate to /admin
      message.success("Bus registration successful", () => {
        navigate("/admin/home");
      });
    } catch (error) {
      console.error(error); // Handle error
    }
  };
  return (
    <div className="card">
      <h2>Company Registration Form</h2>
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Manager"
        value={manager}
        onChange={(e) => setManager(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
      <br />
      <input
        type="number"
        placeholder="Courrier price"
        value={courrierPrice}
        onChange={(e) => setCourrierPrice(e.target.value)}
      />
      <br />
      <label htmlFor="images">Images (Optional):</label>
      <input
        type="file"
        id="images"
        name="images"
        multiple
        onChange={handleImageChange}
      />
      <br />
      {schedules.map((schedule, index) => (
        <div key={index}>
          <label>
            Schedule {index + 1}:
            <input
              type="time"
              value={schedule}
              onChange={(e) => {
                const updatedSchedules = [...schedules];
                updatedSchedules[index] = e.target.value;
                setSchedules(updatedSchedules);
              }}
            />
          </label>
        </div>
      ))}
      <button className="button-primary" onClick={handleAddSchedule}>
        Add Schedule
      </button>
      <br />
      {stations.map((station, stationIndex) => (
        <div className="card1" key={stationIndex}>
          <div className="card3">
            <h3 className="card2">Station {stationIndex + 1}</h3>
            <input
              type="text"
              placeholder="Station Name"
              value={station.stationName}
              onChange={(e) =>
                handleStationChange(stationIndex, "stationName", e.target.value)
              }
            />
            <br />
            {station.destinations.map((destination, destinationIndex) => (
              <div className="row1" key={destinationIndex}>
                <div className="col1">
                  <input
                    type="text"
                    placeholder="Destination Name"
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
                </div>
                <div className="col1">
                  <input
                    type="text"
                    placeholder="Destination Price"
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
                </div>
                <div className="col1">
                  <button
                    className="button-danger"
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
              className="button-primary"
              onClick={() => handleAddDestination(stationIndex)}
            >
              Add Destination
            </button>
          </div>
          <br />
          <button
            className="button-danger"
            onClick={() => handleDeleteStation(stationIndex)}
          >
            Delete Station
          </button>
        </div>
      ))}
      <button className="button-primary" onClick={handleAddStation}>
        Add Station
      </button>
      <br />
      <button
        className="button-success"
        onClick={handleRegister}
        disabled={isSubmitted}
      >
        {isSubmitted ? "Registration Successful" : "Register"}
      </button>
    </div>
  );
};

export default TravelForm;
