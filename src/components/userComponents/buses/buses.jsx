import React, { useState, useEffect } from "react";
import axios from "axios";
import "./buses.css"; // Import the CSS file
import BusCompanyDetails from "./bus"; // Import the BusCompanyDetails component

const Buses = () => {
  const [busData, setBusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompanyName, setSelectedCompanyName] = useState(null);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/buses/");
        setBusData(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching buses:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchBuses();
  }, []);

  const handleBusCardClick = (companyName) => {
    setSelectedCompanyName(companyName);
  };

  return (
    <div>
      {selectedCompanyName ? (
        <BusCompanyDetails busCompanyName={selectedCompanyName} />
      ) : (
        <div className="buses-container">
          {loading ? (
            <p>Loading...</p>
          ) : (
            busData.map((bus) => (
              <div
                key={bus.company}
                className="bus-card"
                onClick={() => handleBusCardClick(bus.company)}
              >
                <img
                  src={bus.images[0]}
                  alt={bus.company}
                  className="bus-image"
                />
                <div className="bus-info">
                  <h3 className="bus-name">{bus.company}</h3>
                  <p className="bus-contact">{bus.contact}</p>
                  <a
                    href={bus.mapLink}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="bus-map-link"
                  >
                    View Map
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Buses;
