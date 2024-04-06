import React, { useState, useEffect } from "react";
import axios from "axios";
import "./lostAndFound.css"; // Import the CSS file

const LostAndFound = () => {
  const [lostData, setLostData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/lost");
        setLostData(response.data);
      } catch (error) {
        console.error("Error fetching lost data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="lost-container">
      {lostData.map((lost) => (
        <div key={lost._id} className="lost-card">
          <img
            src={lost.images[0]}
            alt={lost.description}
            className="lost-image"
          />
          <div className="lost-info">
            <h3 className="lost-description">{lost.description}</h3>
            <p className="lost-station">{lost.station}</p>
            <strong className="lost-strong">{lost.contact}</strong>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LostAndFound;
