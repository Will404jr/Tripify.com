import React, { useState, useEffect } from "react";
import axios from "axios";
import RegisterAdmin from "./registerAdmin"; // Import the RegisterAdmin component

const AdminsComponent = () => {
  const [admins, setAdmins] = useState([]);
  const [showRegisterAdmin, setShowRegisterAdmin] = useState(false); // State to control rendering of RegisterAdmin component

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/accounts", {
          params: {
            accountType: "admin", // Filter by accountType 'admin'
          },
        });
        setAdmins(response.data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddAdminClick = () => {
    setShowRegisterAdmin(true); // Show RegisterAdmin component when "Add Admin" button is clicked
  };

  const handleAdminCreated = () => {
    // Refresh the page after admin is created
    window.location.reload();
  };

  return (
    <div>
      <button className="btn btn-primary mb-3" onClick={handleAddAdminClick}>
        Add Admin
      </button>
      {showRegisterAdmin && (
        <RegisterAdmin onAdminCreated={handleAdminCreated} />
      )}{" "}
      {/* Render RegisterAdmin component conditionally */}
      {/* <h2>Admins</h2> */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {admins.map((admin) => (
          <div key={admin._id} style={cardStyle}>
            <div>
              {/* Placeholder image */}
              <img
                src={require("../images/admin.jpg")}
                alt="Admin"
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <p>
                <strong>Email:</strong> {admin.email}
              </p>
              <p>
                <strong>Company:</strong> {admin.company}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Inline CSS styles for the card
const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "5px",
  padding: "10px",
  margin: "10px",
  width: "250px",
};

export default AdminsComponent;
