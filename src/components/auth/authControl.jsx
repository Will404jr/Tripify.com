import React, { useState } from "react";
import Login from "./Login/Login";
import Register from "./Register";
import "./authControl.css"; // Import the CSS file

function AuthControl() {
  const [showRegister, setShowRegister] = useState(false);

  const handleCreateAccountClick = () => {
    setShowRegister(true);
  };

  const handleBackToLoginClick = () => {
    setShowRegister(false);
  };

  return (
    <div className="container">
      {" "}
      {/* Apply container class */}
      {showRegister ? (
        <>
          <Register />
          <p className="link" onClick={handleBackToLoginClick}>
            Back to Login
          </p>{" "}
          {/* Apply link class */}
        </>
      ) : (
        <>
          <Login />
          <p className="link" onClick={handleCreateAccountClick}>
            Create an account
          </p>{" "}
          {/* Apply link class */}
        </>
      )}
    </div>
  );
}

export default AuthControl;
