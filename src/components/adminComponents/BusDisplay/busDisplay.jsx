import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./busDisplay.module.css";
import { Button } from "antd"; // Import Button from Ant Design

const BusCompanyDetails = ({ busCompanyName }) => {
  const [busCompanyData, setBusCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
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
    const fetchBusCompanyData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/bus/name/${decodedUser.company}`
        );
        setBusCompanyData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bus company data:", error);
        setLoading(false);
      }
    };

    fetchBusCompanyData();
  }, [busCompanyName]);

  const handleEditClick = () => {
    navigate(`/edit-bus/${busCompanyData._id}`); // Navigate to the edit page with the bus ID
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : busCompanyData ? (
        <div>
          <h2 className={styles.title}>{busCompanyData.company}</h2>
          <div className={styles.imagesContainer}>
            {busCompanyData.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index}`}
                className={styles.image}
              />
            ))}
          </div>

          <div className={styles.info}>
            <h4 className={styles.subtitle}>Contact Information</h4>
            <p>
              <strong>Manager:</strong> {busCompanyData.manager}
            </p>
            <p>
              <strong>Contact:</strong> {busCompanyData.contact}
            </p>
            <p>
              <strong>Courier Price:</strong> {busCompanyData.courrierPrice}
            </p>
            <h4 className={styles.subtitle}>Schedules</h4>
            <ul className={styles.scheduleList}>
              {busCompanyData.schedules.map((schedule, index) => (
                <li key={index}>{schedule}</li>
              ))}
            </ul>
            <h4 className={styles.subtitle}>Stations and Destinations</h4>
            {busCompanyData.stations.map((station, index) => (
              <div key={index} className={styles.station}>
                <h5 className={styles.stationName}>{station.stationName}</h5>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Destination</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {station.destinations.map((destination, i) => (
                      <tr key={i}>
                        <td>{destination.name}</td>
                        <td>${destination.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          <Button type="primary" onClick={handleEditClick}>
            Edit Bus Details
          </Button>
        </div>
      ) : (
        <p className={styles.noData}>No data found for this bus company.</p>
      )}
    </div>
  );
};

export default BusCompanyDetails;
