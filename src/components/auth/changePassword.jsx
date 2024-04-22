import React, { useState } from "react";
import axios from "axios";

function ChangePassword() {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { email, newPassword, confirmPassword } = formData;

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password must match");
      return;
    }

    try {
      // Make API request to change password
      const response = await axios.put(
        "http://localhost:5000/api/change-password",
        { email, newPassword }
      );

      setSuccess(response.data.message);
      setFormData({
        email: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Change Password</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
