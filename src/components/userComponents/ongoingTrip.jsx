import React from "react";

const Ongoing = () => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="fw-bold">Bus:</span> Bus X (Express)
          </li>
          <li className="list-group-item">
            <span className="fw-bold">From:</span> City Z
          </li>
          <li className="list-group-item">
            <span className="fw-bold">To:</span> City A
          </li>
          <li className="list-group-item">
            <span className="fw-bold">Departure Time:</span> 07:00 PM
          </li>
          <li className="list-group-item">
            <span className="fw-bold">Bus Seat:</span> 12A
          </li>
          <li className="list-group-item">
            <span className="fw-bold">Bus Station:</span> Kampala Station
          </li>
        </ul>
        <div className="mb-2 mt-4 text-center">
          <span className="fw-bold">Live Bus Location:</span>
        </div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            height: "150px",
            background: "#f8f9fa",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          {/* Replace with your dummy map implementation */}
          <img
            src="https://th.bing.com/th/id/OIP.ZPKuUY0mrE5VBDOS1oAuAQHaEF?w=281&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="map"
            className="bus-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Ongoing;
