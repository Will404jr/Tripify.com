import React from "react";

const Home = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>
        Welcome to <i>Tripify</i>
      </h1>
      <img
        src={require("./images/bus1.png")}
        alt="bus"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  );
};

export default Home;
