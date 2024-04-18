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
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id}>
              <td>{admin.email}</td>
              <td>{admin.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminsComponent;
