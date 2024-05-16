import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";

const LandingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        position: "relative",
        padding: "0 20px",
        textAlign: "center",
      }}
    >
      <img
        src={require("./images/bus.jpg")}
        alt="Bus"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(3px)",
          zIndex: -1,
        }}
      />
      <div style={{ color: "white", zIndex: 1 }}>
        <h1>Welcome to Tripify.com</h1>
        <p style={{ marginBottom: "20px" }}>
          Discover your next adventure with us!
        </p>
        <div>
          <Link to="/user/home">
            <button className="custom-button">Go to Dashboard</button>
          </Link>
          <Link to="/auth">
            <button className="custom-button" style={{ marginLeft: "10px" }}>
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
