import React, { useState } from "react";
import Login from "./Login/Login";
import Register from "./Register";

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
          <p onClick={handleBackToLoginClick}>Back to Login</p>
        </>
      ) : (
        <>
          <Login />
          <p onClick={handleCreateAccountClick}>Create an account</p>
        </>
      )}
    </div>
  );
}

export default AuthControl;
