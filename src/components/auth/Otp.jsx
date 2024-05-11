import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
// import "antd/dist/antd.css";

function Otp() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send email to the server endpoint
      const response = await axios.post("http://localhost:5000/api/OTP", {
        email,
      });
      // Redirect to OTP confirmation page
      navigate("/otp-confirmation");
    } catch (error) {
      console.error("Error sending OTP:", error);
      message.error("Failed to send OTP. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div>
            <h2>Please enter your email</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;
