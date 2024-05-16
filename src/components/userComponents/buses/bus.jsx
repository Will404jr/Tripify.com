import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./BusCompanyDetails.module.css";

const BusCompanyDetails = ({ busCompanyName }) => {
  const [busCompanyData, setBusCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusCompanyData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/bus/name/${busCompanyName}`
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
              <strong>Courier Price:</strong>shs. {busCompanyData.courrierPrice}
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
                        <td>shs. {destination.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className={styles.noData}>No data found for this bus company.</p>
      )}
    </div>
  );
};

export default BusCompanyDetails;
