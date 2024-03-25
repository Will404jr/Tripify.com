import React from "react";
import "./lostAndFound.css"; // Import the CSS file

const lostData = [
  {
    image:
      "https://th.bing.com/th/id/OIP.bg8h8j5L0GVpW_1w4Nm3tAHaHa?w=216&h=217&c=7&r=0&o=5&dpr=1.3&pid=1.7", // Replace with your image path
    description: "Leather Bag",
    station: "Link Bus Central Station",
    contact: "0789567489", // Replace with your map link
  },
  {
    image:
      "https://th.bing.com/th/id/OIP.v9LB_6iYHINV3ihWbjkySAHaE5?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7", // Replace with your image path
    description: "Car keys",
    station: "Mumbai Bus Kampala Station",
    contact: "0789567489", // Replace with your map link
  },
  {
    image:
      "https://th.bing.com/th/id/OIP.Z07oZ0EyGQD9LG9B9ZGc6wHaFA?w=289&h=195&c=7&r=0&o=5&dpr=1.3&pid=1.7", // Replace with your image path
    description: "Dell laptop",
    station: "Link Station Sironko",
    contact: "0789567489", // Replace with your map link
  },
  {
    image:
      "https://th.bing.com/th/id/OIP.vy5Ye9ejdWqlZocwS5WxCAHaHa?w=203&h=203&c=7&r=0&o=5&dpr=1.3&pid=1.7", // Replace with your image path
    description: "Oppo 5A",
    station: "Tausi Station Bushenyi",
    contact: "0789567489", // Replace with your map link
  },
  {
    image:
      "https://th.bing.com/th/id/OIP.1ZvPfoa6Ifz1cDi9AodELAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7", // Replace with your image path
    description: "Flash drive",
    station: "Modern Station Kampala",
    contact: "0789567489", // Replace with your map link
  },
  {
    image:
      "https://th.bing.com/th/id/OIP.3sX4hy-Df6XKE2JBscfgowHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7", // Replace with your image path
    description: "Nike Shoe",
    station: "Baddest Station Entebbe",
    contact: "0789567489", // Replace with your map link
  },
  // Add more bus objects as needed
];

const LostAndFound = () => {
  return (
    <div className="lost-container">
      {lostData.map((lost) => (
        <div key={lost.description} className="lost-card">
          <img src={lost.image} alt={lost.description} className="lost-image" />
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
