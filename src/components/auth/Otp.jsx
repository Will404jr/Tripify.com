import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Otp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate(); // Import useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send email to the server endpoint
      const response = await axios.post("http://localhost:5000/api/OTP", {
        email,
      });
      // Redirect to OTP confirmation page
      navigate("/otp-confirmation"); // Use navigate instead of history.push
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Otp;
