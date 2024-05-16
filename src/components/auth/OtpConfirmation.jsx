import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OtpConfirmation() {
  const [otp, setOtp] = useState("");
  const [otpList, setOtpList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all OTPs from the database
    const fetchOtps = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + "/OTP"
        );
        setOtpList(response.data.otps);
      } catch (error) {
        console.error("Error fetching OTPs:", error);
      }
    };

    fetchOtps();
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    if (value.length <= 5 && /^\d*$/.test(value)) {
      setOtp(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length === 5) {
      // Check if the input OTP exists in the OTP list
      if (otpList.includes(otp)) {
        // Redirect to change password page or any other page
        navigate("/change-password");
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } else {
      alert("Please enter a 5-digit OTP.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="otp-confirmation-container">
            <h2>OTP Confirmation</h2>
            <p>Please enter the 5-digit OTP sent to your email.</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                maxLength="5"
                value={otp}
                onChange={handleChange}
                className="form-control otp-input"
              />
              <button
                type="submit"
                className="btn btn-primary otp-submit-button"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpConfirmation;
