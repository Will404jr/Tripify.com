import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        position: "relative", // Add position relative to contain the absolute positioned text
      }}
    >
      {/* Background image */}
      <img
        src={require("./images/bus.jpg")}
        alt="Bus"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover", // Ensure the image covers the entire container
          filter: "blur(3px)", // Apply blur effect
          zIndex: -1, // Send the image to the back
        }}
      />

      {/* Content */}
      <div style={{ textAlign: "center", color: "white", zIndex: 1 }}>
        <h1>Welcome to Tripify.com</h1>
        <div>
          <Link to="/user/home">
            <button style={{ marginRight: "10px" }}>Go to Dashboard</button>
          </Link>
          <Link to="/auth">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
