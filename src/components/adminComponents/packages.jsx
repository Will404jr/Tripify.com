import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      const decodedUser = jwtDecode(jwt);
      setUser(decodedUser);
    } else {
      navigate("/login"); // Redirect to login if token not found
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/packages");
        setPackages(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching packages:", error);
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleClearPackage = async (_id) => {
    try {
      await axios.patch(`http://localhost:5000/api/packages/${_id}/clear`);
      // Fetch packages again after clearing
      const response = await axios.get("http://localhost:5000/api/packages");
      setPackages(response.data);
    } catch (error) {
      console.error("Error clearing package:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Packages</h2>
      {loading ? (
        <p>Loading...</p>
      ) : packages.length === 0 ? (
        <p>No packages found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Names</th>
                <th>Tell Number</th>
                <th>Recipient's Names</th>
                <th>Recipient's Number</th>
                <th>Destination</th>
                <th>Shipping Date</th>
                <th>Shipping Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg._id}>
                  <td>{pkg.packageID}</td>
                  <td>{pkg.fullNames}</td>
                  <td>{pkg.tellNumber}</td>
                  <td>{pkg.recipientsNames}</td>
                  <td>{pkg.recipientsNumber}</td>
                  <td>{pkg.destination}</td>
                  <td>{new Date(pkg.shippingDate).toLocaleDateString()}</td>
                  <td>{pkg.shippingTime}</td>
                  <td>
                    {!pkg.cleared ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleClearPackage(pkg._id)}
                      >
                        Clear
                      </button>
                    ) : (
                      <span>Cleared</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Packages;
