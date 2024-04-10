import React, { useState, useEffect } from "react";
import axios from "axios";

const BusCompanyDetails = ({ busCompanyName }) => {
  const [busCompanyData, setBusCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusCompanyData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/bus/name/${busCompanyName}`
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
    <div className="container mt-4">
      {loading ? (
        <p>Loading...</p>
      ) : busCompanyData ? (
        <div>
          <h2 className="mb-4">{busCompanyData.company}</h2>
          <div id="carouselExample" className="carousel slide mb-4">
            <div className="carousel-inner">
              {busCompanyData.images.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={image}
                    className="d-block w-100"
                    alt={`Slide ${index}`}
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          <div>
            <h4>Contact Information</h4>
            <p>
              <strong>Manager:</strong> {busCompanyData.manager}
            </p>
            <p>
              <strong>Contact:</strong> {busCompanyData.contact}
            </p>
            <p>
              <strong>Courier Price:</strong> {busCompanyData.courrierPrice}
            </p>
            <h4>Schedules</h4>
            <ul>
              {busCompanyData.schedules.map((schedule, index) => (
                <li key={index}>{schedule}</li>
              ))}
            </ul>
            <h4>Stations and Destinations</h4>
            {busCompanyData.stations.map((station, index) => (
              <div key={index}>
                <h5>{station.stationName}</h5>
                <table className="table">
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
        </div>
      ) : (
        <p>No data found for this bus company.</p>
      )}
    </div>
  );
};

export default BusCompanyDetails;
