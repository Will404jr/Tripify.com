import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Login from "./Login/Login";
import Register from "./Register";
import "./authControl.css";

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
      {showRegister ? (
        <>
          <Register />
          <p className="link" onClick={handleBackToLoginClick}>
            Back to Login
          </p>
        </>
      ) : (
        <>
          <Login />
          <Link to="/forgot-password" className="link">
            {" "}
            {/* Add Forgot Password link */}
            Forgot Password
          </Link>
          <p className="link" onClick={handleCreateAccountClick}>
            Create an account
          </p>
        </>
      )}
    </div>
  );
}

export default AuthControl;
