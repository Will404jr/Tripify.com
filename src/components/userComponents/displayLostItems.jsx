import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LostItems.css"; // Import your external CSS file

const LostItems = () => {
  const [lostItems, setLostItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + "/lost"
        );
        setLostItems(response.data);
      } catch (error) {
        console.error("Error fetching lost items:", error);
        setError(error.message || "An error occurred while fetching data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="lost-items-grid">
      {isLoading && <p>Loading lost items...</p>}
      {error && <p className="error-message">{error}</p>}
      {!isLoading &&
        lostItems.length > 0 &&
        lostItems.map((lostItem) => (
          <div key={lostItem._id} className="lost-item-card">
            {lostItem.images.length > 0 && (
              <figure>
                <img
                  src={lostItem.images[0]}
                  alt={lostItem.description}
                  className="lost-item-image"
                />
              </figure>
            )}
            <div className="lost-item-details">
              <h2 className="lost-item-title">{lostItem.description}</h2>
              <h6 className="lost-item-info">{lostItem.station}</h6>
              <h6 className="lost-item-info">{lostItem.contact}</h6>
            </div>
          </div>
        ))}
      {!isLoading && lostItems.length === 0 && <p>No lost items found.</p>}
    </div>
  );
};

export default LostItems;
