import React, { useState } from "react";
import axios from "axios";

const RegisterAdmin = () => {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePassword = () => {
    // Generate a random password
    const password = Math.random().toString(36).slice(-8);
    setGeneratedPassword(password); // Set generated password in the state
  };

  const sendEmail = async () => {
    try {
      await axios.post(process.env.REACT_APP_API_URL + "/send-email", {
        email: email,
        password: generatedPassword,
      });
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send email with generated password
      await sendEmail();

      // Send data to register endpoint
      await axios.post(process.env.REACT_APP_API_URL + "/register", {
        email: email,
        company: company,
        password: generatedPassword,
        accountType: "admin", // Set accountType to 'admin'
      });
      // Reset form and loading state
      setEmail("");
      setCompany("");
      setGeneratedPassword("");
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error("Error creating admin user:", error);
      setLoading(false);
      alert(
        "An error occurred while creating the admin user. Please try again."
      );
    }
  };

  return (
    <div>
      <h2>Create Admin User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Company name:</label>
          <input
            type="text"
            className="form-control"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Generated Password:</label>
          <input
            type="text"
            className="form-control"
            value={generatedPassword}
            readOnly
          />
          <small className="form-text text-muted">
            Click the button to generate a secure password
          </small>
        </div>
        <button
          type="button"
          className="btn btn-primary mb-3"
          onClick={generatePassword}
        >
          Generate Password
        </button>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Creating..." : "Create Admin User"}
        </button>
      </form>
    </div>
  );
};

export default RegisterAdmin;
