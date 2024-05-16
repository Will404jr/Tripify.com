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
      <img
        src={require("./images/logo.png")}
        alt="bus"
        style={{
          maxWidth: "100%",
          maxHeight: "500px",
          borderRadius: "8px",
          // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  );
};

export default Home;
