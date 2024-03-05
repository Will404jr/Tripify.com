import React from "react";
import "./buses.css"; // Import the CSS file

const busData = [
  {
    image:
      "https://th.bing.com/th/id/OIP.CpnvWAjjV5QN8_6e_gXpCAHaDt?w=346&h=175&c=7&r=0&o=5&dpr=1.3&pid=1.7", // Replace with your image path
    name: "City Express",
    station: "Central Station",
    mapLink: "https://www.google.com/maps/place/your+map+location", // Replace with your map link
  },
  {
    image:
      "https://th.bing.com/th/id/OIP.b28Wx48ycH3aY9yWKPNVpQHaEK?w=323&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7", // Replace with your image path
    name: "Monbai Express",
    station: "Kampala Station",
    mapLink: "https://www.google.com/maps/place/your+map+location", // Replace with your map link
  },
  {
    image:
      "https://th.bing.com/th/id/OIP.-w36jRPkqBr0y_0OqzEYxwHaFO?w=218&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7", // Replace with your image path
    name: "Link Express",
    station: "Link Station",
    mapLink: "https://www.google.com/maps/place/your+map+location", // Replace with your map link
  },
  {
    image:
      "https://th.bing.com/th/id/OIP.JPTLln9cF2dPPAr27d4L5AHaEV?w=289&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7", // Replace with your image path
    name: "Tausi Coaches",
    station: "Tausi Station",
    mapLink: "https://www.google.com/maps/place/your+map+location", // Replace with your map link
  },
  {
    image:
      "https://th.bing.com/th/id/OIP.oqsDIDrXcCCrBeg1ZIHK5AHaEx?w=275&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7", // Replace with your image path
    name: "Modern Express",
    station: "Modern Station",
    mapLink: "https://www.google.com/maps/place/your+map+location", // Replace with your map link
  },
  {
    image:
      "https://th.bing.com/th/id/OIP.DlAFgdjPHTqK8X6xL-AYTAHaEk?w=297&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7", // Replace with your image path
    name: "Baddest Express",
    station: "Baddest Station",
    mapLink: "https://www.google.com/maps/place/your+map+location", // Replace with your map link
  },
  // Add more bus objects as needed
];

const Buses = () => {
  return (
    <div className="buses-container">
      {busData.map((bus) => (
        <div key={bus.name} className="bus-card">
          <img src={bus.image} alt={bus.name} className="bus-image" />
          <div className="bus-info">
            <h3 className="bus-name">{bus.name}</h3>
            <p className="bus-station">{bus.station}</p>
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
      ))}
    </div>
  );
};

export default Buses;
